import { useState, useEffect } from "react";

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
      const sections = ["hero", "how-it-works", "day1", "day2", "pitch", "post-weekend", "tools"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItems = [
    { id: "day1", label: "Day 1" },
    { id: "day2", label: "Day 2" },
    { id: "pitch", label: "Pitch" },
    { id: "post-weekend", label: "Cohort" },
    { id: "tools", label: "Tools" },
  ];

  return (
    <nav className={`sticky-nav ${visible ? "sticky-nav--visible" : ""}`}>
      <div className="sticky-nav__inner">
        <div className="sticky-nav__brand">
          <img src="/cod-logo.png" alt="COD" className="sticky-nav__logo" />
          <span>AI Startup Weekend</span>
        </div>
        <div className="sticky-nav__links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sticky-nav__link ${active === item.id ? "active" : ""}`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
