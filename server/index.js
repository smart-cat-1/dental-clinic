const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth");


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

const port = 3001;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});