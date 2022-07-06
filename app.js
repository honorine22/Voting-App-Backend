import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import placeRoutes from "./routes/place.route.js";
import swaggerUI from "swagger-ui-express";
import usersRoutes from "./routes/user.route.js";
import organRoutes from "./routes/organ.route.js";
import candidateRoutes from "./routes/candidate.route.js";
import imageRoutes from "./routes/images.route.js";
import YAML from "yamljs";
import { Swaggiffy } from 'swaggiffy';

const port = process.env.port || 5000;
const url = process.env.url;
const app = express();

const swaggerJSDocs = YAML.load('./swagger.yaml');
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
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

// mongoose.Promise = global.Promise;
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

app.use("/users", usersRoutes);
app.use("/organs", organRoutes);
app.use("/images", imageRoutes);
app.use("/candidates", candidateRoutes);
app.use("/places", placeRoutes);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})
new Swaggiffy().setupExpress(app).swaggiffy();