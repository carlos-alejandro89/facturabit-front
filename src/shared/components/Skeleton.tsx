interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <span aria-hidden="true" className={`app-skeleton block ${className}`} />;
}

export function FormDataSkeleton() {
  return (
    <div className="mt-5 space-y-4" role="status" aria-label="Cargando formulario">
      {[4, 8, 2].map((fields, section) => (
        <section key={section} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="mb-5 flex items-center gap-3 border-b border-[var(--color-border)] pb-4">
            <Skeleton className="size-8 rounded-lg" />
            <div className="space-y-2"><Skeleton className="h-3 w-36" /><Skeleton className="h-2.5 w-52" /></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: fields }, (_, index) => <div key={index} className="space-y-2"><Skeleton className="h-2.5 w-24" /><Skeleton className="h-10 w-full rounded-xl" /></div>)}
          </div>
        </section>
      ))}
    </div>
  );
}

export function EmitterCardsSkeleton() {
  return (
    <div className="space-y-4" role="status" aria-label="Cargando emisores">
      {[0, 1].map((item) => <div key={item} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white"><div className="flex items-center gap-3 bg-[var(--color-brand)]/95 px-5 py-4"><Skeleton className="size-9 rounded-lg bg-white/15" /><div className="space-y-2"><Skeleton className="h-3 w-44 bg-white/15" /><Skeleton className="h-2.5 w-64 bg-white/10" /></div></div><div className="grid gap-5 px-5 py-5 sm:grid-cols-4">{[0, 1, 2, 3].map((cell) => <div key={cell} className="space-y-2"><Skeleton className="h-2 w-16" /><Skeleton className="h-3 w-28" /></div>)}</div></div>)}
    </div>
  );
}

export function CertificatePanelSkeleton() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white" role="status" aria-label="Cargando certificados">
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-4"><Skeleton className="size-9 rounded-xl" /><div className="space-y-2"><Skeleton className="h-3 w-48" /><Skeleton className="h-2.5 w-72" /></div></div>
      <div className="space-y-3 p-5"><Skeleton className="h-10 w-full rounded-xl" /><Skeleton className="h-10 w-full rounded-xl" /><Skeleton className="h-10 w-full rounded-xl" /></div>
    </section>
  );
}

export function DashboardSummarySkeleton() {
  return (
    <div className="space-y-7" role="status" aria-label="Cargando resumen operativo">
      <section className="overflow-hidden rounded-[1.65rem] bg-[var(--color-brand)] px-6 py-7 sm:px-8 lg:min-h-[19rem] lg:px-10 lg:py-9">
        <Skeleton className="h-2.5 w-36 bg-white/10" />
        <div className="mt-5 space-y-3"><Skeleton className="h-8 w-3/5 bg-white/15" /><Skeleton className="h-3 w-2/5 bg-white/10" /></div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="space-y-3 sm:text-center"><Skeleton className="size-9 rounded-xl bg-white/10 sm:mx-auto" /><Skeleton className="h-2.5 w-28 bg-white/10 sm:mx-auto" /><Skeleton className="h-6 w-20 bg-white/15 sm:mx-auto" /><Skeleton className="h-2.5 w-24 bg-white/10 sm:mx-auto" /></div>)}
        </div>
      </section>
      <div className="grid gap-7 xl:grid-cols-[1.6fr_1fr]">
        {[0, 1].map((card) => <section key={card} className="rounded-2xl border border-[var(--color-border)] bg-white p-5"><div className="space-y-2"><Skeleton className="h-3.5 w-44" /><Skeleton className="h-2.5 w-56" /></div><div className="mt-6 space-y-4">{[0, 1, 2].map((row) => <Skeleton key={row} className="h-11 w-full rounded-xl" />)}</div></section>)}
      </div>
    </div>
  );
}

export function DocumentsTableSkeleton({ embedded = false }: { embedded?: boolean }) {
  return (
    <section className={embedded ? "overflow-hidden bg-white" : "mt-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white"} role="status" aria-label="Cargando comprobantes">
      <div className="grid grid-cols-[.8fr_2fr_.8fr_1fr_1fr_.8fr_2rem] gap-5 bg-[#fcfbf8] px-5 py-3.5">
        {["w-16", "w-28", "w-12", "w-16", "w-14", "w-16", "w-5"].map((width, index) => <Skeleton key={index} className={`h-2 ${width}`} />)}
      </div>
      {[0, 1, 2, 3, 4].map((row) => <div key={row} className="grid grid-cols-[.8fr_2fr_.8fr_1fr_1fr_.8fr_2rem] items-center gap-5 border-t border-[var(--color-border)] px-5 py-4"><Skeleton className="h-3 w-16" /><div className="space-y-2"><Skeleton className="h-3 w-36" /><Skeleton className="h-2 w-24" /></div><Skeleton className="h-3 w-12" /><Skeleton className="h-3 w-20" /><Skeleton className="h-3 w-20" /><Skeleton className="h-6 w-16 rounded-full" /><Skeleton className="size-7 rounded-lg" /></div>)}
    </section>
  );
}
