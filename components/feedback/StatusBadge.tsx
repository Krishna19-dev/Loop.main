interface StatusBadgeProps {
  status: "Pending" | "Reviewed" | "Resolved";
}

const styles = {
  Pending: "bg-champagne-deep text-amber-700 border border-amber-200",
  Reviewed: "bg-blue-100 text-blue-700 border border-blue-200",
  Resolved: "bg-sage-bg text-sage border border-emerald-200",
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
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
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}