export interface Product {
  id: number;
  brand: string;
  title: string;
  size: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  created_at: string;
  sold?: boolean;
}

export type SortOptions = "price_asc" | "price_desc" | "created_at";

export interface SingleProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface SingleProductReview {
  id: string;
  rating: number;
  username: string;
  created_at: string;
  customer: { first_name: string; last_name: string };
  customer_note: string;
  image: string;
}

export interface SingleProductSeller {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  handle: string;
  joinDate: string;
  sold: number;
  description: string;
  reviews?: SingleProductReview[];
  parcel?: string;
  date?: string;
  created_at?: string;
}

export interface SingleProductMeasurement {
  label: string;
  value: string | number;
}

export interface SingleProduct {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
  color: string;
  colorVariants?: {
    variant: string;
    label: string;
    disabled: boolean;
  }[];
  size: string;
  sizeVariants?: { label: string; disabled: boolean }[];
  condition: string;
  images: SingleProductImage[];
  details: string;
  measurements: SingleProductMeasurement[];
  shippingReturns: string;
  seller: SingleProductSeller;
  reviews: SingleProductReview[];
  tags: string[];
  postedDate: string;
}
