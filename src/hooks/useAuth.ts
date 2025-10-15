import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";

// Typed versions of useDispatch and useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// Auth-specific hook
export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  return auth;
};
