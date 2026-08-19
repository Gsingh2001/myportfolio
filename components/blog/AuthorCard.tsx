export default function AuthorCard() {
  return (
    <div className="flex items-center gap-4 rounded border border-line bg-surface p-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-ink font-mono text-lg font-black text-ink">
        GS
      </div>
      <div>
        <p className="font-display font-semibold text-ink">Gurmanpreet Singh</p>
        <p className="text-sm text-ink-secondary">Director &amp; Principal Architect, 24xDev</p>
      </div>
    </div>
  );
}
