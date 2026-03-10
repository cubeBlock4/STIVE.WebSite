export type RegisterWrite = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type LoginWrite = {
  email: string;
  password: string;
}

export type ResetPassword = {
  email: string;
  currentPassword: string;
  newPassword: string;
}

export type LoginResponse = {
  token: string;
  user: Customer;
}

export type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
}

export type ApiObject = {
  id: number;
}

export type Family = ApiObject & {
  name: string;
  products: Product[];
};

export type Supplier = ApiObject & {
  entrepriseName: string;
  email: string;
  phone: string;
  products: Product[];
}

export type Product = ApiObject & {
  name: string;
  reference: string;
  price: string;
  famille: Family;
  supplier: Supplier;
}

export type Customer = ApiObject & {
  firstName: string;
  lastName: string;
  email: string;
  basket: Basket;
}

export type Order = ApiObject & {
  customer: Customer;
  totalAmount: string;
  status: string;
  orderDate: Date;
  items: OrderItem[];
}

export type OrderItem = ApiObject & {
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  unitPrice: string;
}

export type Basket = ApiObject & {
  customer: string;
  items: BasketItem[];
  totalAmount: number;
}

export type BasketItem = ApiObject & {
  basketId: number;
  basket: string;
  productId: number;
  product: Product;
  quantity: number;
}

export type BasketItemWrite = {
  productId: number;
  quantity: number;
}