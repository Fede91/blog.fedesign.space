import { Bookmark } from "contentlayer/generated";
import RoundedContainer from "./RoundedContainer";

export const BookmarkTile = ({
  bookmark,
  onClick,
}: {
  bookmark: Bookmark;
  onClick: (url: string) => void;
}) => (
  <article
    className={`relative text-typ-tone flex flex-col h-[fit-content] mb-4 cursor-pointer  ${
      bookmark.featured ? "col-span-2 w-full" : "w-full"
    }`}
    onClick={() => onClick(String(bookmark.url))}
  >
    {bookmark.image && (
      <div className="block">
        <div
          className="rounded-tile__poster aspect-video"
          style={{
            borderRadius: `20px`,
            background: `url(${bookmark.image})`,
          }}
        ></div>
      </div>
    )}
    {/* <img
      src={bookmark.image}
      alt={bookmark.title}
      className={`w-full object-cover ${bookmark.featured ? "h-80" : "h-48"}`}
    /> */}
    <div className="flex h-full flex-col gap-2 pr-16 pt-2 pl-4 pb-6">
      <div className="flex items-center flex-wrap gap-2 text-sm">
        {bookmark.tags
          ? bookmark.tags.map((tag) => <span key={tag}>{tag}</span>)
          : null}

        <span>·</span>

        <span className="flex-1"></span>
      </div>

      <h3
        className={`font-semibold mb-2 ${
          bookmark.featured ? "text-2xl" : "text-lg"
        }`}
      >
        {bookmark.title}
      </h3>
      <p
        className={`text-gray-600 mb-2 ${
          bookmark.featured ? "text-base" : "text-sm"
        }`}
      >
        {bookmark.description}
      </p>
      {/* <div className="flex flex-wrap gap-2">
        <span className="text-xs bg-blue-200 text-blue-800 rounded-full px-2 py-1">
          {bookmark.category}
        </span>
      </div> */}
    </div>
    <RoundedContainer
      stroke={!bookmark.featured ? "var(--border-color)" : undefined}
      fill={bookmark.featured ? "var(--secondary-background-color)" : undefined}
    />
  </article>
);
