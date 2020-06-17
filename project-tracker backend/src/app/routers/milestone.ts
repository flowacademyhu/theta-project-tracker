import { Router } from 'express';
import * as milestoneController from '../controllers/milestone';

export const router: Router = Router({ mergeParams: true });

router.get('/', milestoneController.index);
router.get('/:id', milestoneController.show);
router.post('/', milestoneController.create);
router.put('/:id', milestoneController.update);
router.delete('/:id', milestoneController.destroy); 