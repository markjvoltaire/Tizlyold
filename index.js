const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const resp = res.sendStatus(200);
  console.log("resp", resp);
});

app.get("/hooks", async (req, res) => {
  const resp = req;
  console.log("resp", resp);
});

app.listen(PORT, () => console.log(`server is on ${PORT}`));
