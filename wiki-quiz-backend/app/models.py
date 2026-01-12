from sqlalchemy import Column, Integer, String, JSON
from .database import Base

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True)
    title = Column(String)
    summary = Column(String)
    quiz = Column(JSON)
    related_topics = Column(JSON, nullable=True)

