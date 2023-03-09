type Props = {
  cards: number;
};

function BannerSkeleton({ cards }: Props) {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="h-[700px] w-full animate-pulse rounded-md bg-gray-300"
          />
        ))}
    </>
  );
}

export default BannerSkeleton;
