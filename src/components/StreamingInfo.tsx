import Link from "next/link";
import React from "react";
import type { StreamingInfo } from "typings";

type Props = {
  streamingInfo: StreamingInfo;
};

function StreamingInfo({ streamingInfo }: Props) {
  return (
    <div>
      {Object.entries(streamingInfo).map(([service, countries]) => (
        <div key={service}>
          {Object.entries(countries).map(([country, info]) => (
            <div key={`${service}-${country}`} className="flex space-x-2">
              <h3 className="uppercase">{country}:</h3>
              <Link
                href={info.link}
                target="_blank"
                className="link-secondary link"
              >
                {service}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default StreamingInfo;
