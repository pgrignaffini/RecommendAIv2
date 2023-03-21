import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { api } from "~/utils/api";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import { usePageLoading } from "~/hooks/usePageLoading";
import Spinner from "~/components/Spinner";

const Header = dynamic(() => import("~/components/Header"), { ssr: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { isPageLoading } = usePageLoading();

  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2000,
            }}
          />
          <main className="relative flex min-h-screen flex-col bg-[#072942] pb-10">
            <Header />
            {isPageLoading ? (
              <div className="flex h-screen flex-col items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </main>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
