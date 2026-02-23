import { Hero } from "@/components/home/Hero";
import { DroneVideo } from "@/components/home/DroneVideo";
import { Intro } from "@/components/home/Intro";
import { ExecutionRoadmap } from "@/components/home/ExecutionRoadmap";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { ValuesBanner } from "@/components/home/ValuesBanner";
import { getContent } from "@/lib/content";

export default async function Home() {
  const content = await getContent();

  return (
    <main className="bg-void-black min-h-screen">
      <Hero content={content} />
      <DroneVideo />
      <Intro content={content} />
      <ExecutionRoadmap />
      <ServicesTeaser content={content} />
      <Testimonials content={content} />
      <ValuesBanner content={content} />
    </main>
  );
}
