

# | The Daily Scroll Backend

## Overview

This is the backend for a blogging platform where users can create, update, delete, and manage their blogs. The platform supports two roles: **Admin** and **User**. Admins have special privileges, such as managing users and blogs, while regular users can only manage their own blogs. The backend includes authentication, role-based access control, and a public API to view blogs with search, sort, and filter functionalities.

### Live URL
[[The Daily Scroll live link](https://the-daily-scroll.vercel.app/)]

## Features

- **User Registration & Login**: Users can register, log in, and authenticate using JWT tokens.
- **Admin Role**: Admin users can delete any blog, block users, and manage the platform’s content.
- **User Role**: Users can create, update, and delete their own blogs. They can’t manage other users or blogs.
- **Blog CRUD Operations**: Users can perform Create, Read, Update, and Delete operations on their blogs.
- **Search & Sort Blogs**: Public API supports filtering, sorting, and searching blogs by title or content.
- **Role-Based Access Control**: Different permissions are granted based on the user's role (admin or user).

## Technologies Used

- **TypeScript**: For strong typing and better code quality.
- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user and blog data.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB, used for schema modeling.
- **JWT (JSON Web Tokens)**: For secure authentication and role-based access control.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16.x or higher)
- [MongoDB](https://www.mongodb.com) (for local development or use MongoDB Atlas)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Pritom003/The-Daily-Scroll.git
cd The-Daily-Scroll
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Variables

Create a `.env` file in the root of your project and add the following:

```

PORT=5000
Node_Env=development
DB_URL=your_mongodb_connection_string
DEFAULT_PASSWORD=yourdefaultpass123
Access_Token=Set_A_SecretToken
Refresh_Token=Set_A_SecretToken
Access_Expired_In=any_duration_you want
Permanent_Expired_In=any_duration_you want
```

### Step 4: Start the Application

Run the following command to start the application:

```bash
npm start
```

The backend should now be running on `http://localhost:5000`.

## API Endpoints

### Authentication Endpoints

- **Register User**  
  `POST /api/auth/register`  
  Registers a new user.

- **Login User**  
  `POST /api/auth/login`  
  Authenticates a user and returns a JWT token.

### Blog Endpoints

- **Create Blog**  
  `POST /api/blogs`  
  Allows authenticated users to create blogs.

- **Update Blog**  
  `PATCH /api/blogs/:id`  
  Allows users to update their own blogs.

- **Delete Blog**  
  `DELETE /api/blogs/:id`  
  Allows users to delete their own blogs.

- **Get All Blogs**  
  `GET /api/blogs`  
  Fetches all blogs with optional search, sort, and filter parameters.

### Admin Endpoints

- **Block User**  
  `PATCH /api/admin/users/:userId/block`  
  Allows admins to block users.

- **Delete Any Blog**  
  `DELETE /api/admin/blogs/:id`  
  Allows admins to delete any blog.



## Models

### User Model

- `name`: User's full name.
- `email`: Email address used for authentication.
- `password`: Securely stored password.
- `role`: Either `admin` or `user`.
- `isBlocked`: Flag indicating if the user is blocked.
- `createdAt`: Timestamp when the user was created.
- `updatedAt`: Timestamp of the last update.

### Blog Model

- `title`: Blog post title.
- `content`: Main content of the blog.
- `author`: Reference to the user who created the blog.
- `isPublished`: Flag indicating if the blog is published.
- `createdAt`: Timestamp when the blog was created.
- `updatedAt`: Timestamp of the last update.

## Bonus Features

- **Search**: Find blogs by title or content.
- **Sort**: Sort blogs by fields like `createdAt` or `title`.
- **Filter**: Filter blogs by author.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

