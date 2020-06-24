import {Router} from 'express';
import * as clientController from '../controllers/client';
import {adminAuthorization} from "../../lib/authorization/admin";

export const router: Router = Router({mergeParams: true});
router.use(adminAuthorization);
router.get('/', clientController.index);
router.get('/:id', clientController.show);
router.post('/', clientController.create);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.destroy);
