import Link from "next/link";
import ReactMarkDown from "react-markdown";

// UI component foe main post content
export default function PostContent({ post }) {
    const createdAt =
        typeof post?.createdAt === "number" ? new Date(post.createdAt) : post.createdAt.toDate();

    return (
        <div className="card">
            <h1>{post?.title}</h1>
            <span className="text-sm">
                Written by{" "}
                <Link href={`/${post.username}`}>
                    <span className="text-info">@{post.username}</span>
                </Link>{" "}
                on {createdAt.toISOString()}
            </span>
            <ReactMarkDown>{post?.content}</ReactMarkDown>
        </div>
    );
}
