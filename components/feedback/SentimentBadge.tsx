interface SentimentBadgeProps {
  sentiment: "Positive" | "Negative" | "Neutral";
}

const styles = {
  Positive: "bg-green-100 text-green-700 border border-green-200",
  Neutral: "bg-cream-dark text-forest-light border border-loop-border",
  Negative: "bg-terra-bg text-terra border border-red-200",
};

export default function SentimentBadge({
  sentiment,
}: SentimentBadgeProps) {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${styles[sentiment]}
      `}
    >
      {sentiment}
    </span>
  );
}