import { Router } from 'express';
import * as projectController from '../controllers/project';
import * as projectUserController from '../controllers/projectUser';

export const router: Router = Router({ mergeParams: true });

router.get('/', projectController.index);
router.get('/:id', projectController.show);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.destroy);

router.get('/:projectId/user', projectUserController.index);
router.post('/user/:userId', projectUserController.create);
router.delete('/user/:userId', projectUserController.destroy);
