import { BlogService } from "@/services/blog.services";
import BlogIndex from "@/components/blog/BlogIndex"; // Renamed for clarity

export const dynamic = "force-dynamic";

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage(props: BlogPageProps) {
  const searchParams = await props.searchParams;
  
  // fetch data
  let allPosts = [];
  try {
    allPosts = await BlogService.getRecentPosts();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  // Sanitize data to ensure it is serializable (no Date objects, no undefined)
  const cleanPosts = allPosts.map((post: any) => ({
    _id: post._id?.toString() || post.id?.toString() || crypto.randomUUID(),
    title: post.title || "Untitled Post",
    slug: post.slug || "#",
    excerpt: post.excerpt || "No description available.",
    // Handle complex image objects or strings
    coverImage: typeof post.coverImage === "object" ? post.coverImage?.url : post.coverImage,
    createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString(),
    readTime: post.readTime || 5,
    tags: Array.isArray(post.tags) ? post.tags : [],
    category: post.category || "General",
    author: {
      name: post.author?.name || "Editor",
      image: post.author?.image || null,
    },
  }));

  return (
    <BlogIndex 
      initialPosts={cleanPosts} 
    />
  );
}