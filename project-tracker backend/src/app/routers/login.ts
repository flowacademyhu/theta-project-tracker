import { Router } from 'express';
import * as loginController from '../controllers/login';

export const router: Router = Router({ mergeParams: true });

router.post('/', loginController.create);
