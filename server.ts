const app = require("./index").default;

const port = 8080;

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
