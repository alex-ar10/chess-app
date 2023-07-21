import Image from "next/image";
import chessboard from "@/assets/chessboard.svg";

export default function Chessboard() {
  const gridSize = 8;
  const cellSize = 37;

  return (
    <main className="relative">
      <div className="top-7 left-7 absolute">
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const column = String.fromCharCode(65 + (index % gridSize));
          const row = 8 - Math.floor(index / gridSize);

          const id = `${column}${row}`;

          return (
            <div
              key={index}
              id={id}
              className="absolute w-37px h-37px border-2 border-black"
              style={{
                top: `${Math.floor(index / gridSize) * cellSize}px`,
                left: `${(index % gridSize) * cellSize}px`,
              }}
            />
          );
        })}
      </div>

      <Image
        src={chessboard}
        alt="Chessboard"
        width={351}
        height={351}
        className="pointer-events-none opacity-20"
      />
    </main>
  );
}
