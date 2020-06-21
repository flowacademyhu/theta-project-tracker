import { Router } from 'express';
import * as projectController from '../controllers/project';

export const router: Router = Router({ mergeParams: true });

router.get('/', projectController.index);
router.get('/:id', projectController.show);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.destroy);
