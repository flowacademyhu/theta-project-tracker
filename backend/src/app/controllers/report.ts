import { QueryBuilder } from "knex";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { TableNames } from "../../lib/enums";
import * as reportSerializer from "../serializers/report"
import * as reportQuery from "../../lib/reportQuery"

export const generateReportProjectByHours = async (req: Request, res: Response) => {
    const report = await reportQuery.queryReportProjectByHours();
    res.json(reportSerializer.getReportProjectByHours(report));  
}

export const generateReportProjectByCost = async (req: Request, res: Response) => {
    const report = await reportQuery.queryReportProjectByCost();
    res.json(reportSerializer.getReportProjectByCost(report));
}

export const generateReportUserByHours = async (req: Request, res: Response) => {
    const report = await reportQuery.queryReportUserByHours();
    res.json(reportSerializer.getReportUserByHours(report));
}

export const generateReportUserByCost = async (req: Request, res: Response) => {
    const report = await reportQuery.queryReportUserByCost();
    res.json(reportSerializer.getReportUserByCost(report));
}

export const generateReportBudget = async (req: Request, res: Response) => {
    const report = await reportQuery.queryReportBudget();
    res.json(reportSerializer.getBudgetReport(report));
}
