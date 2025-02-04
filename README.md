# Group Expense Manager

Group Expense Manager is a web application that allows users to manage shared expenses within a group. Built using the **MERN stack (MongoDB, Express, React, Node.js)** with **TypeScript** for type safety, **Redux** for state management, and **Redux-Saga** for handling side effects. This app enables users to create groups, add expenses, track balances, and generate QR codes for settlements.

---

## Features

- **Group Management**: Create and manage groups for tracking shared expenses.
- **Expense Tracking**: Add expenses and split them among group members with different splitting options.
- **Balance Tracking**: See how much each member owes and who they owe it to.
- **QR Code Generation**: Generate QR codes for easy payment settlements (e.g., UPI payments).
- **State Management**: Uses **Redux** for state management and **Redux-Saga** for handling asynchronous tasks like API calls.
- **Secure Authentication**: User login and registration with JWT (JSON Web Token) authentication.

---

## Technologies Used

- **Backend**:
  - **Node.js** + **Express.js**
  - **MongoDB** with **Mongoose** (for database management)
  - **TypeScript** for static typing and better code quality
  - **JWT** for secure authentication
  - **Redux-Saga** for handling side effects and API calls
  - **SWC** for faster TypeScript compilation
- **Frontend**:
  - **React.js** for building the user interface
  - **Redux** for state management
  - **Redux-Saga** for managing side effects
  - **Vite** for fast development build and bundling
  - **Chart.js** for visualizing expense data and balances
  - **QRCode.react** for generating QR codes for payments
  - **TypeScript** for type safety

---

## Installation

Clone the repository:
git clone https://github.com/your-username/group-expense-manager.git
