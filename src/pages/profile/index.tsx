import Header from "@/components/Header/Header";
import Navigation from "@/components/Navigation/Navigation";

export default function profile() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Header pageTitle="Profile" />
        <Navigation />
      </div>
    </>
  );
}
