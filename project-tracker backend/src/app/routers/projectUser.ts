import { Router } from 'express';
import * as projectUserController from '../controllers/projectUser';

export const router: Router = Router({ mergeParams: true });

router.get('/', projectUserController.index);
router.post('/:userId', projectUserController.create);
router.delete('/:userId', projectUserController.destroy);
