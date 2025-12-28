import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import BlogViewer from "./BlogViewer";
import { Metadata } from "next";

// 1. Update the Props type to reflect that params is now a Promise
interface Props {
  params: Promise<{ slug: string }>;
}

// 2. Update generateMetadata to await params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

// 3. Update the Page component to be async and await params
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogViewer post={post} />;
}

// Static params also works with the slug
export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}