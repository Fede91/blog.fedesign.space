import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { BlogPosts } from "@/components/BlogPosts";
import Header from "@/components/Header";
import Head from "next/head";

const Page = ({ params }: { params: { page: number } }) => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).filter(Boolean) as string[];

  const paginatedPosts = posts.slice(
    12 * (Number(params.page) - 1),
    Number(params.page) * 12
  );

  const numPages = Math.ceil(posts.length / 12);

  const currentUrl = process.env.BASE_URL + "/page/" + params.page;

  return (
    <>
      <Head>
        <title>{`All posts - Page ${params.page}`}</title>
        <meta name="description" content={`Browse all posts.`} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={`All posts - Page ${params.page}`} />
        <meta property="og:description" content={`Browse all posts.`} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Browse all posts - Page ${params.page}`}
        />
        <meta name="twitter:description" content={`Browse all posts.`} />
      </Head>

      <Header />
      <main className="px-4 mb-24 mt-24">
        <BlogPosts
          posts={paginatedPosts}
          allTags={allTags}
          currentPage={Number(params.page)}
          numPages={numPages}
          basePath="/page"
        />
      </main>
    </>
  );
};

export default Page;
