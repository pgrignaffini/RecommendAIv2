/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { Recommendation } from "typings";

type Props = {
  show: Recommendation;
};

function RecommendationCard({ show }: Props) {
  return (
    <div
      key={show.streaming_data.imdbID}
      className="grid grid-cols-2 rounded-md bg-slate-200 p-3"
    >
      <div className="col-span-1 flex flex-col space-y-2">
        <img
          src={show?.streaming_data.posterURLs?.[154]}
          className="h-64 w-64 object-contain "
          alt={show?.title}
        />
        <p>{show.title}</p>
      </div>
      <div className="col-span-1 flex flex-col space-y-2">
        <p>{show.explanation}</p>
        <p>{show.streaming_data.overview}</p>
      </div>
    </div>
  );
}

export default RecommendationCard;
