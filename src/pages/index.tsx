import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import ChessGame from "@/components/ChessGame/ChessGame";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Game | Rook &apos;n&apos; Roll</title>
      </Head>
      <div className="flex flex-col justify-center items-center">
        <Header pageTitle="Rook 'n' Roll" />
        <ChessGame />
      </div>
    </>
  );
}
