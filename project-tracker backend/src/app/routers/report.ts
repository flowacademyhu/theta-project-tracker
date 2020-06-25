import {Router} from 'express';
import * as reportController from '../controllers/report';

export const router: Router = Router({mergeParams: true});

router.get('/', reportController.generateReportProjectByHours);