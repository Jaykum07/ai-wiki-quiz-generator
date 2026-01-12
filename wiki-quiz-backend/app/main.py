from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from .database import Base, engine, SessionLocal
from .models import Quiz
from .schemas import GenerateQuizRequest
from .scraper import scrape_wikipedia
from .llm_quiz_generator import generate_llm_quiz

load_dotenv()

app = FastAPI(title="Wiki Quiz Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # ✅ for deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"status": "API running"}

@app.post("/generate-quiz")
def generate_quiz(request: GenerateQuizRequest, db: Session = Depends(get_db)):
    url = str(request.url)

    # Return cached quiz
    cached = db.query(Quiz).filter(Quiz.url == url).first()
    if cached:
        return {
            "id": cached.id,
            "url": cached.url,
            "title": cached.title,
            "summary": cached.summary,
            "quiz": cached.quiz,
            "related_topics": cached.related_topics,
            "cached": True
        }

    title, summary = scrape_wikipedia(url)
    llm_output = generate_llm_quiz(summary)

    quiz = Quiz(
        url=url,
        title=title,
        summary=summary,
        quiz=llm_output["quiz"],
        related_topics=llm_output["related_topics"]
    )

    db.add(quiz)
    db.commit()
    db.refresh(quiz)

    return {
        "id": quiz.id,
        "url": quiz.url,
        "title": quiz.title,
        "summary": quiz.summary,
        "quiz": quiz.quiz,
        "related_topics": quiz.related_topics,
        "cached": False
    }

@app.get("/quizzes")
def get_quizzes(db: Session = Depends(get_db)):
    return db.query(Quiz).all()
