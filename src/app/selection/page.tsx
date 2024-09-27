"use client";
import React from "react";

import { compareDesc } from "date-fns";
import { allBookmarks } from "contentlayer/generated";
import { BookmarksContent } from "@/components/BookmarksContent";

const SelectionPage = () => {
  const bookmarks = allBookmarks.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // const allTags = Array.from(
  //   new Set(bookmarks.flatMap((post) => post.tags))
  // ).filter(Boolean) as string[];

  return <BookmarksContent bookmarks={bookmarks} />;
};

export default SelectionPage;
