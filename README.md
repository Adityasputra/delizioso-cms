# Delizioso

## Project Description

Delizioso is a culinary data management platform consisting of three main parts:

1. **Client Side** – A food data management system used by staff.
2. **Public Side** – A public interface accessible to everyone without login requirements.
3. **Server Side** – An API managing data and communication between the client and public sides.

## Project Structure

```
Delizioso/
│── client/    # Management application for staff
│── public/    # Public website for general users
│── server/    # Backend API
│── README.md  # Project documentation
```

## Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/Adityasputra/delizioso.git
   cd delizioso
   ```

2. Install dependencies for each part:
   ```sh
   cd client && npm install
   cd ../public && npm install
   cd ../server && npm install
   ```

## Running the Project

### Running the Server

```sh
cd server
npm run dev
```

The API will run at `http://localhost:5000`

### Running the Client Side

```sh
cd client
npm run dev
```

The management application will run at `http://localhost:3000`

### Running the Public Side

```sh
cd public
npm run dev
```

The public website will run at `http://localhost:4000`

## API Endpoints

- **GET /cuisines** – Retrieve the list of cuisines
- **POST /cuisines** – Add a new cuisine
- **PUT /cuisines/:id** – Update cuisine data
- **DELETE /cuisines/:id** – Delete a cuisine

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (for staff access)
