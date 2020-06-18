import { Router } from 'express';
import * as userProjectController from '../controllers/userProject';

export const router: Router = Router({ mergeParams: true });

router.get('/', userProjectController.index);
/*router.post('/:userId', projectUserController.create);
router.delete('/:userId', projectUserController.destroy);
router.get('/:id', projectUserController.show);
router.put('/:id', projectUserController.update);*/