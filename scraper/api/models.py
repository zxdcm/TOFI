from django.db import models


# Create your models here.
class Bank(models.Model):
    name = models.CharField(max_length=100, unique=True)
    short_name = models.CharField(max_length=100, unique=True)


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)


class Rate(models.Model):
    term = models.IntegerField()
    percentage = models.FloatField()
    currency = models.CharField(max_length=200)
    min_amount = models.IntegerField(null=True)


class Deposit(models.Model):
    name = models.CharField(max_length=250, unique=True)
    description = models.TextField()
    capitalization = models.BooleanField(default=False)
    replenishment_possibility = models.BooleanField(default=False)
    early_recall = models.BooleanField(default=False)
    opening_online = models.BooleanField(default=False)
    prolongation = models.BooleanField(default=False)
    partial_withdrawal = models.BooleanField(default=False)
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category)
    rates = models.ManyToManyField(Rate)


