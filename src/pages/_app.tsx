import { type AppType } from "next/app";
import Head from "next/head";

import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>LSAC</title>
        <meta
          name="link saver and commenter"
          content="your links and comments"
        />
        <link rel="icon" href="/lsac-favicon.png" />
      </Head>
      <Toaster />
      <div className="ml-5 mr-5">
        <p className="ml-1 mt-1 text-gray-300">
          LSAC - Link Saver and Commenter
        </p>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
