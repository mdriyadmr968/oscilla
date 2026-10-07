import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FeaturedTimepieces } from "@/components/home/FeaturedTimepieces";
import { HeritageBanner } from "@/components/home/HeritageBanner";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <FeaturedCollections />
      <FeaturedTimepieces />
      <HeritageBanner />
    </div>
  );
}
