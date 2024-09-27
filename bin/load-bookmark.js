const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const { OpenAI } = require("openai");
const matter = require("gray-matter");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set this in your environment
});

const BOOKMARKS_FILE = "data/bookmarks.txt";
const BOOKMARKS_FOLDER = "bookmarks";
const CATEGORIES = ["developer", "ux/ui designer", "ai engineer"];

async function main() {
  const args = process.argv.slice(2);
  const url = args[0];
  const featured = args.includes("--featured");

  if (!url) {
    console.error("Please provide a URL as an argument");
    console.log("Usage: node script.js <url> [--featured]");
    process.exit(1);
  }

  // Check if URL already exists
  const exists = await checkUrlExists(url);
  if (exists) {
    console.log("URL already exists in bookmarks");
    process.exit(0);
  }

  // Scrape metadata
  const metadata = await scrapeMetadata(url);

  // Categorize and tag
  const { title, description, category, tags } = await categorizeAndTag(
    metadata.title,
    metadata.description
  );

  // Generate MDX file
  await generateMdxFile(
    url,
    { ...metadata, title, description },
    category,
    tags,
    featured
  );

  // Add URL to bookmarks file
  await fs.appendFile(BOOKMARKS_FILE, url + "\n");

  console.log(`Bookmark processed successfully. Featured: ${featured}`);
}

async function checkUrlExists(url) {
  try {
    const content = await fs.readFile(BOOKMARKS_FILE, "utf-8");
    return content.split("\n").includes(url);
  } catch (error) {
    if (error.code === "ENOENT") {
      return false; // File doesn't exist yet
    }
    throw error;
  }
}

async function scrapeMetadata(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  return {
    title: $('meta[property="og:title"]').attr("content") || $("title").text(),
    description:
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content"),
    image: $('meta[property="og:image"]').attr("content"),
  };
}

async function categorizeAndTag(raw_title, raw_description) {
  const prompt = `
    Raw title: ${raw_title}
    Raw description: ${raw_description}

    Based on the above information, please:
    1. Detect the correct name of the service or product (e.g., GitHub, Figma, etc.) by provided raw title.
    2. Provide a brief description of the service or product. The target of this description is to help users understand the service or product.
    2. Assign one category from this list: ${CATEGORIES.join(", ")}
    2. Generate up to 3 relevant tags regarding the service (e.g., hosting, IDEs, tools, programming languages, SaaS, etc.)

    Respond in the following format:
    Title: [title]
    Description: [description]
    Category: [chosen category]
    Tags: [tag1, tag2, tag3, tag4, tag5]
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  const result = response.choices[0].message.content;
  const title = result.match(/Title: (.*)/)[1].trim();
  const description = result.match(/Description: (.*)/)[1].trim();
  const category = result.match(/Category: (.*)/)[1].trim();
  const tags = result
    .match(/Tags: (.*)/)[1]
    .split(",")
    .map((tag) => tag.trim());

  return { title, description, category, tags };
}

async function generateMdxFile(url, metadata, category, tags, featured) {
  console.log({
    title: metadata.title,
    description: metadata.description,
    image: metadata.image,
    url: url,
    category: category,
    tags: tags,
    date: new Date().toISOString(),
    featured: featured,
  });

  const content = matter.stringify("", {
    title: metadata.title,
    description: metadata.description,
    image: metadata.image || "",
    url: url,
    category: category,
    tags: tags,
    date: new Date().toISOString(),
    featured: featured,
  });

  const filename = `${slugify(metadata.title)}.mdx`;
  await fs.mkdir(BOOKMARKS_FOLDER, { recursive: true });
  await fs.writeFile(path.join(BOOKMARKS_FOLDER, filename), content);
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

main().catch(console.error);
