import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/hooks/useAuth";
import { logout } from "@/store/authSlice";

interface LogoutButtonProps {
  redirectTo?: string;
}

export const LogoutButton = ({ redirectTo = "/login" }: LogoutButtonProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate(redirectTo);
  };

  return (
    <Button onClick={handleLogout} variant="soft" color="red">
      Se déconnecter
    </Button>
  );
};
