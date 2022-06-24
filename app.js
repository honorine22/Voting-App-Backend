import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import placeRoutes from "./routes/place.route.js";
import usersRoutes from "./routes/user.route.js";
import organRoutes from "./routes/organ.route.js";
import candidateRoutes from "./routes/candidate.route.js";
import imageRoutes from "./routes/images.route.js";
const port = process.env.port || 5000;
const url = process.env.url;
const app = express();
app.use(express.json({ limit: '5Mb' }));
app.use(express.urlencoded({ extended: true, limit: '5Mb' }));
app.use(morgan("dev"));
app.use(cors());
app.use('/public', express.static('public'));
app.use((req, res, next) => {
    res.setHeader("Acess-Control-Allow-Origin", "*");
    res.setHeader("Acess-Control-Allow-Methods",
        "POST, PUT, PATCH,DELETE,GET");
    res.setHeader("Acess-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Access,Authorization");
    next()
})

mongoose.Promise = global.Promise;
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Database running");
    })
    .catch(err => {
        console.log(err);
    })
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to learning on board!' })
})

placeRoutes(app);
usersRoutes(app);
organRoutes(app);
candidateRoutes(app);
imageRoutes(app);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})