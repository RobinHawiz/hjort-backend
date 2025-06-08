# Hjort Restaurant Backend API

This is the RESTful backend powering both the public frontend and internal CMS for Hjort Restaurant.

## ✨ Features

- 🔐 Admin login with JWT-based auth
- 🍷 Manage drink and course menus
- 📆 Manage table reservations
- 🧪 Input validation with Zod
- 💾 SQLite for persistent storage
- 🧱 Modular architecture (controllers, services, repos)

## 🛠 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **Zod** (validation)
- **JWT** (authentication)
- **SQLite** (database)

## 🧱 Project Structure

```plaintext
src/
├── app.ts                 # Express app configuration
├── server.ts              # Server entrypoint
├── config/                # Env, CORS, DB setup
├── errors/                # Domain and validation errors
├── middlewares/          # Auth & validation middleware
├── features/             # Modular features
│   ├── adminUser/        # Admin login & authentication
│   ├── reservation/      # Reservation management
│   ├── courseMenu/       # Menu CRUD
│   └── drinkMenu/        # Drink menu CRUD
├── models/               # Domain entity types
```

## 🧪 Running Locally
🧰 Prerequisites

- [Node.js](https://nodejs.org/)
- Git

🔧 Step 1: Clone the repository
```
git clone https://github.com/RobinHawiz/hjort-backend.git
cd hjort-backend
```

📦 Step 2: Install dependencies
```
npm install
```

🔐 Step 3: Generate a JWT secret
```
node generateSecretKey.js
```
Create a .env file with the following configuration and copy the output into it:
```
PORT=4000
CORS_ORIGIN=*
DATABASE=db/hjort.db
JWT_SECRET_KEY=your_generated_key_here
```

🗃️ Step 4: Set up the database

The SQLite database is already preconfigured and included in the repository.
You only need to register an admin user:
```
node registerAdminUser.js
```

This will create a default admin account with:

- Username: example
- Password: example

> 🛠️ Note: If you want to change these credentials, you'll need to manually edit the registerAdminUser.js file before running the command.

🚀 Step 5: Run the server
```
npm run build
npm start
```

API will now be running on http://localhost:4000.

> 🔐 Note: Designed to work with [hjort-cms](https://github.com/RobinHawiz/hjort-cms) and [hjort-frontend](https://github.com/RobinHawiz/hjort-frontend).

## 📊 Data Structures

SQLite handles persistence, while validation and data constraints are enforced at the application layer using Zod schemas.

### 📋 Reservation

| Field             | SQLite Type           | Description            | Zod Validation           |
|-------------------|------------------------|------------------------|--------------------------|
| `id`              | INTEGER AUTOINCREMENT | Primary key            | None                     |
| `firstName`       | TEXT                  | Guest’s first name     | string, min 1, max 50    |
| `lastName`        | TEXT                  | Guest’s last name      | string, min 1, max 50    |
| `email`           | TEXT                  | Email address          | string, max 128          |
| `phoneNumber`     | TEXT                  | Contact number         | string, max 20           |
| `guestAmount`     | INTEGER               | Number of guests       | integer, min 1, max 6    |
| `reservationDate` | TEXT                  | Reservation date       | string (ISO 8601 format) |
| `message`         | TEXT                  | Reservation message    | string, max 1000         |

### 🔐 Admin User

| Field          | SQLite Type           | Description          | Zod Validation |
|----------------|------------------------|----------------------|----------------|
| `id`           | INTEGER AUTOINCREMENT | Primary key          | None           |
| `username`     | TEXT                  | Admin login username | None           |
| `passwordHash` | TEXT                  | Hashed password      | None           |

### 🍽️ Course Menu

| Field      | SQLite Type           | Description      | Zod Validation        |
|------------|-----------------------|------------------|-----------------------|
| `id`       | INTEGER AUTOINCREMENT | Primary key      | None                  |
| `title`    | TEXT                  | Menu title       | string, min 1, max 50 |
| `priceTot` | INTEGER               | Menu total price | integer, min 0        |

### 🍲 Course

| Field          | SQLite Type           | Description         | Zod Validation                               |
|----------------|-----------------------|---------------------|----------------------------------------------|
| `id`           | INTEGER AUTOINCREMENT | Primary key         | None                                         |
| `courseMenuId` | INTEGER               | Foreign key to menu | integer, min 1                               |
| `name`         | TEXT                  | Course name         | string, min 1, max 200                       |
| `type`         | TEXT                  | Course type         | string, one of: "starter", "main", "dessert" |

### 🍾 Drink Menu

| Field      | SQLite Type           | Description       | Zod Validation        |
|------------|-----------------------|-------------------|-----------------------|
| `id`       | INTEGER AUTOINCREMENT | Primary key       | None                  |
| `title`    | TEXT                  | Menu title        | string, min 1, max 50 |
| `subtitle` | TEXT                  | Optional subtitle | string, max 100       |
| `priceTot` | INTEGER               | Total menu price  | integer, min 0        |

### 🍷 Drink

| Field         | SQLite Type           | Description         | Zod Validation         |
|---------------|-----------------------|---------------------|------------------------|
| `id`          | INTEGER AUTOINCREMENT | Primary key         | None                   |
| `drinkMenuId` | INTEGER               | Foreign key to menu | integer, min 1         |
| `name`        | TEXT                  | Drink name          | string, min 1, max 200 |

## 📡 API Endpoints

### 📋 Reservations

| Method | Route                              | Description                        | Auth | Body / Params | Response          |
|--------|------------------------------------|------------------------------------|------|-----------------|-------------------|
| POST   | `/api/public/reservations`         | Submit a new reservation           | ❌   | JSON-body       | `201 Created`     |
| GET    | `/api/protected/reservations`      | Get all reservations               | ✅   | None            | `200 OK` + array of reservations  |
| DELETE | `/api/protected/reservations/:id`  | Delete reservation by ID           | ✅   | `:id` (reservation ID) | `204 No Content`  |

### Request Body: `POST /api/public/reservations`

```json
{
  "firstName": "Anna",
  "lastName": "Lind",
  "email": "anna@example.com",
  "phoneNumber": "0701234567",
  "guestAmount": 2,
  "reservationDate": "2025-08-12T16:30:00.000Z",
  "message": "Jag äter gärna allt, men undviker helst stark citrus."
}
```

### 🔐 Admin Login

| Method | Route             | Description                                    | Auth | Body / Params | Response                            |
|--------|-------------------|------------------------------------------------|------|---------------|-------------------------------------|
| POST   | `/api/admin/login`| Authenticates an admin user and returns a JWT  | ❌   | `{ "username": "admin", "passwordHash": "securepassword"}` | `200 OK` {"token": "your.jwt.token"}

### 🍽️ Course Menu & Course

| Method | Route                              | Description                                | Auth | Body / Params                 | Response            |
|--------|------------------------------------|--------------------------------------------|------|-------------------------------|---------------------|
| GET    | `/api/public/course-menu`          | Get all course menus                        | ❌   | None                          | `200 OK` + array of menus |
| GET    | `/api/public/course/:id`           | Get courses for a specific menu             | ❌   | `:id` (course menu ID)               | `200 OK` + array of courses |
| PUT    | `/api/protected/course-menu/:id`   | Update a course menu                        | ✅   | `{ "title": string, "priceTot": number }` | `204 No Content` |
| POST   | `/api/protected/course`            | Insert a new course                         | ✅   | `{ "courseMenuId": string, "name": string, "type": "starter" \| "main" \| "dessert" }` | `201 Created` |
| PUT    | `/api/protected/course/:id`        | Update a specific course                    | ✅   | Same as above but without the `courseMenuId`                 | `204 No Content` |
| DELETE | `/api/protected/course/:id`        | Delete a specific course                    | ✅   | `:id` (course ID)             | `204 No Content` |

### 🍾 Drink Menu & Drink

| Method | Route                                | Description                              | Auth | Body / Params                                                    | Response            |
|--------|--------------------------------------|------------------------------------------|------|------------------------------------------------------------------|---------------------|
| GET    | `/api/public/drink-menu`             | Get all drink menus                       | ❌   | None                                                             | `200 OK` + array of drink menus |
| GET    | `/api/public/drink/:id`              | Get drinks for a specific drink menu      | ❌   | `:id` (drink menu ID)                                            | `200 OK` + array of drinks |
| PUT    | `/api/protected/drink-menu/:id`      | Update a drink menu                       | ✅   | `{ "title": string, "subtitle": string, "priceTot": number }`    | `204 No Content`    |
| POST   | `/api/protected/drink`               | Insert a new drink                        | ✅   | `{ "drinkMenuId": string, "name": string }`                      | `201 Created`       |
| PUT    | `/api/protected/drink/:id`           | Update a specific drink                   | ✅   | `{ "name": string }`                                             | `204 No Content`    |
| DELETE | `/api/protected/drink/:id`           | Delete a specific drink                   | ✅   | `:id` (drink ID)                                                 | `204 No Content`    |
