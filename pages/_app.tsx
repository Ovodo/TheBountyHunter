import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageLoader from "@/components/layout/PageLoader";
import { Providers } from "@/redux/provider";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Used for page transition
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };

    // Clean up - remove the event listener when the component is unmounted
    return () => {};
  }, []);

  return loading ? (
    <PageLoader loading={loading} />
  ) : (
    <Providers>
      <AnimatePresence>
        <Component {...pageProps} key={router.asPath} />;
      </AnimatePresence>
    </Providers>
  );
}
