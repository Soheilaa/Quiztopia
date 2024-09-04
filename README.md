# Quiztopia

Quiztopia is a full-stack web application that allows users to create quizzes with geolocation-based questions. Users can mark specific locations on a map, associate questions and answers with these locations, and later view these quizzes on the map.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Secure login and account creation.
- **Quiz Creation**: Users can create quizzes by selecting locations on a map and attaching questions and answers.
- **Interactive Map**: View and interact with quiz locations on a map.
- **Question Review**: Review all questions associated with a quiz.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- React (v18 or later)

### Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/quiztopia.git
    cd quiztopia
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the development server**:
    ```bash
    npm start
    ```

## Usage

### Running the Application
1. **Login or Create an Account**: Navigate to the landing page and either create a new account or log in with existing credentials.
   
2. **Creating a Quiz**:
   - Select locations on the map and associate questions with these locations.
   - Save the quiz.

3. **Viewing a Quiz**:
   - Navigate to "All Questions" to view all the saved questions.
   - Click "View on Map" to see the question locations on the map.

4. **Map Interactions**:
   - Click on markers to see the associated questions.

## Technologies Used
- **Frontend**:
  - React
  - TypeScript
  - Leaflet (for interactive maps)
  - Material-UI (for UI components)
- **Backend**:
  - AWS Lambda
  - API Gateway
  - Node.js
- **Others**:
  - React Router (for navigation)
  - Fetch API (for HTTP requests)
  
## API Endpoints

### Authentication
- **Login**: `POST /auth/login`
  - Request: `{ username: string, password: string }`
  - Response: `{ token: string }`

- **Signup**: `POST /auth/signup`
  - Request: `{ username: string, password: string, firstname: string, lastname: string }`
  - Response: `{ message: string }`

### Quizzes
- **Create Quiz**: `POST /quizzes/create`
  - Request: `{ username: string, quizName: string, markers: Marker[] }`
  - Response: `{ message: string }`

- **Get All Quizzes**: `GET /quizzes/all`
  - Request: `{ username: string }`
  - Response: `{ quizzes: Quiz[] }`

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.


