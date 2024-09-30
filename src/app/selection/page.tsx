"use client";
import React from "react";

import { compareDesc } from "date-fns";
import { allBookmarks } from "contentlayer/generated";
import { BookmarksContent } from "@/components/BookmarksContent";

const SelectionPage = () => {
  const bookmarks = allBookmarks.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return <BookmarksContent bookmarks={bookmarks} />;
};

export default SelectionPage;
