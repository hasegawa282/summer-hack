from re import I
from rest_framework import viewsets
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from rest_framework.permissions import AllowAny
import pytz
from .module import build_dto, my_datetime

# ClassのCRUD操作ができるようになる


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()      # クラスの一覧
    serializer_class = ClassSerializer  # クラスのデータフォーマット

    @action(methods=['get'], detail=False)
    def get(self, request):
        """
        タスク3
        クラスIDから本日分の出欠記録を返す
        URLマッピング:/class/get/?{class_id}
        """
        try:
            if "class_id" in request.GET:  # クラスID
                # 出席データを格納するリスト
                lst = []
                childs = Child.objects.filter(
                    class_id=request.GET.get("class_id"))  # クラスIDに紐づいた子供を取得
                # 各園児について
                for child in childs:
                    attends = AttendanceData.objects.filter(
                        child_id=child.child_id, date__gte=my_datetime.datetime_convert.is_today())
                    # 各出席データについて
                    for attend in attends:
                        # 出席データを追加
                        lst.append(
                            build_dto.attendance_dto.build(attend, child))
                        # 時間で降順ソート
                        lst = sorted(
                            lst, key=lambda s: s['date'], reverse=True)
        # TODO
        except Exception as e:
            print(e)
            return Response(status=500)

        return Response(lst)


# タスク1,2 出欠状態を登録する


class AttendanceDataViewSet(viewsets.ModelViewSet):
    queryset = AttendanceData.objects.all().order_by("-date")   # 日付順の出席データ一覧
    serializer_class = AttendanceDataSerializer                 # 出席データのデータフォーマット


class ChildViewSet(viewsets.ModelViewSet):
    queryset = Child.objects.all()      # 園児の一覧
    serializer_class = ChildSerializer  # 園児のデータフォーマット

    @ action(methods=['get'], detail=False)
    def get_all(self, request):
        """
        園児の一覧を返す
        URLマッピング:/child/get_all
        """
        queryset = Child.objects.all()
        lst = []        # 出席データを格納するリスト
        try:
            # 各園児について
            for child in queryset:
                # 出席データを追加
                lst.append(build_dto.child_dto.build(child))

        except Exception as e:
            print(e)
            return Response(status=500)

        return Response(lst)

    @ action(methods=['get'], detail=False)
    def get(self, request):
        try:
            """
            タスク7
            子供IDの過去の出欠記録を返す
            URLマッピング:/child/get/?{child_id}
            """
            if "child_id" in request.GET:
                # 出席データを格納するリスト
                lst = []
                # requestが指定したchild_idを持つchildを取得する
                child = Child.objects.get(child_id=request.GET.get("child_id"))
                # 指定したchildについての出席データのリストを取得する．
                attendance_datas = AttendanceData.objects.filter(
                    child_id=child.child_id).order_by("-date")
                # 各出席データについて
                for attend in attendance_datas:
                    lst.append(build_dto.attendance_dto.build(attend, child))

            """
            クラスIDに紐づく園児の一覧を返す
            URLマッピング:/child/get/?{class_id}
            """
            if "class_id" in request.GET:
                lst = []  # 園児のデータを格納するリスト
                # クラスIDに紐づく園児の一覧
                children = child = Child.objects.filter(
                    class_id=request.GET.get("class_id"))
                # 各園児について
                for child in children:
                    # 園児のデータを追加
                    lst.append(build_dto.child_dto.build(child))

        except Exception as e:
            print(e)
            return Response(status=500)

        return Response(lst)


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()        # 保育士の一覧
    serializer_class = TeacherSerializer    # 保育士のデータフォーマット
