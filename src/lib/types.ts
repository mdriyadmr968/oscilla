export type MovementType = "Automatic" | "Manual Wind" | "Chronograph" | "Tourbillon" | "Quartz";

export type CaseMaterial = 
  | "316L Stainless Steel"
  | "Titanium Grade 5"
  | "Rose Gold 18K"
  | "Ceramic Matte"
  | "Forged Carbon";

export type StrapMaterial = 
  | "Full Grain Italian Leather"
  | "Solid Link Steel Bracelet"
  | "Fluororubber (FKM)"
  | "Milanese Mesh"
  | "Hand-stitched Alligator";

export interface WatchSpecifications {
  movement: {
    type: MovementType;
    caliber: string;
    powerReserveHours: number;
    frequencyVph: number;
    jewelsCount: number;
  };
  caseAndDial: {
    diameterMm: number;
    thicknessMm: number;
    lugToLugMm: number;
    material: CaseMaterial;
    dialColor: string;
    crystal: string;
    waterResistanceAtm: number;
  };
  strap: {
    defaultMaterial: StrapMaterial;
    lugWidthMm: number;
    claspType: string;
  };
}

export interface WatchProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  referenceNumber: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  collection: "Astral" | "Vanguard" | "Heritage" | "Nocturne" | "Chronos";
  description: string;
  features: string[];
  specs: WatchSpecifications;
  images: {
    hero: string;
    gallery: string[];
  };
  isFeatured?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // unique item key e.g. watchId-strapMaterial
  watch: WatchProduct;
  quantity: number;
  selectedStrap: StrapMaterial;
  unitPrice: number; // watch base price + strap priceDelta
}

export interface OrderCustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentStatus: "paid" | "processing" | "demo_approved";
  fulfillmentStatus: "unfulfilled" | "preparing" | "dispatched" | "delivered";
  trackingNumber?: string;
  courierName?: string;
}

export interface FilterState {
  collection: string[];
  movementType: MovementType[];
  caseMaterial: CaseMaterial[];
  priceRange: [number, number];
  maxDiameterMm: number;
  inStockOnly: boolean;
  sortBy: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
}
