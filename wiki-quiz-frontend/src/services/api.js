// If env variable exists (production), use it
// Otherwise fallback to localhost (development)

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

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
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate quiz");
  }

  return res.json();
}
