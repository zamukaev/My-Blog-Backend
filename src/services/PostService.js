import Post from "../models/Post.js";
import FileService from "./fileService.js";

class PostService {
	async create(post, user) {
		const createdPost = await Post.create({ ...post, user: user.id });
		return createdPost;
	}
	async upload(picture) {
		const fileName = FileService.saveFile(picture);
		return fileName;
	}
	async getAll() {
		const posts = await Post.find().populate('user').exec();
		return posts;
	}

	async getOne(id) {
		if (!id) {
			throw new Error('id fehlt!!!');
		}
		const post = await Post.findOneAndUpdate(
			{ _id: id },
			{ $inc: { viewsCount: 1 } },
			{
				returnDocument: 'after',
			},
		).populate('user');
		return post;
	}
	async getByTag(tag) {
		if (!tag) {
			throw new Error("tag fehlt!!!");
		}
		const posts = Post.find({ tags: tag }).populate('user').exec();
		return posts;
	}
	async update(post, _id) {
		if (!_id) {
			throw new Error('id fehlt!!!');
		}
		const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
		return updatedPost;
	}
	async remove(id) {
		if (!id) {
			throw new Error('id fehlt!!!');
		}
		const post = await Post.findByIdAndDelete(id);
		return post
	}
}

export default new PostService();