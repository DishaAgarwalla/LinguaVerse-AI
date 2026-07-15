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

<p align="center">

<h3 align="center">
🌐 AI-Powered Universal Translation & Accessibility Platform
</h3>

</p>

---

# 🚀 Overview

LinguaVerse AI is a full-stack AI-powered multilingual translation platform designed to eliminate language barriers through intelligent translation technologies.

The platform supports text translation, speech translation, OCR image translation, document translation, multilingual chat, authentication, translation history, and several upcoming AI accessibility features.

Unlike traditional translators, LinguaVerse AI is designed as a complete communication platform with AI assistance and accessibility tools.

---

# ✨ Features

## 🔐 Authentication

- JWT Authentication
- User Registration
- User Login
- Password Encryption (bcrypt)
- Protected Routes
- Role-based User Model

---

## 🌐 AI Translation

- ✅ Text Translation
- ✅ Automatic Language Detection
- ✅ Offline Translation using Argos Translate
- ✅ Multiple Language Support
- ✅ Translation History

---

## 🎤 Speech Translation

- Browser Speech Recognition
- Speech → Text
- AI Translation
- Multi-language Support

---

## 🖼 OCR Translation

- OCR using Tesseract.js
- Image Text Extraction
- Image Translation
- Translation History

---

## 📄 Document Translation

- PDF Translation
- DOCX Translation
- Automatic Text Extraction
- AI Translation
- Translation History

---

## 💬 Real-Time Chat

- Socket.IO Integration
- Multilingual Chat
- Live Translation
- Multiple Chat Rooms

---

## 👤 User Dashboard

- Dashboard
- Translation History
- Profile
- Settings

---

## 🎨 UI

- Responsive Design
- Modern UI
- Tailwind CSS
- React Components
- Protected Routing

---

# 🚧 Upcoming Features

- 🤟 Sign Language Translation
- 🎥 Live Subtitle Translation
- 🔊 Text-to-Speech
- 🎙 Whisper Speech Recognition
- 📚 Vocabulary Learning
- 🤖 AI Grammar Correction
- 😊 Tone Adjustment
- 📑 Meeting Summaries
- 🔍 Semantic Search
- 🌍 Live Camera Translation
- 📱 Mobile Responsive Improvements
- ☁ Cloud Deployment

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
- Tesseract OCR
- Mammoth
- pdf-parse

---

# 📁 Project Structure

```text
LinguaVerse-AI

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
│   │   ├── speech
│   │   ├── translate
│   │   └── ui
│   │
│   ├── constants
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
│   └── server.ts
│
└── README.md
```

---

# 🗄 Database

Current Database Models

- User
- Translation
- Speech
- ChatRoom
- ChatMessage

Built using

- PostgreSQL
- Prisma ORM

---

# 🌐 REST APIs

### Authentication

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Translation

```
POST /api/translate
```

### OCR

```
POST /api/ocr
```

### Document

```
POST /api/documents
```

### Speech

```
POST /api/speech/translate
```

### Chat

```
GET  /api/chat/rooms
POST /api/chat/create
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/DishaAgarwalla/LinguaVerse-AI.git

cd LinguaVerse-AI
```

---

## Frontend

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

## Backend

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

# 📊 Current Progress

## Completed

- Project Architecture
- JWT Authentication
- User Management
- PostgreSQL Integration
- Prisma ORM
- Protected Routes
- Landing Page
- Dashboard
- Text Translation
- Speech Translation
- OCR Translation
- Document Translation
- Translation History
- Socket.IO Chat
- Responsive UI

---

## In Progress

- Sign Language Translation
- Live Subtitle Translation
- Grammar Correction
- Tone Adjustment
- AI Explanation
- Vocabulary Learning
- Semantic Search

---

# 🔮 Future Roadmap

### Phase 1 ✅

- Authentication
- Dashboard
- Translation

### Phase 2 ✅

- Speech
- OCR
- Documents

### Phase 3 🚧

- AI Assistant
- Grammar
- Tone
- Summaries

### Phase 4 🚧

- Sign Language AI
- Live Subtitles
- Accessibility

### Phase 5 🚧

- Cloud Deployment
- Mobile App
- AI Learning

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

Licensed under the MIT License.

---

# 👩‍💻 Author

**Disha Agarwalla**

GitHub

https://github.com/DishaAgarwalla

LinkedIn

https://www.linkedin.com/in/disha-agarwalla-10884b31b/

---

<p align="center">

⭐ If you like this project, consider giving it a star!

Made with ❤️ using React, Node.js, TypeScript & Python.

</p>
