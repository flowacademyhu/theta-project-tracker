import {Router} from 'express';
import * as userController from '../controllers/user';
import {authorization} from '../../lib/auth';

export const router: Router = Router({ mergeParams: true });

router.use(authorization);
router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);
