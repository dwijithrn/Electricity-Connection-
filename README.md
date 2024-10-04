# Electrical Connection Management System

This React application provides a user-friendly interface for managing electrical connections. It allows users to view, add, edit, and delete connection requests, as well as visualize connection data.

## Features

- View a list of electrical connection requests
- Add new connection requests
- Edit existing connection details
- Delete connection requests
- Search for connections by ID or applicant name
- Filter connections by date range
- Visualize connection data

## Technologies Used

- React
- React Router for navigation
- Firebase Firestore for database management
- CSS for styling

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Firebase project set up (for Firestore database)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/electrical-connection-management.git
   ```

2. Navigate to the project directory:
   ```
   cd electrical-connection-management
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. Start the development server:
   ```
   npm start
   ```

6. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

- Home Page: View, search, and filter connection requests. Edit or delete existing connections.
- Add Connection: Navigate to this page to add a new connection request.
- Data Visualization: View graphical representations of connection data.


