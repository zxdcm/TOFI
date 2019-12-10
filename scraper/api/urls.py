from django.urls import path
from api import views


urlpatterns = [
    path('bank/', views.BankList.as_view()),
    path('category/', views.CategoryList.as_view()),
    path('rate/', views.RateList.as_view()),
    path('deposit/', views.DepositList.as_view()),
]
