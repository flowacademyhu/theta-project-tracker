import {Router} from 'express';
import * as reportController from '../controllers/report';

export const router: Router = Router({mergeParams: true});

router.get('/project/hours', reportController.generateReportProjectByHours);
router.get('/project/cost', reportController.generateReportProjectByCost);
router.get('/user/hours', reportController.generateReportUserByHours);
router.get('/user/cost', reportController.generateReportUserByCost);
router.get('/project/budget', reportController.generateReportBudget);
