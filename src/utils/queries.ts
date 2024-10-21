export function getQueryParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function setQueryParams(
  newParams: Record<string, string>,
  reset = false
): void {
  const params = reset ? new URLSearchParams() : getQueryParams();
  for (const key in newParams) {
    params.set(key, newParams[key]);
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

export function composeQueryParams(
  params: Record<string, string>,
  reset = false
): string {
  const searchParams = reset ? new URLSearchParams() : getQueryParams();
  for (const key in params) {
    searchParams.set(key, params[key]);
  }
  return searchParams.toString();
}
