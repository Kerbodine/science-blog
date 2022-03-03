import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Head from "next/head";
import Script from "next/script";

export default function PostPage({
  frontmatter: { title, date, author },
  slug,
  content,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="mx-auto max-w-4xl px-8 pt-16 sm:px-16">
        <h1 className="mb-4 text-3xl font-semibold leading-7">{title}</h1>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-400"></div>
          <div className="text-gray-500">
            <p className="-mb-1">Written by {author}</p>
            <p className="font-medium">{date}</p>
          </div>
        </div>
        <article
          className="prose mt-12 max-w-none"
          dangerouslySetInnerHTML={{ __html: marked(content) }}
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

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
