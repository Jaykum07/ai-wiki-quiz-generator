import "./Tabs.css";

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs-wrapper">
      <button
        className={`tab-item ${activeTab === "generate" ? "active" : ""}`}
        onClick={() => setActiveTab("generate")}
      >
        Generate Quiz
      </button>

      <button
        className={`tab-item ${activeTab === "history" ? "active" : ""}`}
        onClick={() => setActiveTab("history")}
      >
        Past Quizzes
      </button>
    </div>
  );
}
