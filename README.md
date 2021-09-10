
* L'application utilise une base de données mysql 
* créer une base de données

# --------------------------------------------------------------------------------
* Aller dans le repertoire backend 
* Créer dans le répertoire "images"
* lancer npm i

* Créer un fichier .env ou renomer .env.defaut en .env à la racine
SQL_HOST = Host de la base de données
SQL_PORT = Port du serveur mysql 
SQL_USER = Nom de l'utilisateur de la base
SQL_PSWD = Mot de passe de la base
SQL_BASE = Nom de la base de données
TOKEN_KEY = Chaine pour le token


* dans le repertoire backend lancer nodemon, les tables seront crées ainsi qu'un utilisateur admin par defaut 
    - l'utilisateur admin :
        login : admin@groupo.com
        password : Super&2User

# --------------------------------------------------------------------------------
* aller dans le repertoire frontend et lancer npm i

* Créer un fichier .env ou renomer .env.defaut en .env avec la même clé pour la ligne TOKEN_KEY que dans le fichier ENV du backend

* Lancer la commande npm run serve

L'application sera disponible à l'adresse : http://localhost:8080