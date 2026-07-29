## Login

Bootstrap 5/Angular 21/Java 26/Spring Boot 4 SPA with JWT login, created to keep up with the latest in Spring Boot and Angular.

### Commands

- git clone from GitHub
- frontend:
    - npm install
    - ng test
    - npm start, open at http://localhost:4200/, or:
    - ng serve --open
    - npx kill-port 4200
- backend:
    - set "Active profiles: local" in IntelliJ Run Configurations
    - start main() in LoginApplication
    - run tests locally with environment variable SPRING_PROFILES_ACTIVE=test
    - set OpenShift env variables for cloud deployment

### Frontend Features

- Bootstrap, Angular, TypeScript
- template forms, validation, custom directive
- Angular Router
- Auth Guard
- JWT interceptor

### Backend Features

- Spring Boot
- Spring Data
- Spring Security
- REST controllers
- JWT
- JUnit, Mockito
- MySQL
- Docker
- GitHub Actions

### CI/CD

- CI pipeline in GitHub Actions runs all Spring Boot and Angular tests
- CD pipeline in OpenShift pulls the master branch from GitHub

### Creating the Spring Boot service on OpenShift

- select for resource "Deployment"
- check "Create a Route to the Application"

### MYSQL debugging on OpenShift

- check the mysql pod is "Running":
    - oc get pods
    - oc describe pod mysql-1-vn8fm
    - env | grep MYSQL
- from the mysql pod terminal:
    - mysql -u $MYSQL_USER -p
    - ```mysql -u $MYSQL_USER -h $MYSQL_SERVICE_HOST -P $MYSQL_SERVICE_PORT -p```
    - login as root, if needed: mysql -u root -p
    - use login_db;
    - show tables;

### Creating the Angular service on OpenShift

- select for resource "Deployment"
- check "Create a Route to the Application"
- set cors origin in WebSecurityConfiguration
- set apiUrl in environment.prod.ts

### TODO

- extract Client model class from User entity class
- implement access/refresh token
- implement https
- set up logging to file
- set up metrics
