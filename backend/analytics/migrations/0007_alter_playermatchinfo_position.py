# Generated by Django 4.0.4 on 2022-05-15 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0006_player_jersey_number_playermatchinfo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playermatchinfo',
            name='position',
            field=models.TextField(blank=True, null=True),
        ),
    ]