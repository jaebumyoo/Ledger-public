import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { provideLuxonDateAdapter } from "@angular/material-luxon-adapter";
import { DateRange } from "@angular/material/datepicker";
import { DateTime } from 'luxon';

import { UtilService } from "@core/services/util/util.service";

import { ReportsStore } from "./reports.store";
import { Category, cReport, DATE_FORMAT, dateRangeValidator, REPORT_TYPE, ReportColumns } from "./reports.model";

@Component({
    selector: 'ldgr-p-reports',
    standalone: false,
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.css',
    providers: [ReportsStore, provideLuxonDateAdapter(DATE_FORMAT)]
})
export class ReportsComponent {
    private store = inject(ReportsStore);
    private util = inject(UtilService);

    public REPORT_TYPE = REPORT_TYPE;
    public reportColumns = ReportColumns;

    public isLoading = signal<boolean>(true);
    public isPanelOpened = signal(false);
    public reports = this.store.cReports;

    public range = new FormGroup(
        {
            start: new FormControl<DateTime>(DateTime.now(), { nonNullable: true }),
            end: new FormControl<DateTime>(DateTime.now(), { nonNullable: true })
        },
        { validators: [dateRangeValidator] }
    );
    public monthly = new FormControl<DateTime>(DateTime.now(), { nonNullable: true });
    public yearly = new FormControl<DateTime>(DateTime.now(), { nonNullable: true });

    constructor() {
        if (this.reports().length === 0) {
            const date = DateTime.now();

            this.store.get(this.util.getMonthlyRange(date), date.toFormat('LLLL yyyy'));
        }
    }

    public toRow(map: Record<string, Category>): { title: string, category: Category }[] {
        return Object.entries(map).map(([title, category]) => ({ title, category }));
    }

    public onGenerate(type: REPORT_TYPE): void {
        let dateRange: DateRange<string>;
        let title: string;

        switch (type) {
            case REPORT_TYPE.MONTHLY:
                const monthly = this.monthly.value;

                dateRange = this.util.getMonthlyRange(monthly);
                title = monthly.toFormat('LLLL yyyy');

                break;
            case REPORT_TYPE.YEARLY:
                const yearly = this.yearly.value;

                dateRange = this.util.getYearlyRange(yearly);
                title = yearly.toFormat('yyyy');

                break;
            default:
                const start = this.range.get('start')?.value;
                const end = this.range.get('end')?.value;

                dateRange = this.util.getDateRange(start!, end!);
                title = `${start?.toFormat('MM/dd/yyyy')} - ${start?.toFormat('MM/dd/yyyy')}`;

                break;
        }

        this.store.get(dateRange, title);
    }

    public deleteReport(report: cReport): void {
        this.store.delete(report);
    }

    public refreshReport(report: cReport): void {
        this.store.refresh(report);
    }
}