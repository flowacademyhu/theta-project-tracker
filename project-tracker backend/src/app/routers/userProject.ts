import { Router } from 'express';
import * as userProjectController from '../controllers/userProject';
import {authorization} from "../../lib/auth";

export const router: Router = Router({ mergeParams: true });

router.use(authorization);
router.get('/', userProjectController.index);
