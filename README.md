# 💼 Secure Wallet API

A backend API for a digital wallet system, supporting user authentication, balance management, top-up functionality, and transaction history — built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.

---

## 🚀 Features

- ✅ User registration and login with **JWT authentication**
- ✅ Fetch wallet balance (protected)
- ✅ Top-up wallet amount
- ✅ View transaction history
- ✅ Input validation with **Zod**
- ✅ Error handling with custom middleware
- ✅ API documentation with **Swagger**
- ✅ Unit testing with **Jest**

---

## ⚙️ Tech Stack

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

## 📁 Folder Structure
src/
│
├── app/
│   ├── modules/
│   │   ├── auth/             # Auth controllers, services, routes
│   │   ├── wallet/           # Wallet logic and endpoints
│   │   └── transaction/      # Transaction history functionality
│   ├── config/               # Environment, database config (Prisma)
│   ├── middlewares/          # Global error handling, JWT auth, validation
│   ├── utils/                # Custom utility functions (e.g., sendResponse)
│   └── constants/            # Status codes, messages
├── tests/                    # Unit tests using Jest
└── index.ts                  # Main server entry point

---

## 🛠️ Setup Instructions

Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/yourusername/wallet-api.git
cd wallet-api

Install dependencies:
```bash
npm install

Create a .env file in the root of the project and add the following:
```bash
PORT=5001
DATABASE_URL=postgresql://your_db_user:your_password@localhost:5432/your_db_name
JWT_ACCESS_SECRET=your_jwt_secret

Run Prisma migrations and generate the client:
```bash
npx prisma migrate dev --name init
npx prisma generate

Start the development server:
```npm run dev