## Login

Bootstrap 5/Angular 21/Java 26/Spring Boot 4 SPA with JWT login, created to keep up with the latest in Spring Boot and Angular.

### Commands

- git clone from GitHub
- npm install
- ng test
- npm start
- open at http://localhost:4200/
- ng serve --open
- npx kill-port 4200

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

### TODO

- implement an email service and send an account activation email link on registration
- implement forgot password email link generation
- session cookie vs JWT vs PKCE
- implement a short-lived access token and a long-lived refresh token
- store the refresh token in an HttpOnly/Secure cookie to protect from XSS attacks
- store the access token in local storage, add it to an Authorization: Bearer <token> header on each request
- check the access token expiration before each request
- if the access token is expired, send the refresh token to a /refresh endpoint to obtain a new access token
- add a logger
