export type ProductCategory = "Tops" | "Bottoms" | "Outerwear";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  mainImage: string;
  hoverImage: string;
  images: string[];
  sizes: string[];
  details: string[];
}

export const productCatalog: Product[] = [
  {
    id: "1",
    name: "Heavy-Gauge Washed Tee",
    price: 45,
    category: "Tops",
    description:
      "A staple for the modern wardrobe. This oversized, drop-shoulder silhouette is crafted from premium 240 GSM heavyweight cotton, providing a structured yet effortless drape. Pre-washed for a vintage feel with our signature tonal embroidery.",
    mainImage: "/product-1.png",
    hoverImage: "/product-1-lifestyle.png",
    images: ["/product-1.png", "/product-1-lifestyle.png", "/product-1.png", "/product-1-lifestyle.png"],
    sizes: ["S", "M", "L", "XL"],
    details: ["240 GSM Heavyweight Cotton", "Drop-Shoulder Fit", "Embroidered Logo", "Made to Endure"],
  },
  {
    id: "2",
    name: "Forest Hoodie",
    price: 85,
    category: "Outerwear",
    description:
      "Heavyweight luxury. Crafted with dense loopback french terry, antique gold-tone hardware, and a double-lined hood for a structured daily layer.",
    mainImage: "/product-1-lifestyle.png",
    hoverImage: "/product-1.png",
    images: ["/product-1-lifestyle.png", "/product-1.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["400 GSM French Terry", "Double-Lined Hood", "Gold-Tone Hardware", "Oversized Fit"],
  },
  {
    id: "3",
    name: "Tailored Cargo Pants",
    price: 65,
    category: "Bottoms",
    description:
      "Utilitarian design meets bespoke tailoring. Durable cotton twill, reinforced seams, deep gusseted pockets, and an adjustable waist create a clean modern drape.",
    mainImage: "/product-1.png",
    hoverImage: "/product-1-lifestyle.png",
    images: ["/product-1.png", "/product-1-lifestyle.png"],
    sizes: ["30", "32", "34", "36"],
    details: ["Premium Cotton Twill", "Reinforced Stitching", "Adjustable Waist", "Relaxed Straight Leg"],
  },
  {
    id: "4",
    name: "Oversized Studio Crewneck",
    price: 75,
    category: "Tops",
    description:
      "A clean studio layer with relaxed proportion, soft structure, and subtle tonal detailing made for repeat wear.",
    mainImage: "/product-1.png",
    hoverImage: "/product-1-lifestyle.png",
    images: ["/product-1.png", "/product-1-lifestyle.png"],
    sizes: ["S", "M", "L", "XL"],
    details: ["Brushed Cotton Fleece", "Relaxed Ribbing", "Tonal Mark", "Pre-Washed Finish"],
  },
  {
    id: "5",
    name: "Utility Vest",
    price: 110,
    category: "Outerwear",
    description:
      "A functional top layer with quiet hardware, tailored volume, and utility storage that keeps the silhouette sharp.",
    mainImage: "/product-1-lifestyle.png",
    hoverImage: "/product-1.png",
    images: ["/product-1-lifestyle.png", "/product-1.png"],
    sizes: ["S", "M", "L", "XL"],
    details: ["Utility Pockets", "Structured Cotton Blend", "Antique Hardware", "Boxy Fit"],
  },
  {
    id: "6",
    name: "Pleated Wide-Leg Trousers",
    price: 80,
    category: "Bottoms",
    description:
      "A softer tailored trouser with generous movement, a pressed front, and a streetwear-ready wide leg.",
    mainImage: "/product-1.png",
    hoverImage: "/product-1-lifestyle.png",
    images: ["/product-1.png", "/product-1-lifestyle.png"],
    sizes: ["30", "32", "34", "36"],
    details: ["Wide-Leg Cut", "Front Pleats", "Soft Tailoring", "Everyday Drape"],
  },
];

export const categories: Array<"All" | ProductCategory> = ["All", "Tops", "Bottoms", "Outerwear"];

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function getProductById(id: string) {
  return productCatalog.find((product) => product.id === id);
}

