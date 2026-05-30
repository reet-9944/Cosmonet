const { app, startApolloServer } = require('../server.cjs');

module.exports = async (req, res) => {
  // Ensure the Apollo server is started before handling the request
  await startApolloServer();
  return app(req, res);
};
