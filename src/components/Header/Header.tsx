export default function Header({ pageTitle }: { pageTitle: string }) {
  return (
    <>
      <header className="py-4">
        <h1 className="font-bold text-4xl">{pageTitle}</h1>
      </header>
    </>
  );
}
