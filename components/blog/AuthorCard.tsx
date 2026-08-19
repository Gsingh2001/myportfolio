export default function AuthorCard() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-black text-black">
        GS
      </div>
      <div>
        <p className="font-bold text-slate-900 dark:text-white">Gurmanpreet Singh</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Director &amp; Principal Architect, 24xDev</p>
      </div>
    </div>
  );
}
