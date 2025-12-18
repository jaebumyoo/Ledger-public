import { Injectable } from "@angular/core";
import { DateRange } from "@angular/material/datepicker";
import { DateTime } from "luxon";

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    public toDateKey(d: Date): string {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }

    public getDateRange(start: DateTime, end: DateTime): DateRange<string> {
        const startDt = start.startOf('day');
        const endDt = end.startOf('day').plus({ days: 1 });

        return new DateRange(
            startDt.toISODate()!,
            endDt.toISODate()!
        );
    }

    public getMonthlyRange(date: DateTime): DateRange<string> {
        const start = date.startOf('month');
        const end = start.plus({ months: 1 });

        return new DateRange(
            start.toISODate()!,
            end.toISODate()!
        );
    }

    public getYearlyRange(date: DateTime): DateRange<string> {
        const start = date.startOf('year');
        const end = start.plus({ years: 1 });

        return new DateRange(
            start.toISODate()!,
            end.toISODate()!
        );
    }
}