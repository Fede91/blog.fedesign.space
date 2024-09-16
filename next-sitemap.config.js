const fs = require("fs");

const indexFilePath = "./.contentlayer/generated/Post/_index.json";

const indexFile = fs.readFileSync(indexFilePath, "utf-8");

const allPosts = JSON.parse(indexFile);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://blog.fedesign.space",
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    const postPaths = allPosts.map((post) => ({
      loc: post.url,
      changefreq: "daily",
      priority: 0.7,
      lastmod: post.date,
    }));
    return postPaths;
  },
};
