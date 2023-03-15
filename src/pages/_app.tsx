import type { AppProps } from "next/app";

import { Roboto } from "next/font/google";
import { Header } from "../componens/Header";

import { SessionProvider as NextAuthProvider } from "next-auth/react";

import "../styles/global.scss";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <main className={roboto.className}>
        <Header />
        <Component {...pageProps} />
      </main>
    </NextAuthProvider>
  );
}
