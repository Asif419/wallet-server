# Secure Wallet API

A backend API for a digital wallet system, supporting user authentication, balance management, top-up functionality, and transaction history — built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.

---

## Features

-  User registration and login with **JWT authentication**
-  Fetch wallet balance (protected)
-  Top-up wallet amount
-  View transaction history
-  Input validation with **Zod**
-  Error handling with custom middleware
-  API documentation with **Swagger**
-  Unit testing with **Jest**

---

## Tech Stack

| Tool           | Usage                         |
|----------------|-------------------------------|
| Node.js        | JavaScript runtime            |
| Express.js     | Web framework                 |
| PostgreSQL     | Database                      |
| Prisma         | ORM for database interaction  |
| JWT            | Authentication mechanism      |
| Zod            | Schema validation             |
| Swagger (OpenAPI) | Auto-generated API docs   |
| Jest           | Unit testing                  |
| TablePlus      | DB UI client (local dev)      |

---

## Folder Structure
src/ <br>
|----app/<br>
│----|----modules/<br>
│----│--------|...auth/...............# Auth controllers, services, routes<br>
│----│--------|...wallet/.............# Wallet logic and endpoints <br>
│----│--------|...transaction/........# Transaction history functionality <br>
│----|----config/.....................# Environment, database config (Prisma) <br>
│----|----middlewares/................# Global error handling, JWT auth, validation <br>
│----|----utils/......................# Custom utility functions (e.g., sendResponse) <br>
│----|----constants/..................# Status codes, messages <br>
|----tests/...........................# Unit tests using Jest <br>
|----index.ts.........................# Main server entry point <br>

---

## Setup Instructions

### 1. Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/Asif419/wallet-server
cd wallet-api
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Create a .env file in the root of the project and add the following:
```bash
PORT=5001
DATABASE_URL=postgresql://your_db_user:your_password@localhost:5432/your_db_name
JWT_ACCESS_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_EXPIRES_IN=1d
```

### 4. Run Prisma migrations and generate the client:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the development server:
```
npm run start:dev
```

### API runs at: http://localhost:5001

---

## API Authentication

Use JWT token in header:
```
Authorization: Bearer <your_token>
```

---

## 📄 API Documentation

Interactive API documentation is available via **Swagger UI**:

- URL: [http://localhost:5001/api-docs](http://localhost:5001/api-docs)

It provides:
- Descriptions for all endpoints
- Parameters and request body schemas
- Response formats
- JWT authentication support via "Authorize" button

---

## Unit Testing

Unit tests are written using **Jest**.

- Test coverage includes `auth`, `wallet`, and `transaction` services.
- Mocks are used for Prisma client and external dependencies.

To run tests:
```bash
npm run test:jest
```

---

## Test Output (example)
```
 PASS  __tests__/auth/auth.service.test.ts
 PASS  __tests__/wallet/wallet.service.test.ts
 PASS  __tests__/transaction/transaction.service.test.ts

Test Suites: 3 passed
Tests:       8 passed
Coverage:    90%+
```

---

## Sample API Requests (Postman)

### login
```
POST /api/v1/auth/login
{
  "email": "asif@mail.com",
  "password": "securepass"
}
```

### top-up
```
PATCH /api/v1/wallets/top-up
Authorization: Bearer <token>
{
  "amount": 100
}
```

### get-balance
```
GET /api/v1/wallets/{userId}
Authorization: Bearer <token>
```
### transactions
```
GET /api/v1/transactions/{userId}
Authorization: Bearer <token>
{
  "amount": 500.23
}
```
---

## Demo Video
- YouTube Walkthrough: [Video Explanation](https://youtu.be/qMNXElf_uBc)  

---

## 👨‍💻 Author

**Asif Shahariar**  
Backend Developer  
- 📧 Email: [asifshahariar419@gmail.com](mailto:asifshahariar419@mail.com)  
- 🌐 GitHub: [github.com/Asif419](https://github.com/Asif419/wallet-server)  
- 💼 LinkedIn: [linkedin.com/in/asifshahariar](https://www.linkedin.com/in/asifshahariar/)

---
