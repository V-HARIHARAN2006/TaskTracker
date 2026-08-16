# 🚀 MERN Task Tracker

A full-stack Task Tracker application built using the MERN stack.

The application allows users to securely register and log in, create tasks, edit tasks, delete tasks, mark tasks as completed, filter tasks, search tasks, and monitor task statistics through a modern responsive dashboard.

---

## 📌 Project Overview

The MERN Task Tracker is designed to provide users with a simple and efficient way to manage their daily tasks.

The project demonstrates full-stack web development using:

- React.js for the frontend
- Node.js and Express.js for the backend
- MongoDB for database management
- JWT for authentication
- Axios for API communication

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected dashboard routes
- Logout functionality

### 📝 Task Management

- Create tasks
- View tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- Move completed tasks back to pending
- Task creation dates

### 🔎 Task Organization

- View all tasks
- Filter pending tasks
- Filter completed tasks
- Search tasks by title
- Search tasks by description

### 📊 Dashboard

- Total task count
- Pending task count
- Completed task count
- Modern task cards
- Success notifications
- Responsive interface

### 🔒 Security

- JWT authentication
- Protected API routes
- Environment variables
- MongoDB credentials stored securely
- JWT secret stored securely

---

## 🛠️ Technologies Used

### Frontend

- React.js
- React Router DOM
- Axios
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- JWT
- bcrypt
- dotenv

### Database

- MongoDB
- Mongoose

### Development Tools

- Visual Studio Code
- Postman
- MongoDB Atlas
- Git
- GitHub

---

## 📂 Project Structure

```text
Task-Tracker/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md