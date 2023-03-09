type Props = {
  cards: number;
};

function ShowCardSkeleton({ cards }: Props) {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="h-[235px] w-[154px] animate-pulse rounded-md bg-gray-300"
          />
        ))}
    </>
  );
}

export default ShowCardSkeleton;
