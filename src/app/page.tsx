import { Article } from "@/components/Article";
import { Grain } from "@/components/Grain";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FeaturedPosts } from "./assets/FeaturedPosts";
import { LastPosts } from "./assets/LastPosts";
import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

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

  console.log(posts);

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

        <div className="w-full">
          <h2 className="text-sm font-semibold uppercase text-typ-tone border-b border-brd mb-6 pb-2.5 sr-only">
            Latest
          </h2>
          <div className="w-full mx-auto">
            <nav className="mb-6">
              <ul
                role="list"
                className="text-sm font-medium flex gap-1 overflow-x-scroll no-scrollbar pb-2.5"
              >
                <li>
                  <a
                    href="/"
                    className="relative block text-nowrap px-3 py-1  border border-theme rounded-2xl sm:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone bg-[var(--secondary-background-color)] text-[var(--primary-accent-color)]"
                    data-active=""
                  >
                    All posts
                  </a>
                </li>
                <li>
                  <a
                    href="/tag/features/"
                    className="relative block text-nowrap px-3 py-1 border border-theme rounded-2xl sm:px-4 md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/tag/guides/"
                    className="relative block text-nowrap px-3 py-1 border border-theme rounded-2xl sm:px-4 md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="/tag/tutorials/"
                    className="relative block text-nowrap px-3 py-1 border border-theme rounded-2xl sm:px-4 md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="/tag/data-analysis/"
                    className="relative block text-nowrap px-3 py-1 border border-theme rounded-2xl sm:px-4 md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone"
                  >
                    Data analysis
                  </a>
                </li>
                <li>
                  <a
                    href="/tag/data-management/"
                    className="relative block text-nowrap px-3 py-1 border border-theme rounded-2xl sm:px-4 md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone"
                  >
                    Data management
                  </a>
                </li>
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
              />
            ))}

            {/* <article
              className="post tag-guides tag-data-mapping  relative text-typ-tone flex flex-col gap-4"
              data-post-card=""
            >
              <a href="/getting-started-with-orbit/" className="block">
                <figure className="rounded-theme-xxs border border-brd overflow-hidden">
                  <picture>
                    <source
                      srcSet="/content/images/size/w320/format/webp/2024/03/flair-post-9.png 320w, /content/images/size/w640/format/webp/2024/03/flair-post-9.png 600w, /content/images/size/w960/format/webp/2024/03/flair-post-9.png 960w"
                      sizes="(max-width: 400px) 300px, 400px"
                      type="image/webp"
                    />
                    <img
                      className="aspect-[16/9] bg-bgr-tone object-cover w-full h-auto rounded-[inherit] will-change-[filter] transition-[filter]"
                      loading="lazy"
                      srcSet="/content/images/size/w320/format/webp/2024/03/flair-post-9.png 320w, /content/images/size/w640/format/webp/2024/03/flair-post-9.png 600w, /content/images/size/w960/format/webp/2024/03/flair-post-9.png 960w"
                      sizes="(max-width: 400px) 300px, 400px"
                      src="/content/images/size/w30/2024/03/flair-post-9.png"
                      alt="Getting started with Orbit, your tool for comprehensive data mapping"
                    />
                  </picture>
                </figure>
              </a>

              <div
                className="flex h-full flex-col gap-2"
                data-post-card-content=""
              >
                <div
                  className="flex items-center flex-wrap gap-2 text-sm"
                  data-post-card-info=""
                >
                  <a href="/tag/guides/" className="hover:text-brand">
                    Guides
                  </a>

                  <span className="">·</span>

                  <time className="">Mar 13, 2024</time>

                  <span className="flex-1"></span>
                </div>

                <h3
                  className="text-typ text-lg sm:text-xl font-semibold hover:text-brand "
                  data-post-card-title=""
                >
                  <a href="/getting-started-with-orbit/" className="">
                    Getting started with Orbit, your tool for comprehensive data
                    mapping
                  </a>
                </h3>

                <p className="font-light" data-post-card-excerpt="">
                  Get started with Orbit for comprehensive data mapping,
                  navigate your data landscape with precision and ease
                </p>

                <ul
                  className="flex gap-3 text-sm font-medium mt-2"
                  data-post-card-authors=""
                >
                  <li>
                    <a
                      href="/author/max/"
                      className="flex gap-1.5 items-center hover:text-brand"
                    >
                      <picture>
                        <source
                          srcSet="/content/images/size/w30/format/webp/2024/03/max.png 30w, /content/images/size/w100/format/webp/2024/03/max.png 100w"
                          sizes="24px"
                          type="image/webp"
                        />
                        <img
                          className="size-6 object-cover rounded-full will-change-[filter] transition-[filter]"
                          loading="lazy"
                          srcSet="/content/images/size/w30/format/webp/2024/03/max.png 30w, /content/images/size/w100/format/webp/2024/03/max.png 100w"
                          sizes="24px"
                          src="/content/images/size/w30/2024/03/max.png"
                          alt=""
                        />
                      </picture>
                      <span>Max Harmon</span>
                    </a>
                  </li>
                </ul>
              </div>
              <RoundedContainer stroke="white" />
            </article> */}
          </div>

          <nav
            className="my-12 text-typ flex items-center justify-center gap-4 font-medium sm:font-normal text-sm sm:gap-6 "
            data-pagination=""
          >
            <a className="text-sm font-medium flex items-center gap-0.5 border border-theme rounded-2xl px-3 py-1 sm:px-4 cursor-not-allowed disabled">
              <ChevronLeft className="h-4 w-4" />
              <span>Prev</span>
            </a>
            <span>Page 1 of 2</span>
            <a
              className="text-sm font-medium flex items-center gap-0.5 border border-theme rounded-2xl px-3 py-1 sm:px-4 hover:bg-bgr-tone"
              href="/page/2/"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      </section>

      <Grain />
    </main>
  );
}
