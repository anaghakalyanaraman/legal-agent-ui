# Legal Document Intelligence — UI

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan)

React frontend for the Legal Document Intelligence Agent. Upload legal documents, ask questions in plain language, and view RAGAS evaluation metrics.

**Demo:** [Watch Demo](https://youtu.be/8xvRmtp8WAc)  
**Backend Repo:** https://github.com/anaghakalyanaraman/legal-agent-api

---

## Screenshots
<img width="1600" height="752" alt="WhatsApp Image 2026-08-12 at 4 39 15 PM" src="https://github.com/user-attachments/assets/bf81864e-13fd-4cd0-8a8a-7689e56d736e" />
Clause Search
<img width="1600" height="756" alt="WhatsApp Image 2026-08-12 at 4 40 18 PM" src="https://github.com/user-attachments/assets/0ba20f75-894a-44bb-9837-523734f4e1e7" />
Summary
<img width="1600" height="759" alt="WhatsApp Image 2026-08-12 at 4 41 55 PM" src="https://github.com/user-attachments/assets/ee43aca9-2dd0-440a-9d5c-704abf08d8b1" />
Comparision
<img width="1600" height="753" alt="WhatsApp Image 2026-08-12 at 4 43 42 PM" src="https://github.com/user-attachments/assets/a71774bd-b5f7-421e-9434-cc10a5ba5420" />
RAGAS Metrics
<img width="1918" height="917" alt="image" src="https://github.com/user-attachments/assets/a141f281-8ec4-45c3-a9db-28935f90707c" />


---

## Pages

| Page | Route | Description |
|---|---|---|
| Upload | /upload | Upload a PDF legal document |
| Chat | /chat/:documentId | Ask questions about the document |
| Metrics | /metrics | RAGAS evaluation scores and system architecture |

---

## Features

- Drag and drop PDF upload
- Full-screen dark UI with sidebar navigation
- Real-time chat interface with suggested questions
- Question type classification shown per response
- Chunks used shown per response
- RAGAS metrics dashboard with ablation study
- Agent pipeline visualization

---

## Running Locally

**Prerequisites:** Node.js, Backend API running at `http://localhost:8000`

```bash
git clone https://github.com/anaghakalyanaraman/legal-agent-ui
cd legal-agent-ui
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## Tech Stack

| Component | Tool |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| HTTP | Axios |
| Routing | React Router |
