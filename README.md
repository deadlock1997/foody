
# Foody - Your Food Journal

## Overview

**Foody** is a simple and intuitive food journal application built with Next.js. It allows users to manage their daily food intake and view recipes.

## Features

- **Meal Tracker:** Track your calorie, protien and fat intake.
- **Recipe:** 5000 Recipes with instructions and directions.
- **User Authentication:** Sign up and log in to manage personal food journals.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:** Next.js (React, TypeScript, MUI)
- **Backend:** Node.js
- **Styling:** MUI styles
- **Authentication:** JWT
- **API:** RESTful API

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (version 14 or above)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/deadlock1997/foody
   ```

2. Navigate to the project directory:

   ```bash
   cd foody
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will run locally at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the application for production:

```bash
npm run build
```

Once built, you can start the production server:

```bash
npm start
```

### Linting

To check for any linting errors:

```bash
npm run lint
```

## Project Structure

```bash
.
├── app                           # Main application folder containing pages, API routes, and library utilities
│   ├── api                       # API routes for handling requests and backend logic
│   │   ├── auth                  # Contains authentication-related API routes
│   │   ├── recipes               # Contains API routes for recipe-related operations
│   │   └── food-log              # Contains API routes for food-log operations
│   ├── lib                       # Utility functions and modules used across the application
│   │   ├── dal.ts                # Data Access Layer - Authentication
│   │   └── session.ts            # Session management and authentication-related logic
│   └── page.tsx                  # Main page component - entry point for the application's main UI           # Signup page component for user registration
├── components                    # Reusable UI components used throughout the application
├── context                       # React context for global state management (e.g., user authentication context)
├── db                            # Sample Data JSONs and Runtime DB
├── server-utils                  # Folder containing functions using in APIs
│   └──DAL                        # Data Access Layer
├── theme                         # Application theme configuration
├── types                         # Type declarations
├── utils                         # TypeScript types and interfaces used across the application for strong typing
├── constant.ts                   # File containing constants such as static strings, configuration values, etc.
└── middleware.ts                 # Custom middleware logic, such as request/response handling, authentication checks




```

## Contact

For any queries or issues, please reach out at:

- Email: manidhar.syv1997@example.com
- GitHub: [Yogendra Sunkara](https://github.com/deadlock1997)
