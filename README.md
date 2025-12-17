# Chat App

A real-time chat application built using the **MERN stack (MongoDB, Express, React, Node.js)** with **WebSockets** for instant communication.  
This app enables users to seamlessly connect through private chats, delivering low-latency message delivery.

[Live Demo](https://chat.upaharkhatiwada.com.np/)

## Screenshots

### Login Screen
<img width="1902" height="910" alt="image" src="https://github.com/user-attachments/assets/bc695b32-b294-4368-9f6b-fc4e9c994277" />

### Home / Chat List
<img width="1901" height="901" alt="image" src="https://github.com/user-attachments/assets/470388b3-dcc8-4e18-9edd-385c485e4394" />

### Chat View(Shows real-time online users)
<img width="1919" height="913" alt="image" src="https://github.com/user-attachments/assets/728992a0-7e20-4d5e-9792-bf8d5d35b3ab" />

### Shows real-time unread messages
<img width="1905" height="901" alt="image" src="https://github.com/user-attachments/assets/32904622-fb77-47c8-b892-0c98fcc5a5f1" />

### Profile Page
<img width="1916" height="913" alt="image" src="https://github.com/user-attachments/assets/f2136e4d-a7c6-4a19-ab06-be0643101aea" />

---

## Features

Real-time messaging  
- User authentication using google auth
- Private chats using websockets
- Shows unread messages and marks them as seen when chat is opened
- Message timestamps
- Image sharing
- Online/offline presence 

---

## Installation

# 1) Clone the repository
```bash
git clone https://github.com/upahar-khatiwada/chat-app.git
cd chat-app
```

# 2) Make sure you have .env setup in backend and frontend both

# 3) Install dependencies in backend and frontend
```bash
cd backend
bun install
bun run dev
```

```bash
cd frontend
npm install
npm run dev
```

# 4) Open the app in browser: http://localhost:4000
