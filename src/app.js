import express from "express";
import bodyParser from "body-parser";

import config from "./config/config.js";
import userRoute from "./routes/userRoute.js";
import connectDB from "./connectDB.js";

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/users", userRoute)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Internal Server Error!"})
})

app.listen(config.PORT, () => {
    console.log(`server is running on https://localhost:${config.PORT}`)
})