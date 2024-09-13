export default function Page() {
  return (
    <main>
      <section className="px-4 sm:px-6 mt-16">
        <div className="max-w-container mx-auto">
          <nav className="mb-6">
            <ul
              role="list"
              className="text-sm text-typ-tone font-medium flex gap-1 overflow-x-scroll no-scrollbar border-b border-brd pb-2.5"
            >
              <li>
                <a
                  href="/"
                  className="relative block text-nowrap px-3 py-1 border border-transparent rounded-theme after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone"
                  data-active=""
                >
                  All posts
                </a>
              </li>
              <li>
                <a
                  href="/tag/features/"
                  className="relative block text-nowrap px-3 py-1 border border-transparent rounded-theme md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/tag/guides/"
                  className="relative block text-nowrap px-3 py-1 border border-transparent rounded-theme md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="/tag/tutorials/"
                  className="relative block text-nowrap px-3 py-1 border border-transparent rounded-theme md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="/tag/data-analysis/"
                  className="relative block text-nowrap px-3 py-1 border border-transparent rounded-theme md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone"
                >
                  Data analysis
                </a>
              </li>
              <li>
                <a
                  href="/tag/data-management/"
                  className="relative block text-nowrap px-3 py-1 border border-transparent rounded-theme md:px-4 after:content-[''] after:absolute after:bottom-[-11px] after:left-[calc(50%_-_16px)] after:w-8 after:h-0.5 after:rounded-t-sm after:bg-transparent hover:bg-bgr-tone"
                >
                  Data management
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* <!-- Posts --> */}
      <section className="px-4 mb-24">
        <div className="w-full">
          <h2 className="text-sm font-semibold uppercase text-typ-tone border-b border-brd mb-6 pb-2.5 sr-only">
            Latest
          </h2>

          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <article
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
            </article>
          </div>

          <nav
            className="my-12 text-typ flex items-center justify-center gap-4 font-medium sm:font-normal text-sm sm:gap-6 "
            data-pagination=""
          >
            <a
              data-prev=""
              className="text-sm font-medium flex items-center gap-0.5 border border-brd rounded-theme px-3 py-1 sm:px-4 hover:bg-bgr-tone cursor-not-allowed disabled"
              href="javascript:"
            >
              <i className="icon icon-chevron-left size-4 stroke-[2.5] -ml-1 stroke-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M15 6l-6 6l6 6"></path>
                </svg>
              </i>
              <span>Prev</span>
            </a>
            <span data-page-number="" className="">
              Page 1 of 2
            </span>
            <a
              data-next=""
              className="text-sm font-medium flex items-center gap-0.5 border border-brd rounded-theme px-3 py-1 sm:px-4 hover:bg-bgr-tone"
              href="/page/2/"
            >
              <span>Next</span>
              <i className="icon icon-chevron-right size-4 stroke-[2.5] -mr-1 stroke-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-right"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 6l6 6l-6 6"></path>
                </svg>
              </i>
            </a>
          </nav>
        </div>
      </section>
    </main>
  );
}
