import { SWRConfig } from "swr";
import "../global.css";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: any) {
  return (
    <AnimatePresence>
        <SWRConfig
        value={{
          fetcher: (url: string) => fetch(url).then((response) => response.json())
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </AnimatePresence>
  );
}
