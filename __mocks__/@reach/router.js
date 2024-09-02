import { vi } from "vitest";

module.exports = {
	useLocation: vi.fn(() => ({ pathname: Math.random().toString() })),
};
