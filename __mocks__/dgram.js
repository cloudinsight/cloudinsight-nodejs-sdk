module.exports = {
  createSocket: () => (
    {
      send: jest.fn(),
      close: jest.fn()
    }
  )
};
