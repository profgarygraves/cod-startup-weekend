// price values: "free" | "free-tier" | "free-students" | "freemium" | "paid" | "pay-per-use"
const PRICE_LABEL = {
  "free": "Free",
  "free-tier": "Free tier",
  "free-students": "Free for students",
  "freemium": "Free + paid",
  "paid": "Paid",
  "pay-per-use": "Pay per use",
};

const ALL_TOOLS = [
  // AI Writing & Strategy
  { name: "ChatGPT", url: "https://chat.openai.com", icon: "🤖", category: "AI Writing & Strategy", desc: "Ideation, market research, copywriting, business planning. Built-in image gen on Plus.", price: "freemium" },
  { name: "Claude", url: "https://claude.ai", icon: "🧠", category: "AI Writing & Strategy", desc: "Deep analysis, pitch feedback, long-form writing, Projects feature. Strong free tier.", price: "freemium" },
  { name: "Microsoft Copilot", url: "https://copilot.microsoft.com", icon: "🟦", category: "AI Writing & Strategy", desc: "Free GPT-4 access via Microsoft account. Good fallback when ChatGPT free tier maxes out.", price: "free" },
  { name: "Google Gemini", url: "https://gemini.google.com", icon: "💎", category: "AI Writing & Strategy", desc: "Strong reasoning + integration with Google Drive/Docs. Free tier capable.", price: "freemium" },
  { name: "NotebookLM", url: "https://notebooklm.google.com", icon: "📓", category: "AI Writing & Strategy", desc: "Source-grounded research. Upload PDFs, web pages, YouTube videos — get briefing docs, FAQs, and audio overviews cited back to your sources. Best for industry research.", price: "free" },

  // Design & Branding
  { name: "Canva AI", url: "https://canva.com", icon: "🎨", category: "Design & Branding", desc: "Logos, social graphics, presentations, brand kits, AI Magic features. Generous free tier.", price: "freemium" },
  { name: "Microsoft Designer", url: "https://designer.microsoft.com", icon: "🖼️", category: "Design & Branding", desc: "Free DALL·E-powered image generation, badges, social posts. Sign in with Microsoft account.", price: "free" },
  { name: "Ideogram", url: "https://ideogram.ai", icon: "🔠", category: "Design & Branding", desc: "AI image generator that nails text in images — best for posters, packaging, logos.", price: "freemium" },
  { name: "Recraft", url: "https://recraft.ai", icon: "✏️", category: "Design & Branding", desc: "AI design with vector output and brand styles. Solid free tier.", price: "freemium" },
  { name: "Hatchful", url: "https://hatchful.shopify.com", icon: "🐣", category: "Design & Branding", desc: "Free, instant logo maker by Shopify. Beginner-friendly.", price: "free" },
  { name: "Adobe Firefly", url: "https://firefly.adobe.com", icon: "🔥", category: "Design & Branding", desc: "AI image generation with commercial-safe Adobe Stock licensing. Limited free credits.", price: "freemium" },

  // Prototyping & Building
  { name: "v0 by Vercel", url: "https://v0.dev", icon: "▲", category: "Prototyping & Building", desc: "Generate full React UI from a text prompt. Best for digital product mockups.", price: "freemium" },
  { name: "Lovable", url: "https://lovable.dev", icon: "💜", category: "Prototyping & Building", desc: "Build full apps with AI — frontend, backend, database. Strong free trial.", price: "freemium" },
  { name: "Bolt.new", url: "https://bolt.new", icon: "⚡", category: "Prototyping & Building", desc: "Prompt-to-prototype web apps. Excellent for fast Day 1 demos.", price: "freemium" },
  { name: "Figma", url: "https://figma.com", icon: "📐", category: "Prototyping & Building", desc: "Collaborative wireframing and clickable prototypes. Free for students.", price: "free-students" },
  { name: "Replit", url: "https://replit.com", icon: "🟧", category: "Prototyping & Building", desc: "Browser-based coding with AI assistant.", price: "freemium" },

  // Website Hosting (free options first)
  { name: "GitHub Pages", url: "https://pages.github.com", icon: "🐙", category: "Website Hosting", desc: "Free static-site hosting with custom domain support and free HTTPS. Pairs with GitHub Student Pack.", price: "free" },
  { name: "Cloudflare Pages", url: "https://pages.cloudflare.com", icon: "🟧", category: "Website Hosting", desc: "Generous free tier with the easiest custom-domain setup of any host.", price: "free" },
  { name: "Carrd", url: "https://carrd.co", icon: "🪪", category: "Website Hosting", desc: "Beautiful single-page sites. Free with Carrd subdomain, $19/yr Pro for custom domain.", price: "freemium" },
  { name: "Notion Sites", url: "https://www.notion.com/help/sites", icon: "📋", category: "Website Hosting", desc: "Publish a Notion page as a real public website. No code, no design needed.", price: "free" },
  { name: "Framer", url: "https://framer.com", icon: "🎨", category: "Website Hosting", desc: "AI-assisted polished sites. Free with framer.website subdomain.", price: "freemium" },
  { name: "Wix", url: "https://wix.com", icon: "🟪", category: "Website Hosting", desc: "Drag-and-drop builder. Free tier shows ads.", price: "freemium" },
  { name: "Vercel", url: "https://vercel.com", icon: "▲", category: "Website Hosting", desc: "Deploy v0 / Lovable / Bolt apps in one click. Free hobby tier.", price: "free-tier" },

  // Domains
  { name: "Cloudflare Domains", url: "https://www.cloudflare.com/products/registrar/", icon: "🟧", category: "Domains", desc: "At-cost domain pricing — no markup. Best long-term value.", price: "paid" },
  { name: "Porkbun", url: "https://porkbun.com", icon: "🐷", category: "Domains", desc: "Often the cheapest registrar. Free WHOIS privacy, free SSL.", price: "paid" },
  { name: "Namecheap", url: "https://namecheap.com", icon: "🌐", category: "Domains", desc: "Reliable registrar. Free .me domain for one year via GitHub Student Pack.", price: "free-students" },

  // Video & Media
  { name: "CapCut", url: "https://capcut.com", icon: "✂️", category: "Video & Media", desc: "Free video editor — the actual tool most students use for short-form content.", price: "free" },
  { name: "Loom", url: "https://loom.com", icon: "📹", category: "Video & Media", desc: "Free screen recording. Perfect for product demos and how-to walkthroughs.", price: "freemium" },
  { name: "Descript", url: "https://descript.com", icon: "📝", category: "Video & Media", desc: "Edit video by editing the transcript. Generous free tier.", price: "freemium" },
  { name: "Canva Video", url: "https://canva.com", icon: "🎬", category: "Video & Media", desc: "Built into Canva. Templates for short-form ads.", price: "freemium" },
  { name: "Runway", url: "https://runwayml.com", icon: "🎥", category: "Video & Media", desc: "AI video generation and editing. Free credits to start.", price: "freemium" },
  { name: "HeyGen", url: "https://heygen.com", icon: "🎭", category: "Video & Media", desc: "AI avatar videos. Free trial; paid for serious use.", price: "freemium" },

  // Pitch & Presentations
  { name: "Gamma", url: "https://gamma.app", icon: "✨", category: "Pitch & Presentations", desc: "AI-generated pitch decks in minutes. Free tier with Gamma branding.", price: "freemium" },
  { name: "Pitch", url: "https://pitch.com", icon: "🎯", category: "Pitch & Presentations", desc: "Polished pitch decks with collaboration. Free for individuals.", price: "freemium" },
  { name: "Tome", url: "https://tome.app", icon: "📕", category: "Pitch & Presentations", desc: "AI storytelling decks with embedded media.", price: "freemium" },
  { name: "Google Slides", url: "https://slides.google.com", icon: "📽️", category: "Pitch & Presentations", desc: "Reliable free baseline. Pair with Slidesgo for templates.", price: "free" },
  { name: "Slidesgo", url: "https://slidesgo.com", icon: "📚", category: "Pitch & Presentations", desc: "Free pitch deck templates for Google Slides and PowerPoint.", price: "freemium" },

  // Marketing & Outreach
  { name: "Buffer", url: "https://buffer.com", icon: "📅", category: "Marketing & Outreach", desc: "Schedule posts across IG, TikTok, LinkedIn. Free for 3 channels.", price: "freemium" },
  { name: "Mailchimp", url: "https://mailchimp.com", icon: "🐵", category: "Marketing & Outreach", desc: "Email marketing. Free up to 500 contacts.", price: "freemium" },
  { name: "Beehiiv", url: "https://beehiiv.com", icon: "🐝", category: "Marketing & Outreach", desc: "Modern newsletter platform. Free up to 2,500 subscribers.", price: "freemium" },
  { name: "HubSpot CRM", url: "https://www.hubspot.com/products/crm", icon: "🟧", category: "Marketing & Outreach", desc: "Track leads, deals, and customers. Free forever tier.", price: "freemium" },
  { name: "Linktree", url: "https://linktr.ee", icon: "🔗", category: "Marketing & Outreach", desc: "Free bio-link page for Instagram and TikTok.", price: "freemium" },
  { name: "Bitly", url: "https://bitly.com", icon: "🔗", category: "Marketing & Outreach", desc: "Shorten URLs and track clicks (UTM tracking). Free tier.", price: "freemium" },
  { name: "Google Analytics 4", url: "https://analytics.google.com", icon: "📊", category: "Marketing & Outreach", desc: "Track website traffic and conversions. Free.", price: "free" },
  { name: "Meta Ads Manager", url: "https://business.facebook.com", icon: "📱", category: "Marketing & Outreach", desc: "Run targeted Instagram and Facebook ads.", price: "pay-per-use" },
  { name: "TikTok Ads Manager", url: "https://ads.tiktok.com", icon: "🎵", category: "Marketing & Outreach", desc: "Run TikTok ads. Free setup, pay per ad.", price: "pay-per-use" },
  { name: "Google Ads", url: "https://ads.google.com", icon: "🔍", category: "Marketing & Outreach", desc: "Search ads. Free setup, pay per click.", price: "pay-per-use" },

  // Productivity & Cohort
  { name: "Notion", url: "https://notion.so", icon: "📋", category: "Productivity & Cohort", desc: "Notes, databases, team docs. Notion Plus is free for students with a .edu email.", price: "free-students" },
  { name: "Trello", url: "https://trello.com", icon: "📌", category: "Productivity & Cohort", desc: "Lightweight kanban boards. Free for small teams.", price: "freemium" },
  { name: "Linear", url: "https://linear.app", icon: "📐", category: "Productivity & Cohort", desc: "Issue tracker for digital teams. Free tier.", price: "freemium" },
  { name: "Calendly", url: "https://calendly.com", icon: "📅", category: "Productivity & Cohort", desc: "Schedule customer interviews and team meetings. Free tier.", price: "freemium" },
  { name: "Canvas LMS", url: "https://canvas.instructure.com", icon: "📚", category: "Productivity & Cohort", desc: "Cohort management and ongoing curriculum.", price: "free-students" },
];

const CATEGORIES = [...new Set(ALL_TOOLS.map((t) => t.category))];

export default function ToolsReference() {
  return (
    <section className="tools-reference" id="tools">
      <div className="container">
        <div className="section-header">
          <h2>🛠️ Tools &amp; Resources</h2>
          <p>Every tool you need, organized by category. Most have a free tier; we mark what each costs so you can plan.</p>
        </div>

        {/* Featured: GitHub Student Developer Pack + paid stack guide */}
        <div className="tools-featured">
          <div className="tools-featured__pack">
            <div className="tools-featured__badge">🎓 START HERE — FREE FOR STUDENTS</div>
            <h3 className="tools-featured__title">Claim the GitHub Student Developer Pack</h3>
            <p className="tools-featured__sub">
              If you have a <code>.edu</code> email, this single bundle is worth <strong>over $1,000</strong> in tools — and it's completely free. Claim it before you start.
            </p>
            <ul className="tools-featured__list">
              <li>🐙 <strong>GitHub Pro</strong> + <strong>GitHub Copilot</strong> (free)</li>
              <li>🌐 <strong>Free .me domain</strong> for one year via Namecheap</li>
              <li>📋 <strong>Notion Plus</strong> free for students</li>
              <li>📦 Hosting credits for <strong>DigitalOcean</strong>, <strong>Heroku</strong>, <strong>Microsoft Azure</strong></li>
              <li>🛠️ <strong>JetBrains</strong> IDE suite + 50 more dev tools</li>
            </ul>
            <a
              className="tools-featured__cta"
              href="https://education.github.com/pack"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎓 Claim GitHub Student Pack ↗
            </a>
          </div>

          <div className="tools-featured__paid">
            <div className="tools-featured__badge tools-featured__badge--paid">💰 IF YOU HAVE A BUDGET</div>
            <h3 className="tools-featured__title">Recommended paid stack</h3>
            <p className="tools-featured__sub">
              In priority order — buy in this sequence based on how serious you are about going past Day 2.
            </p>
            <ol className="tools-featured__paid-list">
              <li>
                <strong>ChatGPT Plus — $20/mo.</strong> Single best $20 a student spends. Image gen, Custom GPTs, GPT-5 access, deep reasoning.
              </li>
              <li>
                <strong>Canva Pro — $15/mo.</strong> Background remover, brand kit, magic write, premium templates.
              </li>
              <li>
                <strong>Domain — ~$10/year.</strong> Cloudflare or Porkbun. Required if going live.
              </li>
              <li>
                <strong>Claude Pro — $20/mo.</strong> Add only if you've maxed out ChatGPT and want better long-form writing.
              </li>
              <li>
                <strong>Cursor or Lovable — $20–25/mo.</strong> Only for digital-product teams actually shipping code.
              </li>
            </ol>
            <p className="tools-featured__paid-tip">
              💡 If you can only buy ONE thing, get ChatGPT Plus for month 1. Skip the rest until you actually need them.
            </p>
          </div>
        </div>

        {/* All tools by category */}
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
                    <div className="tool-reference-card__top">
                      <strong>{tool.name}</strong>
                      <span className={`tool-price tool-price--${tool.price}`}>{PRICE_LABEL[tool.price] || tool.price}</span>
                    </div>
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
