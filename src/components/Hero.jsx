export default function Hero({ onStart }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__bg-grid" />
      <div className="hero__content">
        <div className="hero__logo-wrap">
          <img src={`${import.meta.env.BASE_URL}cod-logo.png`} alt="College of the Desert" className="hero__logo" />
        </div>
        <h1 className="hero__title">
          COD AI<br />
          <span className="hero__title--accent">Startup Weekend</span>
        </h1>
        <p className="hero__tagline">
          Build → Launch → Pitch a Business in 2 Days Using AI
        </p>
        <p className="hero__sub">
          Turn your idea into a real business targeting{" "}
          <strong>$1,000/month in 6 months</strong>
        </p>
        <div className="hero__buttons">
          <button className="btn btn--primary" onClick={onStart}>
            🔘 Start the Journey
          </button>
          <button className="btn btn--secondary" onClick={() => scrollTo("how-it-works")}>
            📅 View Schedule
          </button>
          <button className="btn btn--outline" onClick={() => scrollTo("tools")}>
            🛠️ Tools &amp; Resources
          </button>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">9</span>
            <span className="hero__stat-label">Guided Stages</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">30+</span>
            <span className="hero__stat-label">AI Prompts</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">15+</span>
            <span className="hero__stat-label">AI Tools</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">$1K</span>
            <span className="hero__stat-label">Revenue Goal</span>
          </div>
        </div>
      </div>
    </section>
  );
}
