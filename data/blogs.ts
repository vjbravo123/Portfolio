// data/blogs.ts

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  image: string;
  tags: string[];
  content: string; // Add this
}

export const blogs: BlogPost[] = [
  {
    id: "1",
    title: "How I Built a Video Streaming App using React & Node.js",
    slug: "building-youtube-clone-mern",
    date: "Dec 24, 2025",
    readTime: "8 min read",
    category: "Case Study",
    excerpt: "A deep dive into the architecture of my YouTube clone, handling RapidAPI integrations and state management.",
    image: "/YT.webp",
    tags: ["React", "Node.js", "API"],
    content: `
      <h2>The Vision</h2>
      <p>Building a YouTube clone wasn't just about the UI; it was about handling complex data streams and ensuring a smooth user experience. I wanted to replicate the core functionalities: video searching, category filtering, and a seamless playback experience.</p>
      
      <h3>The Tech Stack</h3>
      <p>I chose the <strong>MERN stack</strong> for its flexibility. React handles the heavy lifting on the frontend, while Node and Express manage the API communication logic.</p>
      
      <pre><code>// Sample API Fetch Logic
const fetchVideos = async (query) => {
  const response = await axios.get(BASE_URL, {
    params: { q: query, part: 'snippet,id' }
  });
  return response.data.items;
};</code></pre>

      <h3>Key Challenges</h3>
      <p>Handling high-resolution image loading and video buffering were the main hurdles. I implemented <strong>lazy loading</strong> and used Shimmer effects to maintain a high Lighthouse performance score of 95+.</p>
    `
  },
  {
    id: "2",
    title: "React vs Next.js 15 — What I Learned After 15 Projects",
    slug: "react-vs-nextjs-2025",
    date: "Dec 15, 2025",
    readTime: "5 min read",
    category: "Tech Comparison",
    excerpt: "Why I shifted my workflow to Next.js App Router and how it improved my Lighthouse scores by 40%.",
    image: "/OL.webp",
    tags: ["Next.js", "Frontend", "Performance"],
    content: `
      <h2>Why the Shift?</h2>
      <p>Standard React apps often struggle with SEO and initial load times because they are client-side rendered. Next.js 15 solves this with Server Components by default.</p>
      
      <h3>Server Side Rendering (SSR)</h3>
      <p>By moving the data fetching to the server, I reduced the JavaScript bundle size sent to the client. This is crucial for users in regions with slower internet connectivity.</p>

      <pre><code>// Next.js 15 Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return &lt;div&gt;{data.title}&lt;/div&gt;;
}</code></pre>
    `
  }
];