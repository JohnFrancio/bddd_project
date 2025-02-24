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
            with connection.cursor() as count_cursor:
                # Utilisation de guillemets doubles pour encapsuler le nom de la table
                count_cursor.execute(f'SELECT COUNT(*) FROM "{table[0]}"')
                row_count = count_cursor.fetchone()[0]

            tableToDisplay.append({"table":table[0],
                                   "nombre_ligne": row_count})
    return JsonResponse({"tables": tableToDisplay})
          
def getTableDetails(request):
    table_name = "b"  # Remplace par le nom réel de ta table

    with connection.cursor() as cursor:
        # Récupérer les colonnes
        cursor.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}';")
        columns = [col[0] for col in cursor.fetchall()]

        # Récupérer toutes les lignes de la table
        cursor.execute(f"SELECT * FROM {table_name};")
        rows = cursor.fetchall()

    # Afficher les données avec les colonnes
    data = [columns] + rows
    cleaned_data = [data[0]] + [
    tuple(value.replace("\t", "") if isinstance(value, str) else value for value in row)
    for row in data[1:]
    ]

    # Affichage du résultat propre
    print(cleaned_data)  
    return JsonResponse({"details": cleaned_data})
