from pydoc import source_synopsis
from rest_framework import serializers, validators
from .models import *

# Serializers define the API representation.

# DTO変換器みたいなもん


class ClassSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(validators=[validators.UniqueValidator(queryset=Class.objects.all(), message='既に同様のクラス名が存在しています')])
    class Meta:
        model = Class
        # fields = ['class_id', 'class_name']
        fields = '__all__'


class AttendanceDataSerializer(serializers.ModelSerializer):
    status = serializers.IntegerField(validators=[MinValueValidator(0)])
    class Meta:
        model = AttendanceData
        fields = ['attendance_id', 'child_id',
                  'date', 'status', 'reason', 'reply', 'reply_teacher_id']


class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
