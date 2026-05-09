// Each section has:
//   - top-level metadata (id, title, learning layer, etc.)
//   - taskPrompts: an ordered array of { task, lesson, prompts, byVentureType?, byStartingPoint? }
//
// Resolution rules in Section.jsx:
//   1. If taskPrompts[i].byStartingPoint[profile.startingPoint] exists, use it
//   2. Else if taskPrompts[i].byVentureType[profile.ventureType] exists, use it
//   3. Else use taskPrompts[i].prompts
//
// `lesson` is a task-level explanation of WHY this task matters and HOW the
// AI output helps the student. Surfaced via a "📚 Lesson" button next to
// each prompt's Copy / Open in ChatGPT / Open in Claude actions.
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
    suggestedTime: "Day 1 · 9:00–10:30am",
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
        lesson:
          "Why generate 10 ideas, not 1? Because the first idea is rarely the best one. Founders who pick from a longer list end up with a more defensible business — they can pattern-match and spot the strongest fit for THEIR skills and customer. Use the AI for cheap variety; you bring the judgment.",
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
        lesson:
          "Edward de Bono's Six Hats forces you to look at one idea from six perspectives — facts (White), feelings (Red), risks (Black), benefits (Yellow), creativity (Green), big-picture summary (Blue). Most founders accidentally only wear one or two hats. The AI walks you through ALL six so blind spots surface BEFORE you commit.",
        prompts: [
          "Use the Six Thinking Hats method to evaluate this idea: [insert idea]. Walk through each hat in order — White (just the facts), Red (gut feelings), Black (risks/weaknesses), Yellow (benefits/strengths), Green (creative twists), Blue (overall summary). End with a recommendation: pursue, refine, or skip.",
        ],
      },
      {
        task: "Define the problem, solution, and value proposition",
        lesson:
          "Until you can finish the sentence \"For [target], [name] is a [category] that [benefit] unlike [alternative]\" — your idea is too vague to research, price, or pitch. This template forces clarity early. The AI's job is to wordsmith it; YOUR job is to know your customer well enough to fill in the blanks.",
        prompts: [
          "For [insert idea], write three things: (1) a one-sentence problem statement, (2) a one-sentence solution, and (3) a value proposition in this exact format: \"For [target customer], who [pain or job to be done], [business name] is a [category] that [unique benefit] unlike [alternative].\"",
        ],
      },
      {
        task: "Form your team (3–5 people) and assign roles",
        lesson:
          "Roles avoid the worst startup-weekend failure mode: everyone doing everything, no one finishing anything. Splitting customer / build / brand / money creates clear ownership in 48 hours. Without ownership, the team defaults to consensus on every tiny decision — and consensus burns time you don't have.",
        prompts: [
          "We have a team of [X] people building [insert idea] this weekend. Suggest a clean way to split four ownership areas: customer/market, build/prototype, brand/marketing, and money/operations. Then propose a 5-minute daily check-in format we should use to stay coordinated.",
        ],
      },
      {
        task: "📋 Create your FINAL Business Idea (paste into workbook)",
        isFinal: true,
        lesson:
          "This is the wrap-up step. Run this prompt to compile everything from this section into one clean block, then paste the AI's reply into the 📋 Final output box of your notebook. That block is what gets exported to your custom GPT brief — it becomes the canonical description of your business going forward.",
        prompts: [
          "Create a FINAL Business Idea description for [insert idea] that I will paste into my workbook. Include exactly: (1) the chosen idea in 1 sentence, (2) the problem it solves, (3) the solution / how it works, (4) the value proposition in this exact format: \"For [target customer], who [pain], [business name] is a [category] that [unique benefit] unlike [alternative].\" Keep it tight — no bullet padding, no preamble. Output ONLY the final text I should paste in.",
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
    suggestedTime: "Day 1 · 10:30am–12:00pm",
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
      { name: "NotebookLM", url: "https://notebooklm.google.com", icon: "📓" },
    ],
    tips: "The best startups are built for ONE specific person, not everyone. Pick your primary customer and go deep before generalizing.",
    taskPrompts: [
      {
        task: "Pull an industry landscape report for your market area",
        lesson:
          "You need a 30,000-foot view of the industry BEFORE you go deep on customers. The landscape report tells you whether the market is growing, regulated, saturated, or has unexploited gaps — all things that change whether your idea is even viable. The NotebookLM version is more rigorous because it grounds responses in sources you upload, instead of trusting whatever the AI 'remembers' about your industry.",
        prompts: [
          "Build an industry landscape report for [insert idea] in [market area]. Cover: (1) approximate market size (revenue and customer counts, with sources you'd check); (2) 3–5 key trends shaping this industry today; (3) regulatory or licensing considerations to be aware of; (4) demand signals (search volume, social interest, news coverage); (5) typical pricing benchmarks. Where you're uncertain, say 'I don't know — verify by checking X.' Format as a clean report with headings.",
          "Source-grounded version (paste into NotebookLM at notebooklm.google.com — free with a Google account). FIRST: gather 5–10 real sources about your industry (competitor websites, news articles, Reddit threads, YouTube interviews, government reports, trade-association pages) and add them as Sources in a new NotebookLM notebook. THEN ask: \"I'm launching [insert idea] in [market area]. Using ONLY the sources I've added, build a briefing doc covering (1) the current state of this industry, (2) the top 3 trends shaping it, (3) the 3 biggest opportunities a small new entrant could exploit, (4) the 3 biggest risks or barriers to entry, (5) any specific players I should know. Cite which source each claim comes from. End with the most important question that's NOT answered by these sources and how I'd find it.\" After you get the briefing, click 'Audio Overview' to generate a 10-minute podcast you can listen to while you work.",
        ],
      },
      {
        task: "Run a competitive scan in your market area",
        lesson:
          "Most students skip competitor research because they assume their idea is unique. It isn't. Even when there are no direct competitors, customers are solving the problem somehow today — with DIY, free tools, or substitutes. The 'what they do INSTEAD' lens reveals your real competition. If a customer is happy with their current workaround, you have to be 10x better, not 10% different.",
        prompts: [
          "Find direct competitors for [insert idea] serving [market area]. Give me a table with name, what they offer, pricing (if known), and one weakness. If there are FEWER than 3 direct competitors in the area, also list: (a) the closest adjacent competitors (different product/service that solves the same job), and (b) what customers do today INSTEAD — including DIY, free, or cobbled-together alternatives. End with the one specific gap I could exploit.",
        ],
      },
      {
        task: "Build a Customer Empathy Map for your primary customer",
        lesson:
          "The Empathy Map (Says / Thinks / Does / Feels / Pains / Gains) goes deeper than demographics. It captures the gap between what customers say in PUBLIC and what they think in PRIVATE — which is where the buying decision actually happens. Generic personas describe the customer; empathy maps explain why they buy.",
        prompts: [
          "Build a Customer Empathy Map for [audience], who would use [insert idea]. Fill in all six quadrants in detail: SAYS (verbatim quotes they'd use), THINKS (private thoughts they wouldn't share), DOES (observable actions/habits), FEELS (emotions), PAINS (frustrations and obstacles), and GAINS (what success looks like for them).",
        ],
      },
      {
        task: "Create 2–3 detailed personas",
        lesson:
          "Personas are NOT the same as your audience. An audience is statistical (e.g. 'nursing students 18–25'). Personas are specific people with names, goals, and frustrations. Brands speak to personas; statistics don't buy products.",
        prompts: [
          "Create 2–3 detailed customer personas for [insert idea]. For each include: name, age, role/situation, daily routine, top 3 frustrations, top 3 goals, where they spend time online, and what would make them buy versus what would scare them off.",
        ],
      },
      {
        task: "Run a Three Circles competitor analysis",
        lesson:
          "The Three Circles tool surfaces your Unique Selling Proposition (USP) by visualizing what only YOU offer, what overlaps with competitors, and what only THEY offer. The gap between circles is where you have a chance to win. If your circle has nothing unique, it's time to refocus your offer before going further.",
        prompts: [
          "Do a Three Circles competitor analysis for [insert idea]. List 3 direct competitors. For each, fill in: what THEY offer, what WE'D offer, and what BOTH offer. The gaps are my Unique Selling Proposition. Show this as a table and end with a one-sentence USP I can use.",
        ],
      },
      {
        task: "Simulate 3 customer interviews with AI",
        lesson:
          "Real customer interviews are the gold standard, but you don't have time for them this weekend. The AI roleplay lets you stress-test your assumptions in 10 minutes — finding the question you can't yet answer is the goal, not the perfect script. The questions that stumped you become the ones to ask real customers in week 1.",
        prompts: [
          "Roleplay as a skeptical [audience] who is the target customer for [insert idea]. Ask me 10 hard questions a real customer would ask before buying — about price, trust, alternatives, urgency, and friction. Wait for my answers one at a time. After all 10, tell me which answers were weak.",
        ],
      },
      {
        task: "List 10 real potential first customers you can reach this weekend",
        lesson:
          "Making a list of 10 specific real people forces you out of theory. If you can't name 10 individuals who'd want this, the idea hasn't found a customer yet — and that's important to know NOW, not after you've built it. The list is also your warm-outreach starting point for Day 2's marketing.",
        prompts: [
          "Help me build a list of 10 specific real people I could reach out to this weekend who fit this customer profile: [audience]. Suggest where to find them (specific places, groups, classes, subreddits, Discord servers). For each suggestion, give me a one-sentence opener I could send.",
        ],
      },
      {
        task: "📋 Create your FINAL Market & Customer Brief (paste into workbook)",
        isFinal: true,
        lesson:
          "This is the wrap-up step. Run this prompt to compile your industry, competitor, persona, and customer-list work into one clean block, then paste the AI's reply into the 📋 Final output box of your notebook. That block becomes part of your custom GPT brief so the GPT knows your market.",
        prompts: [
          "Create a FINAL Market & Customer Brief for [insert idea] in [market area] that I will paste into my workbook. Include in this exact order: (1) industry one-liner — size, growth, key trend; (2) top 3 competitors, one line each, plus the gap I'm exploiting; (3) primary persona — name, age, situation, top frustration, top goal, where to find them; (4) my 10 specific real first-customer prospects (or the channels to find them); (5) my Unique Selling Proposition in one sentence. No filler. Output ONLY the final text I should paste in.",
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
    suggestedTime: "Day 1 · 12:45–2:15pm (after lunch)",
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
        lesson:
          "Pricing is the single biggest lever in your business — a 10% price change has roughly 5x the profit impact of a 10% volume change. There are at least 7 named pricing strategies (cost-led, penetration, skimming, freemium, bundling, subscription, odd-number psychology) and the right one depends on your customer's price sensitivity and willingness to pay, not your costs. Picking the wrong strategy means leaving real money on the table for the next 6 months.",
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
        lesson:
          "$1,000/month sounds small until you do the math. Reverse-engineering it forces you to confront a question most founders avoid: 'Can I realistically get N customers at $X each in 6 months?' If the answer is no, change the price or the customer. This is the moment most idea-stage businesses become real or get rejected.",
        prompts: [
          "Reverse-engineer the path to $1,000/month for [insert idea]. Show me 3 scenarios: low-volume/high-price, mid, and high-volume/low-price. For each, give: number of customers, price point, total revenue, conversion rate I'd need, and how many leads/visitors that requires. End by picking the most realistic for a weekend launch.",
        ],
      },
      {
        task: "Apply Jobs-to-be-Done to your pricing",
        lesson:
          "Clayton Christensen's framework: customers don't buy products, they 'hire' them to do a job. Identifying the functional, emotional, and social jobs your customer is hiring you for changes how you market AND how you price. A $5 product hired for an emotional job (impressing a friend) often beats a $50 product hired for a functional one.",
        prompts: [
          "Apply Jobs-to-be-Done thinking to [insert idea]. The customer isn't buying my product — they're hiring it to do a job. List the functional job, emotional job, and social job they're hiring it for. Then suggest how each job changes how I should price and position it.",
        ],
      },
      {
        task: "Fill in the Lean Canvas (one-pager business model)",
        lesson:
          "The Lean Canvas is the one-page business model invented for startups (vs. the larger Business Model Canvas for established businesses). Filling all 9 boxes in 30 minutes forces every assumption to surface — and reveals which ones are weakest. The boxes you can't confidently fill in are the experiments you should run next week.",
        prompts: [
          "Fill in a complete Lean Canvas for [insert idea]. Walk through all 9 boxes in this order: Problem (top 3), Customer Segments, Unique Value Proposition, Solution, Channels, Revenue Streams, Cost Structure, Key Metrics, and Unfair Advantage. Be specific — no fluff. Format as a clear list I can copy into a doc.",
        ],
      },
      {
        task: "📋 Create your FINAL Pricing & Business Model (paste into workbook)",
        isFinal: true,
        lesson:
          "This is the wrap-up step. Compile your pricing strategy, revenue path, and Lean Canvas into one clean block, then paste it into the 📋 Final output box of your notebook. The GPT will use this to answer pricing and business-model questions about your business.",
        prompts: [
          "Create a FINAL Pricing & Business Model summary for [insert idea] that I will paste into my workbook. Include: (1) chosen pricing strategy and the price(s) — single price or tiered options written out plainly; (2) the path to $1,000/month — which scenario I picked, how many customers, at what price, with what conversion rate; (3) the Lean Canvas in 9 short lines (Problem / Customer Segments / UVP / Solution / Channels / Revenue Streams / Cost Structure / Key Metrics / Unfair Advantage). Each line under 20 words. Output ONLY the final text I should paste in.",
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
    suggestedTime: "Day 1 · 2:15–4:00pm",
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
        lesson:
          "Real proof beats theoretical pitches. The Build-Measure-Learn cycle says: ship the smallest possible thing that lets a customer react to your idea. The medium is irrelevant — service flow, 3D mockup, or wireframe — what matters is that someone real can SAY 'yes I'd pay for that.' This is why prompts vary by venture type: a service prototype isn't the same as a product or app prototype.",
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
        lesson:
          "If you can't write down what the customer gets in 4 sentences, you don't yet know what you're selling. The offer description is the single most-reused piece of writing in your business — it goes on the website, in DMs, in your pitch, in your bio. Writing it now saves you from rewriting it 20 different ways later.",
        prompts: [
          "Write a clear, compelling offer description for [insert idea]. Use this structure: (1) what customers get, in plain language; (2) what's included (3-5 bullet points); (3) the price; (4) the guarantee or risk-reversal; (5) how to get started (the CTA). Tone: confident, not salesy.",
        ],
      },
      {
        task: "Build one sample deliverable as proof",
        lesson:
          "A 'sample' is the cheapest customer-validation tool ever invented. Show one — a sample report, mockup demo, or paper prototype — and you can ask 'would you pay $X for this?' That single conversation is worth a hundred surveys. The goal isn't a polished sample; it's a reaction.",
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
      {
        task: "📋 Create your FINAL Prototype + Offer Description (paste into workbook)",
        isFinal: true,
        lesson:
          "This is the wrap-up step. Compile your prototype description, offer, and sample deliverable into one clean block. For most ventures the prototype is a physical product mockup or a service workflow — not a website. Paste the result into the 📋 Final output box of your notebook so the GPT understands exactly what you're selling.",
        prompts: [
          "Create a FINAL Prototype + Offer description for [insert idea] that I will paste into my workbook. Include: (1) what the prototype IS in concrete terms — for a service, the step-by-step workflow; for a product, the physical-product spec (materials, look, packaging); for a digital product, the screen-by-screen wireframe or demo URL; (2) the written offer description: what the customer gets, what's included (3-5 bullets), the price(s), the guarantee or risk-reversal, and how to start; (3) the sample deliverable I'm using as proof. Format clearly so a stranger reading this knows exactly what I'm selling. Output ONLY the final text I should paste in.",
        ],
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
    suggestedTime: "Day 2 · 9:00–10:15am",
    deliverables: [
      "Final brand kit (name, logo, colors, fonts, voice)",
      "Domain name selected",
      "Business card and one-page flyer designed",
    ],
    tools: [
      { name: "Canva", url: "https://canva.com", icon: "🎨" },
      { name: "Adobe Express", url: "https://www.adobe.com/express/", icon: "🅰️" },
      { name: "ChatGPT (image gen)", url: "https://chatgpt.com", icon: "🤖" },
      { name: "Gemini · Nano Banana", url: "https://gemini.google.com", icon: "🍌" },
      { name: "Microsoft Designer", url: "https://designer.microsoft.com", icon: "🖼️" },
      { name: "Ideogram", url: "https://ideogram.ai", icon: "🔠" },
      { name: "Hatchful", url: "https://hatchful.shopify.com", icon: "🐣" },
      { name: "Recraft", url: "https://recraft.ai", icon: "✏️" },
      { name: "Porkbun", url: "https://porkbun.com", icon: "🐷" },
      { name: "Cloudflare Domains", url: "https://www.cloudflare.com/products/registrar/", icon: "🟧" },
    ],
    tips: "Your brand should feel like it costs 10× what you charge. First impressions are everything — invest the time here. For printed items (business card, flyer), build them in Adobe Express or Canva — both are free and have print-ready templates.",
    taskPrompts: [
      {
        task: "Generate brand name candidates",
        lesson:
          "A great brand name is easy to spell, say out loud, and search. The reason we generate 15 candidates from 3 different styles (descriptive / inventive / narrative) is that you can't see what fits until you compare options side by side. The first name you fall in love with is rarely the best name — give yourself the option to pattern-match.",
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
        lesson:
          "A style guide is what makes your brand feel 10x bigger than it is. Customers judge your brand in 3 seconds based on your colors, fonts, and visual consistency — long before they read what you do. Decisions you make here get reused everywhere; decisions you skip get re-decided badly every time.",
        prompts: [
          "Create a complete brand style guide for [business name]: [insert idea]. Include: 1-line brand mission, 5 brand voice adjectives, color palette (3 colors with hex codes — primary, accent, neutral), font pairing (one heading, one body, both Google-Fonts-available), and 2 logo concepts described in detail enough that I can generate them with Canva or DALL·E.",
        ],
      },
      {
        task: "Write taglines that communicate your value prop",
        lesson:
          "A tagline isn't a slogan — it's a 6–8 word value-prop summary the customer can repeat back. We write 8 because the right one is rarely the first one. Reading them aloud is the test: does it sound natural in conversation? If you can't say it without sounding like marketing copy, it's not the one.",
        prompts: [
          "Write 8 tagline options for [business name] that communicate the value proposition in under 8 words. Mix 3 styles: (1) clear and functional, (2) emotional and aspirational, (3) playful and unexpected. For each, give a one-line note on when this tagline would shine.",
        ],
      },
      {
        task: "Choose and secure a domain name",
        lesson:
          "Your domain is the one piece of brand identity you can't easily change later. Spend 10 minutes on this — short, easy to spell, no weird hyphens. .com is still the gold standard but .ai, .co, and .io are all credible for tech-flavored businesses. Buy it now even if you don't launch this weekend; squatters cost more than $10/year.",
        prompts: [
          "Suggest 10 domain name options for [business name]. Mix .com, .co, .ai, .io, and creative TLDs. Each should be 12 characters or fewer in the SLD. Note any obvious squatter risks. End with a top-3 ranked list and what to check before buying.",
        ],
      },
      {
        task: "Design and generate your logo (use ChatGPT or Gemini's Nano Banana)",
        lesson:
          "Your logo is the visual shorthand for your brand — it goes on the website, business card, flyer, and every social post. AI can't out-design a senior brand designer, but ChatGPT (with image generation on) and Google Gemini's Nano Banana can give you a usable first draft in under 5 minutes. Generate 5–10 directions, pick the strongest, then refine in Canva. Match it to your style guide so colors, fonts, and feel stay consistent.",
        prompts: [
          "Write a complete logo image-generation prompt I can paste directly into ChatGPT (with image generation on) or Google Gemini (Nano Banana) to create a logo for [business name]: [insert idea]. The prompt should specify: (1) logo style — pick ONE that fits a [venture type] best from: minimal wordmark, modern icon-with-text, hand-drawn, mascot, monogram, abstract symbol, badge/crest; (2) primary color and accent color with hex codes pulled from my brand style guide; (3) the mood in 3 adjectives; (4) what to AVOID — clichés, stock-photo look, busy gradients, generic icons. Then give me 3 alternative prompts I can try in different styles if the first doesn't hit. Each prompt should be one paragraph I can copy in one click.",
        ],
      },
      {
        task: "Design your business card (build in Adobe Express or Canva)",
        lesson:
          "Business cards are the most-used physical brand asset for student founders — networking events, judges' tables, campus connections. AI writes the copy and decides the layout; Adobe Express and Canva each have hundreds of free print-ready templates that do the heavy design lifting. Pick whichever you're already logged into. The discipline of fitting your business onto a 3.5\" × 2\" card forces you to pick the ONE thing about your brand that matters most.",
        prompts: [
          "Help me design a business card for [business name]: [insert idea]. Give me the complete spec: (1) FRONT — name + role/title, business name, tagline (use the one I picked), one line of contact (the most important one — pick from email / phone / Instagram / website), and where the logo goes; (2) BACK — value-prop sentence, website or QR code direction (what URL it points to), 2–3 social handles or contact methods, and the QR code's destination; (3) layout direction — 2-color minimal, photo-back, full-color, etc. — that matches my brand style guide; (4) the exact template search term to use in BOTH Adobe Express AND Canva (e.g. \"minimal modern business card\") and the standard dimensions (3.5\" × 2\" / 1050 × 600 px / bleed 0.125\"). Output as a checklist I can tick off while building it in Adobe Express or Canva.",
        ],
      },
      {
        task: "Design a one-page flyer (build in Adobe Express or Canva)",
        lesson:
          "A one-page flyer is the cheapest in-person customer-acquisition tool you can print this weekend — events, bulletin boards, sponsor counters. Build it in Adobe Express or Canva — both are free and export print-ready PDFs. Forcing your offer onto a single page is also the best clarity test there is: if it doesn't fit, your offer isn't tight enough yet. Pair this with your business card so the QR code on both points to the same place.",
        prompts: [
          "Design a one-page flyer for [business name]: [insert idea]. Give me the complete content and layout: (1) headline (under 8 words — pattern-interrupt or value-prop hook); (2) subheadline (under 20 words explaining the offer); (3) 3 benefit bullets a passerby can scan in 5 seconds; (4) one line of social proof, guarantee, or risk-reversal; (5) the call-to-action — what to do next (call, scan, visit, sign up); (6) QR code destination URL and what page it loads; (7) layout direction — where the logo goes, where the hero image goes (give me an image-gen prompt for that too if relevant), where the QR code goes; (8) the template search term to use in BOTH Adobe Express AND Canva (\"modern flyer\", \"event flyer\", etc.) and orientation (portrait 8.5\" × 11\" / A4). Output as a checklist I can tick off while building it in Adobe Express or Canva.",
        ],
      },
      {
        task: "📋 Create your FINAL Brand Kit (paste into workbook)",
        isFinal: true,
        lesson:
          "This is the wrap-up step. Compile your name, tagline, voice, colors, fonts, domain, logo, business card, and flyer into one clean reference card, then paste it into the 📋 Final output box of your notebook. The GPT uses this so any future copy, posts, or designs stay on-brand.",
        prompts: [
          "Create a FINAL Brand Kit for [business name] that I will paste into my workbook. Include in this exact order: (1) chosen business name + 1-line rationale; (2) chosen tagline; (3) brand voice — 5 adjectives; (4) color palette — 3 hex codes labeled primary / accent / neutral; (5) font pairing — heading + body (both Google Fonts); (6) chosen domain name; (7) LOGO — 1–2 sentence description of the logo I generated + where to find it (Canva link, file path, or URL); (8) BUSINESS CARD — 1–2 sentence description + link/file; (9) FLYER — 1–2 sentence description + link/file. Where I haven't yet pasted in a link, leave a clearly marked placeholder like \"[paste link]\" so I can fill it in. Format as a clean reference card. Output ONLY the final text I should paste in.",
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
    suggestedTime: "Day 2 · 10:15am–12:00pm",
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
        lesson:
          "A landing page only needs to do 3 things: explain what you do, prove you're credible, and make it easy to buy. The copy on your hero (the section above the fold) determines whether visitors stay 5 seconds or 5 minutes — so we focus there first. Headlines that don't pass the 'who is this for and why does it matter' test get scrolled past.",
        prompts: [
          "Write conversion-focused homepage copy for [business name]: [insert idea]. Include: a hero headline (under 10 words), a subheadline (under 25 words), 3 benefit bullets, 1 social-proof line (placeholder), a primary CTA button, and a 2-sentence about-the-founder paragraph. Tone: clear, confident, not salesy.",
        ],
      },
      {
        task: "Write a 30-second video commercial script",
        lesson:
          "30-second commercials follow a formula: HOOK / PROBLEM / SOLUTION / PROOF / CTA. The hook is the most important — if you don't catch attention in 3 seconds, the rest doesn't matter. AI is great at generating hook variations to test, which is way faster than writing them from scratch.",
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
        lesson:
          "5 posts mixing educational / behind-the-scenes / testimonial / launch / hard-CTA gives you a balanced launch week. People scroll past pure sales pitches — but they engage with founders who teach, share the journey, and ask interesting questions. Variety is what builds an audience; repetition is what loses one.",
        prompts: [
          "Plan a 7-day social launch for [business name]: [insert idea]. Across Instagram, TikTok, and LinkedIn, give me 5 posts. Mix: (1) educational (teach something about the problem), (2) behind-the-scenes (build in public), (3) testimonial-style (placeholder), (4) launch announcement, (5) hard call-to-action. For each: caption, hashtags, and a simple visual idea.",
        ],
      },
      {
        task: "Use the Website Builder Wizard below",
        lesson:
          "Picking the right builder matters more than picking the perfect template. Match your skill level and time budget — if you're new, Carrd or Notion Sites lets you ship in 30 minutes; Framer is for those wanting a polished design feel; Lovable is for digital products that need real interactivity. Don't overthink the platform; pick and ship.",
        prompts: [
          "I want to launch a simple landing page this weekend. Suggest the simplest 3-page structure for [insert idea] and which AI website builder I should use (Framer.ai, Carrd, Wix ADI, or Canva) given a beginner's skill level and 1 hour of time.",
        ],
      },
      {
        task: "📋 Create your FINAL Website & Social Brief (paste into workbook)",
        isFinal: true,
        lesson:
          "This is the wrap-up step. Compile your homepage copy, commercial script, and social posts into one clean block, then paste it into the 📋 Final output box of your notebook. The GPT uses this to generate consistent on-brand content for you later.",
        prompts: [
          "Create a FINAL Website & Social Brief for [business name]: [insert idea] that I will paste into my workbook. Include: (1) homepage hero — headline (under 10 words), subheadline (under 25 words), primary CTA button text; (2) 3 benefit bullets; (3) about-the-founder paragraph (2 sentences); (4) the 30-second commercial script in beat form (HOOK / PROBLEM / SOLUTION / PROOF / CTA, with shot direction for each); (5) the 5 social launch posts — each with caption, 1-line visual idea, and hashtags. Skip prep notes — final outputs only. Output ONLY the final text I should paste in.",
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
    suggestedTime: "Day 2 · 12:45–2:00pm (after lunch)",
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
        lesson:
          "Segmentation / Targeting / Positioning is the foundational marketing framework. Most founders skip it and try to talk to everyone — but a clear positioning statement is what makes a customer say 'this is for me.' If your positioning fits 5 different audiences equally well, it's positioning that doesn't actually position you anywhere.",
        prompts: [
          "Walk me through STP (Segment / Target / Position) for [insert idea]. Step 1: list 4 customer segments who could benefit. Step 2: pick the ONE segment to target this weekend, with reasoning. Step 3: write the positioning statement: \"For [target], who [need], [business name] is the [category] that [unique benefit] because [proof].\"",
        ],
      },
      {
        task: "Allocate the $50 budget across channels",
        lesson:
          "Spending real money — even $50 — is the fastest way to learn what works. Theory is free; signal costs money. The output of this task isn't a perfect plan, it's a budget you can actually deploy this weekend and learn from by Monday.",
        prompts: [
          "I have $50 to spend on marketing for [insert idea] this weekend. Compare 4 options: (1) Meta/Instagram ads, (2) Google Search ads, (3) direct outreach (DMs/email to 50 warm contacts — free but time-intensive), (4) one micro-influencer partnership. Recommend the best split and explain why. Be honest if any options are bad ideas at this budget.",
        ],
      },
      {
        task: "Write 3 ad creatives in different angles",
        lesson:
          "We write 3 ads with different ANGLES (pain-led / outcome-led / curiosity-led) because you can't predict what'll work — and the cheapest test is to ship multiple and watch which gets clicks. This is A/B testing with a $20 budget; the winner becomes your default ad copy for the next 6 months.",
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
        lesson:
          "The most under-used marketing channel is personal outreach to your warm network. 50 personal DMs converts dramatically better than 5,000 ad impressions because the trust is already there. Don't pitch — ask for help, feedback, or 5 minutes. The conversion happens later, after you've earned the right.",
        prompts: [
          "Write a short, personal outreach message I could send to 50 warm contacts for [insert idea]. Make it under 5 sentences, mention I'm in a startup weekend, ask for one specific thing (not a sale — feedback, an intro, or 5 minutes of their time), and end with no pressure. Give me 3 versions in different tones: friendly, professional, and direct.",
        ],
      },
      {
        task: "📋 Create your FINAL $50 Marketing Plan (paste into workbook)",
        isFinal: true,
        lesson:
          "This is the wrap-up step. Compile your STP positioning, budget allocation, ad creatives, and outreach DM into one clean block, then paste it into the 📋 Final output box of your notebook. The GPT uses this to help you adapt and iterate on marketing later.",
        prompts: [
          "Create a FINAL $50 Marketing Plan for [insert idea] targeting [audience] that I will paste into my workbook. Include: (1) STP — segment chosen, target description, positioning statement in this format: \"For [target], who [need], [business name] is the [category] that [benefit] because [proof].\"; (2) the $50 budget allocation across channels with one-line rationale per channel; (3) the 3 ad creatives (each with hook / body / CTA / visual idea — angles: pain-led / outcome-led / curiosity-led); (4) the warm-outreach DM template for 50 contacts. No commentary — final outputs only. Output ONLY the final text I should paste in.",
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
    suggestedTime: "Day 2 · 2:00–4:00pm",
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
        lesson:
          "Vision answers 'where are we going?' Mission answers 'how do we operate?' SMART goals answer 'what do we measure?' Without all three, your team can't make decisions when you're not in the room. SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals separate ambition from wishful thinking.",
        prompts: [
          "For [business name]: [insert idea], write three things: (1) Vision — the long-term world we're trying to create (1 sentence, ambitious); (2) Mission — what we do every day to get there (1 sentence, concrete); (3) Three SMART Goals for the next 90 days (Specific, Measurable, Achievable, Relevant, Time-bound). Make them honest and reachable.",
        ],
      },
      {
        task: "Build the 10-slide pitch deck outline",
        lesson:
          "The 10-slide structure is investor standard — judges expect it, so you don't get points for being creative with the order. The structure forces you to show traction, not just promise. The slides you struggle to fill in are the parts of your business you haven't actually thought through yet.",
        prompts: [
          "Create a 10-slide pitch deck outline for [insert idea]. Use this exact structure, one slide per item: (1) Hook/Title, (2) Problem, (3) Solution, (4) Demo or Prototype, (5) Market & Customer, (6) Business Model, (7) Traction (what we've done this weekend), (8) Team, (9) The Ask (what we want from judges/audience), (10) Close. For each slide, give: headline, 3 bullet points max, and what visual goes on it.",
        ],
      },
      {
        task: "Practice your pitch with an AI VC simulation",
        lesson:
          "Roleplaying with AI as a tough VC is the cheapest pitch coaching available. The AI never gets bored, can simulate skepticism, and gives feedback you can iterate on in 5 minutes — far better than practicing alone in front of a mirror. The score breakdown tells you exactly which slide to redo first.",
        prompts: [
          "I'm going to give you my pitch for [insert idea]. Roleplay as a tough but fair VC investor. Score me 1–10 on each of: (1) clarity of the problem, (2) believability of the solution, (3) market sizing, (4) team credibility, (5) The Ask. Then give me my single biggest weak spot and one specific thing to fix in the next 30 minutes. Here's my pitch: [insert pitch]",
        ],
      },
      {
        task: "Prep for hard Q&A",
        lesson:
          "Judges' questions reveal what you DON'T know about your business. Generating 10 hard questions in advance — and writing tight answers — is what separates 'they could be a real business' from 'they have an idea.' Confidence under questioning is also what convinces judges you've actually thought it through.",
        prompts: [
          "Generate the 10 hardest questions a judge or VC could ask about [insert idea] — covering market size, competition, team experience, pricing, scalability, defensibility, and what happens if [obvious threat]. For each question, write a 2-sentence confident answer I could deliver under pressure. Flag the 2 questions where my answer is weakest and tell me what to research before the pitch.",
        ],
      },
      {
        task: "📋 Create your FINAL Pitch Package (paste into workbook)",
        isFinal: true,
        lesson:
          "This is the wrap-up step. Compile your Vision, Mission, SMART goals, 10-slide outline, the Ask, and Q&A prep into one clean block, then paste it into the 📋 Final output box of your notebook. The GPT uses this to coach you on future pitches and rehearse against tough questions.",
        prompts: [
          "Create a FINAL Pitch Package for [insert idea] that I will paste into my workbook. Include in this exact order: (1) Vision (1 sentence, ambitious); (2) Mission (1 sentence, concrete); (3) 3 SMART Goals for the next 90 days; (4) the 10-slide deck — for each slide: headline + max 3 bullets + 1 visual direction (slides: Hook, Problem, Solution, Demo, Market & Customer, Business Model, Traction, Team, The Ask, Close); (5) the Ask in one sentence; (6) the 10 hardest Q&A questions, each with a 2-sentence confident answer. Format so I can present from this directly. Output ONLY the final text I should paste in.",
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
        lesson:
          "Most weekend ideas die on Monday. A 30/60/90-day plan with measurable milestones is the structure that prevents that. The discipline of writing it forces you to face a real timeline — and reveals what you have to STOP doing to make room for what matters.",
        prompts: [
          "Build a 30/60/90-day plan for [insert idea] with the goal of reaching $1,000/month within 6 months. For each phase, give: 3 SMART goals, the single most important metric to track, and 1 thing to STOP doing. End with the leading indicator I should watch weekly.",
        ],
      },
      {
        task: "Run Customer Discovery interviews each week",
        lesson:
          "Steve Blank's Customer Discovery is the standard for validating a business after launch. Each week you should be talking to real potential customers — not pitching, but listening. The questions in this prompt are designed to validate the PROBLEM, not the solution. If you can't validate the problem, no amount of solution polish will save you.",
        prompts: [
          "Design a Customer Discovery interview script I can run this week with 5 potential customers of [insert idea]. The goal is to validate the problem, not pitch the solution. Include: 3 opening questions, 5 problem-discovery questions (open-ended), 2 solution-test questions, and 1 'would you pay $X' question. End with the signs I should listen for that mean we should pivot.",
        ],
      },
      {
        task: "Do a monthly Feasibility Analysis",
        lesson:
          "A monthly Feasibility Analysis (Organizational / Financial / Market) catches problems before they become unfixable. If your finances aren't working at month 2, you have time to fix it; at month 5, you don't. Score each dimension 1–10 honestly — anything below 5 is a flag, anything below 3 is an emergency.",
        prompts: [
          "Run a Feasibility Analysis for [insert idea] across 3 dimensions: (1) Organizational — do we have the team, time, and skills?; (2) Financial — does the unit economics work, and what's the runway?; (3) Market — is there real demand and a path to scale? For each, score 1–10 and explain. End with the single biggest feasibility risk for the next 30 days.",
        ],
      },
      {
        task: "Make a quarterly Go / No-Go / Pivot decision",
        lesson:
          "Quarterly Go/No-Go decisions force honest self-assessment. The best founders kill ideas that aren't working — pivoting or shutting down isn't failure, it's discipline. The worst founders keep going because they can't admit when it's broken. Sunk-cost thinking is the most expensive mistake at this stage.",
        prompts: [
          "I made $[X] last month working on [insert idea]. Help me make a Go / No-Go / Pivot call. Diagnose: (1) what's working, (2) what's not, (3) what assumptions have been validated or broken. Recommend GO (double down), NO-GO (shut it down), or PIVOT (change a key assumption). Give me 3 specific actions for the next 30 days based on your call.",
        ],
      },
      {
        task: "📋 Create your FINAL 30/60/90-Day Plan (paste into workbook)",
        isFinal: true,
        lesson:
          "This is the wrap-up step. Compile your milestones, weekly Customer Discovery script, monthly Feasibility checklist, and quarterly Go/No-Go criteria into one operating playbook, then paste it into the 📋 Final output box of your notebook. The GPT uses this as your accountability rhythm post-weekend.",
        prompts: [
          "Create a FINAL 30/60/90-Day Growth Plan for [insert idea] that I will paste into my workbook. Include: (1) for each phase (30 / 60 / 90 days): 3 SMART goals, the 1 metric that matters most, and the 1 thing to STOP doing; (2) the weekly Customer Discovery interview script in short form (3 opening / 5 problem-discovery / 2 solution-test / 1 willingness-to-pay question); (3) the monthly Feasibility-Analysis template — Organizational / Financial / Market, each with a 1–10 score line and a 1-sentence check; (4) the quarterly Go / No-Go / Pivot decision criteria. This is my operating playbook for the next quarter. Output ONLY the final text I should paste in.",
        ],
      },
    ],
  },
];
