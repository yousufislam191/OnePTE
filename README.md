# OnePTE API Documentation

## Table of Contents

- [Introduction](#introduction)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
    - [Register a new user](#register-a-new-user)
    - [Get user practice history](#get-user-practice-history)
  - [Authentication Endpoints](#authentication-endpoints)
    - [Login a user](#login-a-user)
    - [Logout a user](#logout-a-user)
    - [Generate Refresh Token](#generate-refresh-token)
  - [Question Endpoints](#question-endpoints)
    - [Create a new question](#create-a-new-question)
    - [Get all questions with pagination and filtering](#get-all-questions-with-pagination-and-filtering)
    - [Get a specific question](#get-a-specific-question)
  - [Answer Endpoints](#answer-endpoints)
    - [Create a new answer for a specific question](#create-a-new-answer-for-a-specific-question)
- [Run this project](#run-this-project)
  - [Running Locally](#running-locally)
  - [Running with Docker](#running-with-docker)
- [Test Api's](#test-api's)

## Introduction

OnePTE is a REST API built with Node.js and Express.js framework. It uses Sequelize as ORM to interact with MySQL database. The API is designed to manage questions and answers for a language proficiency test.

### [⬆️ Back to top](#table-of-contents)

## Database Design

![Diagram](./databaseDesign.png 'Diagram of the database architecture')

### [⬆️ Back to top](#table-of-contents)

## API Endpoints

### User Endpoints

#### Register a new user

- **POST `/api/v1/users/register`**

  <details><summary>Request Body Example (Click here)</summary>

  ```JSON
    {
      "name": "Yousuf Islam",
      "email": "yousufislam@gmail.com",
      "password": "12345@qQ"
    }
  ```

  </details>

  <details><summary>Response example</summary>

  ```JSON
    {
      "status": 201,
      "success": true,
      "message": "User created successfully",
      "data": null
    }
  ```

  </details>

  [⬆️ Back to top](#table-of-contents)

#### Get user practice history

- **GET `/api/v1/users/history?type=SST&page=1&pageSize=5`**

  <details><summary>Query Parameters</summary>

  | Parameter  | Type   | Description                                                                         |
  | ---------- | ------ | ----------------------------------------------------------------------------------- |
  | `type`     | enum   | (optional) Filters history by question type. Possible values: `SST`, `RO`, `RMMCQ`. |
  | `page`     | string | (optional) Specifies the page number for pagination. Default is `1`.                |
  | `pageSize` | string | (optional) Specifies the number of items per page. Default is `10`.                 |

  </details>

  <details><summary>Request Headers</summary>

  | Header Name | Value Type | Description                                                   |
  | ----------- | ---------- | ------------------------------------------------------------- |
  | `Cookie`    | string     | Contains `accessToken` and `refreshToken` for authentication. |

  </details>

  <details><summary>Request Example</summary>

  ```http
  GET /api/v1/users/history?type=SST&page=1&pageSize=5 HTTP/1.1
  Host: your-api.com
  Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MjQwNjAyMCwiZXhwIjoxNzI0MDY5MzIwfQ.wBq6BImUXNUp5SW8ptjY8q_W6oBzzNybjFdEKcICG_A; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNDA2OTAyMCwiZXhwIjoxNzI0NjczODIwfQ.XbP2M2SCo60_cCszqJKwd_zyoPH7b45aK2LQfY6ikZI

  ```

  </details>

  <details><summary>Response Example</summary>

  ```JSON
  {
    "status": 200,
    "success": true,
    "message": "User history retrieved successfully",
    "data": {
      "totalItems": 2,
      "totalPages": 1,
      "currentPage": 1,
      "user": {
        "name": "Yousuf Islam"
      },
      "history": [
        {
          "answer": {
            "id": 1,
            "answer": [0, 1, 2],
            "score": 0,
            "max_score": 3
          },
          "question": {
            "id": 6,
            "type": "RMMCQ",
            "title": "RMMCQ Two",
            "sst": null,
            "ro": null,
            "rmmcq": {
              "id": 2,
              "options": [
                "Not for one moment did he doubt the validity...",
                "This research seems to give some validity...",
                "I had no reason to question the validity...",
                "State officials questioned the validity of the report...",
                "The clause has no legal validity..."
              ]
            }
          }
        },
        {
          "answer": {
            "id": 2,
            "answer": [0, 1, 2, 3],
            "score": 3,
            "max_score": 3
          },
          "question": {
            "id": 5,
            "type": "RO",
            "title": "RO Two",
            "sst": null,
            "ro": {
              "id": 2,
              "paragraphs": [
                "Not for one moment did he doubt the validity...",
                "This research seems to give some validity...",
                "I had no reason to question the validity...",
                "State officials questioned the validity of the report..."
              ]
            },
            "rmmcq": null
          }
        },
      ]
    }
  }


  ```

  </details>

  [⬆️ Back to top](#table-of-contents)

### Authentication Endpoints

#### Login a user

- **POST `/api/v1/auth/login`**

  <details><summary>Request Body Example</summary>

  ```JSON
    {
      "email": "yousufislam@gmail.com",
      "password": "12345@qQ"
    }
  ```

  </details>

  <details><summary>Response Example</summary>

  ```JSON
  {
      "status": 200,
      "success": true,
      "message": "Successfully logged in",
      "data": {
          "id": 1
      }
  }
  ```

  </details>

  [⬆️ Back to top](#table-of-contents)

#### Logout a user

- **POST `/api/v1/auth/logout`**
  <details><summary>Request Headers</summary>

  | Header Name | Value Type | Description                                                   |
  | ----------- | ---------- | ------------------------------------------------------------- |
  | `Cookie`    | string     | Contains `accessToken` and `refreshToken` for authentication. |

  </details>

  <details><summary>Response Example</summary>

  ```JSON
  {
    "status": 200,
    "success": true,
    "message": "Successfully logged out",
    "data": null
  }
  ```

  </details>

  [⬆️ Back to top](#table-of-contents)

#### Generate Refresh Token

- **POST `/api/v1/auth/refresh-token`**
  <details><summary>Request Headers</summary>

  | Header Name | Value Type | Description                                                   |
  | ----------- | ---------- | ------------------------------------------------------------- |
  | `Cookie`    | string     | Contains `accessToken` and `refreshToken` for authentication. |

  </details>

  <details><summary>Response Example</summary>

  ```JSON
  {
    "status": 200,
    "success": true,
    "message": "New access token generated successfully",
    "data": null
  }
  ```

  </details>

  [⬆️ Back to top](#table-of-contents)

### Question Endpoints

#### Create a new question

- **POST `/api/v1/questions`**

  <details><summary>Request Headers</summary>

  | Header Name    | Type   | Description                                                   |
  | -------------- | ------ | ------------------------------------------------------------- |
  | `Cookie`       | string | Contains `accessToken` and `refreshToken` for authentication. |
  | `Content-Type` | string | Must be `multipart/form-data`                                 |

  </details>

  <details><summary>Form-Data Parameters</summary>

  | Parameter Name | Type | Description                                               |
  | -------------- | ---- | --------------------------------------------------------- |
  | `audio_files`  | file | `Required for SST`. Audio files (multiple files allowed). |
  | `jsonData`     | text | `Required`. JSON string containing the question details.  |

  Example for `jsonData` (as text):

  ```TEXT
  {
    "type": "SST",
    "title": "Title must be a string",
    "time_limit": 20,
    "speakers": ["Speaker 1", "Speaker 2"],
    "paragraphs": ["paragraphs 1", "paragraphs 2", "paragraphs 3", "paragraphs 4"],
    "passage": "Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME 'users' AND TABLE_SCHEMA = 'onepte'",
    "options": ["options 1", "options 2", "options 3", "options 4", "options 5"],
    "correct_options": [1, 2, 4]
  }

  ```

  </details>

  <details><summary>Response Example for SST Type Question</summary>

  ```JSON
    {
    "status": 201,
    "success": true,
    "message": "Question created successfully",
    "data": {
        "question": {
            "id": 4,
            "type": "SST",
            "title": "Title must be a string",
            "sst_id": 1,
            "updatedAt": "2024-08-20T22:27:17.826Z",
            "createdAt": "2024-08-20T22:27:17.826Z"
        },
        "details": {
            "id": 1,
            "time_limit": 20,
            "audio_files": [
                {
                    "fileUrl": "uploads/audio/1724192835930-AvoidRafa_(cover).mp3",
                    "speaker": "Speaker 1"
                },
                {
                    "fileUrl": "uploads/audio/1724192836022-Music_(_no_copyright_Music_)_01.mp3",
                    "speaker": "Speaker 2"
                }
            ],
            "updatedAt": "2024-08-20T22:27:16.084Z",
            "createdAt": "2024-08-20T22:27:16.084Z"
        }
    }
  }

  ```

  </details>

  <details><summary>Response Example for RO Type Question</summary>

  ```JSON
    {
    "status": 201,
    "success": true,
    "message": "Question created successfully",
    "data": {
        "question": {
            "id": 3,
            "type": "RO",
            "title": "Title must be a string",
            "ro_id": 1,
            "updatedAt": "2024-08-20T22:26:43.350Z",
            "createdAt": "2024-08-20T22:26:43.350Z"
        },
        "details": {
            "id": 1,
            "paragraphs": [
                "paragraphs 1",
                "paragraphs 2",
                "paragraphs 3",
                "paragraphs 4"
            ],
            "updatedAt": "2024-08-20T22:26:43.231Z",
            "createdAt": "2024-08-20T22:26:43.231Z"
        }
    }
  }

  ```

  </details>

  <details><summary>Response Example for RMMCQ Type Question</summary>

  ```JSON
    {
    "status": 201,
    "success": true,
    "message": "Question created successfully",
    "data": {
        "question": {
            "id": 2,
            "type": "RMMCQ",
            "title": "Title must be a string",
            "rmmcq_id": 2,
            "updatedAt": "2024-08-20T22:25:24.736Z",
            "createdAt": "2024-08-20T22:25:24.736Z"
        },
        "details": {
            "id": 2,
            "passage": "Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME 'users' AND TABLE_SCHEMA = 'onepte'",
            "options": [
                "options 1",
                "options 2",
                "options 3",
                "options 4",
                "options 5"
            ],
            "correct_options": [
                1,
                2,
                4
            ],
            "updatedAt": "2024-08-20T22:25:24.472Z",
            "createdAt": "2024-08-20T22:25:24.472Z"
        }
    }
  }

  ```

  </details>

  [⬆️ Back to top](#table-of-contents)

#### Get all questions with pagination and filtering

- **GET `/api/v1/questions?page=1&pageSize=5`**

  <details><summary>Query Parameters</summary>

  | Parameter  | Type   | Description                                                                           |
  | ---------- | ------ | ------------------------------------------------------------------------------------- |
  | `type`     | enum   | (optional) Filters questions by question type. Possible values: `SST`, `RO`, `RMMCQ`. |
  | `page`     | string | (optional) Specifies the page number for pagination. Default is `1`.                  |
  | `pageSize` | string | (optional) Specifies the number of items per page. Default is `10`.                   |

  </details>

  <details><summary>Request Headers</summary>

  | Header Name | Value Type | Description                                                   |
  | ----------- | ---------- | ------------------------------------------------------------- |
  | `Cookie`    | string     | Contains `accessToken` and `refreshToken` for authentication. |

  </details>

  <details><summary>Response Example</summary>

  ```JSON
  {
    "status": 200,
    "success": true,
    "message": "Questions fetched successfully",
    "data": {
        "totalItems": 41,
        "totalPages": 5,
        "currentPage": 1,
        "data": [
            {
                "id": 1,
                "type": "SST",
                "title": "SST One",
                "sst_id": 1,
                "ro_id": null,
                "rmmcq_id": null,
                "createdAt": "2024-08-15T22:23:46.000Z",
                "updatedAt": "2024-08-15T22:23:46.000Z"
            },
            {
                "id": 2,
                "type": "RO",
                "title": "RO One",
                "sst_id": null,
                "ro_id": 1,
                "rmmcq_id": null,
                "createdAt": "2024-08-15T22:24:44.000Z",
                "updatedAt": "2024-08-15T22:24:44.000Z"
            },
            {
                "id": 3,
                "type": "RMMCQ",
                "title": "RMMCQ One",
                "sst_id": null,
                "ro_id": null,
                "rmmcq_id": 1,
                "createdAt": "2024-08-15T22:25:00.000Z",
                "updatedAt": "2024-08-15T22:25:00.000Z"
            },
            {
                "id": 4,
                "type": "SST",
                "title": "SST Two",
                "sst_id": 2,
                "ro_id": null,
                "rmmcq_id": null,
                "createdAt": "2024-08-15T22:25:17.000Z",
                "updatedAt": "2024-08-15T22:25:17.000Z"
            },
            {
                "id": 5,
                "type": "RO",
                "title": "RO Two",
                "sst_id": null,
                "ro_id": 2,
                "rmmcq_id": null,
                "createdAt": "2024-08-15T22:25:26.000Z",
                "updatedAt": "2024-08-15T22:25:26.000Z"
            },
            {
                "id": 6,
                "type": "RMMCQ",
                "title": "RMMCQ Two",
                "sst_id": null,
                "ro_id": null,
                "rmmcq_id": 2,
                "createdAt": "2024-08-15T22:25:34.000Z",
                "updatedAt": "2024-08-15T22:25:34.000Z"
            },
            {
                "id": 7,
                "type": "RMMCQ",
                "title": "Fix: Use Dynamic Assignment for questionData",
                "sst_id": null,
                "ro_id": null,
                "rmmcq_id": 3,
                "createdAt": "2024-08-17T22:59:26.000Z",
                "updatedAt": "2024-08-17T22:59:26.000Z"
            },
            {
                "id": 8,
                "type": "SST",
                "title": "Fix: Use Dynamic Assignment for questionData",
                "sst_id": 3,
                "ro_id": null,
                "rmmcq_id": null,
                "createdAt": "2024-08-17T23:01:30.000Z",
                "updatedAt": "2024-08-17T23:01:30.000Z"
            },
            {
                "id": 9,
                "type": "RO",
                "title": "Fix: Use Dynamic Assignment for questionData",
                "sst_id": null,
                "ro_id": 3,
                "rmmcq_id": null,
                "createdAt": "2024-08-17T23:01:38.000Z",
                "updatedAt": "2024-08-17T23:01:38.000Z"
            },
            {
                "id": 10,
                "type": "RO",
                "title": "Fix: Use Dynamic Assignment for questionData",
                "sst_id": null,
                "ro_id": 4,
                "rmmcq_id": null,
                "createdAt": "2024-08-17T23:12:18.000Z",
                "updatedAt": "2024-08-17T23:12:18.000Z"
            }
        ]
    }
  }

  ```

  </details>

  [⬆️ Back to top](#table-of-contents)

#### Get a specific question

- **GET `/api/v1/questions/:id`**

  <details><summary>Query Parameters</summary>

  | Parameter | Type | Description |
  | --------- | ---- | ----------- |
  | `id`      | int  | Question ID |

  </details>

  <details><summary>Request Headers</summary>

  | Header Name | Value Type | Description                                                   |
  | ----------- | ---------- | ------------------------------------------------------------- |
  | `Cookie`    | string     | Contains `accessToken` and `refreshToken` for authentication. |

  </details>

  <details><summary>Response Example</summary>

  ```JSON
    {
    "status": 200,
    "success": true,
    "message": "Question fetched successfully",
    "data": {
        "id": 3,
        "type": "RO",
        "title": "Title must be a string",
        "details": {
            "id": 1,
            "paragraphs": [
                {
                    "index": 3,
                    "value": "paragraphs 4"
                },
                {
                    "index": 2,
                    "value": "paragraphs 3"
                },
                {
                    "index": 0,
                    "value": "paragraphs 1"
                },
                {
                    "index": 1,
                    "value": "paragraphs 2"
                }
            ]
        }
    }
  }

  ```

  </details>

  [⬆️ Back to top](#table-of-contents)

### Answer Endpoints

#### Create a new answer for a specific question

- **POST `/api/v1/answers`**

  <details><summary>Request Headers</summary>

  | Header Name | Value Type | Description                                                   |
  | ----------- | ---------- | ------------------------------------------------------------- |
  | `Cookie`    | string     | Contains `accessToken` and `refreshToken` for authentication. |

  </details>

  <details><summary>Request Body Example for RO & RMMQC Type</summary>

  ```JSON
  {
      "questionId": 2,
      "answerData": [0, 1, 2, 3]
  }
  ```

  `Note:` The `answerData` value is the array of numbers `[0, 1, 2, 3]` which is the index number of the `RO`'s paragraphs & `RMMCQ`'s options type question.

  </details>

  <details><summary>Request Body Example for SST Type</summary>

  ```JSON
  {
    "questionId": 2,
    "answerData": "Return Object from Scoring Functions: Each scoring function now returns an object with score and maxScore."
  }

  ```

  </details>

  <details><summary>Reesponse Example</summary>

  ```JSON
  {
    "status": 201,
    "success": true,
    "message": "Answer submitted successfully",
    "data": null
  }

  ```

  </details>

  [⬆️ Back to top](#table-of-contents)

## Run this project

### Running Locally

To run the OnePTE API locally, follow these steps:

**1. Clone the Repository:**

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/yousufislam191/OnePTE.git
cd OnePTE
```

**2. Install Dependencies:**

Make sure you have Node.js and npm installed on your system. Then, install the required dependencies:

```bash
npm install
```

**3. Set Up Environment Variables:**

Add the necessary environment variables in `.env.development` file as shown below:

```env
SERVER_PORT = 3001
ALLOWED_ORIGINS = http://localhost:3000
NODE_ENV = development
API_PREFIX = /api/v1
APPLICATION_NAME = OnePTE

DB_HOST = localhost
DB_PORT = 3306
DB_LOGIN_NAME = root
DB_LOGIN_PASSWORD = root
DB_NAME = onepte

JWT_ACCESS_SECRET = myaccesssecret
JWT_ACCESS_EXPIRES_IN = 5m
JWT_REFRESH_SECRET = myrefreshsecret
JWT_REFRESH_EXPIRES_IN = 7d
```

Replace `DB_LOGIN_NAME`, `DB_LOGIN_PASSWORD`, and onepte with your MySQL credentials and database name.

**4. Set Up the Database:**

Ensure MySQL is running on your machine. Then, run the following command to create and migrate the database:

```bash
npm run db:migrate
```

This will automatically create the database and apply any migrations.

**5. Start the Application:**

Start the server using the following command:

```bash
npm run dev
```

The server should now be running at http://localhost:3001.

### [⬆️ Back to top](#table-of-contents)

### Running with Docker

To run this project using Docker, follow these steps:

1. **Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and [Git](https://git-scm.com/downloads)**
2. **Open a terminal and Clone this github repository**

   ```bash
   git clone https://github.com/yousufislam191/OnePTE.git
   ```

3. **Enter the cloned repository**

   ```bash
   cd OnePTE
   ```

4. **Build and Start Containers:**

   Use the provided `docker-up.sh` script to build the Docker images and start the containers. Run the following command:

   ```bash
   ./docker-up.sh
   ```

   This will execute the `docker-compose.yml` file, build the necessary Docker images, and start the containers in detached mode.

5. **Stop and Remove Containers:**

   If you need to stop and remove the running containers, use the `docker-down.sh` script. Run the following command:

   ```bash
   ./docker-down.sh
   ```

   This will execute the `docker-compose.yml` file, stop and remove the running containers.

6. **Access the Application:**

   Once the containers are up and running,

   - you can access the application at http://localhost:3001 in your browser or Postman.
   - you can acces the database at http://localhost:8081 in your browser through `phpMyAdmin` with the `username:` `root` and `password:` `root`.

### [⬆️ Back to top](#table-of-contents)

## Test Api's

To test api endpoint, download the [Postman Collection](./OnePTE.postman_collection.json) file then import it into you postman.

### [⬆️ Back to top](#table-of-contents)
