module.exports = {
    useLocation: jest.fn(() => ({ pathname: Math.random().toString() }))
}