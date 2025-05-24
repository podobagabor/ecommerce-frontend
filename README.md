# ecommerce-frontend
To get the KeyCloak image with the Ecommerce-realms, do the following steps:
1. docker pull podobagabor/ecommerce_keycloak:v1
2. docker run --name ecommerce-keycloak -p 8081:8080 podobagabor/ecommerce_keycloak:v1 (admin ui auth: admin/admin)
