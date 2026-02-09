### Task Management Application (Full Stack)

## Overview

This is a full-stack task management application that allows users to securely manage their personal tasks.
The application includes user authentication, task CRUD operations, status-based filtering, and clean UI interactions.
The goal of this project is to demonstrate strong fundamentals in frontend, backend, and system design without unnecessary over-engineering.

## Features

🔐 Authentication

    User signup and login
    Secure password hashing using bcrypt
    JWT-based authentication
    Protected routes (users can only access their own tasks)
    Automatic redirect between login and signup flows

✅ Task Management

    Create new tasks
    View all personal tasks
    Edit existing tasks
    Update task status:
        Pending
        In Progress
        Done
    Delete tasks with confirmation modal

🔎 Task Filtering

    Status-based filter tabs:
        All
        Pending
        In Progress
        Done
    Message shown when no tasks match the selected filter

🎯 General

    Clean and responsive UI
    Small UI animations for better user experience
    Proper error handling and validations
    No external CSS frameworks used
    Modular, readable, and maintainable codebase

## Tech Stack

# Frontend

    React (Functional Components + Hooks)
    JavaScript (ES6)
    Axios

# Backend

    Node.js
    Express.js
    MongoDB (Mongoose)
    JWT (Authentication)
    bcryptjs (Password hashing)

## Setup Instructions

# Prerequisites

    Node.js
    MongoDB (local or cloud)

# Backend Setup

    cd backend
    npm install
    node app.js

# Server will start on:

    http://localhost:5000

# Frontend Setup

    cd frontend
    npm install
    npm start

# Application will open on:

    http://localhost:3000

## Architecture & Design Decisions

    JWT authentication ensures secure API access
    User-task ownership prevents data leakage
    RESTful APIs for clarity and scalability
    Simple UI prioritizes usability and performance
    Frontend and backend are separated for clean architecture

## Future Improvements

    Task due dates and reminders
    Task search functionality
    User profile management
    Role-based access control (admin/user)
    Deployment using Docker and cloud hosting
    Enhanced mobile-first UI

## This project focuses on clean architecture, secure authentication, and usability within a limited development timeframe.
