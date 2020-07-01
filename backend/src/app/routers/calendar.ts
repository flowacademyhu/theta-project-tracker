import {Router} from 'express';
import {adminAuthorization} from "../../lib/authorization/admin";
import * as calendarController from "../controllers/calendar";

export const router: Router = Router({mergeParams: true});

router.use(adminAuthorization);
router.get('/', calendarController.index)
