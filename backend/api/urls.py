from django.urls import path
from .views import getAllTables, getTableDetails
from .insert_data import upload_file_endpoint

urlpatterns = [
    path('show-tables', getAllTables),  # /api/showtables renverra les tables
    path('insert-table', upload_file_endpoint),  # /api/insert-table
    path('table-details/<str:table_name>/', getTableDetails, name='table-details'),  # /api/table-details/<table_name>
]