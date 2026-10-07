import { Metadata } from "next";
import { notFound } from "next/navigation";
import { WATCHES_DATA } from "@/lib/data/watches";
import { WatchDetailClient } from "@/components/pdp/WatchDetailClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return WATCHES_DATA.map((watch) => ({
    slug: watch.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const watch = WATCHES_DATA.find((w) => w.slug === slug);

  if (!watch) {
    return {
      title: "Timepiece Not Found — Oscilla",
    };
  }

  return {
    title: `${watch.name} (${watch.referenceNumber}) — Oscilla Horlogerie`,
    description: `${watch.tagline} Powered by ${watch.specs.movement.caliber}. Certified ${watch.specs.caseAndDial.diameterMm}mm ${watch.specs.caseAndDial.material} timepiece.`,
    openGraph: {
      title: `${watch.name} — Oscilla Horlogerie`,
      description: watch.description,
      images: [
        {
          url: watch.images.hero,
          width: 1200,
          height: 1200,
          alt: watch.name,
        },
      ],
    },
  };
}

export default async function WatchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const watch = WATCHES_DATA.find((w) => w.slug === slug);

  if (!watch) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: watch.name,
    image: watch.images.hero,
    description: watch.description,
    sku: watch.referenceNumber,
    mpn: watch.referenceNumber,
    brand: {
      "@type": "Brand",
      name: "Oscilla Horlogerie",
    },
    offers: {
      "@type": "Offer",
      url: `https://oscilla.store/watches/${watch.slug}`,
      priceCurrency: "USD",
      price: watch.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: watch.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: watch.rating,
      reviewCount: watch.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WatchDetailClient watch={watch} />
    </>
  );
}
