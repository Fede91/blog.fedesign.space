import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import ProgressBar from "@/components/ProgressBar";
import { Article } from "@/components/Article";
import Header from "@/components/Header";
import Head from "next/head";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === decodeURI(params.slug)
  );
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === decodeURI(params.slug)
  );
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const currentUrl = process.env.BASE_URL + "/" + params.slug;

  const Content = getMDXComponent(post.body.code);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={post.seo_description || post.excerpt}
        />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.seo_description || post.excerpt}
        />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta
          name="twitter:description"
          content={post.seo_description || post.excerpt}
        />
      </Head>

      <div className="px-4 lg:px-0">
        <Header />
        <article className="mx-auto max-w-2xl py-8 mt-16 ">
          <ProgressBar />
          <div className="mb-8 text-center">
            <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>
            <h1 className="text-3xl font-bold my-8">{post.title}</h1>
            {post.cover && (
              <div
                className="aspect-video"
                style={{
                  background: `url(${post.cover})`,
                }}
              ></div>
            )}
          </div>
          <Content
            components={{
              pre: (props) => <pre className="code-style" {...props} />,
              p: (props) => <p className="text-lg leading-6 my-4" {...props} />,
              h1: (props) => (
                <h1 className="text-3xl font-bold my-8" {...props} />
              ),
              h2: (props) => (
                <h2
                  className="text-2xl font-medium leading-relaxed my-6"
                  {...props}
                />
              ),
              h3: (props) => <h3 className="my-6" {...props} />,
              ul: (props) => (
                <ul className="list-disc list-inside my-4" {...props} />
              ),
              ol: (props) => (
                <ol className="list-decimal list-inside my-4" {...props} />
              ),
              hr: (props) => (
                <div
                  className="my-8"
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(to right, transparent, #525c5c, transparent)",
                  }}
                />
              ),
            }}
          />

          <div
            className="my-8"
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, #525c5c, transparent)",
            }}
          />

          <section className="my-8 flex flex-row justify-between items-center">
            <h4 className="text-2xl font-bold mb-4">Share</h4>
            <div className="flex space-x-4">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium flex items-center gap-0.5 border border-theme rounded-2xl px-3 py-1 sm:px-4 hover:bg-bgr-tone"
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium flex items-center gap-0.5 border border-theme rounded-2xl px-3 py-1 sm:px-4 hover:bg-bgr-tone"
              >
                Facebook
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium flex items-center gap-0.5 border border-theme rounded-2xl px-3 py-1 sm:px-4 hover:bg-bgr-tone"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(
                  post.title
                )}&body=${encodeURIComponent(currentUrl)}`}
                className="text-sm font-medium flex items-center gap-0.5 border border-theme rounded-2xl px-3 py-1 sm:px-4 hover:bg-bgr-tone"
              >
                Email
              </a>
            </div>
          </section>
        </article>

        <section className="my-8 mx-4">
          <h2 className="text-2xl font-bold mb-4">Read Next</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allPosts
              .filter((post) => post._raw.flattenedPath !== params.slug)
              .slice(0, 3)
              .map((post) => (
                <Article
                  title={post.title}
                  cover={post.cover}
                  date={post.date}
                  url={post.url}
                  key={post._raw.flattenedPath}
                  tags={post.tags || []}
                  excerpt={post?.excerpt?.split(" ").slice(0, 14).join(" ")}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default PostLayout;
