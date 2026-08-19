/**
 * Small, dependency-free helpers for working with blog post Markdown —
 * estimated reading time and a table-of-contents extractor. Kept dependency
 * free deliberately (no remark/rehype plugins) to avoid adding more
 * packages the project needs to install.
 */

export function estimateReadingTime(markdown: string): number {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*_~-]/g, ' ');
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/`|\*|_|~/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-');
}

/**
 * Extracts H2/H3 headings from raw Markdown, in document order, with
 * unique slug ids. Only H2/H3 are included so the resulting table of
 * contents stays scannable — H1 is the post title itself.
 */
export function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();
  let fenced = false;

  for (const rawLine of markdown.split('\n')) {
    if (/^```/.test(rawLine.trim())) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;

    const match = rawLine.match(/^(#{2,3})\s+(.+?)\s*#*$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const cleanText = match[2]
      .replace(/`|\*|_|~/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .trim();
    if (!cleanText) continue;

    let id = slugifyHeading(cleanText) || `section-${headings.length + 1}`;
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;

    headings.push({ id, text: cleanText, level });
  }

  return headings;
}
