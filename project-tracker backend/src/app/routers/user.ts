import { Router } from 'express';
import * as userController from '../controllers/user';
import * as userProjectController from "../controllers/userProject";

export const router: Router = Router({ mergeParams: true });

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);

router.get('/:userId/project', userProjectController.index);
