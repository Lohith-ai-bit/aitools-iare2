
const fs = require("fs");
const path = require("path");

const toolsFilePath = path.join(__dirname, "src/data/tools.js");
let fileContent = fs.readFileSync(toolsFilePath, "utf-8");

const newTools = [
  { name: "Zapier", category: "Productivity", desc: "Connect apps and automate workflows", url: "https://zapier.com" },
  { name: "Zapier Agents", category: "Productivity", desc: "Build custom AI agents that take action", url: "https://zapier.com/agents" },
  { name: "Botpress", category: "Code", desc: "Developer-friendly AI chatbot building platform", url: "https://botpress.com" },
  { name: "Komo", category: "Text", desc: "Private, deeply capable generative search engine", url: "https://komo.ai" },
  { name: "Brave Search", category: "Text", desc: "Private search engine with integrated AI features", url: "https://search.brave.com" },
  { name: "Jasper", category: "Text", desc: "Enterprise AI content creation platform", url: "https://jasper.ai" },
  { name: "Anyword", category: "Text", desc: "Data-driven AI copywriting tool to boost conversions", url: "https://anyword.com" },
  { name: "Writer", category: "Text", desc: "Full-stack AI platform for enterprises", url: "https://writer.com" },
  { name: "Grammarly", category: "Productivity", desc: "AI writing assistant for grammar and tone", url: "https://grammarly.com" },
  { name: "Wordtune", category: "Text", desc: "AI companion that rewrites and rephrases your sentences", url: "https://wordtune.com" },
  { name: "ProWritingAid", category: "Productivity", desc: "Premium grammar checker and style editor for writers", url: "https://prowritingaid.com" },
  { name: "Descript", category: "Video", desc: "Video and audio editor that works like a doc", url: "https://descript.com" },
  { name: "Google Veo 3", category: "Video", desc: "Google's most advanced AI video generation model", url: "https://deepmind.google/technologies/veo/" },
  { name: "Ideogram", category: "Image", desc: "AI image generator excelling at rendering text", url: "https://ideogram.ai" },
  { name: "Lovable", category: "Code", desc: "Vibe-coding and rapid prototyping tool for web apps", url: "https://lovable.dev" },
  { name: "Bolt", category: "Code", desc: "AI-powered web development platform inside your browser", url: "https://bolt.new" },
  { name: "FeedHive", category: "Productivity", desc: "AI-powered social media management and scheduling", url: "https://feedhive.io" },
  { name: "Flick", category: "Productivity", desc: "Social media AI assistant focusing on Instagram", url: "https://flick.tech" },
  { name: "Buffer", category: "Productivity", desc: "Simple social media scheduling with AI assistant", url: "https://buffer.com" },
  { name: "Hume", category: "Voice", desc: "Empathic AI voice platform understanding vocal intonation", url: "https://hume.ai" },
  { name: "Speechify", category: "Voice", desc: "High-quality text-to-speech reader for accessibility and productivity", url: "https://speechify.com" },
  { name: "Mem", category: "Productivity", desc: "AI-powered workspace that organizes itself", url: "https://mem.ai" },
  { name: "Evernote", category: "Productivity", desc: "Classic note-taking app with new AI-powered search and cleanup", url: "https://evernote.com" },
  { name: "Asana", category: "Productivity", desc: "Project management software enhanced with Asana Intelligence", url: "https://asana.com" },
  { name: "ClickUp", category: "Productivity", desc: "The everything app for work with integrated ClickUp Brain", url: "https://clickup.com" },
  { name: "Hive", category: "Productivity", desc: "Project management tool with HiveMind AI", url: "https://hive.com" },
  { name: "Fireflies", category: "Productivity", desc: "AI meeting assistant that records, transcribes, and searches", url: "https://fireflies.ai" },
  { name: "Avoma", category: "Productivity", desc: "AI meeting assistant tailored for customer-facing teams", url: "https://avoma.com" },
  { name: "Granola", category: "Productivity", desc: "Smart notepad for meetings", url: "https://granola.ai" },
  { name: "Reclaim", category: "Productivity", desc: "Smart calendar that automatically blocks time for tasks", url: "https://reclaim.ai" },
  { name: "Clockwise", category: "Productivity", desc: "Time orchestration platform to create Focus Time", url: "https://getclockwise.com" },
  { name: "Motion", category: "Productivity", desc: "AI executive assistant managing your calendar and tasks", url: "https://usemotion.com" },
  { name: "Shortwave", category: "Productivity", desc: "Smart email client powered by AI", url: "https://shortwave.com" },
  { name: "Copilot Pro for Outlook", category: "Productivity", desc: "Microsoft's AI assistant embedded in Outlook", url: "https://microsoft.com/copilot" },
  { name: "Gemini for Gmail", category: "Productivity", desc: "Google's AI assistant integrated directly into Gmail", url: "https://workspace.google.com" },
  { name: "Gamma", category: "Productivity", desc: "AI-powered presentation and document generator", url: "https://gamma.app" },
  { name: "Canva", category: "Image", desc: "Graphic design platform with Magic Studio AI", url: "https://canva.com" },
  { name: "Beautiful.ai", category: "Productivity", desc: "Presentation software that designs itself", url: "https://beautiful.ai" },
  { name: "Teal", category: "Productivity", desc: "AI-powered career hub and resume builder", url: "https://tealhq.com" },
  { name: "Enhancv", category: "Productivity", desc: "Resume builder tailored for modern professionals", url: "https://enhancv.com" },
  { name: "Kickresume", category: "Productivity", desc: "AI resume and cover letter builder driven by GPT-4", url: "https://kickresume.com" }
];

// Extracting max ID from current file
const idRegex = /id:\s*(\d+)/g;
let maxId = 0;
let match;
while ((match = idRegex.exec(fileContent)) !== null) {
  maxId = Math.max(maxId, parseInt(match[1]));
}

let nextId = maxId + 1;
const existingNamesRegex = /name:\s*"([^"]+)"/g;
const existingNames = new Set();
while ((match = existingNamesRegex.exec(fileContent)) !== null) {
  existingNames.add(match[1].toLowerCase());
}

let newText = "";
for (const tool of newTools) {
  // If user meant "ignore it exist", maybe they meant add everything, but existingNames prevents errors.
  // Wait, I will add them if they are not in existingNames.
  if (existingNames.has(tool.name.toLowerCase())) {
    continue;
  }
  
  if (tool.name === "Copilot Pro for Outlook" && existingNames.has("microsoft copilot pro for outlook")) continue;

  const toolObj = `  {
    id: ${nextId++},
    name: "${tool.name}",
    icon: "${tool.url}/favicon.ico",
    iconBg: "rgba(255,255,255,0.1)",
    description: "${tool.desc}",
    longDescription: "${tool.desc}. Powerful AI features for your needs.",
    category: "${tool.category}",
    pricing: "Free/Paid",
    rating: 4.5,
    reviews: 15000,
    features: ["AI powered", "Cloud sync", "Automations"],
    useCases: ["Business", "Personal"],
    website: "${tool.url}",
    trending: true,
    addedDate: "2025-01-01",
    popularity: 80,
    tags: ["AI", "${tool.category}"]
  },
`;
  newText += toolObj;
}

// remove last comma and bracket
fileContent = fileContent.replace(/(},\s*)];/, `$1${newText}];`);
fs.writeFileSync(toolsFilePath, fileContent);
console.log("Added " + (nextId - maxId - 1) + " new tools");
