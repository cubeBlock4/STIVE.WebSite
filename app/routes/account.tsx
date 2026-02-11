import type { Route } from "../../.react-router/types/app/routes/+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Account - STIVE" },
    { name: "description", content: "Your account settings - STIVE" },
  ];
}

export default function Account() {

}