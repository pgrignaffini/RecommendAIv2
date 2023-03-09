import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { api } from "~/utils/api";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";

import "~/styles/globals.css";
const Drawer = dynamic(() => import("~/components/Drawer"), { ssr: false });

const Header = dynamic(() => import("~/components/Header"), { ssr: false });

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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
          }}
        />
        <main className="relative flex min-h-screen flex-col bg-[#072942] pb-10">
          <Header />
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <Component {...pageProps} />
            </div>
            <Drawer />
          </div>
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
