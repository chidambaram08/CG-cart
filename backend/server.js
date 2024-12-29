const app = require("./app");

const path = require("path");
const connectDatabase = require("./config/database");



connectDatabase();

const server = app.listen(process.env.PORT, () => {
  //express listen method is used for create http server
  console.log(
    `hello server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error': ${err.message}`);
  console.log("shutting down the server due to unhandled rejection error");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error': ${err.message}`);
  console.log("shutting down the server due to uncaught exception error");
  server.close(() => {
    process.exit(1);
  });
});

