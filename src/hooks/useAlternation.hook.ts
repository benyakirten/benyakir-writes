import { useState } from "react";

import type { AlternationHook } from "@/types/hooks";
import {
  getQueryParams,
  removeQueryParam,
  setOneQueryParam,
} from "@/utils/queries";

const useAlternation: AlternationHook = (id: string) => {
  const [dropdownOpen, setAlternationOpen] = useState(
    getQueryParams().get(id) || ""
  );
  const setAlternation = (val: string) =>
    setAlternationOpen((current) => {
      let value: string;
      if (current === val) {
        value = "";
        removeQueryParam(id);
      } else {
        value = val;
        setOneQueryParam(id, val);
      }
      return value;
    });
  return [dropdownOpen, setAlternation];
};

export default useAlternation;
