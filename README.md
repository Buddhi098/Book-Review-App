# Book Review Application

The Book Review Application is a web-based platform that allows users to create accounts, add, delete, and update book reviews. It enables users to see the ratings and reviews provided by other users. The platform calculates and displays the average rating of a book when multiple users review it.

## Features

- **User Account Management**: Create an account to interact with the platform.
- **Book Review Management**: Add, delete, and update reviews for books.
- **Rating System**: Calculates the average rating for a book when multiple users provide ratings.
- **Unified Book Identification**: Books are uniquely identified by their name and author. If two users review the same book, their ratings contribute to a single average rating.

## Technology Stack

- **Frontend**: ReactJS with Material-UI (MUI) for a responsive and user-friendly interface.
- **Backend**: Spring Boot for robust and scalable server-side logic.
- **Database**: Integration with a database to store user data, reviews, and book ratings.

---

## Installation Guide

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or later)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html) (v11 or later)
- [Maven](https://maven.apache.org/download.cgi) (for managing Spring Boot dependencies)
- A database system like MySQL, PostgreSQL, or H2

---

### Backend Setup (Spring Boot)

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd book-review-application/backend

2. **Configure Database: Update the application.properties file located in src/main/resources/ with your database connection details**:
    ```bash
    spring.datasource.url=jdbc:mysql://localhost:3306/book_reviews
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    spring.jpa.hibernate.ddl-auto=update

3. **Build the Project: Run the following command to download dependencies and package the application**:
    ```bash
    mvn clean install
4. **Run the Backend Server: Start the Spring Boot application using:**
    ```bash
    mvn spring-boot:run
The backend server will start at http://localhost:8080.

### Frontend Setup (ReactJS)

1. **Navigate to the Frontend Directory:**
    ```bash
    cd ../frontend
2. **Install Dependencies: Install the required npm packages using:**
    ```bash
    npm install
3. **Configure API URL: Open the src/config.js file and update the API_BASE_URL with your backend server URL (e.g., http://localhost:8080).**

4. **Run the Development Server: Start the frontend development server using:**
    ```bash
    npm start
The application will be accessible at http://localhost:3000.

### Usage
1. Open your browser and navigate to http://localhost:3000.
2. Create an account or log in.
3. Add, update, or delete book reviews.
4. View the average ratings and reviews for books.

 to reach out for support or feedback. Happy reviewing! 📚



