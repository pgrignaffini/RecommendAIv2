/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { defaultGenres, defaultServices } from "~/utils/constants";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import type { Show } from "typings";
import { getRandomInt } from "~/utils/helpers";
import Banner from "~/components/Banner";
import Row from "~/components/Row";
import ShowCard from "~/components/ShowCard";

type Props = {
  shows: Show[];
  bannerShow: Show;
};

const Home = ({ shows, bannerShow }: Props) => {
  const [servicesFilter, setServicesFilter] =
    useState<string[]>(defaultServices);
  const [genresFilter, setGenresFilter] = useState<string[]>(defaultGenres);
  const [preferredShows, setPreferredShows] = useState<Show[] | null>(null);
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  console.log("shows", shows);

  const fetchShows = async () => {
    const res = await axios
      .post("/api/shows", {
        services: servicesFilter,
        genres: genresFilter,
      })
      .catch((err) => {
        console.log(err);
      });
    return res?.data as Show[];
  };

  return (
    <>
      <Head>
        <title>RecommendAI</title>
        <meta name="description" content="Find your next favorite show" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main className="relative flex min-h-screen flex-col bg-[#072942] pb-10">
        <header className="flex items-center justify-between p-4">
          <img src="/logo.png" alt="RecommendAI" className="h-10" />
          <button className="rounded-lg border-2 py-2 px-4 text-lg text-white">
            Sign in
          </button>
        </header>
        <Banner bannerShow={bannerShow} setPreferredShows={setPreferredShows} />
        <div className="space-y-4">
          <Row title="Trending Now">
            {shows.map((show) => (
              <ShowCard
                key={show.imdbID}
                show={show}
                isLarge
                setPreferredShows={setPreferredShows}
              />
            ))}
          </Row>
          <Row title="Action Movies">
            {shows.map((show) => (
              <ShowCard
                key={show.imdbID}
                show={show}
                setPreferredShows={setPreferredShows}
              />
            ))}
          </Row>
          <Row title="Top Rated">
            {shows.map((show) => (
              <ShowCard
                key={show.imdbID}
                show={show}
                setPreferredShows={setPreferredShows}
              />
            ))}
          </Row>
        </div>
        <button className="group sticky bottom-12 left-12 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-red-500 p-4  transition duration-500 hover:scale-125">
          <p className="text-xl text-white group-hover:hidden">
            {preferredShows?.length ?? 0}
          </p>
          <i className="hidden text-xl text-white group-hover:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </i>
        </button>
      </main>
    </>
  );
};

export default Home;

// get shows on server side
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.post(`${process.env.API_BASE_URL}/content/?`, {
    timeout: 1000 * 60 * 10,
    ...defaultGenres,
    ...defaultServices,
    headers: { accept: "application/json" },
  });

  const data = response.data as Show[];

  return {
    props: {
      shows: data,
      bannerShow: data[getRandomInt(0, data.length)],
    },
  };
};
