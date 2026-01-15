Family Information Holder 🏡

A secure, full-stack family information management system that allows users to create families, manage members, assign roles, and maintain structured family relationships with proper authentication and authorization.
<img width="1897" height="977" alt="1" src="https://github.com/user-attachments/assets/510d4924-cd7a-4bf8-8a59-183f2a5c1ca7" />

🚀 Features

User authentication using JWT

Role-based access control (Admin / Member)

Create and manage multiple families

Invite members to families with assigned roles

Structured family member relationships

Secure API design with FastAPI

Modern frontend built with React

Scalable relational database schema using PostgreSQL

🛠️ Tech Stack
Backend

FastAPI

SQLAlchemy

PostgreSQL

JWT Authentication

Pydantic

Python

Frontend

React (Vite)

JavaScript

Tailwind CSS

Framer Motion

<img width="1897" height="977" alt="2" src="https://github.com/user-attachments/assets/8b75c155-9c5c-47c7-aea5-fec594b8a314" />



backend/
├── app/
│   ├── api/
│   │   ├── auth.py
│   │   ├── families.py
│   │   ├── family.py
│   │   └── users.py
│   ├── core/
│   │   ├── security.py
│   │   ├── dependencies.py
│   │   └── roles.py
│   ├── models/
│   │   ├── user.py
│   │   ├── family.py
│   │   ├── family_member.py
│   │   └── family_membership.py
│   ├── db/
│   │   ├── base.py
│   │   └── session.py
│   └── main.py
│
frontend/
├── src/
│   ├── Sections/
│   ├── Ui/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx






🔐 Authentication & Authorization

JWT-based authentication

Secure password hashing

Role-based permissions for family operations

Protected routes for sensitive operations

⚙️ Setup Instructions
Prerequisites

Python 3.10+

Node.js 18+

PostgreSQL



cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt



env 
DATABASE_URL=postgresql://username:password@localhost:5432/family_tree_db
SECRET_KEY=your_secret_key

server :
uvicorn app.main:app --reload

frontend :
cd frontend
npm install
npm run dev

👨‍💻 Author

Athul KK
Full-stack Developer
Focused on building secure, scalable web applications.

📄 License

This project is licensed under the MIT License.


