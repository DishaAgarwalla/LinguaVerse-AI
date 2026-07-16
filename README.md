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
🌐 AI-Powered Universal Translation & Accessibility Platform
</h2>

<p align="center">
Translate text, speech, documents, images, and communicate across languages with AI-powered assistance.
</p>

---

# 🚀 Overview

**LinguaVerse AI** is a full-stack multilingual translation platform built using **React, Node.js, TypeScript, PostgreSQL, Prisma, and Python**.

The platform combines AI-powered translation, writing assistance, speech technologies, OCR, document translation, and real-time multilingual communication into one modern application.

---

# ✨ Features

### 🔐 Authentication
- JWT Authentication
- Secure Login & Registration
- Protected Routes
- Password Encryption
- User Profile

### 🌍 Translation
- AI Text Translation
- Automatic Language Detection
- Offline Translation (Argos Translate)
- 100+ Language Support
- Translation History

### 🎤 Speech
- Speech-to-Text
- Text-to-Speech
- Speech Translation
- Browser Speech Recognition

### 📄 Document Translation
- PDF Translation
- DOCX Translation
- Automatic Text Extraction

### 🖼 OCR
- Image Text Extraction
- OCR Translation using Tesseract.js

### 🤖 AI Writing Assistant
- Grammar Correction
- Tone Adjustment
- AI Explain (Word Meaning, Pronunciation, Grammar, Examples & Tips)

### 💬 Communication
- Real-Time Chat
- Live Translation
- Chat Rooms using Socket.IO

### 📊 Dashboard
- Responsive Dashboard
- Translation History
- Delete Individual Translation
- Clear All History
- User Settings

---

# 🚧 Upcoming Features

- 🤟 Sign Language Translation
- 🎥 Live Subtitle Translation
- 📚 Vocabulary Learning
- 📝 Meeting Summaries
- 🔍 Semantic Search
- 🌍 Camera Translation
- ☁ Cloud Deployment
- 📱 Mobile Application

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

## Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Socket.IO
- Multer

## AI & Python

- Python
- Argos Translate
- Groq AI
- Tesseract OCR
- Mammoth
- pdf-parse
- Browser Speech Recognition API
- Browser Speech Synthesis API

---

# 📁 Project Structure

```text
LinguaVerse-AI

├── client
│   ├── assets
│   ├── components
│   │   ├── auth
│   │   ├── chat
│   │   ├── dashboard
│   │   ├── document
│   │   ├── explain
│   │   ├── history
│   │   ├── ocr
│   │   ├── speech
│   │   ├── translate
│   │   └── ui
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── services
│   └── utils
│
├── server
│   ├── prisma
│   ├── python
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   └── server.ts
│
└── README.md
```

---

# 🗄 Database Models

- User
- Translation
- Speech
- ChatRoom
- ChatMessage

---

# 🌐 REST APIs

| Module | Endpoint |
|---------|----------|
| Authentication | `/api/auth/*` |
| Translation | `/api/translate` |
| Speech | `/api/speech/*` |
| OCR | `/api/ocr` |
| Documents | `/api/documents` |
| Grammar | `/api/grammar` |
| Tone | `/api/tone` |
| AI Explain | `/api/explain` |
| History | `/api/history` |
| Chat | `/api/chat/*` |

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/DishaAgarwalla/LinguaVerse-AI.git

cd LinguaVerse-AI
```

## Frontend

```bash
cd client

npm install

npm run dev
```

Runs on:

```
http://localhost:5173
```

## Backend

```bash
cd server

npm install

npm run dev
```

Runs on:

```
http://localhost:5000
```

---

# 🔑 Environment Variables

Create a `.env` file inside **server/**

```env
DATABASE_URL=your_database_url

JWT_SECRET=your_secret_key

GROQ_API_KEY=your_groq_api_key

PORT=5000
```

---

# 📊 Project Status

| Module | Status |
|---------|:------:|
| Authentication | ✅ |
| Dashboard | ✅ |
| Text Translation | ✅ |
| OCR Translation | ✅ |
| Speech Translation | ✅ |
| Text-to-Speech | ✅ |
| Document Translation | ✅ |
| Grammar Correction | ✅ |
| Tone Adjustment | ✅ |
| AI Explain | ✅ |
| Translation History | ✅ |
| Real-Time Chat | ✅ |
| Sign Language Translation | 🚧 |
| Live Subtitle Translation | 🚧 |
| Vocabulary Learning | 🚧 |

---

# 🧪 Testing

Backend APIs have been tested using:

- ✅ Postman
- ✅ Browser Testing
- ✅ Prisma Studio
- ✅ Error Handling & Validation

---

# 📸 Screenshots

> Screenshots of the application will be added as development progresses.

- Landing Page
- Dashboard
- Text Translation
- OCR Translation
- Speech Translation
- Document Translation
- AI Explain
- History
- Chat

---

# 🗺 Roadmap

### ✅ Completed

- Authentication
- Dashboard
- AI Text Translation
- OCR Translation
- Speech Translation
- Text-to-Speech
- Document Translation
- Grammar Correction
- Tone Adjustment
- AI Explain
- Translation History
- Real-Time Chat

### 🚧 In Progress

- Sign Language Translation
- Live Subtitle Translation

### 📌 Planned

- Vocabulary Learning
- Semantic Search
- Meeting Summaries
- Mobile App
- Cloud Deployment

---

# 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature-name

# Commit changes
git commit -m "Add new feature"

# Push branch
git push origin feature-name
```

Finally, open a Pull Request.

---

# 📄 License

Licensed under the **MIT License**.

---

# 👩‍💻 Author

**Disha Agarwalla**

- GitHub: https://github.com/DishaAgarwalla
- LinkedIn: https://www.linkedin.com/in/disha-agarwalla-10884b31b/

---

<p align="center">

⭐ If you like this project, give it a star!

Built with ❤️ using React, TypeScript, Node.js, Express, PostgreSQL, Prisma & Python.

</p>
