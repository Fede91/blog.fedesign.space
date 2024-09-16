import React from "react";
import { Article } from "./Article";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Post } from "contentlayer/generated";

type Props = {
  posts: Post[];
  currentPage: number;
  numPages: number;
  allTags: string[];
  activeTag?: string;
  basePath: string;
};

export const BlogPosts: React.FC<Props> = ({
  posts,
  currentPage,
  numPages,
  allTags,
  activeTag,
  basePath,
}) => {
  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <nav className="mb-6">
          <ul
            role="list"
            className="text-sm font-medium flex gap-1 overflow-x-scroll no-scrollbar pb-2.5"
          >
            <li>
              <Link
                href="/"
                className={`relative block text-nowrap px-3 py-1  border border-theme rounded-2xl sm:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone  ${
                  !activeTag
                    ? "bg-[var(--secondary-background-color)] text-[var(--primary-accent-color)]"
                    : ""
                }`}
                data-active=""
              >
                All posts
              </Link>
            </li>
            {allTags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/tag/${tag}/`}
                  className={`relative block text-nowrap px-3 py-1 border border-theme rounded-2xl sm:px-4 md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone capitalize ${
                    activeTag === tag
                      ? "bg-[var(--secondary-background-color)] text-[var(--primary-accent-color)]"
                      : ""
                  }`}
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Article
            key={post._id}
            title={String(post.title)}
            tags={post.tags || []}
            cover={post.cover}
            date={post?.date}
            url={String(post?.url)}
            excerpt={post?.excerpt?.split(" ").slice(0, 14).join(" ")}
          />
        ))}
      </div>

      {numPages > 1 && (
        <nav
          className="my-12 text-typ flex items-center justify-center gap-4 font-medium sm:font-normal text-sm sm:gap-6 "
          data-pagination=""
        >
          <Link
            className={`text-sm font-medium flex items-center gap-0.5 border border-theme rounded-2xl px-3 py-1 sm:px-4 ${
              currentPage === 1 ? "cursor-not-allowed disabled" : ""
            }`}
            href={currentPage > 1 ? `${basePath}/${currentPage - 1}/` : "#"}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Prev</span>
          </Link>
          <span>
            Page {currentPage} of {numPages}
          </span>
          <Link
            className={`text-sm font-medium flex items-center gap-0.5 border border-theme rounded-2xl px-3 py-1 sm:px-4 hover:bg-bgr-tone ${
              currentPage === numPages ? "cursor-not-allowed disabled" : ""
            }`}
            href={
              numPages > currentPage ? `${basePath}/${currentPage + 1}` : "/#"
            }
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </nav>
      )}
    </div>
  );
};
