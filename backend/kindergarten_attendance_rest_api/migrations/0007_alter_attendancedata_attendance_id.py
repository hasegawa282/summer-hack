# Generated by Django 3.2.15 on 2022-08-23 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kindergarten_attendance_rest_api', '0006_attendancedata_child_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendancedata',
            name='attendance_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
