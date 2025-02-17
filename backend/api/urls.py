from django.urls import path
from .views import getAllTables

urlpatterns = [
    path('show-tables', getAllTables),  # /api/showtables renverra les tables
]