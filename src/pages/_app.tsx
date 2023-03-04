import { type AppType } from "next/app";
import Head from "next/head";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>LSAC</title>
        <meta
          name="link saver and commenter"
          content="your links and comments"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <div className="ml-5">
        <p className="ml-1 mt-1 text-gray-300">
          LSAC - Link Saver and Commenter
        </p>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
