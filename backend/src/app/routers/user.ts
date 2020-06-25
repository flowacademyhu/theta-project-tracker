import {Router} from 'express';
import * as userController from '../controllers/user';
import {adminAuthorization} from '../../lib/authorization/admin';

export const router: Router = Router({mergeParams: true});

router.get('/profile', userController.profile);
router.put('/:id', userController.update);
router.use(adminAuthorization);
router.get('/:id', userController.show);
router.get('/', userController.index);
router.post('/', userController.create);
router.delete('/:id', userController.destroy);
