const express = require("express");
const cors = require("cors");

const PORT = 1107;
const app = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
