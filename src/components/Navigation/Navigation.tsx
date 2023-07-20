import Link from "next/link";
import Image from "next/image";
import chessIcon from "@/assets/chess-icon.svg";
import profileIcon from "@/assets/profile-icon.svg";

export default function Navigation() {
  return (
    <>
      <footer className="bg-background2 py-4 fixed bottom-2 flex justify-evenly rounded-lg">
        <Link href="/">
          <Image src={chessIcon} alt="Chess Icon" width={24} height={24} />
        </Link>
        <Link href="/profile">
          <Image src={profileIcon} alt="Profile Icon" width={24} height={24} />
        </Link>
      </footer>
    </>
  );
}
