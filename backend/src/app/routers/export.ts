import {Router} from 'express';
import * as exportController from '../controllers/export';

export const router: Router = Router({mergeParams: true});

router.get('/project/hours', exportController.exportReportProjectByHours);
// router.get('/project/cost', exportController.exportReportProjectByCost);
// router.get('/user/hours', exportController.exportReportUserByHours);
// router.get('/user/cost', exportController.exportReportUserByCost);
// router.get('/project/budget', exportController.exportReportBudget);
