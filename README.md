# Library Management System 📚

## Introduction

The Library Management System is a comprehensive solution for managing a library's various operations, built with React, TypeScript, Tailwind, Redux, and Vite.js. It is designed to simplify the process of borrowing, returning, loaning of books, making/canceling reservations, managing books, with RBAC.

### Features

- **User Interface**: Sleek and modern UI built with Tailwind.
- **Borrowing and Returning**: Easy process for users to borrow and return books.
- **Loaning of Books**: Simplified loaning mechanism for authorized users.
- **Making/Canceling Reservations**: Handle reservations for popular books.
- **CRUD Books**: Complete control over book creation, retrieval, update, and deletion.
- **Manage Users and Roles**: Robust User Management and Role-Based Access Control.

## Getting Started

Below are the instructions to get the project up and running on your local machine.

### Prerequisites

- [Bun](https://bun.sh/)

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ForAeons/lms-frontend-v2.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd lms-frontend-v2
   ```

3. **Install Dependencies**:

   ```bash
   bun i
   ```

4. **Start the Development Server**:

   ```bash
   bun dev
   ```

The application should now be running at `http://localhost:5173/`.

## Setting Up Development Environment

- Install Go if you haven't already. You can download it from [here](https://go.dev/doc/install).
- Install Captain Githook (for running pre-commit/pre-push hooks):

  ```bash
  go install github.com/swellaby/captain-githook@latest
  captain-githook init
  ```

- Install ESLint and Prettier extensions for your code editor.

## Making Changes to Production

Note: You only need to do this if you are serving the frontend from the [Go backend](https://github.com/ForAeons/lms-backend) as static files, which is the default behavior.

1. **Build the Project**:

   ```bash
   bun run build
   ```

2. **Copy the Build Files to the Backend**:

   ```bash
   cp -r dist/* ../lms-backend/frontend/ # Assuming you are in the lms-frontend-v2 directory and the backend is in the parent directory
   ```

3. **Commit and Push the Changes in the Backend**

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
