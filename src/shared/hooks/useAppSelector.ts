import {useSelector} from "react-redux";
import {AppState} from "@/app/store/store";

export const useAppSelector = useSelector.withTypes<AppState>()
