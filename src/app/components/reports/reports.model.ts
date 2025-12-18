import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { DateTime } from "luxon";

export type cReport = {
    title: string,
    total: number,
    expense: Record<string, Category>,
    income: Record<string, Category>
}

export type Category = {
    icon: string | null,
    amount: number
}

export enum REPORT_TYPE {
    RANGE = 'range',
    MONTHLY = 'monthly',
    YEARLY = 'yearly'
};

export const ReportColumns: string[] = [
    'Category',
    'Amount',
]

export const DATE_FORMAT = {
    parse: {
        dateInput: 'MM/dd/yyyy',
    },
    display: {
        dateInput: 'MM/dd/yyyy',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'MM/dd/yyyy',
        monthYearA11yLabel: 'MMMM yyyy',
    },
};

export const MONTHLY_FORMAT = {
    parse: {
        dateInput: 'MM/yyyy',
    },
    display: {
        dateInput: 'MM/yyyy',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'MM/yyyy',
        monthYearA11yLabel: 'MMMM yyyy',
    },
};

export const YEARLY_FORMAT = {
    parse: {
        dateInput: 'yyyy',
    },
    display: {
        dateInput: 'yyyy',
        monthYearLabel: 'yyyy',
        dateA11yLabel: 'yyyy',
        monthYearA11yLabel: 'yyyy',
    },
};

export const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;

    const start = group.get('start')?.value as DateTime;
    const end = group.get('end')?.value as DateTime;

    return end.toMillis() >= start.toMillis() ? null : { rangeInvalid: true };
};