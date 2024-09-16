import { compareDesc } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { BlogPosts } from "@/components/BlogPosts";
import { Tag } from "@/app/assets/Tag";
import Header from "@/components/Header";
import Head from "next/head";

const Page = ({ params }: { params: { page: number; tag: string } }) => {
  const tag = decodeURI(params.tag);

  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const filteredPosts = posts.filter((post) => {
    return (post.tags || []).includes(String(tag));
  });

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).filter(Boolean) as string[];

  const paginatedPosts = filteredPosts.slice(
    12 * (Number(params.page) - 1),
    Number(params.page) * 12
  );

  const numPages = Math.ceil(filteredPosts.length / 12);

  const currentUrl =
    process.env.BASE_URL + "/tag/" + tag + "/page/" + params.page;

  return (
    <>
      <Head>
        <title>{`Posts tagged with "${tag}" - Page ${params.page}`}</title>
        <meta
          name="description"
          content={`Browse posts tagged with "${tag}".`}
        />
        <link rel="canonical" href={currentUrl} />
        <meta
          property="og:title"
          content={`Posts tagged with "${tag}" - Page ${params.page}`}
        />
        <meta
          property="og:description"
          content={`Browse posts tagged with "${tag}".`}
        />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Posts tagged with "${tag}" - Page ${params.page}`}
        />
        <meta
          name="twitter:description"
          content={`Browse posts tagged with "${tag}".`}
        />
      </Head>
      <Header />
      <main className="px-4 mb-24 mt-24">
        <section className="px-4 sm:px-6 mb-8">
          <div className="max-w-xl mx-auto py-16 md:py-20 flex flex-col gap-3 items-center justify-center text-center">
            <Tag />
            <h1 className="font-semibold tracking-tight text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-[-42px] capitalize">
              {tag}
            </h1>
          </div>
        </section>
        <BlogPosts
          posts={paginatedPosts}
          allTags={allTags}
          currentPage={Number(params.page)}
          numPages={numPages}
          basePath={`/tag/${tag}/page`}
          activeTag={tag}
        />
      </main>
    </>
  );
};

export default Page;
