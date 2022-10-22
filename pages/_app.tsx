import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { AppProvider } from "../context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider>
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default MyApp;
