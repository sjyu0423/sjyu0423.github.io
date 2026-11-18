import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { ProjectBrowser } from "@/components/ProjectBrowser";

export default function Home() {
  return (
    <div id="top" className="mx-auto flex min-h-full w-full max-w-[52rem] flex-col px-6 sm:px-8">
      <Header />
      <main className="flex-1">
        <Intro />
        <ProjectBrowser />
      </main>
      <Footer />
    </div>
  );
}
