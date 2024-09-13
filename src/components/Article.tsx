import React from "react";
import Link from "next/link";
import RoundedContainer from "./RoundedContainer";
import { format } from "date-fns";

type Props = {
  title: string;
  excerpt?: string;
  tags: string[];
  filled?: boolean;
  stroked?: boolean;
  featured?: boolean;
  cover?: string;
  date?: string;
  url: string;
};

export const Article: React.FC<Props> = ({
  title,
  excerpt,
  tags,
  cover,
  date,
  filled = false,
  stroked = true,
  featured = false,
  url,
}) => {
  return (
    <article className="post tag-features tag-data-analysis featured  relative text-typ-tone flex flex-col h-[fit-content] ">
      {cover && (
        <a href={url} className="block">
          <div
            className="rounded-tile__poster aspect-video"
            style={{
              borderRadius: `20px`,
              background: `url(${cover})`,
            }}
          ></div>
        </a>
      )}
      <div className="flex h-full flex-col gap-2 pr-16 pt-2 pl-4 pb-6">
        <div className="flex items-center flex-wrap gap-2 text-sm">
          {tags.map((tag) => (
            <Link key={tag} href={`/tag/${tag}`} className="hover:text-brand">
              {tag}
            </Link>
          ))}

          <span>·</span>

          {date && (
            <time className="">{format(new Date(date), "MMM d, yyyy")}</time>
          )}

          <span className="flex-1"></span>
        </div>

        <h3 className={`${featured ? "featured" : ""}`}>
          <a href={url}>{title}</a>
        </h3>

        {excerpt && <p className="font-light">{excerpt}</p>}
      </div>

      <RoundedContainer
        stroke={stroked ? "var(--border-color)" : undefined}
        fill={filled ? "var(--secondary-background-color)" : undefined}
      />
    </article>
  );
};
