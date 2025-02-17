from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection

def getAllTables(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';")
        tables = cursor.fetchall()

    exept = ['django_migrations', 'django_content_type', 'auth_permission', 'auth_group', 'auth_group_permissions', 'auth_user_groups', 'auth_user_user_permissions', 'django_admin_log', 'auth_user', 'django_session']
    
    tableToDisplay = []

    for table in tables: 
        if table[0] not in exept:
            tableToDisplay.append(table[0])

    return JsonResponse({"tables": tableToDisplay})