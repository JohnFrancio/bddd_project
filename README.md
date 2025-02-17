# Projet Django + React
## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

- [Node.js](https://nodejs.org/) (avec npm)
- [Python 3](https://www.python.org/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

### 1. Cloner le repository

Clonez ce repository en utilisant la commande suivante :

```bash
git clone https://github.com/JohnFrancio/bddd_project.git
cd bddd_project
```

### 2. Installer les dépendances du frontend

Déplacez-vous dans le dossier **`frontend/`** et installez les dépendances avec npm :

```bash
cd frontend/
npm install
```

Une fois l'installation terminée, le frontend sera prêt.

### 3. Installer les dépendances du backend

Déplacez-vous dans le dossier **`backend/`** et installez les dépendances nécessaires pour Django :

```bash
cd ../backend/
pip install djangorestframework django-cors-headers psycopg2-binary
```

### 4. Créer un fichier `.env`

Créez un fichier `.env` dans le dossier **`backend/`** et ajoutez-y les configurations de la base de données avec les valeurs par défaut :

```bash
touch .env
```

Ajoutez ensuite ces lignes dans le fichier `.env` :

```env
DB_NAME=database_name
DB_USER=username
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
```

### 5. Appliquer les migrations de la base de données

Assurez-vous que le serveur PostgreSQL est bien en fonctionnement. Ensuite, appliquez les migrations pour configurer la base de données :

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Lancer le serveur Django

Démarrez le serveur backend Django avec la commande suivante :

```bash
python manage.py runserver
```

### 7. Lancer le frontend React

Enfin, pour démarrer le frontend, retournez dans le dossier **`frontend/`** et exécutez :

```bash
npm run dev
```

Cela lancera l'application React sur **http://localhost:5173** et le serveur Django sera disponible sur **http://localhost:8000**.

---

## Structure du projet

- **frontend/** : Contient le code source du frontend basé sur React.
- **backend/** : Contient le code source du backend basé sur Django.

---
