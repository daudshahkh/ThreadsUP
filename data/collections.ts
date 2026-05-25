export interface CollectionProduct {
  slug: string;
  name: string;
  price: number;
  frontImage: string;
  backImage: string;
  description: string;
}

export interface StudioCollection {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  products: CollectionProduct[];
}

const pawsImageBase = "/collections/paws-and-pause";

export const studioCollections: StudioCollection[] = [
  {
    slug: "paws-and-pause",
    name: "Paws and Pause",
    eyebrow: "New Collection",
    description:
      "A softer studio capsule built around comfort, stillness, and everyday pieces with a playful edge.",
    products: [
      {
        slug: "fat-cat",
        name: "Fat Cat Tee",
        price: 45,
        frontImage: `${pawsImageBase}/fat_cat_front_ultrahd.png`,
        backImage: `${pawsImageBase}/fat_cat_back_ultrahd.png`,
        description: "A clean oversized white tee with a playful minimal cat mark on the front and an oversized graphic on the back.",
      },
      {
        slug: "mental-tabs",
        name: "Mental Tabs Tee",
        price: 45,
        frontImage: `${pawsImageBase}/mental_tabs_front_ultrahd.png`,
        backImage: `${pawsImageBase}/mental_tabs_back_ultrahd.png`,
        description: "A soft grey oversized tee for the browser-tab brain, finished with colorful front and back artwork.",
      },
      {
        slug: "one-thought",
        name: "One Thought Tee",
        price: 45,
        frontImage: `${pawsImageBase}/one_thought_front_ultrahd.png`,
        backImage: `${pawsImageBase}/one_thought_back_ultrahd.png`,
        description: "A white oversized tee built around the spiral from one thought to one hundred tiny thoughts.",
      },
      {
        slug: "out-of-bed-today",
        name: "Out Of Bed Today Tee",
        price: 45,
        frontImage: `${pawsImageBase}/out_of_bed_today_front_ultrahd.png`,
        backImage: `${pawsImageBase}/out_of_bed_today_back_ultrahd.png`,
        description: "A relaxed white tee celebrating the small victory of making it out of bed today.",
      },
      {
        slug: "spill-the-chai",
        name: "Spill The Chai Tee",
        price: 45,
        frontImage: `${pawsImageBase}/spill_the_chai_front_ultrahd.png`,
        backImage: `${pawsImageBase}/spill_the_chai_back_ultrahd.png`,
        description: "A white tee with a tiny front chai mark and a statement back print for quiet gossip energy.",
      },
      {
        slug: "stay-pawsitive",
        name: "Stay Pawsitive Tee",
        price: 45,
        frontImage: `${pawsImageBase}/stay_pawsitive_front_ultrahd.png`,
        backImage: `${pawsImageBase}/stay_pawsitive_back_ultrahd.png`,
        description: "A soft white tee with a small chest paw print and a bold positive back graphic.",
      },
      {
        slug: "system-overloaded",
        name: "System Overloaded Tee",
        price: 45,
        frontImage: `${pawsImageBase}/system_overloaded_front_ultrahd.png`,
        backImage: `${pawsImageBase}/system_overloaded_back_ultrahd.png`,
        description: "A white oversized tee for low-battery days, with a front system graphic and a full back print.",
      },
    ],
  },
];

export function formatCollectionPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function getCollectionBySlug(slug: string) {
  return studioCollections.find((collection) => collection.slug === slug);
}

export function getCollectionProduct(collectionSlug: string, productSlug: string) {
  return getCollectionBySlug(collectionSlug)?.products.find((product) => product.slug === productSlug);
}

