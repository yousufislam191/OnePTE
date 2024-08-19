# OnePTE API Documentation

## Table of Contents

- [Introduction](#introduction)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
    - [Register a new user](#register-a-new-user)
    - [Login a user](#login-a-user)
    - [Get user information](#get-user-information)
  - [Question Endpoints](#question-endpoints)
    - [Create a new question](#create-a-new-question)
    - [Get all questions](#get-all-questions)
    - [Get a specific question](#get-a-specific-question)
  - [Answer Endpoints](#answer-endpoints)
    - [Create a new answer](#create-a-new-answer)
    - [Get all answers for a specific question](#get-all-answers-for-a-specific-question)
- [Running Locally](#running-locally)
  - [Installation](#installation)
  - [Running with Docker](#running-with-docker)

## Introduction

OnePTE is a REST API built with Node.js and Express.js framework. It uses Sequelize as ORM to interact with MySQL database. The API is designed to manage questions and answers for a language proficiency test.

### [⬆️ Back to top](#table-of-contents)

## Database Design

### [⬆️ Back to top](#table-of-contents)

## API Endpoints

### User Endpoints

#### Register a new user

- **POST /users/register**
  - Input: `name`, `email`, `password`
  - Output: `id`, `name`, `email`
  - Example:
