# Generated by Django 4.0.4 on 2022-08-23 01:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('kindergarten_attendance_rest_api', '0003_alter_attendancedata_reason_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendancedata',
            name='reason',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='attendancedata',
            name='reply',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='attendancedata',
            name='reply_teacher_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='kindergarten_attendance_rest_api.teacher'),
        ),
    ]
