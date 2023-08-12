import { LatestRepoUpdateHook, LatestUpdateState } from "@/types/hooks"
import { useEffect, useState } from "react"

export enum FetchState {
  LOADING,
  ERROR,
  NONE
}

const updatedDatesCache: Record<string, Date> = {}

export const useFetchRepoUpdatedDate: LatestRepoUpdateHook = (repoLink?: string) => {
  const [state, setState] = useState<LatestUpdateState>(FetchState.LOADING)
  const controller = new AbortController()

  async function fetchLatestUpdate(repo: string) {
    if (updatedDatesCache[repo]) {
      setState(updatedDatesCache[repo])
      return
    }

    setState(FetchState.LOADING)
    try {
      const res = await fetch(repo, { signal: controller.signal });
      if (!res.ok) {
        throw new Error()
      }
      const data = await res.json();

      const date = new Date(data.pushed_at)
      // Cache results
      updatedDatesCache[repo] = date

      setState(date);
    } catch (e) {
      setState(FetchState.ERROR)
    }
  }

  useEffect(() => {
    if (!repoLink) {
      setState(FetchState.NONE)
    } else {
      fetchLatestUpdate(repoLink.replace('github.com/', 'api.github.com/repos/'))
    }

    return () => controller.abort()
  }, [repoLink])

  return state
}

export default useFetchRepoUpdatedDate