interface SentimentBadgeProps {
  sentiment: "Positive" | "Negative" | "Neutral";
  score?: number;
}

const styles = {
  Positive: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Neutral: "bg-amber-50 text-amber-700 border border-amber-200",
  Negative: "bg-red-50 text-red-700 border border-red-200",
};

export default function SentimentBadge({
  sentiment,
  score,
}: SentimentBadgeProps) {
  const formattedScore =
    score !== undefined
      ? score > 0
        ? `+${Number(score).toFixed(2)}`
        : Number(score).toFixed(2)
      : null;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        shadow-2xs
        ${styles[sentiment] || styles.Neutral}
      `}
    >
      <span>{sentiment}</span>
      {formattedScore && (
        <span className="font-mono text-[10px] font-bold opacity-85 bg-white/60 px-1.5 py-0.5 rounded-full border border-black/5">
          {formattedScore}
        </span>
      )}
    </span>
  );
}