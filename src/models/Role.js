import mongoose from "mongoose";

// Schema für Role der Users
const Role = new mongoose.Schema({
	value: { type: String, unique: true, default: 'USER' }
});

export default mongoose.model('Role', Role);