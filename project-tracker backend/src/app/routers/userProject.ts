import {Router} from 'express';
import * as userProjectController from '../controllers/userProject';
import {adminAuthorization} from "../../lib/authorization/admin";

export const router: Router = Router({mergeParams: true});

router.use(adminAuthorization);
router.get('/', userProjectController.index);
