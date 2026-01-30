// app/blog/page.tsx (or wherever your main page is)
import BlogListing from "@/components/blog/BlogListing";

// FIX: Ensure page rebuilds on search param change
export const dynamic = "force-dynamic";

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage(props: BlogPageProps) {
  // 1. Get Params (Next.js 15 safe handling)
  const searchParams = await props.searchParams;
  
  // Extract and validate strings
  const category = typeof searchParams.category === "string" ? searchParams.category : "All";
  const search = typeof searchParams.search === "string" ? searchParams.search : "";

  // 2. Render the component with the extracted params
  return <BlogListing category={category} search={search} />;
}