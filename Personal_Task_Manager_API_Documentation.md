# Personal Task Manager API Documentation

## Overview

The Personal Task Manager API facilitates task management with an emphasis on security and efficiency. Built with Node.js, it utilizes MongoDB for data storage and JWT for secure authentication, enabling users to manage tasks, categories, and user accounts.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- An environment for testing API requests (e.g., Postman)

### Setup and Installation

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/john174/node-js-project.git
cd node-js-project
npm install
```

## Setup

Create a `.env` file in the root directory of your project and add the following variables:

```dotenv
PORT=3000
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/your_db_name
```

## Running the Application

Start the server with:

```bash
npm start
```

The server will run on `http://localhost:3000/` or on a port that you have specified in the `.env` file.

## Authentication

### Register a User

**Endpoint:** `POST /auth/register`  
Creates a new user account.

- **Body**:
  ```json
  {
    "username": "user1",
    "email": "user1@example.com",
    "password": "pass1234"
  }
  ```
- **Success Response**:
  ```json
  {
    "message": "User created",
    "userId": "5f3e549e546606764c5ed8e6"
  }
  ```

### Login a User

**Endpoint:** `POST /auth/login`  
Authenticates a user and returns a JWT token.

- **Body**:
  ```json
  {
    "username": "user1",
    "password": "pass1234"
  }
  ```
- **Success Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

## Users

### Update User Details

**Endpoint:** `PATCH /users/:userId`  
Updates user information. Requires JWT authentication.

- **Headers**: `Authorization: Bearer <JWT Token>`
- **Body**: Fields to update.
- **Success Response**:
  ```json
  {
    "message": "User updated successfully."
  }
  ```

### Delete a User

**Endpoint:** `DELETE /users/:userId`  
Deletes a user account. Requires JWT authentication.

- **Headers**: `Authorization: Bearer <JWT Token>`
- **Success Response**:
  ```json
  {
    "message": "User deleted successfully."
  }
  ```

## Tasks

### Create a Task

**Endpoint:** `POST /tasks/`  
Creates a new task. Requires JWT authentication.

- **Headers**: `Authorization: Bearer <JWT Token>`
- **Body**: Task details.
- **Success Response**:
  ```json
  {
    "message": "Task created successfully."
  }
  ```

### Retrieve Tasks

**Endpoint:** `GET /tasks/`  
Fetches a list of tasks. Supports filtering, sorting, and pagination. Requires JWT authentication.

- **Headers**: `Authorization: Bearer <JWT Token>`
- **Success Response**: A list of tasks based on applied filters and sorting.

## Advanced Task Querying

The API supports advanced querying capabilities for tasks, allowing users to filter, sort, and paginate task results effectively.

### Filtering

You can filter tasks based on their `status` and `category`. To apply filters, include the respective query parameters in your request.

- **Query Parameters**:
  - `status`: Filter tasks by their status (`pending`, `in progress`, `completed`).
  - `category`: Filter tasks by category ID.

### Sorting

Tasks can be sorted by any field in ascending or descending order. Specify the field and order in the `sort` query parameter.

- **Query Parameter**:
  - `sort`: The field and order for sorting. Format: `field:order`. Example: `createdAt:asc` for ascending order, `deadline:desc` for descending order.

### Pagination

To navigate through large sets of tasks, use pagination parameters `page` and `limit`.

- **Query Parameters**:
  - `page`: The page number of the results (starting from 1).
  - `limit`: The number of tasks to return per page.

### Example Request

```http
GET /tasks/?status=pending&sort=deadline:asc&page=1&limit=10 HTTP/1.1
Authorization: Bearer <JWT Token>
```

This request fetches the first 10 pending tasks sorted by their deadline in ascending order.

### Update a Task

**Endpoint:** `PATCH /tasks/:taskId`  
Updates details of a specific task. Requires JWT authentication.

- **Headers**: `Authorization: Bearer <JWT Token>`
- **Body**: Fields to update.
- **Success Response**:
  ```json
  {
    "message": "Task updated successfully."
  }
  ```

### Delete a Task

**Endpoint:** `DELETE /tasks/:taskId`  
Deletes a specific task. Requires JWT authentication.

- **Headers**: `Authorization: Bearer <JWT Token>`
- **Success Response**:
  ```json
  {
    "message": "Task deleted successfully."
  }
  ```

## Categories

### Create a Category

**Endpoint:** `POST /categories/`  
Creates a new category for organizing tasks. Requires JWT authentication.

- **Headers**: `Authorization: Bearer <JWT Token>`
- **Body**: Category details.
- **Success Response**:
  ```json
  {
    "message": "Category created successfully."
  }
  ```

### Retrieve Categories

**Endpoint:** `GET /categories/`  
Fetches a list of categories. Requires JWT authentication.

- **Headers**: `Authorization: Bearer <JWT Token>`
- **Success Response**: A list of categories.

### Update a Category

**Endpoint:** `PATCH /categories/:categoryId`  
Updates details of a specific category. Requires JWT authentication.

- **Headers**: `Authorization: Bearer <JWT Token>`
- **Body**: Fields to update.
- **Success Response**:
  ```json
  {
    "message": "Category updated successfully."
  }
  ```

### Delete a Category

**Endpoint:** `DELETE /categories/:categoryId`  
Deletes a specific category. Requires JWT authentication.

- **Headers**: `Authorization: Bearer <JWT Token>`
- **Success Response**:
  ```json
  {
    "message": "Category deleted successfully."
  }
  ```

## Error Handling

The API implements robust error handling to provide clear and meaningful feedback for various error conditions, including unauthorized access, validation failures, and server-side errors.
