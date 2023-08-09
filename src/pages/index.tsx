import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import ChessGame from "@/components/ChessGame/ChessGame";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Header pageTitle="Queen's Quest" />
        <ChessGame />
      </div>
    </>
  );
}
