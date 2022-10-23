import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { AppProvider } from "../context/userContext";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const [authState, setAuthState] = useState<boolean | undefined>();
  const [key, setKey] = useState<number>();
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      const auth = JSON.parse(localStorage.getItem("auth")!);
      if (auth.success && auth.authToken) setAuthState(true);
      else setAuthState(false);
    }
    setKey(Math.random());
  }, []);
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
        <Navbar key={key} authState={authState} />
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default MyApp;
