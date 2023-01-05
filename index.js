const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
