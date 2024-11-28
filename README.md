
# Employee Performance Management App

This project is an employee performance evaluation management application. It allows administrators and managers to manage employees, conduct evaluations, and generate performance reports. Employees can view their evaluations and see a report of their performance.

## Features

- **User Management**: Allows administrators and managers to manage employees and their evaluations.
- **Evaluations**: Employees can be evaluated by their supervisors. Evaluations include a score, comments, and feedback.
- **Performance Reports**: Generates performance reports for each employee, showing their evaluations and an average score.
- **Role System**: Access control based on roles (Admin, Manager, and Employee).
- **Authentication and Authorization**: Authentication validation and permission checks in each view.

## Prerequisites

- **Node.js** (>= 14.x)
- **npm** or **yarn**
- **Backend API** with the endpoints documented in the repository [Endpoints](https://github.com/jsiman551/360-degree-feedback-api).

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your_username/360-degree-feedback-client.git
   cd 360-degree-feedback-client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the project:
   ```bash
   npm run start
   ```

## Roles and Authentication Usage

1. **Admin**: Full access to all functionalities, including managing all roles and exclusive access to employee registration.
2. **Manager**: Can view and add evaluations, and provide feedback.
3. **Employee**: Can only view their own evaluations and reports and add feedback.

## Authentication
1. **RequireAuth**: A route protection component that verifies if the user is authenticated and if the token is valid. If the token has expired or the user lacks the appropriate role, it redirects the user to the login page.

## Future Improvements
1. **Feedback Notifications**: Implement a notification system to inform employees when they receive new feedback.
2. **Report Exporting**: Allow reports to be exported in PDF or Excel formats.
3. **Evaluation History**: Implement a page showing each employee's evaluation history, with filters by date and score.
4. **Enhanced User Interface**: Refine component styles and improve UX on mobile devices.

## Main Folder Descriptions
- **`src/api`**: Contains functions for making HTTP requests to the backend, centralizing the logic of API calls for reuse across components.
  
- **`src/components`**: Includes reusable React components used across various parts of the application, such as buttons, forms, headers, and other UI elements.

- **`src/consts`**: Defines global constants used throughout the project, such as API routes or default messages.

- **`src/hooks`**: Contains custom hooks that facilitate interaction with the Redux store and other custom React hooks specific to the application.

- **`src/middlewares`**: Middleware that handles tasks such as authentication.

- **`src/pages`**: Main pages such as Dashboard, Employees, etc.

- **`src/redux`**: Redux configuration, including slices, thunks, and the store. Organizes the application's global state and centralizes logic for modifying it.

- **`src/types`**: Defines TypeScript types and interfaces to ensure data consistency across the application.

- **`src/utils`**: Auxiliary functions and utilities independent of the UI and reusable in different contexts.

- **`src/App.tsx`**: Root component of the application that sets up routes and wraps the app with necessary providers.

- **`src/index.css`**: CSS file containing global styles for the application.

- **`src/main.tsx`**: Entry point of the application where the root `App` component is mounted to the DOM.

## Tests
```bash
npm run test
```
