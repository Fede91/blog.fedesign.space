import { Article } from "@/components/Article";
import { Grain } from "@/components/Grain";
import { FeaturedPosts } from "./assets/FeaturedPosts";
import { LastPosts } from "./assets/LastPosts";
import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { BlogPosts } from "@/components/BlogPosts";

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const featuredPosts = posts.filter((post) => post.featured);

  let firstFeaturedPost: Post | null = null,
    otherFeaturedPosts: Post[] = [];

  if (featuredPosts.length > 0) {
    firstFeaturedPost = featuredPosts[0];
    otherFeaturedPosts = featuredPosts.slice(1, 3);
  }

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).filter(Boolean) as string[];

  const paginatedPosts = posts.slice(0, 12);
  const numPages = Math.ceil(posts.length / 12);

  return (
    <main>
      {/* <!-- Hero --> */}
      <section className="px-4 sm:px-6 mb-8">
        <div className="py-16 md:py-24 max-w-container mx-auto flex flex-col items-center gap-6 lg:gap-8 md:flex-row">
          <div className="z-[2] flex-1 flex flex-col gap-4 md:gap-6 justify-center max-w-2xl mx-auto items-center text-center">
            <h1 className="font-semibold tracking-tight">Blog</h1>
          </div>
        </div>
      </section>

      {/* <!-- Featured --> */}
      {featuredPosts.length > 0 && (
        <section className="px-4 sm:px-6 mb-24 flex flex-row">
          <div className=" hidden lg:block h-full w-[125px]">
            <FeaturedPosts />
          </div>
          <div className="w-full mx-auto">
            <h2 className="lg:hidden text-sm font-semibold uppercase text-typ-tone border-b border-b-gray-700 mb-6 md:mb-8 pb-2.5">
              Featured
            </h2>
            <div className="grid gap-10 md:grid-cols-3">
              <div className="md:col-span-2">
                <Article
                  title={String(firstFeaturedPost?.title)}
                  excerpt={String(firstFeaturedPost?.excerpt)}
                  tags={firstFeaturedPost?.tags || []}
                  filled
                  stroked={false}
                  featured
                  cover={firstFeaturedPost?.cover}
                  date={firstFeaturedPost?.date}
                  url={String(firstFeaturedPost?.url)}
                />
              </div>

              <div className="flex flex-col gap-10" data-featured-side="">
                {otherFeaturedPosts.map((post) => (
                  <Article
                    key={post._id}
                    title={String(post.title)}
                    tags={post.tags || []}
                    filled
                    stroked={false}
                    cover={post?.cover}
                    date={post?.date}
                    url={String(post?.url)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* <!-- Posts --> */}
      <section className="px-4 mb-24 flex flex-row">
        <div className="hidden lg:block h-full w-[125px]">
          <LastPosts />
        </div>

        <BlogPosts
          posts={paginatedPosts}
          allTags={allTags}
          currentPage={1}
          numPages={numPages}
          basePath="/page"
        />
      </section>

      <Grain />
    </main>
  );
}
