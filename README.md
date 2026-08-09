# Portfolio Backend

A secure RESTful API backend for a professional developer portfolio website.

It provides APIs for managing projects, project images, skills, experience, education, contact messages, and administrator access.

## 🚀 Features

- Supabase Authentication with JWT
- Role-based admin authorization
- PostgreSQL database with Row Level Security (RLS)
- Supabase Storage for project images
- Multiple images per project
- Automatic cover image management
- Public portfolio data endpoints
- Protected admin operations
- RESTful Express.js architecture

## 🛠️ Tech Stack

- Node.js
- Express.js
- JavaScript
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- JWT
- Multer

## 📁 Structure

portfolio-backend/
├── config/
├── controllers/
├── middleware/
├── routes/
├── services/
├── validations/
├── utils/
├── .env.example
├── app.js
├── server.js
└── package.json

## ⚙️ Setup

Clone the repository:
git clone https://github.com/YOUR_USERNAME/portfolio-backend.git
cd portfolio-backend
npm install
Create a .env file:
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
Run the development server:
npm run dev
The API runs by default at:
http://localhost:5000

## 🌐 API

Projects
GET    /api/projects
GET    /api/projects/:slug
POST   /api/projects
PATCH  /api/projects/:id
DELETE /api/projects/:id
Project Images
POST   /api/projects/:projectId/images
DELETE /api/projects/images/:imageId
Administrative endpoints require a valid Supabase access token and admin authorization.

## 🔐 Security

Supabase Auth handles authentication.
JWTs are verified by Express.
PostgreSQL RLS protects database access.
Admin operations require an active admin profile.
Project images are protected through Supabase Storage policies.
Environment variables are used for configuration and secrets.

## 🧪 Testing

The API can be tested with:
cURL
Postman
Insomnia
Example:
curl http://localhost:5000/api/projects

## 👨‍💻 Author

Isah Muhammad Alhaji
Computer Science graduate and software developer focused on building practical web applications.
📄 License
This project is for personal portfolio and demonstration purposes.