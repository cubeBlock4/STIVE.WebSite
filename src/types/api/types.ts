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

export type Cart = ApiObject & {
  customer: string;
  products: Product[];
}

export type Customer = ApiObject & {
  firstName: string;
  lastName: string;
  email: string;
  panier: Cart;
}
