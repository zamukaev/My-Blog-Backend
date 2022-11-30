import Router from "express";

import PostController from "../controllers/PostController.js";
import authMiddleware from "../middlewaree/authMiddleware.js";

const router = new Router();

router.post('/posts', authMiddleware, PostController.create);
router.post('/upload', PostController.upload);
router.get('/posts', PostController.getAll);
router.get('/post/:id', PostController.getOne);
router.get('/posts/tags/:tag', PostController.getByTag)
router.put('/posts/:id', PostController.update);
router.delete('/posts/:id', PostController.remove);

export default router;