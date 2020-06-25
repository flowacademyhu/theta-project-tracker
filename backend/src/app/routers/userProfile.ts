import {Router} from 'express';
import * as userProfileController from '../controllers/userProfile';

export const router: Router = Router({mergeParams: true});

router.get('/', userProfileController.show);
router.put('/', userProfileController.update);
