import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("./routes/_layout.tsx", [
    index("routes/home.tsx"),
    route("register", "routes/(auth)/register.tsx"),
    route("login", "routes/(auth)/login.tsx"),
    route("products", "routes/products.tsx"),
    route("cart", "routes/cart.tsx")
  ]),
] satisfies RouteConfig;
