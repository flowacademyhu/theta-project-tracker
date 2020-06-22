import {Router} from 'express';
import * as reportController from '../controllers/report';
import { report } from 'process';

export const router: Router = Router({mergeParams: true});

router.get('/', reportController.generateReportProjectByHours);