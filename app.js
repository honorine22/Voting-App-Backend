import express from "express";
import bodyParser from "body-parser";
import YAML from "yamljs";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import SwaggerUI from 'swagger-ui-express';
import placeRoutes from "./routes/place.route.js";
import usersRoutes from "./routes/user.route.js";
import jsonwebtoken from "jsonwebtoken";
import organRoutes from "./routes/organ.route.js";
import candidateRoutes from "./routes/candidate.route.js";
import imageRoutes from "./routes/images.route.js";
const port = process.env.port || 5000;
const url = process.env.url;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

// const swaggerDocs = YAML.load('./');
// app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));
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