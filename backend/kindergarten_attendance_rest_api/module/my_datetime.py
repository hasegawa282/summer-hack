from django.utils import timezone
import datetime
import pytz


class datetime_convert:

    def to_JST(dt):
        """
        datetimeのタイムゾーンをJSTに変換
        :param datetime dt : JSTに変換したい値
        """
        jst = pytz.timezone('Asia/Tokyo')
        return dt.astimezone(jst)

    def is_today():
        """
        本日の日付をdatetime型で返す
        """
        d = datetime.date.today().strftime('%Y/%m/%d')
        date = datetime.datetime.strptime(d, '%Y/%m/%d')
        return datetime_convert.to_JST(date)
