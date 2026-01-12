import { useState } from "react";
import Tabs from "./components/Tabs/Tabs";
import GenerateQuiz from "./pages/GenerateQuiz/GenerateQuiz";
import History from "./pages/History/History";

export default function App() {
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h1>AI Wiki Quiz Generator</h1>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "generate" && <GenerateQuiz />}
      {activeTab === "history" && <History />}
    </div>
  );
}
