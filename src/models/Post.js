import mongoose from "mongoose";

const Post = mongoose.Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	tags: { type: Array },
	picture: { type: String },
	viewsCount: {
		type: Number,
		default: 0
	},
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
}, {
	timestamps: true
});

export default mongoose.model('Post', Post);