import { Router } from 'express';
import validate from '../middleware/validate.js';
import { login, create } from '../validation/user.validation.js';
import UserController from '../controller/user.controller.js';

const router = Router();

router.post('/login', validate(login), UserController.login);
router.post('/create', validate(create), UserController.create);

export default router;