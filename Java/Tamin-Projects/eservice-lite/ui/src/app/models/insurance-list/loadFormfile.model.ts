import { ErrorModel } from "./error.model";
export class LoadFormfileModel {
    data: LoadFormfileModel;
    id: any;
    createdBy: any;
    creationTime: any;
    debitNumber: any;
    debitRow: any;
    errors: ErrorModel[];
    filesDirectory: any;
    isAlerted: any;
    lastModificationTime: any;
    lastModifiedBy: any;
    msgSmsId: any;
    paymentOrder: any;
    paymentOrderViewTime: any;
    permitFlag: any;
    receiptIssueTime: any;
    receiptViewTime: any;
    status: { id: any, statusDescription: any }
    statusModificationTime: any;
    summary: {
        contractNumber: any,
        createdBy: any,
        creationTime: any,
        employeesCount: any,
        employerName: any,
        hardJobPremium: any,
        id: any,
        lastModificationTime: any,
        lastModifiedBy: any,
        listDescription: any,
        listKind: any,
        listNumber: any,
        pourcentage: any,
        premiumRate: any,
        totalDailyWages: any,
        totalEmployeePremium: any,
        totalEmployerPremium: any,
        totalInclusiveBenefit: any,
        totalInclusiveWageAndBenefit: any,
        totalMonthlyWages: any,
        totalUnemploymentPremium: any,
        totalWageAndBenefit: any,
        totalWorkingDays: any,
        workshopAddress: any,
        workshopHistory: any,
        workshopTitle: any
    };
    traceCode: any;
    uploadType: any;
    workers: { id: any, workshopHistory: any, listIndex: any, firstName: any, lastName: any };
    workersFileName: any;
    workshop: { id: any, code: any, title: any, contractNumber: any, contractTitle: any };
    workshopCode: any
    workshopFileName: any;
    year: any;
    grandSum: any;
    month: { code: string, monthDescription: string };

}