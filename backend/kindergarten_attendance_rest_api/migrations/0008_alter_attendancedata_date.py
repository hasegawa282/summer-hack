# Generated by Django 3.2.5 on 2022-08-23 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kindergarten_attendance_rest_api', '0007_alter_attendancedata_attendance_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendancedata',
            name='date',
            field=models.DateTimeField(max_length=200),
        ),
    ]