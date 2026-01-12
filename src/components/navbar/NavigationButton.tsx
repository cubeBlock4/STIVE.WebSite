import type { NavigationItemType } from "@/config/navigation";
import { Button, Separator } from "@radix-ui/themes";
import { Link, useLocation } from "react-router";
import "./NavigationButton.css";

const INACTIVE_STYLE = {
  color: "rgba(255, 255, 255, 0.55)",
  backgroundColor: "transparent",
  cursor: "pointer",
};
const ACTIVE_STYLE = {
  background:
    "linear-gradient(100.93deg, var(--red-track) 62.37%, var(--red-8) 103.47%)",
  borderRadius: "12px",
  color: "var(--red-2)",
};

type NavigationButtonProps = {
  item: NavigationItemType;
};

const NavigationButton = ({ item }: NavigationButtonProps) => {
  const location = useLocation();
  const isActive = item.href === location.pathname;
  if (item.separator) {
    return (
      <Separator orientation={"vertical"} my={"1"} size={"2"} color={"gray"} />
    );
  }

  return (
    <Link to={item.href ?? ""}>
      <Button 
        size="3" 
        style={isActive ? ACTIVE_STYLE : INACTIVE_STYLE}
        className={isActive ? "active-navigation-button" : "inactive-navigation-button"}
      >
        {item.label}
      </Button>
    </Link>
  );
};

export default NavigationButton;
