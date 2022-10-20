from django.contrib import admin
from .models import *

# クラスを管理者ページに登録
admin.site.register(Class)
# 子供を管理者ページに登録
admin.site.register(Child)
# 保育士を管理者ページに登録
admin.site.register(Teacher)
# 出欠状態を管理者ページに登録
admin.site.register(AttendanceData)
