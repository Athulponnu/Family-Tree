# Family Information Holder 🏡

![License](https://img.shields.io/badge/license-MIT-green)
![Backend](https://img.shields.io/badge/backend-FastAPI-blue)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)
![Frontend](https://img.shields.io/badge/frontend-React-informational)

A secure, full-stack family information management system that enables users to create families, manage members, assign roles, and maintain structured family relationships with proper authentication and authorization.

---

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Authentication & Authorization](#-authentication--authorization)
- [Setup Instructions](#-setup-instructions)
- [API Documentation](#-api-documentation)
- [Use Cases](#-use-cases)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)
- [License](#-license)

---

## 🚀 Features
- JWT-based user authentication
- Role-based access control (Admin / Member)
- Create and manage multiple families
- Invite members via secure endpoints
- Structured family-member relationships
- Secure REST APIs using FastAPI
- Modern React frontend
- PostgreSQL relational database

---
<img width="1897" height="977" alt="1" src="https://github.com/user-attachments/assets/ce2a2510-1426-4dfd-8aca-4a29e6584898" />


## 🛠️ Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pydantic
- Python

### Frontend
- React (Vite)
- JavaScript
- Tailwind CSS
- Framer Motion

---


---

## 🔐 Authentication & Authorization
- Secure JWT authentication
- Password hashing
- Role-based access enforcement
- Protected API routes

---

## ⚙️ Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL

---

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt


Create .env file:
DATABASE_URL=postgresql://username:password@localhost:5432/family_tree_db
SECRET_KEY=your_secret_key


Run server:
uvicorn app.main:app --reload


Frontend Setup:
cd frontend
npm install
npm run dev

👨‍💻 Author

Athul KK
Full-stack Developer
Focused on building secure, scalable web applications.

