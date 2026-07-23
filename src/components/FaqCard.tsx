export function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-xl border border-outline bg-surface-container-low p-7 shadow-md shadow-black/20">
      <h3 className="font-bold text-primary">{question}</h3>
      <p className="mt-3 text-body-sm leading-relaxed text-on-surface-variant">{answer}</p>
    </div>
  );
}
