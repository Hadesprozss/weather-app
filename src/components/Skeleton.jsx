export default function Skeleton() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="h-48 rounded-2xl bg-slate-300 dark:bg-slate-700" />
      <div className="h-28 rounded-2xl bg-slate-300 dark:bg-slate-700" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-slate-300 dark:bg-slate-700" />
        ))}
      </div>
    </div>
  );
}