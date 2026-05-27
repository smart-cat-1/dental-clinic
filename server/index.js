const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth");
const appointmentsRouter = require("./routes/appointments");


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/appointments", appointmentsRouter);

const port = 3001;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
