import { DateRange } from "@angular/material/datepicker";

export interface ITransaction {
    id?: number;
    date: string;
    category: number;
    method: number;
    amount: number | null;
    note?: string | null;
}

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
