# Projet_backend_plateforme_de_jeu

## Étapes d'installation

### 1. télécharcher le projet
   https://github.com/the-dev-loic/Projet_backend_plateforme_de_jeux/releases
   
### 2. Installe les dépendances
   ```bash
   npm install
   ```
### 3. Installer la base de donnée
   lancer le script mysql `database/create_db.sql`

### 4. Lancer l'api
   ```bash
   npm run start
   ```
### 5. créer un compte
   requête sur `http://localhost:3000/api/signin`
   exemple body
   ```bash
   {
  "username": "myUsername",
  "password": "Pa$$w0rd"
   }
   ```
### 6. se connecter
   requête sur `http://localhost:3000/api/login`
   exemple body
   ```bash
   {
  "username": "myUsername",
  "password": "Pa$$w0rd"
   }
   ```
