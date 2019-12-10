# Generated by Django 2.0.6 on 2019-11-06 08:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20191104_0653'),
    ]

    operations = [
        migrations.AddField(
            model_name='rate',
            name='min_amount',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='deposit',
            name='capitalization',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='deposit',
            name='early_recall',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='deposit',
            name='opening_online',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='deposit',
            name='partial_withdrawal',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='deposit',
            name='prolongation',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='deposit',
            name='replenishment_possibility',
            field=models.BooleanField(default=False),
        ),
    ]
