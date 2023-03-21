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
import ShowCardSkeleton from "~/components/skeletons/ShowCardSkeleton";

// static import to avoid SSR issues due to usage of localStorage
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
    <div>
      <Head>
        <title>RecommendAI</title>
        <meta name="description" content="Find your next favorite show" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <Banner bannerShow={bannerShow} />
      <div className="space-y-4">
        <Row title="Trending Now">
          {trendingShows ? (
            trendingShows.map((show) => <ShowCard key={show.id} show={show} />)
          ) : (
            <ShowCardSkeleton cards={10} />
          )}
        </Row>
        <Row title="Top Rated">
          {topRatedShows ? (
            topRatedShows.map((show) => <ShowCard key={show.id} show={show} />)
          ) : (
            <ShowCardSkeleton cards={10} />
          )}
        </Row>
        <Row title="Popular">
          {popularShows ? (
            popularShows.map((show) => <ShowCard key={show.id} show={show} />)
          ) : (
            <ShowCardSkeleton cards={10} />
          )}
        </Row>
      </div>
    </div>
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

  // const actionMovies = await axios.get(
  //   `${process.env.TMDB_API_URL}/discover/movie?api_key=${process.env.API_KEY}`,
  //   {
  //     params: {
  //       with_genres: 28,
  //     },
  //   }
  // );
  // console.log(actionMovies.data);
  // console.log(actionMovies.data.results.length);

  // const actionShows = await axios.get(
  //   `${process.env.TMDB_API_URL}/discover/tv?api_key=${process.env.API_KEY}`,
  //   {
  //     params: {
  //       with_genres: 28,
  //     },
  //   }
  // );

  // console.log(actionShows.data);
  // console.log(actionShows.data.results.length);

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
