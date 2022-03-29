import { Router } from 'express';
import validate from '../middleware/validate.js';
import { login, create, deleteUser, update, read } from '../validation/user.validation.js';
import UserController from '../controller/user.controller.js';
import requireJwtMiddleware from '../middleware/jwt.middleware.js';

const router = Router();

router.post('/login', validate(login), UserController.login);
router.post('/create', validate(create), UserController.create);
router.post('/deleteUser', validate(deleteUser), requireJwtMiddleware, UserController.deleteUser);
router.post('/update', validate(update), requireJwtMiddleware, UserController.update);
router.post('/read', validate(read), requireJwtMiddleware, UserController.read);

export default router;