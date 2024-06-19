import express from "express";
import "dotenv/config";
import db from "./db/db.js";
import router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 10000;

app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
