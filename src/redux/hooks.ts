import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";

// Typed useDispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;
