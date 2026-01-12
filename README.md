# 🧠 AI Wiki Quiz Generator

The **AI Wiki Quiz Generator** is a full-stack web application that accepts a **Wikipedia article URL** and automatically generates a **multiple-choice quiz** using a **Large Language Model (LLM)**.  
It scrapes Wikipedia content, generates high-quality questions, stores results in a database, and provides a clean, user-friendly interface to generate and review quizzes.

---

## 🎯 Objective

To build an end-to-end system that:
- Scrapes Wikipedia articles (HTML only, no Wikipedia API)
- Uses an LLM to generate quiz questions grounded in article content
- Stores quizzes in a relational database
- Provides a frontend UI with quiz generation and history views

---

## 🚀 Features

### 🔹 Generate Quiz
- Accepts a Wikipedia article URL as input
- Scrapes article title and summary using **BeautifulSoup**
- Generates **5–10 multiple-choice questions** using an **LLM (Groq via LangChain)**
- Each question includes:
  - Question text
  - Four options (A–D)
  - Correct answer
  - Difficulty level (easy / medium / hard)
  - Short explanation
- Displays:
  - Article title
  - Article summary
  - Generated quiz
  - Suggested related Wikipedia topics

### 🔹 Quiz History
- Stores all generated quizzes in **PostgreSQL**
- Displays previously processed URLs in a table
- “View Details” modal shows the full quiz again
- Uses caching to avoid regenerating quizzes for the same URL

---

## 🏗️ Tech Stack

### Frontend
- **React (Vite)**
- Plain CSS (component-scoped)
- Fetch API for backend communication

### Backend
- **FastAPI (Python)**
- **PostgreSQL**
- **SQLAlchemy ORM**
- **BeautifulSoup** (HTML scraping)
- **LangChain + Groq LLM** (quiz generation)

---

## 📁 Project Structure

### Backend
wiki-quiz-backend/
├── app/
│ ├── main.py # FastAPI entry point
│ ├── database.py # PostgreSQL connection
│ ├── models.py # SQLAlchemy models
│ ├── schemas.py # Pydantic schemas
│ ├── scraper.py # Wikipedia HTML scraper
│ ├── llm_quiz_generator.py # LLM-based quiz generation
│ ├── prompts.py # Prompt templates
│ └── init.py
├── requirements.txt
└── .env (not committed)


### Frontend
wiki-quiz-frontend/
├── src/
│ ├── components/
│ │ ├── QuizCard/
│ │ └── Tabs/
│ ├── pages/
│ │ ├── GenerateQuiz/
│ │ └── History/
│ ├── services/
│ │ └── api.js
│ ├── App.jsx
│ └── main.jsx
├── index.html
├── package.json
└── package-lock.json


---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd wiki-quiz-backend
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt

Create a .env file:

DATABASE_URL=postgresql://username:password@localhost:5432/wikiquiz
GROQ_API_KEY=your_groq_api_key


Run the backend server:

uvicorn app.main:app --reload


Backend will be available at:

http://127.0.0.1:8000


API documentation:

http://127.0.0.1:8000/docs

2️⃣ Frontend Setup
cd wiki-quiz-frontend
npm install
npm run dev


Frontend will be available at:

http://localhost:5173

🔌 API Endpoints
Generate Quiz
POST /generate-quiz


Request Body

{
  "url": "https://en.wikipedia.org/wiki/Alan_Turing"
}


Response

{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/Alan_Turing",
  "title": "Alan Turing",
  "summary": "Alan Turing was a British mathematician...",
  "quiz": [...],
  "cached": false
}

Get Quiz History
GET /quizzes


Returns a list of all stored quizzes.

🧪 Sample Tested Wikipedia URLs

https://en.wikipedia.org/wiki/Alan_Turing

https://en.wikipedia.org/wiki/Artificial_intelligence

https://en.wikipedia.org/wiki/Computer_science