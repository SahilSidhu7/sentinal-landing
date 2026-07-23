export function NumberedCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-xl border border-outline bg-surface-container-low p-8 transition-all duration-200 ease-out hover:border-primary/50">
      <div className="font-display text-4xl text-primary/20 transition-colors group-hover:text-primary">
        {number}
      </div>
      <h3 className="mt-6 font-display text-headline-md font-semibold text-on-surface">{title}</h3>
      <p className="mt-3 text-body-sm text-on-surface-variant">{description}</p>
    </div>
  );
}
