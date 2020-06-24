import {Router} from 'express';
import * as projectUserController from '../controllers/projectUser';
import {adminAuthorization} from "../../lib/authorization/admin";

export const router: Router = Router({mergeParams: true});

router.use(adminAuthorization);
router.get('/', projectUserController.index);
router.post('/:userId', projectUserController.create);
router.delete('/:userId', projectUserController.destroy);
