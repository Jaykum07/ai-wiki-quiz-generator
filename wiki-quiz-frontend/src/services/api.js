const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function generateQuiz(url) {
  const response = await fetch(`${API_BASE_URL}/generate-quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return response.json();
}

export async function fetchQuizzes() {
  const response = await fetch(`${API_BASE_URL}/quizzes`);
  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }
  return response.json();
}

export async function fetchQuizzes() {
  const res = await fetch(`${BASE_URL}/quizzes`);
  if (!res.ok) {
    throw new Error("Failed to fetch quizzes");
  }
  return res.json();
}

export async function generateQuiz(url) {
  const res = await fetch(`${BASE_URL}/generate-quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to generate quiz");
  }

  return res.json();
}