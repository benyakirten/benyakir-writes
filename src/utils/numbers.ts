export const clamp = (n: number, min = 0, max = 255) => {
	if (n < min) return min;
	if (n > max) return max;
	return n;
};

export const mod = (n: number, m: number) => ((n % m) + m) % m;

export const round = (n: number, precision = 0) => {
	const factor = 10 ** precision;
	return Math.round(n * factor) / factor;
};
