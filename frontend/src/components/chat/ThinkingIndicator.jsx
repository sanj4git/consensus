import { useState, useEffect } from "react";

const STAGES = [
  { label: "Chairman", action: "Orchestrating agents...", icon: "👨‍💼" },
  { label: "Creator", action: "Drafting content...", icon: "✍️" },
  { label: "Curriculum", action: "Aligning with syllabus...", icon: "📚" },
  { label: "Fact Sentinel", action: "Verifying accuracy...", icon: "🛡️" },
  { label: "Student", action: "Finalizing response...", icon: "🎓" },
];

export default function ThinkingIndicator() {
  const [index, setIndex] = useState(0);
  const [stepCount, setStepCount] = useState(0); // 🆕 Track total transitions

  useEffect(() => {
    // 🛑 STOP CONDITION: 
    // If we have completed 2 loops (5 stages * 2 = 10 steps), stop updating.
    // This naturally leaves the index at 0 (Chairman) because 10 % 5 === 0.
    if (stepCount >= STAGES.length * 2) {
      return; 
    }

    const randomDelay = Math.floor(Math.random() * 3000) + 2000;

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % STAGES.length);
      setStepCount((prev) => prev + 1); // Increment count
    }, randomDelay);

    return () => clearTimeout(timer);
  }, [stepCount]); // 👈 Dependency changed to track steps

  const stage = STAGES[index];

  return (
    <div className="message-wrapper bot">
      <div className="chat-bubble bot thinking-bubble">
        <div className="thinking-icon">{stage.icon}</div>
        <div className="thinking-text">
          <div className="thinking-label">{stage.label}</div>
          <div className="thinking-action">{stage.action}</div>
        </div>
        <div className="thinking-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  );
}