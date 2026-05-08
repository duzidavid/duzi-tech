export function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-8 bg-brand" />
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
        {children}
      </span>
    </div>
  );
}
