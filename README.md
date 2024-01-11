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

- Node.js (>=18.0.0)
- npm

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
   npm install
   ```

4. **Start the Development Server**:

   ```bash
   npm run dev
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

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
