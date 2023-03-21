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
  comedyShows: TMDBShow[];
  actionShows: TMDBShow[];
  documentaryShows: TMDBShow[];
  dramaShows: TMDBShow[];
  crimeShows: TMDBShow[];
  bannerShow: TMDBShow;
};

const Home = ({
  actionShows,
  comedyShows,
  documentaryShows,
  crimeShows,
  dramaShows,
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
        <Row title="Comedies">
          {comedyShows ? (
            comedyShows.map((show) => <ShowCard key={show.id} show={show} />)
          ) : (
            <ShowCardSkeleton cards={10} />
          )}
        </Row>
        <Row title="Action">
          {actionShows ? (
            actionShows.map((show) => <ShowCard key={show.id} show={show} />)
          ) : (
            <ShowCardSkeleton cards={10} />
          )}
        </Row>
        <Row title="Documentaries">
          {documentaryShows ? (
            documentaryShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))
          ) : (
            <ShowCardSkeleton cards={10} />
          )}
        </Row>
        <Row title="Dramas">
          {dramaShows ? (
            dramaShows.map((show) => <ShowCard key={show.id} show={show} />)
          ) : (
            <ShowCardSkeleton cards={10} />
          )}
        </Row>
        <Row title="Crime">
          {crimeShows ? (
            crimeShows.map((show) => <ShowCard key={show.id} show={show} />)
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
  const actionMoviesRes = await axios.get(
    `${process.env.TMDB_API_URL}/discover/movie?api_key=${process.env.API_KEY}`,
    {
      params: {
        with_genres: 28,
      },
    }
  );

  const actionMovies = actionMoviesRes.data as TMDBResult;

  const actionShowsRes = await axios.get(
    `${process.env.TMDB_API_URL}/discover/tv?api_key=${process.env.API_KEY}`,
    {
      params: {
        with_genres: 10759,
      },
    }
  );

  const actionShows = actionShowsRes.data as TMDBResult;
  const actions = (actionMovies?.results).concat(actionShows?.results);

  const comedyMoviesRes = await axios.get(
    `${process.env.TMDB_API_URL}/discover/movie?api_key=${process.env.API_KEY}`,
    {
      params: {
        with_genres: 35,
      },
    }
  );

  const comedyMovies = comedyMoviesRes.data as TMDBResult;

  const comedyShowsRes = await axios.get(
    `${process.env.TMDB_API_URL}/discover/tv?api_key=${process.env.API_KEY}`,
    {
      params: {
        with_genres: 35,
      },
    }
  );

  const comedyShows = comedyShowsRes.data as TMDBResult;
  const comedies = (comedyMovies?.results).concat(comedyShows?.results);

  const documentaryMoviesRes = await axios.get(
    `${process.env.TMDB_API_URL}/discover/movie?api_key=${process.env.API_KEY}`,
    {
      params: {
        with_genres: 99,
      },
    }
  );

  const documentaryMovies = documentaryMoviesRes.data as TMDBResult;

  const documentaryShowsRes = await axios.get(
    `${process.env.TMDB_API_URL}/discover/tv?api_key=${process.env.API_KEY}`,
    {
      params: {
        with_genres: 99,
      },
    }
  );

  const documentaryShows = documentaryShowsRes.data as TMDBResult;
  const documentaries = (documentaryMovies?.results).concat(
    documentaryShows?.results
  );

  const dramaMoviesRes = await axios.get(
    `${process.env.TMDB_API_URL}/discover/movie?api_key=${process.env.API_KEY}`,
    {
      params: {
        with_genres: 18,
      },
    }
  );

  const dramaMovies = dramaMoviesRes.data as TMDBResult;

  const dramaShowsRes = await axios.get(
    `${process.env.TMDB_API_URL}/discover/tv?api_key=${process.env.API_KEY}`,
    {
      params: {
        with_genres: 18,
      },
    }
  );

  const dramaShows = dramaShowsRes.data as TMDBResult;

  const dramas = (dramaMovies?.results).concat(dramaShows?.results);

  const crimeMoviesRes = await axios.get(
    `${process.env.TMDB_API_URL}/discover/movie?api_key=${process.env.API_KEY}`,
    {
      params: {
        with_genres: 80,
      },
    }
  );

  const crimeMovies = crimeMoviesRes.data as TMDBResult;

  const crimeShowsRes = await axios.get(
    `${process.env.TMDB_API_URL}/discover/tv?api_key=${process.env.API_KEY}`,
    {
      params: {
        with_genres: 80,
      },
    }
  );

  const crimeShows = crimeShowsRes.data as TMDBResult;

  const crimes = (crimeMovies?.results).concat(crimeShows?.results);

  return {
    props: {
      actionShows: actions ?? [],
      comedyShows: comedies ?? [],
      documentaryShows: documentaries ?? [],
      crimeShows: crimes ?? [],
      dramaShows: dramas ?? [],
      bannerShow: comedies[getRandomInt(0, comedies.length)],
    },
  };
};
