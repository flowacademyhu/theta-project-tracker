import { Request, Response } from "express";
import { createExcelReport, sendExcelFile } from "../../lib/export";
import * as reportSerializer from "../serializers/report"
import * as reportQuery from "../../lib/reportQuery"

export const exportReportProjectByHours = async (req: Request, res) => {
    const report = await reportQuery.queryReportProjectByHours();
    createExcelReport('Report per project', reportSerializer.getReportProjectByHours(report));
    sendExcelFile(res);
    res.status(200);
}

export const exportReportProjectByCost = async (req: Request, res) => {
    const report = await reportQuery.queryReportProjectByCost();
    createExcelReport('Report per project', reportSerializer.getReportProjectByCost(report));
    sendExcelFile(res);
    res.status(200);
}

export const exportReportUserByHours = async (req: Request, res) => {
    const report = await reportQuery.queryReportUserByHours();
    createExcelReport('Report per contractor', reportSerializer.getReportUserByHours(report));
    sendExcelFile(res);
    res.status(200);
}

export const exportReportUserByCost = async (req: Request, res) => {
    const report = await reportQuery.queryReportUserByCost();
    createExcelReport('Report per contractor', reportSerializer.getReportUserByCost(report));
    sendExcelFile(res);
    res.status(200);
}

export const exportReportBudget = async (req: Request, res) => {
    let data = await reportQuery.queryReportBudget();
    createExcelReport('Project Profitability', reportSerializer.getBudgetReport(data));
    sendExcelFile(res);
    res.status(200);
}