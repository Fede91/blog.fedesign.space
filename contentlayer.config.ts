import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    subtitle: { type: "string", required: false },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    featured: { type: "boolean", required: false },
    excerpt: { type: "string", required: false },
    cover: { type: "string", required: false },
    seo_description: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export const Bookmark = defineDocumentType(() => ({
  name: "Bookmark",
  filePathPattern: `bookmarks/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    date: { type: "date", required: true },
    image: { type: "string", required: false },
    url: { type: "string", required: false },
    category: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    featured: { type: "boolean", required: false },
  },
}));

export default makeSource({
  contentDirPath: ".",
  contentDirInclude: ["posts", "bookmarks"],
  documentTypes: [Post, Bookmark],
});
// export default makeSource({ contentDirPath: "posts", documentTypes: [Post] });
