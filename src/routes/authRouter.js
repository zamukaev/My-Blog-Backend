import Router from "express";

import AuthController from "../controllers/AuthController.js";
import registerValidation from "../validation/RegisterValidation.js";
import authMiddleware from '../middlewaree/authMiddleware.js';

const router = new Router();

router.post('/registration', registerValidation, AuthController.registration);
router.post('/login', AuthController.login);
router.get('/authMe', authMiddleware, AuthController.authMe);

export default router;