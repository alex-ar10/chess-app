import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-9/12 m-0">
      <Component {...pageProps} />
    </div>
  );
}
