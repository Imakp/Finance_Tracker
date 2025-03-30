# Finance Tracker

A full-stack web application designed to help users track their monthly finances, including income and expenses.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)

## Description

Finance Tracker provides a user-friendly interface to manage personal finances on a monthly basis. Users can record their budget, income, and expenses for each month, visualize spending patterns, and get a clear overview of their financial status.

## Features

- **Monthly Tracking:** Create and manage financial records for each month.
- **Budget Management:** Set a budget for each month.
- **Income/Expense Logging:** Add income and expense transactions (details likely within `MonthlyDetail`).
- **Data Visualization:** (Likely) Circular progress bars or similar visuals to show budget usage (`CircularProgress.jsx`).
- **Theme Switching:** (Possible) Light/Dark mode support (`ThemeContext.jsx`).
- **Responsive Design:** Built with Tailwind CSS for adaptability across devices.

## Tech Stack

- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - React Router (implied by multiple pages)
  - Context API (for state management)
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose likely, based on `models`)
- **Database:**
  - MongoDB Atlas (or local MongoDB instance)

## Project Structure

The project is organized into two main directories:

```
/
├── backend/         # Node.js/Express backend server
│   ├── config/      # Database configuration
│   ├── controllers/ # Request handling logic
│   ├── models/      # Mongoose models for MongoDB
│   ├── routes/      # API route definitions
│   ├── index.js     # Server entry point
│   └── package.json # Backend dependencies
│
├── frontend/        # React frontend application
│   ├── public/      # Static assets
│   ├── src/         # Source code
│   │   ├── components/ # Reusable UI components
│   │   ├── contexts/   # React Context providers
│   │   ├── pages/      # Page components
│   │   ├── App.jsx     # Main application component
│   │   └── main.jsx    # Frontend entry point
│   ├── index.html   # HTML template
│   ├── vite.config.js # Vite configuration
│   └── package.json # Frontend dependencies
│
├── .gitignore       # Git ignore rules
└── README.md        # Project documentation
```

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v16 or later recommended)
- npm (or yarn)
- MongoDB (running locally or connection string for MongoDB Atlas)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd Finance_Tracker
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

## Environment Variables

You need to create `.env` files in both the `backend` and `frontend` directories.

**`backend/.env`:**

```env
MONGODB_URI=<your_mongodb_connection_string>
PORT=3000 # Or any port you prefer
# Add any other backend-specific variables (e.g., JWT_SECRET)
```

**`frontend/.env`:**

```env
VITE_API_BASE_URL=http://localhost:3000/api # Adjust port if needed
# Add any other frontend-specific variables
```

_Note: Replace placeholders with your actual values. Ensure the `VITE_API_BASE_URL` matches the backend server address and port._

## Running the Application

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run dev # Or your configured start script (e.g., npm start)
    ```

    The backend server should start, typically on `http://localhost:3000`.

2.  **Start the frontend development server:**
    ```bash
    cd ../frontend
    npm run dev
    ```
    The frontend application should open in your browser, typically at `http://localhost:5173` (Vite's default).

## Deployment

Both the frontend and backend are configured for deployment on Vercel (`vercel.json` files exist).

- **Backend:** Configure Vercel to run the Node.js server, ensuring environment variables (like `MONGODB_URI`) are set in the Vercel project settings.
- **Frontend:** Configure Vercel as a Vite project. Set the `VITE_API_BASE_URL` environment variable in Vercel to point to your deployed backend URL.
