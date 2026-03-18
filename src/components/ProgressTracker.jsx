export default function ProgressTracker({ progress }) {
  const { completed, inProgress, total } = progress;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getMessage = () => {
    if (pct === 0) return "Ready to begin your startup journey! 🚀";
    if (pct < 25) return "Great start — you're building momentum! 💪";
    if (pct < 50) return "You're a quarter of the way there — keep going! 🔥";
    if (pct < 75) return "Past the halfway mark! You're crushing it! ⚡";
    if (pct < 100) return "Almost there — finish strong! 🏆";
    return "🎉 Amazing! You've completed the entire weekend!";
  };

  return (
    <div className="progress-tracker">
      <div className="progress-tracker__header">
        <div className="progress-tracker__info">
          <h3>Your Progress</h3>
          <p>{getMessage()}</p>
        </div>
        <div className="progress-tracker__pct">{pct}%</div>
      </div>
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-tracker__counts">
        <span className="count count--complete">✅ {completed} Complete</span>
        <span className="count count--progress">🔄 {inProgress} In Progress</span>
        <span className="count count--remaining">⭕ {total - completed - inProgress} Not Started</span>
      </div>
    </div>
  );
}
