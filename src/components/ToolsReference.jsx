const ALL_TOOLS = [
  { name: "ChatGPT", url: "https://chat.openai.com", icon: "🤖", category: "AI Writing & Strategy", desc: "Ideation, market research, copywriting, business planning" },
  { name: "Claude", url: "https://claude.ai", icon: "🧠", category: "AI Writing & Strategy", desc: "Deep analysis, pitch feedback, long-form content, reasoning" },
  { name: "Canva AI", url: "https://canva.com", icon: "🎨", category: "Design & Branding", desc: "Logo design, social media graphics, presentations, brand kits" },
  { name: "Adobe Firefly", url: "https://firefly.adobe.com", icon: "🔥", category: "Design & Branding", desc: "AI image generation, brand visuals, marketing assets" },
  { name: "DALL·E", url: "https://openai.com/dall-e-3", icon: "🖼️", category: "Design & Branding", desc: "Custom AI image creation for brand and marketing" },
  { name: "Framer.ai", url: "https://framer.com", icon: "⚡", category: "Website & Digital", desc: "Build live websites in minutes with AI-assisted design" },
  { name: "HeyGen", url: "https://heygen.com", icon: "🎬", category: "Video & Media", desc: "AI video generation with realistic avatars and voice" },
  { name: "Higgsfield AI", url: "https://higgsfield.ai", icon: "🎥", category: "Video & Media", desc: "AI video ads and social content creation" },
  { name: "Galileo AI", url: "https://www.usegalileo.ai", icon: "✨", category: "Prototyping", desc: "Generate UI designs and app mockups from text prompts" },
  { name: "Figma", url: "https://figma.com", icon: "📐", category: "Prototyping", desc: "Collaborative design and wireframing tool" },
  { name: "Gamma", url: "https://gamma.app", icon: "✨", category: "Pitch & Presentations", desc: "AI-powered pitch decks and presentations in minutes" },
  { name: "Beautiful.ai", url: "https://beautiful.ai", icon: "🎯", category: "Pitch & Presentations", desc: "Smart presentation design that auto-formats your content" },
  { name: "Meta Ads Manager", url: "https://business.facebook.com", icon: "📱", category: "Marketing", desc: "Run targeted Instagram and Facebook ad campaigns" },
  { name: "Notion", url: "https://notion.so", icon: "📋", category: "Productivity", desc: "Business planning, notes, databases, and team collaboration" },
  { name: "Namecheap", url: "https://namecheap.com", icon: "🌐", category: "Website & Digital", desc: "Search and register domain names affordably" },
];

const CATEGORIES = [...new Set(ALL_TOOLS.map((t) => t.category))];

export default function ToolsReference() {
  return (
    <section className="tools-reference" id="tools">
      <div className="container">
        <div className="section-header">
          <h2>🛠️ Tools &amp; Resources</h2>
          <p>Every AI tool you need, organized by category. Click any card to open the tool.</p>
        </div>
        {CATEGORIES.map((cat) => (
          <div key={cat} className="tools-category">
            <h3 className="tools-category__title">{cat}</h3>
            <div className="tools-grid">
              {ALL_TOOLS.filter((t) => t.category === cat).map((tool, i) => (
                <a
                  key={i}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-reference-card"
                >
                  <span className="tool-reference-card__icon">{tool.icon}</span>
                  <div className="tool-reference-card__info">
                    <strong>{tool.name}</strong>
                    <p>{tool.desc}</p>
                  </div>
                  <span className="tool-reference-card__arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
