# Generated by Django 4.0.4 on 2022-08-23 00:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('class_id', models.IntegerField(primary_key=True, serialize=False)),
                ('class_name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('teacher_id', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('last_name', models.CharField(max_length=200)),
                ('first_name', models.CharField(max_length=200)),
                ('class_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kindergarten_attendance_rest_api.class')),
            ],
        ),
        migrations.CreateModel(
            name='Child',
            fields=[
                ('child_id', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('parent_last_name', models.CharField(max_length=200)),
                ('parent_first_name', models.CharField(max_length=200)),
                ('parent_last_name_kana', models.CharField(max_length=200)),
                ('parent_first_name_kana', models.CharField(max_length=200)),
                ('child_last_name', models.CharField(max_length=200)),
                ('child_first_name', models.CharField(max_length=200)),
                ('child_last_name_kana', models.CharField(max_length=200)),
                ('child_first_name_kana', models.CharField(max_length=200)),
                ('class_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kindergarten_attendance_rest_api.class')),
            ],
        ),
        migrations.CreateModel(
            name='AttendanceData',
            fields=[
                ('attendance_id', models.IntegerField(primary_key=True, serialize=False)),
                ('date', models.DateField(max_length=200)),
                ('status', models.IntegerField(max_length=1)),
                ('reason', models.TextField(max_length=1000)),
                ('reply', models.TextField(max_length=1000)),
                ('reply_teacher_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kindergarten_attendance_rest_api.teacher')),
            ],
        ),
    ]