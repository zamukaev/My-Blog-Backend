import mongoose from "mongoose";
// Schema für Users
const User = mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	roles: [{ type: String, ref: 'Role' }]

});

export default mongoose.model('User', User);