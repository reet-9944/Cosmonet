const { app, startApolloServer, connectDB } = require('../server.cjs');

module.exports = async (req, res) => {
  // Ensure the database is connected
  await connectDB();
  
  // Ensure the Apollo server is started before handling the request
  await startApolloServer();
  return app(req, res);
};
