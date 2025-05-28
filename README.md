# ecommerce-frontend
Telepítési útmutató

Az alkalmazás működéséhez szükséges egy KeyCloak szerver, illetve egy PostgreSql szerver. Publikusan elérhetővé tettem az általam használt image-eket, amelyeket a következő parancsokkal lehetséges elindítani:

$docker pull podobagabor/ecommerce_keycloak:v2

$docker run --name ecommerce-keycloak -p 8081:8080 podobagabor/ecommerce_keycloak:v2

$docker pull podobagabor/ecommerce_postgre:v3

$docker run --name ecommerce-postgres -p 5432:5432 -d podobagabor/ecommerce_postgre:v3

A Keycloak realm definíciós json állomány a backend mellékletben is megtalálható. A maildev működéséhez az alábbi parancsok kiadása szükséges:

$npm install -g maildev

$maildev

A backend alkalmazás esetében a root könyvtárban szükséges kiadni az parancsot: $mvn clean package Ezt követően a target mappába legenerálódik a .jar file. Ezt a file-t szükséges a gyökérkönyvtárba mozgatni, majd elindítani a következő paranccsal:

$java -jar ecommerce-backend-0.0.1-SNAPSHOT.jar

A .jar file tömörített formában elérhető a fent linkelt repository-ban. A frontend projekt gyökérmappájában szükséges kiadni a következő parancsokat:

$npm install

$ng serve

Ezt követően a frontend alkalmazás a localhost:4200-on elérhetővé válik a böngészőben.
