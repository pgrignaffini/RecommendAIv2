import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Header from "~/components/Header";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <main className="relative flex min-h-screen flex-col bg-[#072942] pb-10">
          <Header />
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
