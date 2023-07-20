import Image from "next/image";
import chessboard from "@/assets/chessboard.svg";

export default function Chessboard() {
  return (
    <main className="flex items-center justify-center">
      <Image src={chessboard} alt="Chessboard" width={351} height={351} />
    </main>
  );
}
