import {useStore} from "react-redux";
import {store} from "@/app/store/store";

export const useAppStore = useStore.withTypes<typeof store>()
