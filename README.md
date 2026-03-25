# Projet_backend_plateforme_de_jeu

## Étapes d'installation

### 1. télécharcher le projet
   https://github.com/the-dev-loic/Projet_backend_plateforme_de_jeux/releases
   
### 2. Installe les dépendances
   ```bash
   npm install
   ```
### 3. Installer la base de donnée
   - lancer le script mysql `database/create_db.sql`
   - ajouter les credentials dans `database/database-connection.js`

### 4. Setup token
   ajouter une clé privée dans `auth/private_key.js`

### 5. Lancer l'api
   ```bash
   npm run start
   ```
### 6. créer un compte
   requête sur `http://localhost:3000/api/signin`
   
   exemple body
   ```bash
   {
  "username": "myUsername",
  "password": "Pa$$w0rd"
   }
   ```
### 7. se connecter
   requête sur `http://localhost:3000/api/login`
   
   exemple body
   ```bash
   {
  "username": "myUsername",
  "password": "Pa$$w0rd"
   }
   ```
