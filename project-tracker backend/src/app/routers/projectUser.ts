import {Router} from 'express';
import * as projectUserController from '../controllers/projectUser';
import {authorization} from "../../lib/auth";

export const router: Router = Router({mergeParams: true});

router.use(authorization);
router.get('/get/:projectId', projectUserController.index);
router.post('/:userId', projectUserController.create);
router.delete('/:userId', projectUserController.destroy);
