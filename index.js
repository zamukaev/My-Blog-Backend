import express from "express";

import mongoose from "mongoose";

import cors from 'cors';

import fileUpload from "express-fileupload";

import router from "./src/routes/router.js";
import authRouter from "./src/routes/authRouter.js";

const PORT = process.env.PORT || 3001;
const DB_URL = 'mongodb+srv://muslim:pisyuka1@cluster0.ge1zz.mongodb.net/post?retryWrites=true&w=majority';

const app = express();

app.use(express.json());

app.use(cors());
app.use(fileUpload({}));
app.use(express.static("./static"));
app.use('/api', router);
app.use('/auth', authRouter);

const startApp = async () => {
	try {
		await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
		app.listen(PORT, () => {

			console.log('server work at', PORT);
			return <h1>server work</h1>
		});
	} catch (error) {
		console.log(error.message);
	}
}

startApp();