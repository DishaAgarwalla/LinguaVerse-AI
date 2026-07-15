# 🌍 LinguaVerse AI

<p align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=FFD43B"/>
<img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"/>

</p>

<h2 align="center">
🌐 AI-Powered Universal Translation, Accessibility & Communication Platform
</h2>

<p align="center">

An intelligent multilingual platform supporting text, speech, documents, OCR, AI writing assistance, and real-time communication.

</p>

---

# 🚀 Overview

LinguaVerse AI is a full-stack AI-powered multilingual translation and accessibility platform designed to eliminate language barriers through intelligent communication technologies.

The platform enables users to translate **text, speech, documents, and images**, while also providing **AI-powered grammar correction, tone adjustment, translation history, and multilingual real-time chat**.

Unlike traditional translators, LinguaVerse AI combines modern web technologies with artificial intelligence to create a complete communication ecosystem for students, professionals, educators, travelers, and businesses.

---

# ✨ Features

## 🔐 Authentication

- ✅ JWT Authentication
- ✅ User Registration
- ✅ Secure Login
- ✅ Password Encryption (bcrypt)
- ✅ Protected Routes
- ✅ User Profile

---

## 🌐 AI Translation

- ✅ Text Translation
- ✅ Automatic Language Detection
- ✅ Offline Translation (Argos Translate)
- ✅ Multiple Language Support
- ✅ Translation History

---

## 🎤 Speech AI

- ✅ Speech-to-Text
- ✅ Text-to-Speech
- ✅ Speech Translation
- ✅ Browser Speech Recognition
- ✅ Multi-language Speech Support

---

## 📄 Document Translation

- ✅ PDF Translation
- ✅ DOCX Translation
- ✅ Automatic Text Extraction
- ✅ AI Translation

---

## 🖼 OCR Translation

- ✅ OCR using Tesseract.js
- ✅ Image Text Extraction
- ✅ OCR Image Translation

---

## 🤖 AI Writing Assistant

- ✅ Grammar Correction
- ✅ Tone Adjustment
- ✅ Formal Tone
- ✅ Casual Tone
- ✅ Professional Tone

---

## 💬 Real-Time Chat

- ✅ Socket.IO Chat
- ✅ Live Translation
- ✅ Multi-language Messaging
- ✅ Chat Rooms

---

## 📊 Dashboard

- ✅ Responsive Dashboard
- ✅ Translation History
- ✅ User Profile
- ✅ Settings

---

# 🚧 Upcoming Features

- 🤟 Sign Language Translation
- 🎥 Live Subtitle Translation
- 📚 Vocabulary Learning Mode
- 🤖 AI Explanation of Difficult Words
- 📝 Meeting Summaries
- 🔍 Semantic Search
- 🌍 Camera Translation
- 📱 Mobile Application
- ☁ Cloud Deployment
- 🧠 Personalized AI Learning

---

# 🛠 Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router v7
- Axios
- React Hook Form
- Zod

---

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Socket.IO
- Multer

---

## AI & Translation

- Python
- Argos Translate
- Google Gemini API
- Tesseract OCR
- Mammoth
- pdf-parse
- Browser Speech Recognition API
- Browser Speech Synthesis API

  ---

# 📁 Project Structure

```text
LinguaVerse-AI
│
├── client
│   ├── public
│   ├── src
│   │
│   ├── assets
│   ├── components
│   │   ├── auth
│   │   ├── chat
│   │   ├── dashboard
│   │   ├── document
│   │   ├── history
│   │   ├── home
│   │   ├── ocr
│   │   ├── profile
│   │   ├── settings
│   │   ├── speech
│   │   ├── translate
│   │   └── ui
│   │
│   ├── constants
│   ├── contexts
│   ├── hooks
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── services
│   ├── types
│   └── utils
│
├── server
│   ├── prisma
│   ├── python
│   ├── uploads
│   ├── src
│   │
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── socket
│   ├── validation
│   ├── types
│   └── server.ts
│
└── README.md
```

---

# 🗄 Database

LinguaVerse AI uses **PostgreSQL** with **Prisma ORM**.

## Current Models

- User
- Translation
- ChatRoom
- ChatMessage

Future database models include:

- Vocabulary
- Meeting Summary
- OCR History
- Document History
- Sign Language History

---

# 🌐 REST APIs

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

---

## Translation

```http
POST /api/translate
```

---

## Speech

```http
POST /api/speech/translate
POST /api/speech/text-to-speech
```

---

## OCR

```http
POST /api/ocr
```

---

## Document Translation

```http
POST /api/documents
```

---

## AI Writing Assistant

### Grammar Correction

```http
POST /api/grammar
```

### Tone Adjustment

```http
POST /api/tone
```

---

## Translation History

```http
GET    /api/history
DELETE /api/history/:id
DELETE /api/history
```

---

## Real-Time Chat

```http
GET  /api/chat/rooms
POST /api/chat/create
```

Socket.IO is used for real-time multilingual messaging.

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/DishaAgarwalla/LinguaVerse-AI.git

cd LinguaVerse-AI
```

---

# 💻 Frontend Setup

```bash
cd client

npm install

npm run dev
```

Runs at

```
http://localhost:5173
```

---

# ⚙ Backend Setup

```bash
cd server

npm install

npm run dev
```

Runs at

```
http://localhost:5000
```

---

# 🗃 Database Setup

Create a `.env` file inside the **server** directory.

```env
DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key

PORT=5000
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migrations

```bash
npx prisma migrate dev
```

(Optional)

Open Prisma Studio

```bash
npx prisma studio
```

---

# 🐍 Python Dependencies

Navigate to the Python folder

```bash
cd server/python
```

Install dependencies

```bash
pip install argostranslate
pip install tesseract
```

Install the required Argos language packages before using translation.

---

# ▶ Running the Complete Project

Open two terminals.

### Terminal 1

```bash
cd client

npm run dev
```

### Terminal 2

```bash
cd server

npm run dev
```

The application will be available at:

Frontend

```
http://localhost:5173
```
---

# 📊 Current Progress

## ✅ Completed

### Project Foundation

- React 19 + TypeScript Setup
- Express.js Backend
- PostgreSQL Database
- Prisma ORM
- JWT Authentication
- Protected Routes
- Responsive Dashboard
- Modern Landing Page
- User Profile & Settings

---

### AI Translation

- ✅ Text Translation
- ✅ Automatic Language Detection
- ✅ Offline Translation using Argos Translate
- ✅ Translation History

---

### Speech AI

- ✅ Speech-to-Text
- ✅ Text-to-Speech
- ✅ Speech Translation
- ✅ Browser Speech Recognition API
- ✅ Browser Speech Synthesis API

---

### OCR

- ✅ OCR Image Upload
- ✅ Image Text Extraction
- ✅ OCR Translation
- ✅ Translation History

---

### Document Translation

- ✅ PDF Translation
- ✅ DOCX Translation
- ✅ Automatic Text Extraction
- ✅ AI Translation

---

### AI Writing Assistant

- ✅ Grammar Correction
- ✅ Tone Adjustment
- ✅ Formal Tone
- ✅ Casual Tone
- ✅ Professional Tone

---

### Real-Time Communication

- ✅ Socket.IO Integration
- ✅ Real-Time Chat
- ✅ Live Translation
- ✅ Multi-language Messaging

---

### User Experience

- ✅ Fully Responsive Design
- ✅ Reusable UI Components
- ✅ Protected Routing
- ✅ Modern Dashboard
- ✅ Translation History

---

# 📈 Project Status

| Module | Status |
|---------|:------:|
| Authentication | ✅ Complete |
| Dashboard | ✅ Complete |
| Text Translation | ✅ Complete |
| OCR Translation | ✅ Complete |
| Speech Translation | ✅ Complete |
| Text-to-Speech | ✅ Complete |
| Document Translation | ✅ Complete |
| Grammar Correction | ✅ Complete |
| Tone Adjustment | ✅ Complete |
| Translation History | ✅ Complete |
| Real-Time Chat | ✅ Complete |
| Sign Language | 🚧 In Progress |
| Live Subtitle Translation | 🚧 In Progress |
| Semantic Search | 🚧 Planned |
| Meeting Summaries | 🚧 Planned |
| Vocabulary Learning | 🚧 Planned |

---

# 🔮 Development Roadmap

## ✅ Phase 1

- Project Setup
- Authentication
- Database Design
- Dashboard
- User Management

---

## ✅ Phase 2

- Text Translation
- OCR Translation
- Speech Translation
- Text-to-Speech
- Document Translation
- Translation History

---

## ✅ Phase 3

- Grammar Correction
- Tone Adjustment
- Socket.IO Chat
- Responsive Dashboard

---

## 🚧 Phase 4

- Sign Language Translation
- AI Avatar
- Live Subtitle Translation
- AI Explanation of Difficult Words

---

## 🚧 Phase 5

- Vocabulary Learning
- Semantic Search
- Meeting Summaries
- Camera Translation
- Mobile Application

---

## 🚧 Phase 6

- Cloud Deployment
- Docker Support
- CI/CD Pipeline
- Production Release

---

# 🧪 Testing

The project is tested using:

- Manual API Testing
- Postman
- Browser Testing
- Prisma Studio
- Console Logging
- Error Handling & Validation

Future Improvements

- Jest
- Playwright
- Unit Testing
- Integration Testing
- End-to-End Testing

---

# 🚀 Deployment (Upcoming)

### Frontend

- Vercel

### Backend

- Railway
- Render

### Database

- Neon PostgreSQL
- Supabase PostgreSQL

### Media Storage

- Cloudinary

### Containerization

- Docker

---

# 🤝 Contributing

Contributions are always welcome!

If you'd like to contribute:

1. Fork the repository

2. Clone your fork

```bash
git clone https://github.com/your-username/LinguaVerse-AI.git
```

3. Create a new feature branch

```bash
git checkout -b feature/your-feature-name
```

4. Commit your changes

```bash
git commit -m "Add your feature"
```

5. Push your branch

```bash
git push origin feature/your-feature-name
```

6. Open a Pull Request

Please make sure your code follows the existing project structure and coding style.

---

# 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this software under the terms of the MIT License.

---

# 👩‍💻 Author

## Disha Agarwalla

**Full-Stack Developer • AI Enthusiast • Open Source Learner**

### 🌐 GitHub

https://github.com/DishaAgarwalla

### 💼 LinkedIn

https://www.linkedin.com/in/disha-agarwalla-10884b31b/

---

# 💙 Support the Project

If you found this project helpful,

⭐ Star this repository

🍴 Fork it

🛠️ Contribute

📢 Share it with others

Every contribution and star helps the project grow!

---

<p align="center">

## 🌍 LinguaVerse AI

### Breaking Language Barriers with Artificial Intelligence

**Made with ❤️ using React, TypeScript, Node.js, Express, PostgreSQL, Prisma & Python**

</p>

Backend

```
http://localhost:5000
```
