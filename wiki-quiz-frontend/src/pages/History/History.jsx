import "./History.css";
import { useEffect, useState } from "react";
import { fetchQuizzes } from "../../services/api";
import QuizCard from "../../components/QuizCard/QuizCard";

export default function History() {
  const [history, setHistory] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await fetchQuizzes();
        setHistory(data);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  return (
    <div className="history-container">
      <h2 className="history-title">Past Quizzes</h2>

      <table className="history-table">
        <thead>
          <tr>
            <th>Article Title</th>
            <th>Wikipedia URL</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : history.length === 0 ? (
            <tr>
              <td colSpan="3">No quizzes found</td>
            </tr>
          ) : (
            history.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td className="url-cell">{item.url}</td>
                <td>
                  <button
                    className="link-btn"
                    onClick={() => setSelectedQuiz(item)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {selectedQuiz && (
        <div className="modal-overlay">
          <div className="modal-box">
            {/* Sticky Header */}
            <div className="modal-header">
              <h3>{selectedQuiz.title}</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedQuiz(null)}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="modal-content">
              <p className="modal-summary">{selectedQuiz.summary}</p>

              {selectedQuiz.quiz.map((q, index) => (
                <QuizCard key={index} quiz={q} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
