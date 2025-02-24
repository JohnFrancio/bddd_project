import os
import csv
import re
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection

@csrf_exempt  # Pour faciliter les tests. Pensez à sécuriser cette vue en production.
def upload_file_endpoint(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Méthode non autorisée. Utilisez POST.'}, status=405)

    # Vérification que le fichier et le délimiteur sont présents dans la requête
    if 'file' not in request.FILES or 'delimiter' not in request.POST:
        return JsonResponse({'error': 'Le fichier et le délimiteur sont requis.'}, status=400)

    # Récupération du fichier et du délimiteur
    file_obj = request.FILES['file']
    delimiter = request.POST.get('delimiter')

    # Le nom de la table est tiré du nom du fichier, en minuscules (sans extension)
    table_name = os.path.splitext(file_obj.name)[0].lower()
    
    try:
        # Lire le contenu du fichier en mémoire et utiliser csv.reader
        decoded_file = file_obj.read().decode('utf-8').splitlines()
        # Si le délimiteur est le double quote, changer le quotechar pour éviter le conflit
        if delimiter == '"':
            reader = csv.reader(decoded_file, delimiter=delimiter, quotechar="'")
        else:
            reader = csv.reader(decoded_file, delimiter=delimiter)
    except Exception as e:
        return JsonResponse({'error': f'Erreur lors de la lecture du fichier: {str(e)}'}, status=400)

    try:
        # La première ligne définit les colonnes
        columns = next(reader)
    except StopIteration:
        return JsonResponse({'error': 'Le fichier est vide.'}, status=400)

    # Construction de la commande SQL pour créer la table (toutes les colonnes en VARCHAR(255))
    columns_def = ", ".join([f'"{col.strip()}" VARCHAR(255)' for col in columns])
    create_table_sql = f'CREATE TABLE IF NOT EXISTS "{table_name}" (id SERIAL PRIMARY KEY, {columns_def});'

    try:
        with connection.cursor() as cursor:
            cursor.execute(create_table_sql)
    except Exception as e:
        return JsonResponse({'error': f'Erreur lors de la création de la table: {str(e)}'}, status=500)

    inserted = 0
    errors = []
    # Insertion des lignes de données
    for row in reader:
        if not any(cell.strip() for cell in row):
            continue  # ignorer les lignes vides
        try:
            placeholders = ", ".join(["%s"] * len(row))
            columns_list = ", ".join([f'"{col.strip()}"' for col in columns])
            insert_sql = f'INSERT INTO "{table_name}" ({columns_list}) VALUES ({placeholders});'
            with connection.cursor() as cursor:
                cursor.execute(insert_sql, row)
            inserted += 1
        except Exception as e:
            errors.append({'row': row, 'error': str(e)})

    response_data = {
        'message': f"Table '{table_name}' créée ou déjà existante.",
        'inserted': inserted,
        'errors': errors,
    }
    return JsonResponse(response_data)



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
          
def getTableDetails(request, table_name):

    with connection.cursor() as cursor:
        # Récupérer les colonnes
        cursor.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = %s;", [table_name])
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

@csrf_exempt
def delete_table(request, table_name):
    if request.method != "POST":
        return JsonResponse({"error": "Méthode non autorisée. Utilisez POST."}, status=405)
    
    # Liste des tables à ne pas supprimer
    exceptions = [
        'django_migrations', 'django_content_type', 'auth_permission',
        'auth_group', 'auth_group_permissions', 'auth_user_groups',
        'auth_user_user_permissions', 'django_admin_log', 'auth_user',
        'django_session'
    ]
    
    if table_name in exceptions:
        return JsonResponse({"error": "Cette table ne peut pas être supprimée."}, status=400)
    
    # Vérification que le nom est sûr (lettres, chiffres et underscore uniquement)
    if not re.match(r'^\w+$', table_name):
        return JsonResponse({"error": "Nom de table invalide."}, status=400)
    
    try:
        with connection.cursor() as cursor:
            cursor.execute(f'DROP TABLE IF EXISTS "{table_name}"')
    except Exception as e:
        return JsonResponse({"error": f"Erreur lors de la suppression de la table: {str(e)}"}, status=500)
    
    return JsonResponse({"message": f"Table '{table_name}' supprimée avec succès."})

