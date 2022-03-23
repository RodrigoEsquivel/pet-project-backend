import { Router } from 'express';
import validate from '../middleware/validate.js';
import { selectAll, selectAllFromUser, create } from '../validation/product.validation.js';
import ProductController from '../controller/product.controller.js';
import requireJwtMiddleware from '../middleware/jwt.middleware.js';

const router = Router();

router.post('/create', validate(create), requireJwtMiddleware, ProductController.create);
router.get('/selectAll', validate(selectAll), requireJwtMiddleware, ProductController.selectAll);
router.get('/selectAllFromUser', validate(selectAllFromUser), requireJwtMiddleware, ProductController.selectAllFromUser);

export default router;