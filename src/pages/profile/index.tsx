import Header from "@/components/Header/Header";
import Navigation from "@/components/Navigation/Navigation";
import Head from "next/head";

export default function profile() {
  return (
    <>
      <Head>
        <title>Profile | Rook &apos;n&apos; Roll</title>
      </Head>
      <div className="flex flex-col justify-center items-center">
        <Header pageTitle="Profile" />
        <Navigation />
      </div>
    </>
  );
}
