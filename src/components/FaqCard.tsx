export function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-xl border border-outline bg-surface-container-low p-6">
      <h3 className="font-bold text-primary">{question}</h3>
      <p className="mt-3 text-body-sm text-on-surface-variant">{answer}</p>
    </div>
  );
}
