module.exports = {
	useLocation: vi.fn(() => ({ pathname: Math.random().toString() })),
};
