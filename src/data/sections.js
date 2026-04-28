// Each section has:
//   - top-level metadata (id, title, learning layer, etc.)
//   - taskPrompts: an ordered array of { task, prompts, byVentureType?, byStartingPoint? }
//
// Resolution rules in Section.jsx:
//   1. If taskPrompts[i].byStartingPoint[profile.startingPoint] exists, use it
//   2. Else if taskPrompts[i].byVentureType[profile.ventureType] exists, use it
//   3. Else use taskPrompts[i].prompts
//
// Placeholder substitution (handled by lib/prompt.js): [insert idea],
// [business name], [audience], [venture type], etc.

export const DAY1_SECTIONS = [
  {
    id: "brainstorming",
    day: 1,
    number: 1,
    collapsed_label: "💡 Generate & Validate Your Business Idea",
    title: "Brainstorming & Idea Development",
    whatWereDoing: "Generating, screening, and committing to one viable business idea.",
    whyItMatters:
      "We start here because everything else — your customers, your prototype, your pitch — only works once you've picked a direction worth chasing. The fastest way to lose a weekend is to keep waffling between ideas.",
    suggestedTime: "~Sat 9:00–10:30am",
    deliverables: [
      "Final selected idea",
      "Defined problem + solution statement + value proposition",
      "Team formed (3–5 members) with roles assigned",
    ],
    tools: [
      { name: "ChatGPT", url: "https://chat.openai.com", icon: "🤖" },
      { name: "Claude", url: "https://claude.ai", icon: "🧠" },
    ],
    tips: "Don't overthink — pick the idea with the clearest customer pain, not the 'coolest' tech. Conviction beats perfect.",
    taskPrompts: [
      {
        task: "Generate 10+ business ideas to choose from",
        prompts: [
          "Generate 10 [venture type] ideas a college student could realistically launch this weekend that could reach $1,000/month within 6 months. For each, give: target customer, the pain it solves, and one similar existing business.",
        ],
        byStartingPoint: {
          "rough-idea": [
            "I have a rough [venture type] idea: [insert idea]. Use the 'How might we…?' reframing technique — give me 5 sharper versions of this idea by reframing the problem in different ways.",
          ],
          "clear-idea": [
            "I have a clear [venture type] idea: [insert idea]. Pressure-test it like a skeptical investor. What are the 3 biggest risks, and what would I have to prove this weekend to de-risk them?",
          ],
        },
      },
      {
        task: "Apply Six Thinking Hats to your top 3 ideas",
        prompts: [
          "Use the Six Thinking Hats method to evaluate this idea: [insert idea]. Walk through each hat in order — White (just the facts), Red (gut feelings), Black (risks/weaknesses), Yellow (benefits/strengths), Green (creative twists), Blue (overall summary). End with a recommendation: pursue, refine, or skip.",
        ],
      },
      {
        task: "Define the problem, solution, and value proposition",
        prompts: [
          "For [insert idea], write three things: (1) a one-sentence problem statement, (2) a one-sentence solution, and (3) a value proposition in this exact format: \"For [target customer], who [pain or job to be done], [business name] is a [category] that [unique benefit] unlike [alternative].\"",
        ],
      },
      {
        task: "Form your team (3–5 people) and assign roles",
        prompts: [
          "We have a team of [X] people building [insert idea] this weekend. Suggest a clean way to split four ownership areas: customer/market, build/prototype, brand/marketing, and money/operations. Then propose a 5-minute daily check-in format we should use to stay coordinated.",
        ],
      },
    ],
  },
  {
    id: "market-research",
    day: 1,
    number: 2,
    collapsed_label: "🎯 Understand Your Industry, Market & Customer",
    title: "Industry, Market & Customer Research",
    whatWereDoing: "Mapping the industry you're entering, sizing up real and adjacent competitors in your market area, then going deep on the one customer you're for.",
    whyItMatters:
      "We do this immediately after picking the idea — before pricing or building anything — because every decision downstream is shaped by your market and your customer. Industry first, customer second: you can't describe your customer well until you know who else is selling to them.",
    suggestedTime: "~Sat 10:30am–12:00pm",
    deliverables: [
      "Industry landscape report (size, trends, regulations, demand signals)",
      "Competitor scan (direct + adjacent if direct competitors are scarce)",
      "2–3 written customer personas",
      "Completed Customer Empathy Map for primary persona",
      "List of 10 real potential first customers",
    ],
    tools: [
      { name: "ChatGPT", url: "https://chat.openai.com", icon: "🤖" },
      { name: "Claude", url: "https://claude.ai", icon: "🧠" },
    ],
    tips: "The best startups are built for ONE specific person, not everyone. Pick your primary customer and go deep before generalizing.",
    taskPrompts: [
      {
        task: "Pull an industry landscape report for your market area",
        prompts: [
          "Build an industry landscape report for [insert idea] in [market area]. Cover: (1) approximate market size (revenue and customer counts, with sources you'd check); (2) 3–5 key trends shaping this industry today; (3) regulatory or licensing considerations to be aware of; (4) demand signals (search volume, social interest, news coverage); (5) typical pricing benchmarks. Where you're uncertain, say 'I don't know — verify by checking X.' Format as a clean report with headings.",
        ],
      },
      {
        task: "Run a competitive scan in your market area",
        prompts: [
          "Find direct competitors for [insert idea] serving [market area]. Give me a table with name, what they offer, pricing (if known), and one weakness. If there are FEWER than 3 direct competitors in the area, also list: (a) the closest adjacent competitors (different product/service that solves the same job), and (b) what customers do today INSTEAD — including DIY, free, or cobbled-together alternatives. End with the one specific gap I could exploit.",
        ],
      },
      {
        task: "Build a Customer Empathy Map for your primary customer",
        prompts: [
          "Build a Customer Empathy Map for [audience], who would use [insert idea]. Fill in all six quadrants in detail: SAYS (verbatim quotes they'd use), THINKS (private thoughts they wouldn't share), DOES (observable actions/habits), FEELS (emotions), PAINS (frustrations and obstacles), and GAINS (what success looks like for them).",
        ],
      },
      {
        task: "Create 2–3 detailed personas",
        prompts: [
          "Create 2–3 detailed customer personas for [insert idea]. For each include: name, age, role/situation, daily routine, top 3 frustrations, top 3 goals, where they spend time online, and what would make them buy versus what would scare them off.",
        ],
      },
      {
        task: "Run a Three Circles competitor analysis",
        prompts: [
          "Do a Three Circles competitor analysis for [insert idea]. List 3 direct competitors. For each, fill in: what THEY offer, what WE'D offer, and what BOTH offer. The gaps are my Unique Selling Proposition. Show this as a table and end with a one-sentence USP I can use.",
        ],
      },
      {
        task: "Simulate 3 customer interviews with AI",
        prompts: [
          "Roleplay as a skeptical [audience] who is the target customer for [insert idea]. Ask me 10 hard questions a real customer would ask before buying — about price, trust, alternatives, urgency, and friction. Wait for my answers one at a time. After all 10, tell me which answers were weak.",
        ],
      },
      {
        task: "List 10 real potential first customers you can reach this weekend",
        prompts: [
          "Help me build a list of 10 specific real people I could reach out to this weekend who fit this customer profile: [audience]. Suggest where to find them (specific places, groups, classes, subreddits, Discord servers). For each suggestion, give me a one-sentence opener I could send.",
        ],
      },
    ],
  },
  {
    id: "pricing",
    day: 1,
    number: 3,
    collapsed_label: "💰 Design Your Revenue Model",
    title: "Pricing Strategy & Business Model",
    whatWereDoing: "Designing how money flows in — what to charge, who pays, and how often — using the Lean Canvas.",
    whyItMatters:
      "We do pricing right after research because pricing only makes sense once you know who you're for. $1,000/month is just 10 customers at $100 OR 100 customers at $10 — the choice you make here shapes everything else.",
    suggestedTime: "~Sat 1:00–2:30pm",
    deliverables: [
      "Chosen pricing strategy with rationale",
      "Path to $1,000/month with three revenue scenarios",
      "Completed Lean Canvas",
    ],
    tools: [
      { name: "ChatGPT", url: "https://chat.openai.com", icon: "🤖" },
      { name: "Claude", url: "https://claude.ai", icon: "🧠" },
    ],
    tips: "Start with fewer customers at higher prices. 10 customers at $100 is dramatically easier than 100 at $10.",
    taskPrompts: [
      {
        task: "Choose a pricing strategy with rationale",
        prompts: [
          "Recommend 3 pricing strategies for [insert idea], pulled from these options: cost-led, penetration (start low to grab share), skimming (start high), bundling, freemium, subscription, one-time, and odd-number psychology ($9.99 vs $10). For each, give: pros, cons, and an example price for my product. End with which one you'd pick and why.",
        ],
        byVentureType: {
          service: [
            "Recommend 3 pricing approaches for [insert idea] (a service business). Compare: hourly, per-project, monthly retainer, and value-based pricing. For each: pros, cons, an example price range, and which type of customer it fits. End with your recommendation.",
          ],
          product: [
            "Recommend 3 pricing approaches for [insert idea] (a physical product). Walk through: cost-led (cost + markup), competitive, premium positioning, and bundling. Show me the math for cost-led using a $X unit cost. End with your recommendation.",
          ],
          digital: [
            "Recommend 3 pricing approaches for [insert idea] (a digital product / app / SaaS). Compare: freemium with paid tiers, flat monthly subscription, usage-based, and one-time license. For each: pros, cons, example pricing, and best customer fit. End with your recommendation.",
          ],
        },
      },
      {
        task: "Reverse-engineer the path to $1,000/month",
        prompts: [
          "Reverse-engineer the path to $1,000/month for [insert idea]. Show me 3 scenarios: low-volume/high-price, mid, and high-volume/low-price. For each, give: number of customers, price point, total revenue, conversion rate I'd need, and how many leads/visitors that requires. End by picking the most realistic for a weekend launch.",
        ],
      },
      {
        task: "Apply Jobs-to-be-Done to your pricing",
        prompts: [
          "Apply Jobs-to-be-Done thinking to [insert idea]. The customer isn't buying my product — they're hiring it to do a job. List the functional job, emotional job, and social job they're hiring it for. Then suggest how each job changes how I should price and position it.",
        ],
      },
      {
        task: "Fill in the Lean Canvas (one-pager business model)",
        prompts: [
          "Fill in a complete Lean Canvas for [insert idea]. Walk through all 9 boxes in this order: Problem (top 3), Customer Segments, Unique Value Proposition, Solution, Channels, Revenue Streams, Cost Structure, Key Metrics, and Unfair Advantage. Be specific — no fluff. Format as a clear list I can copy into a doc.",
        ],
      },
    ],
  },
  {
    id: "prototype",
    day: 1,
    number: 4,
    collapsed_label: "🛠️ Create a Visual Prototype",
    title: "Prototype Creation",
    whatWereDoing: "Building something tangible enough that a customer can react to it — not perfect, just real.",
    whyItMatters:
      "We prototype before branding or launch because a scrappy prototype gets a 'yes, I'd pay for that' that no slide deck ever will. The Build-Measure-Learn loop only works if you have something to put in front of people.",
    suggestedTime: "~Sat 2:30–5:00pm",
    deliverables: [
      "Visual prototype, mockup, or process map (screenshots OK)",
      "Written offer description",
      "1 sample deliverable as proof of concept",
    ],
    tools: [
      { name: "Canva AI", url: "https://canva.com", icon: "🎨" },
      { name: "Figma", url: "https://figma.com", icon: "📐" },
      { name: "v0 by Vercel", url: "https://v0.dev", icon: "▲" },
      { name: "Lovable", url: "https://lovable.dev", icon: "💜" },
      { name: "Bolt.new", url: "https://bolt.new", icon: "⚡" },
      { name: "ChatGPT", url: "https://chat.openai.com", icon: "🤖" },
      { name: "Microsoft Designer", url: "https://designer.microsoft.com", icon: "🖼️" },
    ],
    tips: "A prototype doesn't have to be perfect — it just has to be real enough for someone to say 'yes, I'd pay for that.'",
    taskPrompts: [
      {
        task: "Build the right kind of prototype for your venture",
        prompts: [
          "Sketch a basic prototype concept for [insert idea]. Describe what it should look like, what an early customer would interact with, and what tool would be fastest to build it.",
        ],
        byVentureType: {
          service: [
            "Map the step-by-step service workflow for [insert idea]. Walk through every customer touchpoint from 'first hears about us' through 'completes the service' to 'tells a friend.' For each step show: customer action, our action, tool we'd use, and time it takes. Format as a numbered list.",
            "Create a Standard Operating Procedure (SOP) for delivering [insert idea] to one customer. Be specific enough that a teammate could follow it without me there. Include: prep steps, delivery steps, follow-up, and quality checks.",
          ],
          product: [
            "Write a detailed image generation prompt I can paste into Midjourney, DALL·E, or Canva AI to generate a 3D product mockup of [insert idea]. Include: angles (3/4 hero shot, top-down, in-use), lighting, background, materials, and brand mood. Give me 3 alternative prompts for variety.",
            "List the materials, packaging, and basic manufacturing approach for a small first run (10–20 units) of [insert idea]. For each: estimated unit cost, where to source it, and the minimum order. Also flag any regulations I'd need to check (FDA, electrical, etc.).",
          ],
          digital: [
            "Write a screen-by-screen wireframe spec for [insert idea]. List 5–7 core screens. For each: the screen's job, the key elements on it, and the user action it enables. Format as a numbered outline I could hand to a designer or paste into v0/Lovable/Bolt.",
            "Recommend a tech stack for an MVP of [insert idea] that I could ship this weekend. Compare 2 options for each layer: frontend, backend/data, auth, hosting. End with the simplest 'just ship it' stack and the most scalable stack.",
          ],
        },
      },
      {
        task: "Write your offer description (what customers actually get)",
        prompts: [
          "Write a clear, compelling offer description for [insert idea]. Use this structure: (1) what customers get, in plain language; (2) what's included (3-5 bullet points); (3) the price; (4) the guarantee or risk-reversal; (5) how to get started (the CTA). Tone: confident, not salesy.",
        ],
      },
      {
        task: "Build one sample deliverable as proof",
        prompts: [
          "I need to build ONE sample deliverable this weekend that proves [insert idea] is real. Suggest 3 options ranked by 'easiest to fastest impact.' For each, list what the sample is, what tool I'd use, and roughly how long it'd take.",
        ],
        byVentureType: {
          service: [
            "I'm offering [insert idea] (a service). Suggest 3 sample deliverables I could produce this weekend that prove the service works — like a sample report, before/after, or short demo. For each, list what it shows, time to make, and what tool I'd use.",
          ],
          product: [
            "I'm building [insert idea] (a physical product). Suggest 3 lightweight ways to fake a finished product this weekend — like rendered images, a paper mockup, or 3D-printed dummy. For each, list materials needed and time required.",
          ],
          digital: [
            "I'm building [insert idea] (a digital product). Suggest 3 ways to demo it this weekend without writing real code — like a Figma clickable prototype, a Loom walkthrough, or a Lovable/v0/Bolt scaffold. For each, list the tool, time, and what it'd actually show a customer.",
          ],
        },
      },
    ],
  },
];

export const DAY2_SECTIONS = [
  {
    id: "brand-identity",
    day: 2,
    number: 5,
    collapsed_label: "🎨 Build Your Brand Identity",
    title: "Brand Identity",
    whatWereDoing: "Naming, designing, and packaging your business so it feels trustworthy at first glance.",
    whyItMatters:
      "Day 2 starts with brand because customers judge you in 3 seconds. A clean brand earns the right to be heard before you've explained anything. Before this you had a prototype; now you make it look real.",
    suggestedTime: "~Sun 9:00–10:30am",
    deliverables: [
      "Final brand kit (name, logo, colors, fonts, voice)",
      "Domain name selected",
      "Business card and one-page flyer designed",
    ],
    tools: [
      { name: "Canva AI", url: "https://canva.com", icon: "🎨" },
      { name: "Microsoft Designer", url: "https://designer.microsoft.com", icon: "🖼️" },
      { name: "Ideogram", url: "https://ideogram.ai", icon: "🔠" },
      { name: "Hatchful", url: "https://hatchful.shopify.com", icon: "🐣" },
      { name: "Recraft", url: "https://recraft.ai", icon: "✏️" },
      { name: "Porkbun", url: "https://porkbun.com", icon: "🐷" },
      { name: "Cloudflare Domains", url: "https://www.cloudflare.com/products/registrar/", icon: "🟧" },
    ],
    tips: "Your brand should feel like it costs 10× what you charge. First impressions are everything — invest the time here.",
    taskPrompts: [
      {
        task: "Generate brand name candidates",
        prompts: [
          "Generate 15 brand name candidates for this business: [insert idea]. Mix three styles: (1) descriptive (says what we do), (2) inventive/coined (made-up but memorable), and (3) narrative (hints at the story or feeling). For each, check that it's easy to spell, pronounce, and search. Note any obvious .com risk.",
        ],
        byVentureType: {
          product: [
            "Generate 15 brand name candidates for this physical product: [insert idea]. Lean into names that feel ownable on a label or package. Mix descriptive, inventive, and narrative styles. For each: ease of spelling, .com likely available, and how it'd feel printed on packaging.",
          ],
          service: [
            "Generate 15 brand name candidates for this service business: [insert idea]. Lean into names that feel personal, trustworthy, and that work when said out loud (e.g. on a phone). Mix descriptive, inventive, and narrative styles.",
          ],
        },
      },
      {
        task: "Build a brand style guide (colors, fonts, voice)",
        prompts: [
          "Create a complete brand style guide for [business name]: [insert idea]. Include: 1-line brand mission, 5 brand voice adjectives, color palette (3 colors with hex codes — primary, accent, neutral), font pairing (one heading, one body, both Google-Fonts-available), and 2 logo concepts described in detail enough that I can generate them with Canva or DALL·E.",
        ],
      },
      {
        task: "Write taglines that communicate your value prop",
        prompts: [
          "Write 8 tagline options for [business name] that communicate the value proposition in under 8 words. Mix 3 styles: (1) clear and functional, (2) emotional and aspirational, (3) playful and unexpected. For each, give a one-line note on when this tagline would shine.",
        ],
      },
      {
        task: "Choose and secure a domain name",
        prompts: [
          "Suggest 10 domain name options for [business name]. Mix .com, .co, .ai, .io, and creative TLDs. Each should be 12 characters or fewer in the SLD. Note any obvious squatter risks. End with a top-3 ranked list and what to check before buying.",
        ],
      },
    ],
  },
  {
    id: "digital-presence",
    day: 2,
    number: 6,
    collapsed_label: "🌐 Launch Your Online Presence",
    title: "Website, Video & Digital Presence",
    whatWereDoing: "Putting your business online so a stranger can find you, trust you, and buy from you.",
    whyItMatters:
      "Today this is your storefront, business card, and salesperson all rolled into one. The Website Builder Wizard below converts your venture profile into a clean spec you can hand to Framer, Carrd, or Wix — so you skip the blank page.",
    suggestedTime: "~Sun 10:30am–1:00pm",
    deliverables: [
      "Live website URL with email capture",
      "30-second video commercial",
      "Active social media accounts (3 platforms)",
      "5 social posts ready to publish",
    ],
    tools: [
      { name: "Framer", url: "https://framer.com", icon: "🎨" },
      { name: "Carrd", url: "https://carrd.co", icon: "🪪" },
      { name: "Cloudflare Pages", url: "https://pages.cloudflare.com", icon: "🟧" },
      { name: "GitHub Pages", url: "https://pages.github.com", icon: "🐙" },
      { name: "Notion Sites", url: "https://www.notion.com/help/sites", icon: "📋" },
      { name: "Lovable", url: "https://lovable.dev", icon: "💜" },
      { name: "CapCut", url: "https://capcut.com", icon: "✂️" },
      { name: "Loom", url: "https://loom.com", icon: "📹" },
      { name: "Descript", url: "https://descript.com", icon: "📝" },
    ],
    tips: "Your website only needs to do 3 things: explain what you do, prove you're credible, and make it easy to buy. Keep it simple.",
    taskPrompts: [
      {
        task: "Write homepage copy that converts",
        prompts: [
          "Write conversion-focused homepage copy for [business name]: [insert idea]. Include: a hero headline (under 10 words), a subheadline (under 25 words), 3 benefit bullets, 1 social-proof line (placeholder), a primary CTA button, and a 2-sentence about-the-founder paragraph. Tone: clear, confident, not salesy.",
        ],
      },
      {
        task: "Write a 30-second video commercial script",
        prompts: [
          "Write a 30-second video commercial script for [insert idea] targeting [audience]. Use this structure: HOOK (first 3 seconds — pattern interrupt or question), PROBLEM (5–8 sec — show the pain), SOLUTION (10–12 sec — your product in action), PROOF (3–5 sec — social proof or guarantee), CTA (last 5 sec — single clear action). Include shot directions for each beat.",
        ],
        byVentureType: {
          service: [
            "Write a 30-second video commercial script for [insert idea] (a service). Open with a real customer's frustration, show the moment of relief when they hire you, and end with how to book. Include shot directions and one-line voiceover for each beat.",
          ],
          product: [
            "Write a 30-second video commercial script for [insert idea] (a physical product). Open with a problem visual, show the product solving it (close-ups, hands using it, results), and end with where to buy. Include shot directions for product b-roll.",
          ],
          digital: [
            "Write a 30-second video commercial script for [insert idea] (a digital product/app). Use UI screen captures as the main visual. Open with the pain point, show the product in 3-4 quick UI moments solving it, end with sign-up CTA.",
          ],
        },
      },
      {
        task: "Set up social accounts and write 5 posts",
        prompts: [
          "Plan a 7-day social launch for [business name]: [insert idea]. Across Instagram, TikTok, and LinkedIn, give me 5 posts. Mix: (1) educational (teach something about the problem), (2) behind-the-scenes (build in public), (3) testimonial-style (placeholder), (4) launch announcement, (5) hard call-to-action. For each: caption, hashtags, and a simple visual idea.",
        ],
      },
      {
        task: "Use the Website Builder Wizard below",
        prompts: [
          "I want to launch a simple landing page this weekend. Suggest the simplest 3-page structure for [insert idea] and which AI website builder I should use (Framer.ai, Carrd, Wix ADI, or Canva) given a beginner's skill level and 1 hour of time.",
        ],
      },
    ],
  },
  {
    id: "marketing",
    day: 2,
    number: 7,
    collapsed_label: "📣 Launch a $50 Marketing Campaign",
    title: "$50 Marketing Strategy",
    whatWereDoing: "Putting real money in front of real strangers to learn what actually moves them — using STP (Segment, Target, Position).",
    whyItMatters:
      "Marketing without testing is theory. Spending $50 forces you to make hard tradeoffs about who you're really for and gets you signal on what works — far better than another planning meeting.",
    suggestedTime: "~Sun 1:00–2:30pm",
    deliverables: [
      "$50 budget allocation across channels",
      "2–3 ad creatives ready to publish",
      "Defined target audience (demographics + interests + psychographics)",
      "Tracking setup (UTM links + a way to count signups)",
    ],
    tools: [
      { name: "ChatGPT", url: "https://chat.openai.com", icon: "🤖" },
      { name: "Canva", url: "https://canva.com", icon: "🎨" },
      { name: "CapCut", url: "https://capcut.com", icon: "✂️" },
      { name: "Buffer", url: "https://buffer.com", icon: "📅" },
      { name: "Mailchimp", url: "https://mailchimp.com", icon: "🐵" },
      { name: "Linktree", url: "https://linktr.ee", icon: "🔗" },
      { name: "Bitly", url: "https://bitly.com", icon: "🔗" },
      { name: "Google Analytics", url: "https://analytics.google.com", icon: "📊" },
      { name: "Meta Ads", url: "https://business.facebook.com", icon: "📱" },
      { name: "TikTok Ads", url: "https://ads.tiktok.com", icon: "🎵" },
      { name: "Google Ads", url: "https://ads.google.com", icon: "🔍" },
    ],
    tips: "The best $50 spend is direct outreach to 50 warm contacts. No ad platform beats a personal message from a founder.",
    taskPrompts: [
      {
        task: "Apply STP — Segment, Target, Position",
        prompts: [
          "Walk me through STP (Segment / Target / Position) for [insert idea]. Step 1: list 4 customer segments who could benefit. Step 2: pick the ONE segment to target this weekend, with reasoning. Step 3: write the positioning statement: \"For [target], who [need], [business name] is the [category] that [unique benefit] because [proof].\"",
        ],
      },
      {
        task: "Allocate the $50 budget across channels",
        prompts: [
          "I have $50 to spend on marketing for [insert idea] this weekend. Compare 4 options: (1) Meta/Instagram ads, (2) Google Search ads, (3) direct outreach (DMs/email to 50 warm contacts — free but time-intensive), (4) one micro-influencer partnership. Recommend the best split and explain why. Be honest if any options are bad ideas at this budget.",
        ],
      },
      {
        task: "Write 3 ad creatives in different angles",
        prompts: [
          "Write 3 ad creative variations for [insert idea] targeting [audience]. Each should have a different ANGLE: (1) pain-led (lead with the problem), (2) outcome-led (lead with the result they want), (3) curiosity-led (lead with a surprising claim). For each: 1-line hook, 2-sentence body, 1 CTA, and a description of the visual.",
        ],
        byVentureType: {
          product: [
            "Write 3 ad creatives for [insert idea] (a physical product) targeting [audience]. Each: hook, body, CTA, and a visual that shows the product clearly. Include a 'before/after' creative.",
          ],
          digital: [
            "Write 3 ad creatives for [insert idea] (a digital product/app) targeting [audience]. Each: hook, body, CTA, and a visual idea (could be a UI screenshot, a result chart, or a customer face). Include one with a free-trial angle.",
          ],
        },
      },
      {
        task: "Write a personal outreach message for 50 warm contacts",
        prompts: [
          "Write a short, personal outreach message I could send to 50 warm contacts for [insert idea]. Make it under 5 sentences, mention I'm in a startup weekend, ask for one specific thing (not a sale — feedback, an intro, or 5 minutes of their time), and end with no pressure. Give me 3 versions in different tones: friendly, professional, and direct.",
        ],
      },
    ],
  },
  {
    id: "pitch",
    day: 2,
    number: 8,
    collapsed_label: "🏆 Deliver Your Pitch",
    title: "Pitch & Presentation",
    whatWereDoing: "Telling your business story in 5 minutes so judges and customers FEEL it — using a Vision/Mission/SMART-Goals frame and a clear Ask.",
    whyItMatters:
      "Great ideas die in bad pitches. The skill of explaining your business clearly is the one you'll use every single day if you keep going. The pitch is also the moment your team aligns on what the business actually IS.",
    suggestedTime: "~Sun 3:00–5:00pm",
    deliverables: [
      "Vision, Mission, and 3 SMART Goals written down",
      "10-slide pitch deck",
      "Practiced and timed delivery (5 minutes)",
      "Q&A prep document with 10 hard questions answered",
    ],
    tools: [
      { name: "Gamma", url: "https://gamma.app", icon: "✨" },
      { name: "Pitch", url: "https://pitch.com", icon: "🎯" },
      { name: "Tome", url: "https://tome.app", icon: "📕" },
      { name: "Canva", url: "https://canva.com", icon: "🎨" },
      { name: "Google Slides", url: "https://slides.google.com", icon: "📽️" },
      { name: "Slidesgo", url: "https://slidesgo.com", icon: "📚" },
      { name: "Claude", url: "https://claude.ai", icon: "🧠" },
      { name: "ChatGPT", url: "https://chat.openai.com", icon: "🤖" },
    ],
    tips: "The best pitches tell a story, not a business plan. Start with a real customer problem, not features. Practice out loud — not in your head.",
    taskPrompts: [
      {
        task: "Write your Vision, Mission, and 3 SMART Goals",
        prompts: [
          "For [business name]: [insert idea], write three things: (1) Vision — the long-term world we're trying to create (1 sentence, ambitious); (2) Mission — what we do every day to get there (1 sentence, concrete); (3) Three SMART Goals for the next 90 days (Specific, Measurable, Achievable, Relevant, Time-bound). Make them honest and reachable.",
        ],
      },
      {
        task: "Build the 10-slide pitch deck outline",
        prompts: [
          "Create a 10-slide pitch deck outline for [insert idea]. Use this exact structure, one slide per item: (1) Hook/Title, (2) Problem, (3) Solution, (4) Demo or Prototype, (5) Market & Customer, (6) Business Model, (7) Traction (what we've done this weekend), (8) Team, (9) The Ask (what we want from judges/audience), (10) Close. For each slide, give: headline, 3 bullet points max, and what visual goes on it.",
        ],
      },
      {
        task: "Practice your pitch with an AI VC simulation",
        prompts: [
          "I'm going to give you my pitch for [insert idea]. Roleplay as a tough but fair VC investor. Score me 1–10 on each of: (1) clarity of the problem, (2) believability of the solution, (3) market sizing, (4) team credibility, (5) The Ask. Then give me my single biggest weak spot and one specific thing to fix in the next 30 minutes. Here's my pitch: [insert pitch]",
        ],
      },
      {
        task: "Prep for hard Q&A",
        prompts: [
          "Generate the 10 hardest questions a judge or VC could ask about [insert idea] — covering market size, competition, team experience, pricing, scalability, defensibility, and what happens if [obvious threat]. For each question, write a 2-sentence confident answer I could deliver under pressure. Flag the 2 questions where my answer is weakest and tell me what to research before the pitch.",
        ],
      },
    ],
  },
];

export const POST_SECTIONS = [
  {
    id: "cohort",
    day: "post",
    number: 9,
    collapsed_label: "📈 6-Month Growth Cohort",
    title: "Growth & Accountability",
    whatWereDoing: "Setting up the rhythm to actually go from prototype to paying customers over 6 months — using Build-Measure-Learn and a quarterly Go/No-Go decision.",
    whyItMatters:
      "Most weekend ideas die on Monday — not because the idea was bad but because there's no structure to keep going. The cohort gives you milestones, peers, and a forcing function.",
    suggestedTime: "Starts the Monday after the weekend",
    deliverables: [
      "30/60/90-day milestones with SMART goals",
      "Accountability pod assigned (3–4 teammates)",
      "Monthly check-in schedule and review template",
    ],
    tools: [
      { name: "Canvas LMS", url: "https://canvas.instructure.com", icon: "📚" },
      { name: "Notion", url: "https://notion.so", icon: "📋" },
      { name: "Trello", url: "https://trello.com", icon: "📌" },
      { name: "Calendly", url: "https://calendly.com", icon: "📅" },
      { name: "HubSpot CRM", url: "https://www.hubspot.com/products/crm", icon: "🟧" },
      { name: "ChatGPT", url: "https://chat.openai.com", icon: "🤖" },
    ],
    tips: "Revenue is the only metric that matters. Every week ask: 'What did I do this week to get closer to my first paying customer?'",
    taskPrompts: [
      {
        task: "Set 30/60/90-day milestones",
        prompts: [
          "Build a 30/60/90-day plan for [insert idea] with the goal of reaching $1,000/month within 6 months. For each phase, give: 3 SMART goals, the single most important metric to track, and 1 thing to STOP doing. End with the leading indicator I should watch weekly.",
        ],
      },
      {
        task: "Run Customer Discovery interviews each week",
        prompts: [
          "Design a Customer Discovery interview script I can run this week with 5 potential customers of [insert idea]. The goal is to validate the problem, not pitch the solution. Include: 3 opening questions, 5 problem-discovery questions (open-ended), 2 solution-test questions, and 1 'would you pay $X' question. End with the signs I should listen for that mean we should pivot.",
        ],
      },
      {
        task: "Do a monthly Feasibility Analysis",
        prompts: [
          "Run a Feasibility Analysis for [insert idea] across 3 dimensions: (1) Organizational — do we have the team, time, and skills?; (2) Financial — does the unit economics work, and what's the runway?; (3) Market — is there real demand and a path to scale? For each, score 1–10 and explain. End with the single biggest feasibility risk for the next 30 days.",
        ],
      },
      {
        task: "Make a quarterly Go / No-Go / Pivot decision",
        prompts: [
          "I made $[X] last month working on [insert idea]. Help me make a Go / No-Go / Pivot call. Diagnose: (1) what's working, (2) what's not, (3) what assumptions have been validated or broken. Recommend GO (double down), NO-GO (shut it down), or PIVOT (change a key assumption). Give me 3 specific actions for the next 30 days based on your call.",
        ],
      },
    ],
  },
];
