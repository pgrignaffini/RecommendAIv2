/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { defaultGenres, defaultServices } from "~/utils/constants";
import { useState } from "react";
import axios from "axios";
import type { TMDBShow, TMDBResult } from "typings";
import { getRandomInt } from "~/utils/helpers";
import Banner from "~/components/Banner";
import Row from "~/components/Row";
import ShowCard from "~/components/ShowCard";
import { useReadLocalStorage } from "usehooks-ts";
import dynamic from "next/dynamic";

// static import FAB to avoid SSR issues
const FAB = dynamic(() => import("~/components/FAB"), { ssr: false });

type Props = {
  trendingShows: TMDBShow[];
  topRatedShows: TMDBShow[];
  popularShows: TMDBShow[];
  bannerShow: TMDBShow;
};

const Home = ({
  trendingShows,
  topRatedShows,
  popularShows,
  bannerShow,
}: Props) => {
  // const [servicesFilter, setServicesFilter] =
  //   useState<string[]>(defaultServices);
  // const [genresFilter, setGenresFilter] = useState<string[]>(defaultGenres);
  const preferredShows = useReadLocalStorage<TMDBShow[]>("shows");
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>RecommendAI</title>
        <meta name="description" content="Find your next favorite show" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main>
        <Banner bannerShow={bannerShow} />
        <div className="space-y-4">
          {trendingShows && (
            <Row title="Trending Now">
              {trendingShows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </Row>
          )}
          {topRatedShows && (
            <Row title="Top Rated">
              {topRatedShows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </Row>
          )}
          {popularShows && (
            <Row title="Popular">
              {popularShows?.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </Row>
          )}
        </div>
        <FAB shows={preferredShows as TMDBShow[]} />
      </main>
    </>
  );
};

export default Home;

// get shows on server side
export const getServerSideProps: GetServerSideProps = async () => {
  const trending = await axios.get(
    `${process.env.TMDB_API_URL}/trending/all/day?api_key=${process.env.API_KEY}`
  );

  const trendingShows = trending.data as TMDBResult;

  const topRated = await axios.get(
    `${process.env.TMDB_API_URL}/movie/top_rated?api_key=${process.env.API_KEY}`
  );

  const topRatedShows = topRated.data as TMDBResult;

  const popular = await axios.get(
    `${process.env.TMDB_API_URL}/movie/popular?api_key=${process.env.API_KEY}`
  );

  const popularShows = popular.data as TMDBResult;

  return {
    props: {
      trendingShows: trendingShows.results ?? [],
      topRatedShows: topRatedShows.results ?? [],
      popularShows: popularShows.results ?? [],
      bannerShow:
        trendingShows.results[getRandomInt(0, trendingShows.results.length)],
    },
  };
};
