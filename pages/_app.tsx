import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { AppProvider } from "../context/userContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

function MyApp({ Component,   pageProps}:  AppProps<{
  session: Session;
}>) {
  const [authState, setAuthState] = useState<boolean>();
  const router=useRouter();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth")!);
    if (auth?.success && auth?.authToken) {
      setAuthState(true);
    }
    else{
      setAuthState(false)
    }
  }, [router.query]);

  return (
    <>
      <SessionProvider session={pageProps.session}>
      <AppProvider>
        <NextNProgress
          color="#10935F"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Navbar  authState={authState} />
        <Component {...pageProps} />
        <Footer />
        <ToastContainer />
      </AppProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
