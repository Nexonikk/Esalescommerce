// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   price: number;
//   variants?: Record<string, string[]>;
//   inventory: number;
// }

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  inventory: number;
  variants?: Array<{
    id: number;
    name: string;
    value: string;
  }>;
}

export interface OrderData {
  product: Product;
  quantity: number;
  selectedVariant: Record<string, string>;
  subtotal: number;
}
