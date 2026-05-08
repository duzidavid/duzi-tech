import type { ReactNode } from 'react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand/5 dark:bg-brand/10">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
    </article>
  );
}
