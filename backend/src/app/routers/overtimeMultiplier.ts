import {Router} from 'express';
import * as overtimeMultiplierController from "../controllers/overtimeMultiplier";
import {adminAuthorization} from "../../lib/authorization/admin";

export const router: Router = Router({mergeParams: true});

router.use(adminAuthorization);
router.get('/', overtimeMultiplierController.index);
router.get('/:id', overtimeMultiplierController.show);
router.post('/', overtimeMultiplierController.create);
router.put('/:id', overtimeMultiplierController.update);
router.delete('/:id', overtimeMultiplierController.destroy);
