import {Router} from 'express';
import * as reportController from '../controllers/report';

export const router: Router = Router({mergeParams: true});

router.get('/project/hours', reportController.generateReportProjectByHours);
router.get('/project/pounds', reportController.generateReportProjectByPounds);
router.get('/user/hours', reportController.generateReportUserByHours);
router.get('/user/pounds', reportController.generateReportUserByPounds);
