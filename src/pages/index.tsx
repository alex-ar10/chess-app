import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import Chessboard from "@/components/Chessboard/Chessboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <header className="py-4 fixed top-0">
        <h1 className="font-bold text-4xl">Queen&apos;s Quest</h1>
      </header>
      <Chessboard />
      <Navigation />
    </>
  );
}
