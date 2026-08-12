
# Legal Document Intelligence — UI

React frontend for the Legal Document Intelligence Agent. Upload legal documents, ask questions in plain language, and view RAGAS evaluation metrics.

**Demo:** [Watch Demo](https://www.youtube.com/watch?v=s2y2ual-MF0) | **Backend Repo:** https://github.com/anaghakalyanaraman/legal-agent-api

---

## Pages

| Page | Route | Description |
|---|---|---|
| Upload | /upload | Upload a PDF legal document |
| Chat | /chat/:documentId | Ask questions about the document |
| Metrics | /metrics | View RAGAS evaluation scores and system architecture |

---

## Features

* Drag and drop PDF upload
* Full-screen dark UI with sidebar navigation
* Real-time chat interface with suggested questions
* Shows question type classification (clause_search / summary / comparison)
* Shows number of chunks used per answer
* RAGAS metrics dashboard with ablation study results
* Agent pipeline visualization

---

## Running Locally

**Prerequisites:** Node.js, Backend API running at `http://localhost:8000`

```bash
git clone [https://github.com/anaghakalyanaraman/legal-agent-ui](https://github.com/anaghakalyanaraman/legal-agent-ui)
cd legal-agent-ui
npm install
npm run dev
App runs at http://localhost:5173

Tech Stack
Component	Tool
Framework	React 18 + Vite
Styling	Tailwind CSS
HTTP	Axios
Routing	React Router
