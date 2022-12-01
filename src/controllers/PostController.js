import PostService from "../services/PostService.js";

class PostController {
	async create(req, res) {
		console.log(req.user)
		try {
			const post = await PostService.create(req.body, req?.user);
			return res.status(200).json(post);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async upload(req, res) {
		try {
			const imageUrl = await PostService.upload(req?.file);

			return res.status(200).json(imageUrl);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async getAll(req, res) {
		try {
			const posts = await PostService.getAll();
			return res.status(200).json(posts);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async getOne(req, res) {
		try {
			const post = await PostService.getOne(req.params.id);
			return res.status(200).json(post);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async getByTag(req, res) {
		try {
			const posts = await PostService.getByTag(req.params.tag);
			return res.status(200).json(posts);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}

	async update(req, res) {
		try {
			const updatedPost = await PostService.update(req.body, req.params.id);
			return res.status(200).json(updatedPost);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async remove(req, res) {
		try {
			const removedPost = await PostService.remove(req.params.id);
			return res.status(200).json(removedPost);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
}

export default new PostController();