// app/blog/page.tsx
import { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog & Technical Insights | Vivek Joshi",
  description: "Read technical articles on MERN stack development, Next.js tutorials, and case studies on building scalable web applications by Vivek Joshi.",
  openGraph: {
    title: "Vivek Joshi's Engineering Blog",
    description: "Deep dives into React, Node.js, and modern web architecture.",
    type: "website",
  }
};

export default function BlogPage() {
  return <BlogContent />;
}