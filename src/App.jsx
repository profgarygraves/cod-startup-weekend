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
import Plan, { PLAN_INITIAL } from "./components/Plan";
import { DAY1_SECTIONS, DAY2_SECTIONS, POST_SECTIONS } from "./data/sections";
import { usePersistentState } from "./lib/storage";
import { useEffect } from "react";
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
  visualPrototypeNotes: "",
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

const INITIAL_NOTES = {};

// One-time migration: pull each section's old { notes } scratchpad text
// into a single Plan.decisions log, prefixed with the section's title.
// Triggered only when Plan.decisions is empty AND at least one section has
// legacy `.notes` content AND we haven't already migrated.
function migrateLegacyNotesIntoPlan(notes, plan, sections) {
  if (!notes || !plan) return null;
  if (plan._migratedSectionNotes) return null;
  if ((plan.decisions || "").trim()) {
    return { ...plan, _migratedSectionNotes: true };
  }
  const blocks = [];
  const cleanedNotes = {};
  let migratedAny = false;
  for (const s of sections) {
    const v = notes[s.id];
    if (v && typeof v === "object" && (v.notes || "").trim()) {
      blocks.push(`**${s.title}**\n${v.notes.trim()}`);
      cleanedNotes[s.id] = { final: v.final || "" };
      migratedAny = true;
    } else if (typeof v === "string" && v.trim()) {
      blocks.push(`**${s.title}**\n${v.trim()}`);
      migratedAny = true;
    } else if (v) {
      cleanedNotes[s.id] = v;
    }
  }
  if (!migratedAny) return { plan: { ...plan, _migratedSectionNotes: true }, notes };
  return {
    plan: {
      ...plan,
      decisions: blocks.join("\n\n"),
      _migratedSectionNotes: true,
    },
    notes: { ...notes, ...cleanedNotes },
  };
}

export default function App() {
  const [statuses, setStatuses] = usePersistentState("cod-sw-statuses", INITIAL_STATUSES);
  const [profile, setProfile] = usePersistentState("cod-sw-profile", INITIAL_PROFILE);
  const [website] = usePersistentState("cod-sw-website", INITIAL_WEBSITE);
  const [notes, setNotes] = usePersistentState("cod-sw-notes", INITIAL_NOTES);
  const [plan, setPlan] = usePersistentState("cod-sw-plan", PLAN_INITIAL);

  // Run the one-time legacy-notes → Plan.decisions migration on mount.
  useEffect(() => {
    const result = migrateLegacyNotesIntoPlan(notes, plan, ALL_SECTIONS);
    if (!result) return;
    if (result.plan) setPlan(result.plan);
    if (result.notes) setNotes(result.notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = useCallback((id, status) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  }, [setStatuses]);

  const handleNotesChange = useCallback((sectionId, value) => {
    setNotes((prev) => ({ ...prev, [sectionId]: value }));
  }, [setNotes]);

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
        <VentureProfile profile={profile} onChange={setProfile} sections={ALL_SECTIONS} />
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
        <Plan profile={profile} plan={plan} onChange={setPlan} />
        <ExportWorkbook
          profile={profile}
          website={website}
          notes={notes}
          plan={plan}
          sections={ALL_SECTIONS}
        />
        <BackupActions profile={profile} sections={ALL_SECTIONS} />
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
                notes={notes}
                onNotesChange={handleNotesChange}
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
                notes={notes}
                onNotesChange={handleNotesChange}
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
                notes={notes}
                onNotesChange={handleNotesChange}
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
