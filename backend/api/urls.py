from django.urls import path
from .views import getAllTables, getTableDetails, upload_file_endpoint, delete_table

urlpatterns = [
    path('show-tables', getAllTables),  # /api/showtables renverra les tables
    path('insert-table', upload_file_endpoint),  # /api/insert-table
    path('table-details/<str:table_name>/', getTableDetails, name='table-details'),# /api/table-details/<table_name>
    path('table-delete/<str:table_name>/', delete_table, name='table-details'),# /api/table-delete/<table_name>
]