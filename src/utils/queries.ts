export function getQueryParams(): URLSearchParams {
	return new URLSearchParams(window.location.search);
}

export function setOneQueryParam(
	key: string,
	value: string | number | string[],
	reset = false,
): void {
	const params = reset ? new URLSearchParams() : getQueryParams();
	const val = Array.isArray(value)
		? serializeToQueryParams(value)
		: value.toString();
	params.set(key, val);

	visitQueryParams(params);
}

export function setQueryParams(
	newParams: Record<string, string | number>,
	reset = false,
): void {
	const params = reset ? new URLSearchParams() : getQueryParams();
	for (const key in newParams) {
		params.set(key, newParams[key].toString());
	}

	visitQueryParams(params);
}

export function removeQueryParam(key: string): void {
	const params = getQueryParams();
	for (const param of params.keys()) {
		if (param.toLowerCase().startsWith(key.toLowerCase())) {
			params.delete(param);
		}
		visitQueryParams(params);
	}
}

export function removePartialQueryParam(key: string): void {
	const params = getQueryParams();
	for (const param of params.keys()) {
		if (param.toLowerCase().includes(key.toLowerCase())) {
			params.delete(param);
		}
	}
	visitQueryParams(params);
}

export function composeQueryParams(
	params: Record<string, string>,
	reset = false,
): string {
	const searchParams = reset ? new URLSearchParams() : getQueryParams();
	for (const key in params) {
		searchParams.set(key, params[key]);
	}
	return searchParams.toString();
}

export function visitQueryParams(params: URLSearchParams): void {
	const newUrl = `${window.location.pathname}?${params.toString()}`;
	window.history.replaceState({}, "", newUrl);
}

export function serializeToQueryParams<T extends string | number>(data: T[]) {
	return data.map((d) => encodeURIComponent(d)).join(",");
}

export function deserializeFromQueryParams(data: string): string[] {
	return decodeURIComponent(data).split(",");
}
