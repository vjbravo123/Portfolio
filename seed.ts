import 'dotenv/config';
import mongoose from "mongoose";
import slugify from "slugify";

// Relative imports (Ensure these match your actual file structure)
import dbConnect from "./lib/db";
import Blog from "./models/Blog";
import User from "./models/Users";

// ----------------------------------------------------------------------
// 1. CONFIGURATION & IMAGES (✅ FIXED ALL BROKEN LINKS)
// ----------------------------------------------------------------------

const IMAGES = {
  // Tech & Code
  laptop_code: "1498050108023-c5249f4df085",  // MacBook displaying code
  server_room: "1558494949-ef010cbdcc31",    // Dark server room
  matrix_code: "1526374965328-7f61d4dc18c5",  // Hacker/Matrix style green code
  setup_desk: "1486312338219-ce68d2c6f44d",   // Person typing on Mac
  microchip: "1518770660439-4636190af475",    // CPU/Hardware macro
  vr_ar: "1535223289827-42f1e9919769",        // Woman with VR Headset

  // Abstract & Design
  neon_abstract: "1550751827-4bd374c3f58b",   // Blue/Pink abstract tech
  gradient: "1579546929518-9e396f3cc809",     // Colorful gradient mesh
  geometric: "1550684848-fac1c5b4e853",       // Abstract geometric shapes
  white_minimal: "1494438639946-1ebd1d20bf85", // Minimalist white texture

  // Office & Lifestyle
  meeting_team: "1522071820081-009f0129c71c", // Hands stacked/Teamwork
  coffee_break: "1495474472287-4d71bcdd2085", // Coffee cup
  // ✅ FIXED: New Stable "Remote Work" (Laptop on Bed/Cozy)
  remote_work: "1556761175-5973dc0f32e7",     
  burnout: "1484480974693-6ca0a78fb36b",      // Person holding head/stressed
  handshake: "1521791136064-7986c2920216",    // Business handshake
  
  // Concepts
  // ✅ FIXED: New Stable "Brain/AI" (Abstract Network Nodes)
  brain_ai: "1507413245164-6160d8298b31",     
  rocket: "1517976487492-5750f3195933",       // Startup launch/Rocket
  security: "1555949963-ff9fe0c870eb",        // Cyber Lock/Code
};

// ----------------------------------------------------------------------
// 2. RAW DATA CONTENT
// ----------------------------------------------------------------------

const rawData = [
  // --- TECH & ENGINEERING ---
  {
    title: "The Death of Localhost: Cloud Development Environments",
    subtitle: "Why coding on your physical machine is becoming a thing of the past.",
    category: "Tech",
    content: "Setting up a dev environment used to take days. With GitHub Codespaces and Project IDX, we are moving to ephemeral, cloud-based environments. This article explores the pros and cons of ditching localhost.",
    tags: ["DevOps", "Cloud", "Productivity"],
    imageId: IMAGES.laptop_code,
    forcedStats: { views: 12500, likes: 850, shares: 120 }
  },
  {
    title: "Next.js 15: Is React Server Components Finally Ready?",
    subtitle: "A deep dive into the stability of the App Router in 2025.",
    category: "Tech",
    content: "The transition to Server Components was rocky. Now that the dust has settled, we look at performance benchmarks, caching strategies, and whether you should migrate your legacy Pages Router apps.",
    tags: ["Next.js", "React", "Frontend"],
    imageId: IMAGES.matrix_code,
    forcedStats: { views: 45000, likes: 3200, shares: 900 }
  },
  {
    title: "Understanding Vector Databases for AI Agents",
    subtitle: "How Pinecone and Milvus power the memory of LLMs.",
    category: "Tech",
    content: "Standard SQL databases can't handle semantic search efficiently. In this guide, we build a simple RAG (Retrieval-Augmented Generation) pipeline using a vector database to give an AI long-term memory.",
    tags: ["AI", "Databases", "Backend"],
    imageId: IMAGES.brain_ai,
  },
  {
    title: "Rust for JavaScript Developers",
    subtitle: "Why the learning curve is worth it for tooling.",
    category: "Tech",
    content: "You don't need to rewrite your backend in Rust, but understanding it helps you understand the tools you use (Turbo, SWC, Biome). We compare Rust's ownership model to JS garbage collection.",
    tags: ["Rust", "Learning", "Performance"],
    imageId: IMAGES.microchip,
  },
  {
    title: "Cybersecurity 101: Preventing SQL Injection in 2026",
    subtitle: "Old threats never die, they just evolve.",
    category: "Tech",
    content: "Despite frameworks handling escaping, SQL injection remains a top vulnerability. We look at raw query dangers in ORMs and how to sanitize inputs correctly in Node.js.",
    tags: ["Security", "Hacking", "Backend"],
    imageId: IMAGES.security,
  },

  // --- SERIES: SYSTEMS DESIGN ---
  {
    title: "Systems Design Ep 1: Horizontal vs Vertical Scaling",
    subtitle: "The fundamental choice in architecture.",
    category: "Tutorials",
    content: "Should you buy a bigger server or buy more servers? We discuss load balancers, stateless architectures, and the cost implications of scaling out versus scaling up.",
    tags: ["Architecture", "Scalability", "Backend"],
    imageId: IMAGES.server_room,
    seriesData: { name: "Systems Design Masterclass", order: 1 }
  },
  {
    title: "Systems Design Ep 2: Caching Strategies",
    subtitle: "Write-through, write-back, and cache-aside patterns.",
    category: "Tutorials",
    content: "Caching is the easiest way to crash your system if done wrong. We explore Redis implementation patterns and the dreaded cache-invalidation problem.",
    tags: ["Redis", "Performance", "Caching"],
    imageId: IMAGES.neon_abstract,
    seriesData: { name: "Systems Design Masterclass", order: 2 }
  },
  {
    title: "Systems Design Ep 3: Message Queues & Event-Driven Ops",
    subtitle: "Decoupling services with RabbitMQ and Kafka.",
    category: "Tutorials",
    content: "Synchronous HTTP calls create tight coupling. Learn how to use event buses to create resilient microservices that can fail without taking down the whole system.",
    tags: ["Microservices", "Kafka", "Architecture"],
    imageId: IMAGES.geometric,
    seriesData: { name: "Systems Design Masterclass", order: 3 }
  },

  // --- DESIGN & UX ---
  {
    title: "Neomorphism is Dead: Long Live 'Bento' Grids",
    subtitle: "The UI trend taking over Apple and Linear.",
    category: "Design",
    content: "We analyze the rise of the 'Bento Box' layout style—modular, grid-based, and information-dense yet clean. How to implement this using CSS Grid.",
    tags: ["UI Trends", "CSS", "Design"],
    imageId: IMAGES.gradient,
  },
  {
    title: "Dark Mode Engineering",
    subtitle: "It's more than just `media (prefers-color-scheme)`.",
    category: "Design",
    content: "Handling dark mode correctly involves semantic color tokens, avoiding pure black (#000000) for contrast, and handling FOUC (Flash of Unstyled Content).",
    tags: ["CSS", "Frontend", "UX"],
    imageId: IMAGES.white_minimal,
  },
  {
    title: "Typography Hierarchies in Web Applications",
    subtitle: "Why your dashboard looks messy.",
    category: "Design",
    content: "Good design is 90% typography. We learn about modular scales, line-height ratios, and why you should limit your font weights to just 2 or 3 options.",
    tags: ["Typography", "Design System"],
    imageId: IMAGES.neon_abstract,
  },

  // --- CAREER & LIFESTYLE ---
  {
    title: "Surviving the Tech Layoffs: A Guide",
    subtitle: "How to recession-proof your career.",
    category: "Career",
    content: "The market has shifted from growth at all costs to efficiency. We discuss how to position yourself as a profit-center engineer rather than a cost-center engineer.",
    tags: ["Career", "Economy", "Advice"],
    imageId: IMAGES.burnout,
    forcedStats: { views: 52000, likes: 4100, shares: 2300 }
  },
  {
    title: "Remote Work Loneliness is Real",
    subtitle: "Strategies for staying connected in a distributed world.",
    category: "Lifestyle",
    content: "Slack huddles aren't the same as water cooler talk. Here are 5 strategies for digital nomads and remote workers to maintain social sanity.",
    tags: ["Remote Work", "Mental Health"],
    imageId: IMAGES.remote_work,
  },
  {
    title: "From Junior to Senior: The Soft Skills Gap",
    subtitle: "Code gets you hired, communication gets you promoted.",
    category: "Career",
    content: "Detailed breakdown of the expectations at different engineering levels. Why 'disagree and commit' is a vital skill for senior leadership.",
    tags: ["Soft Skills", "Promotion", "Leadership"],
    imageId: IMAGES.meeting_team,
  },
  {
    title: "The 4-Day Work Week Experiment",
    subtitle: "Results from our team's 6-month trial.",
    category: "Lifestyle",
    content: "Did productivity drop? Did happiness increase? We share the raw data from our experiment reducing work hours to 32 hours per week.",
    tags: ["Productivity", "Work Life Balance"],
    imageId: IMAGES.coffee_break,
  },
  
  // --- TUTORIALS ---
  {
    title: "Mastering Git Rebase",
    subtitle: "Stop being afraid of the force push.",
    category: "Tutorials",
    content: "Merge commits clutter history. We teach you how to interactively rebase, squash commits, and maintain a linear history like a pro.",
    tags: ["Git", "Workflow", "DevOps"],
    imageId: IMAGES.setup_desk,
  },
  {
    title: "Building a SaaS in a Weekend",
    subtitle: "The tech stack for speed.",
    category: "Tutorials",
    content: "Stripe, Supabase, Next.js, and Tailwind. A blueprint for launching an MVP in 48 hours without getting bogged down in infrastructure.",
    tags: ["IndieHacker", "SaaS", "Startup"],
    imageId: IMAGES.rocket,
  },
  {
    title: "Introduction to WebAssembly (Wasm)",
    subtitle: "Running C++ in the browser.",
    category: "Tech",
    content: "WebAssembly unlocks performance previously impossible in JavaScript. We compile a simple image processing function in C and run it in React.",
    tags: ["Wasm", "Performance", "Web"],
    imageId: IMAGES.vr_ar,
  },
  {
    title: "Negotiating Equity Packages",
    subtitle: "RSUs vs Stock Options explained.",
    category: "Career",
    content: "Don't let the startup confuse you. We break down vesting schedules, cliffs, and the tax implications of exercising options.",
    tags: ["Finance", "Money", "Career"],
    imageId: IMAGES.handshake,
  }
];

// ----------------------------------------------------------------------
// 3. HELPER FUNCTIONS
// ----------------------------------------------------------------------

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ----------------------------------------------------------------------
// 4. MAIN EXECUTION
// ----------------------------------------------------------------------

async function seed() {
  try {
    console.log("\n📡 Connecting to Database...");
    
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error("❌ MONGO_URI is not defined in .env file");
    }

    await dbConnect();
    console.log("✅ Database Connected.");

    // --- USER SETUP ---
    let author = await User.findOne({ email: "engineering@example.com" });
    if (!author) {
      console.log("👤 Creating Default Admin User...");
      author = await User.create({
        name: "Admin Dev",
        email: "engineering@example.com",
        password: "password123", 
        image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix"
      });
    } else {
      console.log("👤 Using existing Admin User.");
    }

    // --- CLEANUP ---
    console.log("🧹 Clearing old Blog data...");
    await Blog.deleteMany({});

    // --- PREPARATION ---
    console.log(`📦 Preparing ${rawData.length} articles...`);

    const preparedBlogs = rawData.map((data, index) => {
      // 1. Generate Realistic Stats
      const views = data.forcedStats?.views || getRandomInt(1200, 15000);
      const likes = data.forcedStats?.likes || Math.floor(views * (getRandomInt(3, 8) / 100));
      const shares = data.forcedStats?.shares || Math.floor(likes * (getRandomInt(10, 25) / 100));
      
      const daysAgo = index * 5; 
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      let seriesObj = undefined;
      if (data.seriesData) {
        seriesObj = {
          name: data.seriesData.name,
          slug: slugify(data.seriesData.name, { lower: true }),
          order: data.seriesData.order
        };
      }

      return {
        title: data.title,
        subtitle: data.subtitle || data.content.substring(0, 100) + "...",
        slug: slugify(data.title, { lower: true, strict: true }),
        content: data.content,
        contentFormat: 'markdown',
        
        // 4. Image Construction
        coverImage: {
          url: `https://images.unsplash.com/photo-${data.imageId}?auto=format&fit=crop&w=1920&q=80`,
          alt: `${data.title} cover image`,
          credit: "Unsplash"
        },

        author: author?._id,
        published: true,
        publishedAt: date,
        tags: data.tags,
        category: data.category,
        series: seriesObj,
        
        seo: {
          metaTitle: data.title,
          metaDescription: data.content.substring(0, 155),
          keywords: [...data.tags, data.category]
        },

        isFeatured: index < 2 || (views > 30000),
        
        stats: { views, likes, shares },
        createdAt: date,
        updatedAt: date
      };
    });

    // --- INSERTION ---
    console.log("🚀 Inserting Articles into MongoDB...");
    await Blog.insertMany(preparedBlogs);

    console.log(`\n🎉 SEEDING COMPLETE!`);
    console.log(`   - Created ${preparedBlogs.length} blog posts.`);
    console.log("------------------------------------------------");
    
    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error("\n❌ SEEDING FAILED:");
    console.error(error);
    process.exit(1);
  }
}

seed();