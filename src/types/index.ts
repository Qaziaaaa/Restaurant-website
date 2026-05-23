// ===== Backend-aligned Types =====

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  images: string[];
  basePrice: number;
  variants: { name: string; price: number }[];
  addons: { name: string; price: number }[];
  spiceLevel: number;
  preparationTime: number;
  availability: boolean;
  ratings: { average: number; count: number };
  featuredFlag: boolean;
}

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderItem {
  menuItem: string;
  nameSnapshot: string;
  quantity: number;
  priceSnapshot: number;
  selectedAddons: { name: string; price: number }[];
  selectedVariant?: { name: string; price: number };
  itemTotal: number;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  pricingBreakdown: {
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
  };
  deliveryAddress: DeliveryAddress;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  orderStatus: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Legacy types for backward compat with static sections
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
