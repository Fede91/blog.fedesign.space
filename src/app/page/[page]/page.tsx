import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { BlogPosts } from "@/components/BlogPosts";
import Header from "@/components/Header";

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

  return (
    <>
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
