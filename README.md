
* L'application utilise une base de données mysql 

# --------------------------------------------------------------------------------
* Aller dans le repertoire backend et lancer npm i

* Créer un fichier .env à la racine
SQL_HOST = Host de la base de données
SQL_PORT = Port du serveur mysql 
SQL_USER = Nom de l'utilisateur de la base
SQL_PSWD = Mot de passe de la base
SQL_BASE = Nom de la base de données
TOKEN_KEY = Chaine pour le token

* dans le repertoire backend lancer nodemon, la base sera créer ainsi qu'un utilisateur admin par defaut 
    - l'utilisateur admin :
        login : admin@groupo.com
        password : Super&2User

# --------------------------------------------------------------------------------
* aller dans le repertoire frontend et lancer npm i

* Créer un fichier .env avec la même ligne TOKEN_KEY que dans le fichier ENV du backend

* Lancer la commande npm run serve

L'application sera disponible à l'adresse : http://localhost:8080