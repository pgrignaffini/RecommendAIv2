/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { Recommendation } from "typings";

type Props = {
  recommendation: Recommendation;
};

function RecommendationCard({ recommendation }: Props) {
  return (
    <div
      key={recommendation.streaming_data.imdbID}
      className="grid grid-cols-2 rounded-md bg-slate-200 p-3"
    >
      <div className="col-span-1 flex flex-col space-y-2">
        <img
          src={recommendation?.streaming_data.posterURLs?.[154]}
          className="h-64 w-64 object-contain "
          alt={recommendation?.title}
        />
        <p>{recommendation.title}</p>
      </div>
      <div className="col-span-1 flex flex-col space-y-2">
        <p>{recommendation.explanation}</p>
        <p>{recommendation.streaming_data.overview}</p>
      </div>
    </div>
  );
}

export default RecommendationCard;
