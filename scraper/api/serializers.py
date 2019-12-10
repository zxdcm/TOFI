from rest_framework import serializers
from api.models import Bank, Category, Deposit, Rate


class BankSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bank
        fields = ('id', 'name', 'short_name')


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'name')


class RateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rate
        fields = ('id', 'term', 'percentage', 'currency')


class DepositSerializer(serializers.ModelSerializer):
    bank = serializers.ReadOnlyField(source='bank.name')
    rates = RateSerializer(many=True)
    categories = CategorySerializer(many=True)

    class Meta:
        model = Deposit
        fields = ('id', 'name', 'description', 'capitalization',
                  'replenishment_possibility', 'early_recall', 'opening_online',
                  'prolongation', 'partial_withdrawal', 'bank', 'categories', 'rates')
