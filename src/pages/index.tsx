/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps } from "next";
import Head from "next/head";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { api } from "~/utils/api";
import axios from "axios";
import type { TMDBShow, TMDBResult } from "typings";
import { getRandomInt } from "~/utils/helpers";
import Row from "~/components/Row";
import ShowCard from "~/components/ShowCard";
import dynamic from "next/dynamic";

// static import to avoid SSR issues due to usage of localStorage
const Drawer = dynamic(() => import("~/components/Drawer"), { ssr: false });
const Banner = dynamic(() => import("~/components/Banner"), { ssr: false });

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
  return (
    <>
      <Head>
        <title>RecommendAI</title>
        <meta name="description" content="Find your next favorite show" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
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
        </div>
        <Drawer />
      </div>
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
