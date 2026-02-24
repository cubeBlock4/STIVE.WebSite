import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cart - STIVE" },
    { name: "description", content: "Content of your cart - STIVE" },
  ];
}

export default function Cart() {

}