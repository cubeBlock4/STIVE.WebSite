import { Navbar } from "@/components/navbar/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  )
}