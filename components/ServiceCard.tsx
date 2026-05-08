export function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-8 transition hover:border-brand hover:shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-slate-600">{description}</p>
    </article>
  );
}
