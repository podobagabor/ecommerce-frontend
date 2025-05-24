# ecommerce-frontend
To get the KeyCloak image with the Ecommerce-realms, do the following steps:
1. docker pull podobagabor/ecommerce_keycloak:v1
2. docker run --name ecommerce-keycloak -p 8081:8080 podobagabor/ecommerce_keycloak:v1 (admin ui auth: admin/admin)

To get the Maildev for e-mails, do the following steps:
1. npm install -g maildev
2. maildev
3. After these command, you can examine the e-mail in localhost:1080
