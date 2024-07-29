import Image from "next/image";
import { Header } from "../components/Header";
import { Mint } from "../components/Mint";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12 bg-bg-main">
      <Header />
      <div className="flex items-center justify-center mt-12 space-x-3">
        <Mint />
      </div>
    </main>
  );
}
