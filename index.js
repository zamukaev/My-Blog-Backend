import express from "express";
import fs from "fs";

import mongoose from "mongoose";

import cors from 'cors';

import multer from 'multer';

import router from "./src/routes/router.js";
import authRouter from "./src/routes/authRouter.js";
import PostController from "./src/controllers/PostController.js";


const PORT = process.env.PORT || 3001;
const DB_URL = "mongodb+srv://muslim:pisyuka1@cluster0.ge1zz.mongodb.net/post?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', router);
app.use('/auth', authRouter);
app.use("/upload", express.static("upload"));

const storage = multer.diskStorage({
	destination: (_, __, cd) => {
		if (!fs.existsSync("upload")) {
			fs.mkdirSync("upload");
		}
		cd(null, "upload");
	},
	filename: (_, file, cd) => {
		cd(null, file.originalname);
	}
});

const upload = multer({ storage });

app.post('/upload', upload.single("picture"), PostController.upload);

const startApp = async () => {
	try {
		await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
		app.listen(PORT, () => {
			console.log('server work at', PORT);
		});
	} catch (error) {
		console.log(error.message);
	}
}

startApp();