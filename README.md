# ProjectifyFrontend

Projectify app allows you to:

- Create users and login authenticated with JWT
- List all companies projects
- Report by project and week my work hours
- See my worked hours report by week
- Update work hours report until last month.

This Angular frontend app consumes REST API services from a NodeJS backend connected to a Mongo database.

Steps to run this frontend app:
- Clone project : ```git clone https://github.com/rortizv/projectify-frontend.git```
- Install dependencies: ```npm i```
- Run app local: ```ng serve -o```

Production url: https://projectify-frontend-seven.vercel.app/
Backend apiUrl: https://projectify-backend-production.up.railway.app/api


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
