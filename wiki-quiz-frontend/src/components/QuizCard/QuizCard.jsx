import "./QuizCard.css";

export default function QuizCard({ quiz, index }) {
  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <span className="question-number">
          Question {index + 1}
        </span>
        <span className={`difficulty ${quiz.difficulty}`}>
          {quiz.difficulty}
        </span>
      </div>

      <h3 className="question-text">
        {quiz.question}
      </h3>

      <ul className="options-list">
        {quiz.options.map((option, i) => (
          <li key={i} className="option-item">
            {option}
          </li>
        ))}
      </ul>

      <div className="answer-box">
        <p><strong>Correct Answer:</strong> {quiz.answer}</p>
        <p className="explanation">{quiz.explanation}</p>
      </div>
    </div>
  );
}
