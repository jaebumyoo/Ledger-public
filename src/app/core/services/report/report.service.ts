import { inject, Injectable, signal } from "@angular/core";
import { DateRange } from "@angular/material/datepicker";
import { catchError, EMPTY } from "rxjs";

import { NotificationService } from "../notification/notification.service";

import { IReport, ITransaction } from "./report.service.model";

@Injectable({
    providedIn: 'root',
})
export class ReportService {
    private notificationService = inject(NotificationService);

    public reports = signal<IReport[]>([]);

    public get(range: DateRange<string>, title: string): void {
        if (this.reports().some(report => report.title === title)) {
            return;
        }

        const query = new URLSearchParams({ start: range.start!, end: range.end! }).toString();

        this.httpService.get<ITransaction[]>(API_URL.TRANSACTION, query)
            .pipe(
                catchError(() => {
                    this.notificationService.show('Get Records Failed');

                    return EMPTY;
                }))
            .subscribe(record => {
                const report: IReport = {
                    title: title,
                    range: range,
                    transactions: record
                }

                this.reports.update(prev => [...prev, report]);
            })
    }

    public delete(report: IReport): void {
        this.reports.update(reports =>
            reports.filter(r => r !== report)
        );
    }
}