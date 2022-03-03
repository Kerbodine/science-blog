import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";

export default function PostPage({
  frontmatter: { title, date, author },
  slug,
  articleContent,
}) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=es6" />
      <Script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" />
      <div className="mx-auto max-w-4xl px-8 pt-16 pb-32 sm:px-16">
        <button
          className="mb-6 rounded-lg border-2 border-gray-200 px-2 py-1 text-sm font-medium text-gray-500 transition-colors hover:border-gray-500"
          onClick={() => router.back()}
        >
          ← Back
        </button>
        <header>
          <h1 className="text-3xl font-semibold leading-8">{title}</h1>
          <hr className="my-4 border-0 border-b-2 border-gray-200" />
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-400 text-xl font-semibold text-white">
              {author[0]}
            </div>
            <div className="text-gray-700">
              <p className="font-medium">Written by {author}</p>
              <p className="text-gray-500">{date}</p>
            </div>
          </div>
        </header>
        <article
          className="prose mt-12 max-w-none"
          dangerouslySetInnerHTML={{ __html: articleContent }}
        ></article>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  const articleContent = marked(content);

  return {
    props: {
      frontmatter,
      slug,
      articleContent,
    },
  };
}
