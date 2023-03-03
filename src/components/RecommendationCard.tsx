/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { Recommendation } from "typings";
import StreamingInfo from "./StreamingInfo";

type Props = {
  recommendation: Recommendation;
};

function RecommendationCard({ recommendation }: Props) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={recommendation?.streaming_data.posterURLs?.[780]}
          alt={recommendation?.title}
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recommendation.title}</h2>
        <p className="italic text-secondary">Why you might like this show:</p>
        <p>{recommendation.explanation}</p>
        <p className="italic text-secondary">Overview:</p>
        <p>{recommendation.streaming_data.overview}</p>
        <p className="italic text-secondary">Available on:</p>
        <StreamingInfo
          streamingInfo={recommendation.streaming_data.streamingInfo}
        />
      </div>
    </div>
  );
}

export default RecommendationCard;
