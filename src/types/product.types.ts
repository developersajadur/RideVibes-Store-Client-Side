


export type TProduct = {
  _id: string;
  author: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  category:  string[];
  description: string;
  stockQuantity: number; 
  inStock: boolean;
  isDeleted: boolean;
  images: string[];
  videoUrl?: string,
  colors: string[];
  weight: number;
  discount: number;
  createdAt: Date | string; 
  updatedAt: Date | string;  
};



export type TCartData = {
  _id: string;
  author: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  category:  string[];
  description: string;
  stockQuantity: number; 
  inStock: boolean;
  isDeleted: boolean;
  images: string[];
  videoUrl?: string,
  colors: string[];
  weight: number;
  discount: number;
  createdAt: Date | string; 
  updatedAt: Date | string;  
  orderQuantity: number;
};
