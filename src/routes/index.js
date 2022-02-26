import { Router } from 'express';
import validate from '../middleware/validate.js';
import { login } from '../validation/user.validation.js';
import UserController from '../controller/user.controller.js';

const router = Router();

router.post('/login', validate(login), UserController.login);

export default router;