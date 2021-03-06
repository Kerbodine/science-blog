import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "../components/Post";
import { sortByDate } from "../utils";
import Head from "next/head";

export default function Home({ posts }) {
  console.log(posts);

  return (
    <>
      <Head>
        <title>Physics Blog Site</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Physics ideas - Simply explained. Designed and written by Michael Tong"
        />
      </Head>
      <div className="mx-auto w-full max-w-4xl px-8 pt-16">
        <h1 className="text-3xl font-semibold leading-8">All Articles:</h1>
        <hr className="my-4 border-0 border-b-2 border-gray-200" />
        <div className="flex flex-col gap-2">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Get files from the post directory
  const files = fs.readdirSync(path.join("posts"));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf8"
    );

    // Parse frontmatter
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter: {
        link: slug.replace(/\s+/g, "-").toLowerCase(),
        ...frontmatter,
      },
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
