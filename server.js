const express = require("express");
const app = express();

app.get("https://hooks.zapier.com/hooks/catch/4337313/b7nn2r8", (req, res) => {
  res.send("HEllO");
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
app.listen(3000);
