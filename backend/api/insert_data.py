import os
import csv
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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
