export default function HowItWorks() {
  const steps = [
    {
      icon: "💡",
      step: "Step 1",
      title: "Build Your Idea",
      subtitle: "Day 1",
      desc: "Brainstorm, research your market, set pricing, and create a prototype — all powered by AI.",
      color: "#C8102E",
    },
    {
      icon: "🚀",
      step: "Step 2",
      title: "Launch Your Brand",
      subtitle: "Day 2",
      desc: "Design your brand, build a live website, create a video commercial, and pitch to judges.",
      color: "#FDB827",
    },
    {
      icon: "📈",
      step: "Step 3",
      title: "Grow for 6 Months",
      subtitle: "Canvas Cohort",
      desc: "Join the accountability cohort, track monthly revenue, and reach $1,000/month with ongoing support.",
      color: "var(--green)",
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Three phases. Two days. One shot at building something real.</p>
        </div>
        <div className="how-it-works__steps">
          {steps.map((s, i) => (
            <div key={i} className="step-card" style={{ "--step-color": s.color }}>
              <div className="step-card__icon">{s.icon}</div>
              <div className="step-card__badge">{s.step}</div>
              <h3 className="step-card__title">{s.title}</h3>
              <span className="step-card__subtitle">{s.subtitle}</span>
              <p className="step-card__desc">{s.desc}</p>
              {i < steps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
