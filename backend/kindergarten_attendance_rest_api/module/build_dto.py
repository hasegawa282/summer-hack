from ..models import Teacher
from . import my_datetime, validation


class attendance_dto:
    def build(attend, child):
        # 出席データに紐づいている保育士の名前を取得する．(適宜例外処理を挟んでいる．)
        if attend.reply_teacher_id != None:
            reply_teacher_id = attend.reply_teacher_id.teacher_id
        else:
            reply_teacher_id = None

        reply_teacher = validation.get_or_none(
            Teacher, reply_teacher_id)

        if reply_teacher != None:
            reply_teacher_name = reply_teacher.last_name
        else:
            reply_teacher_name = None

        # 本日分の出席かチェック
        dict_list = {
            # 出欠状態ID
            'attendance_id': attend.attendance_id,
            # 子供ID
            'child_id': child.child_id,
            # 子供氏名
            'child_name': '{child.child_last_name} {child.child_first_name}'.format(child=child),
            # 日時
            'date': my_datetime.datetime_convert.to_JST(attend.date),
            'status': attend.status,  # 出欠ステータス
            # 欠席理由
            'reason': attend.reason,
            'reply': attend.reply,  # 返信
            # 返信した保育士のID
            'reply_teacher_id': reply_teacher_id,
            # 返信した保育士ID
            'reply_teacher_name': reply_teacher_name
        }

        return dict_list


class child_dto:
    def build(child):
        dict_list = {
            'child_id': child.child_id,
            'child_name': '{child.child_last_name} {child.child_first_name}'.format(child=child),
            'child_name_kana': '{child.child_last_name_kana} {child.child_first_name_kana}'.format(child=child)
        }
        # 園児のデータを追加
        return dict_list
