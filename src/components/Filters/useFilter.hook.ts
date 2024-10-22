import { useCallback, useEffect } from "react";

import { inputIsFocused } from "@/utils/dom";
import { setQueryParams } from "@/utils/queries";

const closeFns: Map<string, () => void> = new Map();
export function registerCleanupFn(key: string, fn: () => void) {
  closeFns.set(key, fn);
  return () => {
    closeFns.delete(key);
  };
}

const closeAll = () => {
  for (const fn of closeFns.values()) {
    fn();
  }
};

export const useFilter = (
  filterBarRef: React.RefObject<HTMLElement>,
  newFilterRef: React.RefObject<HTMLButtonElement>,
  pageRef: React.RefObject<HTMLInputElement>,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const keydownListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAll();
        return;
      }

      if (inputIsFocused()) {
        return;
      }

      switch (event.key) {
        case "f":
          newFilterRef.current?.focus();
          break;
        case "p":
          pageRef.current?.focus();
          break;
        case "=":
        case "+":
          setPage((p) => {
            const page = p + 1;
            setQueryParams({ page });
            return page;
          });
          break;
        case "_":
        case "-":
          setPage((p) => {
            const page = p - 1;
            setQueryParams({ page });
            return page;
          });
          break;
      }
    },
    [newFilterRef, pageRef, setPage]
  );

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }

      if (!filterBarRef.current?.contains(e.target)) {
        closeAll();
      }
    },
    [filterBarRef]
  );

  useEffect(() => {
    if (!window?.addEventListener) {
      return;
    }

    window.addEventListener("keydown", keydownListener);
    window.addEventListener("click", clickListener);

    return () => {
      window.removeEventListener("keydown", keydownListener);
      window.removeEventListener("click", clickListener);
    };
  });
};
