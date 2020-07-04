const app = require("../src/app");

const port = 3000;

const startApp = () => {
  // console.log(`listening on http://localhost:${port}`);
  app.listen(port);
};

module.exports = startApp();
