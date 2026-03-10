import { Navbar } from "@/components/navbar/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <AuthProvider>
      <Toaster richColors />
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
}
