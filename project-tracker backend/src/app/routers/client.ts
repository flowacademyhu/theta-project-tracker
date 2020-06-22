import { Router } from 'express';
import * as clientController from '../controllers/client';
import {authorization} from "../../lib/auth";

export const router: Router = Router({ mergeParams: true });

router.use(authorization);
router.get('/', clientController.index);
router.get('/:id', clientController.show);
router.post('/', clientController.create);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.destroy);
