from django.urls import path
from .views import getAllTables
from .insert_data import upload_file_endpoint

urlpatterns = [
    path('show-tables', getAllTables),  # /api/showtables renverra les tables
    path('insert-table', upload_file_endpoint),  # /api/insert-table
]