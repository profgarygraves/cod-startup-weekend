import { useCallback } from "react";
import StickyNav from "./components/StickyNav";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Section from "./components/Section";
import ProgressTracker from "./components/ProgressTracker";
import ToolsReference from "./components/ToolsReference";
import VentureProfile from "./components/VentureProfile";
import WebsiteWizard from "./components/WebsiteWizard";
import ExportWorkbook from "./components/ExportWorkbook";
import PersistenceBanner from "./components/PersistenceBanner";
import BackupActions from "./components/BackupActions";
import IdeaBrowser from "./components/IdeaBrowser";
import RefreshPromptsButton from "./components/RefreshPromptsButton";
import PlayLabSetup from "./components/PlayLabSetup";
import { DAY1_SECTIONS, DAY2_SECTIONS, POST_SECTIONS } from "./data/sections";
import { usePersistentState } from "./lib/storage";
import "./App.css";

const ALL_SECTIONS = [...DAY1_SECTIONS, ...DAY2_SECTIONS, ...POST_SECTIONS];

const INITIAL_STATUSES = Object.fromEntries(
  ALL_SECTIONS.map((s) => [s.id, "not-started"])
);

const INITIAL_PROFILE = {
  ventureType: "",
  startingPoint: "",
  marketAreaScope: "",
  marketArea: "",
  teamName: "",
  members: "",
  ideaName: "",
  description: "",
  problem: "",
  audience: "",
  offer: "",
  price: "",
};

const INITIAL_WEBSITE = {
  headline: "",
  subheadline: "",
  heroVisual: "",
  offerHeadline: "",
  offerBullets: "",
  ctaText: "",
  founderName: "",
  founderBio: "",
  formType: "email",
  publishedUrl: "",
};

export default function App() {
  const [statuses, setStatuses] = usePersistentState("cod-sw-statuses", INITIAL_STATUSES);
  const [profile, setProfile] = usePersistentState("cod-sw-profile", INITIAL_PROFILE);
  const [website] = usePersistentState("cod-sw-website", INITIAL_WEBSITE);

  const handleStatusChange = useCallback((id, status) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  }, [setStatuses]);

  const progress = {
    total: ALL_SECTIONS.length,
    completed: Object.values(statuses).filter((s) => s === "complete").length,
    inProgress: Object.values(statuses).filter((s) => s === "in-progress").length,
  };

  const scrollToDay1 = () => {
    document.getElementById("day1")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <StickyNav />
      <Hero onStart={scrollToDay1} />
      <HowItWorks />

      <div className="container" style={{ paddingTop: "2rem" }}>
        <PersistenceBanner />
        <VentureProfile profile={profile} onChange={setProfile} />
        <div className="auto-fill-bar">
          <span className="auto-fill-bar__note">
            ✨ Every prompt below auto-fills from your profile. Edit the profile and prompts update instantly.
          </span>
          <RefreshPromptsButton />
        </div>
        <IdeaBrowser
          profile={profile}
          onAdoptIdea={(patch) => setProfile({ ...profile, ...patch })}
        />
        <ProgressTracker progress={progress} />
        <ExportWorkbook
          profile={profile}
          statuses={statuses}
          website={website}
          sections={ALL_SECTIONS}
        />
        <BackupActions profile={profile} />
      </div>

      <section className="roadmap-day" id="day1">
        <div className="container">
          <div className="day-header day-header--1">
            <div className="day-header__badge">Day 1</div>
            <h2>🧠 Ideate, Research &amp; Prototype</h2>
            <p>Build the foundation of your business using AI-powered research and validation.</p>
          </div>
          <div className="sections-list">
            {DAY1_SECTIONS.map((s) => (
              <Section
                key={s.id}
                section={s}
                status={statuses[s.id]}
                onStatusChange={handleStatusChange}
                profile={profile}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="roadmap-day" id="day2">
        <div className="container">
          <div className="day-header day-header--2">
            <div className="day-header__badge">Day 2</div>
            <h2>🚀 Build, Brand &amp; Launch</h2>
            <p>Go from idea to live business — brand, website, marketing, and pitch.</p>
          </div>
          <div className="sections-list" id="pitch">
            {DAY2_SECTIONS.map((s) => (
              <Section
                key={s.id}
                section={s}
                status={statuses[s.id]}
                onStatusChange={handleStatusChange}
                profile={profile}
                extra={s.id === "digital-presence" ? <WebsiteWizard profile={profile} /> : null}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="roadmap-day" id="post-weekend">
        <div className="container">
          <div className="day-header day-header--3">
            <div className="day-header__badge">Post Weekend</div>
            <h2>📈 6-Month Growth Cohort</h2>
            <p>Turn your weekend prototype into real monthly recurring revenue.</p>
          </div>
          <div className="sections-list">
            {POST_SECTIONS.map((s) => (
              <Section
                key={s.id}
                section={s}
                status={statuses[s.id]}
                onStatusChange={handleStatusChange}
                profile={profile}
              />
            ))}
          </div>
        </div>
      </section>

      <PlayLabSetup profile={profile} />

      <ToolsReference />

      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div>
              <strong>COD AI Startup Weekend</strong>
              <p>College of the Desert · Entrepreneurship Program</p>
            </div>
            <div className="footer__links">
              <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                Back to Top ↑
              </a>
            </div>
          </div>
          <p className="footer__copy">
            Built to help students build real businesses. Every idea starts here.
          </p>
        </div>
      </footer>
    </>
  );
}
