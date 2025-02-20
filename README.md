# Reaction Time Test

This project is a web application designed to collect user emails and record their reaction times through a series of interactive tests. It was developed as a commission for a client and deployed via Heroku. This project marks my first collaboration with ADMR14, and I am very proud of the outcome.

## Features

- **User Authentication**: Collects user emails to authenticate and track user sessions.
- **Reaction Time Test**: Presents users with a series of tests to measure their reaction times.
- **Data Storage**: Stores user data and test results in a Google Sheets spreadsheet.
- **Responsive Design**: Ensures a seamless experience across different devices.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Express.js, Node.js
- **Deployment**: Heroku
- **Data Storage**: Google Sheets API

## Project Structure

- **index.html**: The main game page where the reaction time test is conducted.
- **instructions.html**: Provides instructions on how to perform the reaction time test.
- **login.html**: The login page where users submit their emails.
- **trial.html**: A trial page for users to practice before the actual test.
- **server.js**: The backend server handling routing, session management, and data storage.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/reaction-time.git
   cd reaction-time
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your Google Sheets API credentials:
   ```env
   GOOGLE_CREDENTIALS=path/to/your/google-credentials.json
   ```

4. **Run the server**:
   ```bash
   npm start
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:5000`.

## Usage

1. **Login**: Users start by submitting their email on the login page.
2. **Instructions**: After logging in, users are directed to the instructions page to understand the test.
3. **Trial**: Users can practice the test on the trial page.
4. **Test**: The main reaction time test is conducted on the game page.
5. **Results**: Test results are displayed, and data is stored in Google Sheets.

## Acknowledgments

- **ADMR14**: For the collaboration and support throughout the project.
