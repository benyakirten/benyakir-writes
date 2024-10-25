export function getQueryParams(): URLSearchParams {
	return new URLSearchParams(globalThis?.location?.search);
}

export function setOneQueryParam(
	key: string,
	value: string | number | string[],
): void {
	const params = getQueryParams();
	const val = Array.isArray(value)
		? serializeToQueryParams(value)
		: value.toString();
	params.set(key, val);

	visitQueryParams(params);
}

export function setQueryParams(
	newParams: Record<string, string | number>,
): void {
	const params = getQueryParams();
	for (const key in newParams) {
		params.set(key, newParams[key].toString());
	}

	visitQueryParams(params);
}

export function removeQueryParam(key: string): void {
	const params = getQueryParams();
	const keysToDelete: string[] = [];
	for (const param of params.keys()) {
		if (param.toLowerCase().startsWith(key.toLowerCase())) {
			keysToDelete.push(param);
		}
	}

	for (const param of keysToDelete) {
		params.delete(param);
	}

	visitQueryParams(params);
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
