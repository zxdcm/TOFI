from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from api.models import Rate, Category, Bank, Deposit
from api.serializers import RateSerializer, CategorySerializer, BankSerializer, DepositSerializer


class RateList(generics.ListAPIView):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer


class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class BankList(generics.ListAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer


class DepositList(generics.ListAPIView):
    queryset = Deposit.objects.all()
    serializer_class = DepositSerializer


