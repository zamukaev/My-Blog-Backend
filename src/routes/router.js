import Router from "express";

import PostController from "../controllers/PostController.js";
import authMiddleware from "../middlewaree/authMiddleware.js";


const router = new Router();

router.post('/posts', authMiddleware, PostController.create);
router.get('/posts', PostController.getAll);
router.get('/post/:id', PostController.getOne);
router.get('/posts/tags/:tag', PostController.getByTag)
router.put('/posts/:id', authMiddleware, PostController.update);
router.delete('/posts/:id', authMiddleware, PostController.remove);



export default router;