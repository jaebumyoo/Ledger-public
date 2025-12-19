import { DateRange } from "@angular/material/datepicker";
import { ITransaction } from "../transaction/transaction.model";

export enum REPORT_TYPE {
    RANGE = 'range',
    MONTHLY = 'monthly',
    YEARLY = 'yearly'
};

export interface IReport {
    title: string,
    range: DateRange<string>,
    transactions: ITransaction[]
}