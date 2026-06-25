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
    - start main() in LoginApplication with VM option -Dspring.profiles.active=local
    - run tests locally with environment variable SPRING_PROFILES_ACTIVE=test

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

### TODO

- extract Client model class from User entity class
- implement access/refresh token
- implement https
- set up logging to file
- set up metrics
