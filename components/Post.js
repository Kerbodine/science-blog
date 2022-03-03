import Link from "next/link";
import ArticleIcon from "../icons/article-icon.svg";

export default function Post({ post }) {
  return (
    <Link href={`/posts/${post.frontmatter.link}`}>
      <div className="flex h-16 w-full items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-2 transition-colors hover:border-gray-500">
        <div className="h-12">
          <ArticleIcon />
        </div>
        <div className="h-12 w-0.5 bg-gray-200"></div>
        <div className="flex-auto overflow-hidden">
          <h3 className="-mb-2 truncate text-lg font-medium">
            {post.frontmatter.title}
          </h3>
          <p className="truncate text-gray-500">
            By: {post.frontmatter.author} | {post.frontmatter.date}
          </p>
        </div>
      </div>
    </Link>
  );
}
