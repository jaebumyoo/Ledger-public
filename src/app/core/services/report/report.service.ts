import { inject, Injectable, signal } from "@angular/core";
import { EMPTY, forkJoin, map } from "rxjs";
import { DateRange } from "@angular/material/datepicker";
import { DateTime } from "luxon";

import { NotificationService } from "../notification/notification.service";
import { TransactionService } from "../transaction/transaction.service";
import { IReport } from "./report.service.model";

@Injectable({
    providedIn: 'root',
})
export class ReportService {
    private transactionService = inject(TransactionService);
    private notificationService = inject(NotificationService);

    public reports = signal<IReport[]>([]);

    public get(range: DateRange<string>, title: string): void {
        if (this.reports().some(report => report.title === title)) {
            return;
        }

        this.transactionService.get(range.start!, range.end!)
            .subscribe(record => {
                const report: IReport = {
                    title: title,
                    range: range,
                    transactions: record
                }

                this.reports.update(prev => [...prev, report]);
            });
    }

    public refresh(date: string): void {
        const targetReports = this.reports().filter(report => this.isDateInRange(date, report.range));

        if (targetReports.length === 0) return;

        const requests = targetReports.map(report => {
            return this.transactionService.get(report.range.start!, report.range.end!).pipe(
                map(record => ({ title: report.title, transactions: record }))
            );
        });

        forkJoin(requests).subscribe({
            next: reports => {
                const reportsMap = new Map(reports.map(report => [report.title, report.transactions]));

                this.reports.update(prev =>
                    prev.map(report =>
                        reportsMap.has(report.title)
                            ? { ...report, transactions: reportsMap.get(report.title)! }
                            : report
                    )
                );
            },
            error: err => {
                this.notificationService.show('Get Records Failed');

                return EMPTY;
            }
        });
    }

    public delete(report: IReport): void {
        this.reports.update(reports =>
            reports.filter(r => r !== report)
        );
    }

    private isDateInRange(date: string, range: DateRange<string>): boolean {
        const target = DateTime.fromISO(date, { zone: 'local' }).startOf('day');
        const start = DateTime.fromISO(range.start!, { zone: 'local' }).startOf('day');
        const end = DateTime.fromISO(range.end!, { zone: 'local' }).endOf('day');

        return target >= start && target <= end;
    }
}