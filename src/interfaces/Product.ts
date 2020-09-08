export interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
  discount: number;
  rating_media: number;
  description: string;
  reviews: Array<[]>;
  images: Array<[]>;
}
