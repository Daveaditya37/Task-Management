# 📋 Task Management App

A full-stack **Task Management System** built with React (frontend) and Node.js (backend), enabling teams to manage projects, assign tasks, and track progress with role-based access control.

---

## 🚀 Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React + TypeScript | UI framework |
| Vite | Build tool |
| TanStack Query (React Query) | Server state management & caching |
| React Router | Client-side routing |
| Zod | Form validation |
| Tailwind CSS | Styling |
| Axios | HTTP client |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + TypeScript | Runtime & language |
| Express.js | Web framework |
| JWT | Authentication |
| Prisma / Mongoose | ORM / Database layer |

---

## 📁 Project Structure

```
Task-Management/
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── admin/         # Admin panel pages
│   │   │   └── member/        # Member panel pages (MyTasks, etc.)
│   │   ├── components/        # Reusable UI components
│   │   ├── interfaces/        # TypeScript interfaces & types
│   │   ├── service/           # API service functions
│   │   └── main.tsx           # App entry point with QueryClient
│   ├── package.json
│   └── vite.config.ts
│
└── backend/                   # Node.js + Express API
    ├── src/
    │   ├── routes/            # API route definitions
    │   ├── controllers/       # Request handlers
    │   ├── models/            # Data models
    │   ├── middleware/        # Auth & validation middleware
    │   └── index.ts           # Server entry point
    └── package.json
```

---

## ✨ Features

- 🔐 **Authentication** — JWT-based login/register with protected routes
- 👥 **Role-based Access** — Separate views for Admins and Members
- 📁 **Project Management** — Create and manage projects with descriptions
- ✅ **Task Management** — Create, assign, and track tasks within projects
- 👤 **My Tasks** — Members can view and manage their own assigned tasks
- 🔄 **Real-time UI Updates** — Optimistic updates with React Query cache invalidation

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- A running database (MongoDB / PostgreSQL depending on backend config)

---

### 1. Clone the repository

```bash
git clone https://github.com/Daveaditya37/Task-Management.git
cd Task-Management
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🔑 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create a new project |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/my` | Get tasks assigned to current user |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

> All protected routes require an `Authorization: Bearer <token>` header.

---

## 🧑‍💻 Usage

1. Register or log in as a user.
2. **Admins** can create projects, manage members, and assign tasks.
3. **Members** can view their assigned tasks under **My Tasks** and update their status.
4. Projects display task counts and creator information on each card.

---

## 🛠️ Available Scripts

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

### Backend
```bash
npm run dev       # Start with hot reload
npm run build     # Compile TypeScript
npm start         # Run compiled build
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).