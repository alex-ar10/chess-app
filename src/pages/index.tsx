import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Chessboard from "@/components/Chessboard/Chessboard";
import Navigation from "@/components/Navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Header pageTitle="Queen's Quest" />
        <Chessboard />
        <Navigation />
      </div>
    </>
  );
}
