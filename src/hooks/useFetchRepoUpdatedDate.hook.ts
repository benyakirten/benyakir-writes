import { useEffect, useState } from "react";

import type { LatestRepoUpdateHook, LatestUpdateState } from "@/types/hooks";

export enum FetchState {
  LOADING = 0,
  ERROR = 1,
  NONE = 2,
}

const cache: Map<string, Date> = new Map();
export const useFetchRepoUpdatedDate: LatestRepoUpdateHook = (
  repoLink?: string
) => {
  const [state, setState] = useState<LatestUpdateState>(FetchState.LOADING);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLatestUpdate(repo: string) {
      const cached = cache.get(repo);
      if (cached) {
        setState(cached);
        return;
      }

      setState(FetchState.LOADING);
      try {
        const res = await fetch(repo, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();
        const date = new Date(data.pushed_at);

        cache.set(repo, date);
        setState(date);
      } catch (e) {
        setState(FetchState.ERROR);
      }
    }

    if (!repoLink) {
      setState(FetchState.NONE);
    } else {
      fetchLatestUpdate(
        repoLink.replace("github.com/", "api.github.com/repos/")
      );
    }

    return () => controller.abort();
  }, [repoLink]);

  return state;
};

export default useFetchRepoUpdatedDate;
