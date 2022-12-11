# LAB - Class 03

## Project: Basic Express API Server and Testing

### Author: Ethan Luxton

### Problem Domain

Build a REST API using Express, by creating a proper series of endpoints that perform CRUD operations on a database, using the REST standard.

### Links and Resources

[ci/cd](https://github.com/ethan-luxton/basic-api-server/actions/workflows/node.js.yml) (GitHub Actions)
[Main Deployment - Backend](https://basic-api-server.onrender.com)

### Setup

#### .env requirements

-   PORT: 3001
-   DATABASE_URL=postgres://localhost:5432/postgres (Local variable)

#### How to initialize/run your application

npm start

#### Features / Routes

-   Feature One: Use of all CRUD operations, Postgresql14 database.
    GET : /food - Gets all food items
    GET : /food/id - Gets one food item.
    POST : /food (with a JSON body request) - Creates a new food item.
    PUT : /food/id - (with a JSON body request and specific ID) - Updates an existing food item.
    DELETE : /food/id - (with a specific ID) - Deletes an existing food item.
-   Feature Two: Testing
-   Feature Three: Deploy to Dev
-   Feature Four: Deploy to main

#### Tests

-   How do you run tests?
    -   npm test
-   Any tests of note?
    -   404 on a bad route
    -   404 on a bad method
    -   Tests for: GET, POST, PUT and DELETE

### UML

![UML](https://i.imgur.com/jZ6Tv7L.png)