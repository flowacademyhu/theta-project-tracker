import {Router} from 'express';
import * as actionLabelController from '../controllers/actionLabel';
import {adminAuthorization} from "../../lib/authorization/admin";

export const router: Router = Router({mergeParams: true});

router.get('/', actionLabelController.index);
router.get('/:actionLabelId', actionLabelController.show);
router.use(adminAuthorization);
router.post('/', actionLabelController.create);
router.put('/:actionLabelId', actionLabelController.update);
router.delete('/:actionLabelId', actionLabelController.destroy);
