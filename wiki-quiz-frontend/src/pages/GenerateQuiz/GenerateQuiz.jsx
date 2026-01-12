import { useState } from "react";
import "./GenerateQuiz.css";
import QuizCard from "../../components/QuizCard/QuizCard";
import { generateQuiz } from "../../services/api";

export default function GenerateQuiz() {
  const [url, setUrl] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError("Please enter a Wikipedia URL");
      return;
    }

    setLoading(true);
    setError("");
    setQuizData(null);

    try {
      const data = await generateQuiz(url);
      setQuizData(data);
    } catch (err) {
      setError(err.message || "Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generate-container">
      <p className="helper-text">
        Enter a Wikipedia article URL to generate a quiz automatically.
      </p>

      <div className="input-group">
        <input
          type="text"
          placeholder="https://en.wikipedia.org/wiki/Alan_Turing"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          className="primary-btn"
          disabled={loading || !url.trim()}
          onClick={handleGenerate}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {!quizData && !loading && (
        <div className="empty-state">
          <p>No quiz generated yet.</p>
          <p className="subtle">
            Paste a Wikipedia link and click “Generate Quiz”.
          </p>
        </div>
      )}

      {quizData && (
        <div className="quiz-result">
          <h2>{quizData.title}</h2>
          <p className="subtle">{quizData.summary}</p>

          {quizData.quiz.map((q, index) => (
            <QuizCard key={index} quiz={q} index={index} />
          ))}

          {quizData.cached && (
            <p className="cached-note">
              Loaded from history (cached)
            </p>
          )}
        </div>
      )}
    </div>
  );
}


