import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "../components/Post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
  console.log(posts);

  return (
    <div className="mx-auto w-full max-w-4xl bg-red-100 px-8 pt-16">
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
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
