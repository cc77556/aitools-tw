interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
}

export default function RatingStars({
  rating,
  reviewCount,
  size = "md",
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const starSize = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";
  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <div className="flex items-center gap-1">
      <div className={`flex ${starSize}`}>
        {Array.from({ length: fullStars }, (_, i) => (
          <span key={`full-${i}`} className="star-filled">
            ★
          </span>
        ))}
        {hasHalf && <span className="star-filled">★</span>}
        {Array.from({ length: emptyStars }, (_, i) => (
          <span key={`empty-${i}`} className="star-empty">
            ★
          </span>
        ))}
      </div>
      <span className={`${textSize} font-medium text-[var(--foreground)]`}>
        {rating}
      </span>
      {reviewCount !== undefined && (
        <span className={`${textSize} text-[var(--muted)]`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
