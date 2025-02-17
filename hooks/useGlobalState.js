import { useContext } from "react";

import { GlobalContext } from "../state/global";

export const useGlobalState = () => {
  return useContext(GlobalContext);
};
