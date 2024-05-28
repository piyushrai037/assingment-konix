# Trade Balance Calculator

This project allows users to upload a CSV file containing trade data and calculate the balance of different cryptocurrencies based on the uploaded trades.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
2. Install dependencies
bash
Copy code
npm install
3. Set up environment variables
Create a .env file in the root of the project directory and add your MongoDB Atlas connection string:

plaintext
Copy code
MONGO_URI=your-mongodb-atlas-connection-string
PORT=3000
4. Run the application
bash
Copy code
npm start
The server will start and listen on port 3000.

Testing with Postman
Upload CSV
Open Postman.
Create a new POST request to http://localhost:3000/upload.
Under the "Body" tab, select "form-data".
Add a key named file and set the type to File.
Choose the CSV file to upload.
Send the request.
Response:

200 OK: If the CSV data is successfully uploaded.
400 Bad Request: If no file is uploaded.
500 Internal Server Error: If there is a server error during file upload or processing.
Calculate Balance
Open Postman.
Create a new POST request to http://localhost:3000/balance.
Under the "Body" tab, select "raw" and "JSON".
Add the following JSON:
json
Copy code
{
  "timestamp": "2023-01-01T00:00:00Z"
}
Send the request.
Response:

200 OK: The calculated balance of each cryptocurrency.
500 Internal Server Error: If there is a server error during balance calculation.