from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone
import datetime
# クラス

class Class(models.Model):
    # クラスID
    class_id = models.AutoField(primary_key=True)
    # クラス名
    class_name = models.CharField(max_length=200,unique=True)

    # オブジェクトに名前をつけるメソッド
    #   参考 : https://itc.tokyo/django/django-app-what-is-str-method/
    def __str__(self):
        # 名前をオブジェクトの名前に指定
        return self.class_name

# 園児

class Child(models.Model):
    # 園児ID
    child_id = models.CharField(max_length=200, primary_key=True)
    # 保護者姓
    parent_last_name = models.CharField(max_length=200)
    # 保護者名
    parent_first_name = models.CharField(max_length=200)
    # 保護者カナ姓
    parent_last_name_kana = models.CharField(max_length=200)
    # 保護者カナ名
    parent_first_name_kana = models.CharField(max_length=200)
    # 園児姓
    child_last_name = models.CharField(max_length=200)
    # 園児名
    child_first_name = models.CharField(max_length=200)
    # 園児カナ姓
    child_last_name_kana = models.CharField(max_length=200)
    # 園児カナ名
    child_first_name_kana = models.CharField(max_length=200)
    # 所属クラスID
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)

    # オブジェクトに名前をつけるメソッド
    #   参考 : https://itc.tokyo/django/django-app-what-is-str-method/
    def __str__(self):
        # 名前をオブジェクトの名前に指定
        return "{self.child_last_name} {self.child_first_name}".format(self=self)

# 保育士


class Teacher(models.Model):
    # 保育士ID
    teacher_id = models.CharField(max_length=200, primary_key=True)
    # 姓
    last_name = models.CharField(max_length=200)
    # 名
    first_name = models.CharField(max_length=200)
    # クラスID
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)

    # オブジェクトに名前をつけるメソッド
    #   参考 : https://itc.tokyo/django/django-app-what-is-str-method/
    def __str__(self):
        # 苗字をオブジェクトの名前に指定
        return "{self.last_name}先生".format(self=self)

# 出欠データ


class AttendanceData(models.Model):
    # 出欠ID
    attendance_id = models.AutoField(primary_key=True)
    # # 子供ID
    child_id = models.ForeignKey(Child, on_delete=models.CASCADE)
    # 日付
    date = models.DateTimeField(max_length=200,default=datetime.datetime.now())
    # 出欠状態
    status = models.IntegerField(validators=[MinValueValidator(0)])
    # 欠席理由 nullを許す
    reason = models.TextField(max_length=1000, blank=True, null=True)
    # 返信 nullを許す
    reply = models.TextField(max_length=1000, blank=True, null=True)
    # 返信した保育士ID nullを許す
    reply_teacher_id = models.ForeignKey(
        Teacher, on_delete=models.CASCADE, blank=True, null=True)

    # オブジェクトに名前をつけるメソッド
    #   参考 : https://itc.tokyo/django/django-app-what-is-str-method/
    def __str__(self):
        # 子供と時間をオブジェクトの名前に指定
        return "{self.child_id}の{self.date}の出欠状態".format(self=self)
