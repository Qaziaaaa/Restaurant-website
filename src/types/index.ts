export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface MenuItem {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: number;
  category: string;
}

export interface Chef {
  id: number;
  name: string;
  role: string;
  image: string;
  nationality: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  image: string;
  rating: number;
}
