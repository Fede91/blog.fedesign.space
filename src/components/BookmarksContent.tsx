"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "contentlayer/generated";
import { X } from "lucide-react";
import Masonry from "react-masonry-css";
import { BookmarkTile } from "./BookmarkTile";

type Props = {
  bookmarks: Bookmark[];
};

export const BookmarksContent: React.FC<Props> = ({ bookmarks }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const allTags = [
    "All",
    ...new Set(bookmarks.flatMap((bookmark) => bookmark.tags)),
  ];
  const categories = ["All", "developer", "ux/ui designer", "ai engineer"];
  const [isScrolled, setIsScrolled] = useState(false);

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      (selectedCategory === "All" || bookmark.category === selectedCategory) &&
      (selectedTag === "All" || (bookmark.tags || []).includes(selectedTag))
  );

  const handleBookmarkClick = (link: string) => {
    window.open(link, "_blank");
  };

  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    1024: 2,
    640: 1,
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Sticky header with filter */}
      <header className={`header ${isScrolled ? "sticky-header" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select block w-full sm:w-64 px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="form-select block w-full sm:w-64 px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            >
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            {(selectedCategory !== "All" || selectedTag !== "All") && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTag("All");
                }}
                className="px-3 py-2 rounded text-sm font-medium bg-red-500 text-white hover:bg-red-600 flex items-center"
              >
                Clear Filters <X size={16} className="ml-1" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Masonry grid layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {filteredBookmarks.map((bookmark) => (
            <BookmarkTile
              key={bookmark._id}
              bookmark={bookmark}
              onClick={handleBookmarkClick}
            />
          ))}
        </Masonry>
      </main>
    </div>
  );
};
