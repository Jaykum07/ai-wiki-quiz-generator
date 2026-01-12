import json
from langchain_groq import ChatGroq
from .prompts import QUIZ_PROMPT_TEMPLATE


llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0.3
)


def generate_llm_quiz(summary: str) -> dict:
    prompt = QUIZ_PROMPT_TEMPLATE.format(summary=summary)

    response = llm.invoke(prompt)

    try:
        data = json.loads(response.content)
        return data
    except json.JSONDecodeError:
        raise ValueError("LLM returned invalid JSON")
