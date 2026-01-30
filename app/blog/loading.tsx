// app/blog/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-2xl mx-auto space-y-8 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-white/5 rounded-xl border border-white/10" />
        ))}
      </div>
    </div>
  );
}