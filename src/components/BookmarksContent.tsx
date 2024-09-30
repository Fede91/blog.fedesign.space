"use client";

import { useEffect, useRef, useState } from "react";
import { Bookmark } from "contentlayer/generated";
import Masonry from "react-masonry-css";
import { BookmarkTile } from "./BookmarkTile";
import { FeSelection } from "@/app/assets/FeSelection";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  bookmarks: Bookmark[];
};

export const BookmarksContent: React.FC<Props> = ({ bookmarks }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const categories = ["developer", "ux/ui designer", "ai engineer"];
  const [isAtTop, setIsAtTop] = useState(false);

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(bookmark.category)
  );

  const handleBookmarkClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const breakpointColumnsObj = {
    default: 6,
    2560: 5,
    1920: 4,
    1440: 4,
    1280: 3,
    1024: 2,
    640: 1,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtTop(entry.boundingClientRect.top <= 0);
      },
      { threshold: 1.0, rootMargin: "-1px 0px 0px 0px" }
    );

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      if (navRef.current) {
        observer.unobserve(navRef.current);
      }
    };
  }, [navRef]);

  return (
    <div className="min-h-screen">
      {/* Masonry grid layout */}
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <!-- Hero --> */}
        <section className="px-4 sm:px-6 mb-8">
          <div className="py-16 md:py-24 max-w-container mx-auto flex flex-col items-center gap-6 lg:gap-8 md:flex-row">
            <div className="z-[2] flex-1 flex flex-col gap-4 md:gap-6 justify-center  mx-auto items-center text-center">
              <FeSelection />
              <h3 className="font-semibold tracking-tight text-3xl md:text-4xl  lg:mt-[-84px] leading-10 md:leading-[3rem]">
                curated excellence for innovators
              </h3>
              <p className="text-gray-600 text-lg md:text-xl">
                Explore the best tools, cutting-edge projects and invaluable
                resources for developers, UX/UI designers and AI engineers.
                <br />
                Handpicked. Insightful. Essential.
              </p>
            </div>
          </div>
        </section>

        <nav
          ref={navRef}
          className=" flex-none sticky top-0 pt-3 md:pt-6 block z-10"
        >
          <div className="w-full mx-auto pb-2.5 ">
            <nav className="mb-6 flex flex-row justify-center  ">
              <div className="selection-nav flex flex-row items-center gap-3 p-2 rounded-3xl border border-theme pl-4 w-full md:w-auto">
                {isAtTop && (
                  <Link href={"/"} className="hover:text-brand">
                    <ArrowLeft className="w-6 h-6" />
                  </Link>
                )}
                <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                  <div className="">Assemble your toolkit</div>
                  <ul role="list" className="text-sm font-medium flex gap-1 ">
                    {categories.map((category) => (
                      <li key={category}>
                        <div
                          onClick={() => handleCategoryClick(category)}
                          className={`cursor-pointer relative block text-nowrap px-3 py-1 border border-theme rounded-2xl sm:px-4 md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone capitalize ${
                            selectedCategories.includes(category)
                              ? "bg-[var(--secondary-background-color)] text-[var(--primary-accent-color)] "
                              : ""
                          }`}
                        >
                          {category}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </nav>

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
