import {Router} from 'express';
import * as projectUserController from '../controllers/projectUser';
import {adminAuthorization} from "../../lib/authorization/admin";

export const router: Router = Router({mergeParams: true});

router.use(adminAuthorization);
router.get('/get/:projectId', projectUserController.index);
router.post('/', projectUserController.createAndDelete);
