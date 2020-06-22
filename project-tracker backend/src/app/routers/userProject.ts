import { Router } from 'express';
import * as userProjectController from '../controllers/userProject';

export const router: Router = Router({ mergeParams: true });

router.get('/', userProjectController.index);
