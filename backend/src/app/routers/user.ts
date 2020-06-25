import {Router} from 'express';
import * as userController from '../controllers/user';
import {adminAuthorization} from '../../lib/authorization/admin';

export const router: Router = Router({mergeParams: true});

router.use(adminAuthorization);
router.put('/:id', userController.update);
router.get('/:id', userController.show);
router.get('/', userController.index);
router.post('/', userController.create);
router.delete('/:id', userController.destroy);
