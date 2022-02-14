const express = require("express");
const app = express();

app.use(express.static("./dist/capstone-frontend"));

app.get("/*", function (req, res) {
  res.sendFile("index.html", {
    root: "./dist/capstone-frontend",
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Im listening on", process.env.PORT || 8080);
});
