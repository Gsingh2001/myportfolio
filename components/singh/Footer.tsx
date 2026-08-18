import { personal } from './data';

export default function SinghFooter() {
  return (
    <footer className="border-t border-[#eeeef0] py-10">
      <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#71717f]">
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </p>
        <p className="text-xs text-[#8e8e9c] font-mono">
          Built with Next.js, React &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
