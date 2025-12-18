import { computed, inject, Injectable } from "@angular/core";
import { DateRange } from "@angular/material/datepicker";

import { CategoryService } from "@core/services/category/category.service";
import { ReportService } from "@core/services/report/report.service";

import { Category, cReport } from "./reports.model";

@Injectable()
export class ReportsStore {
    private reportService = inject(ReportService);
    private categoryService = inject(CategoryService);

    public categories = this.categoryService.categoriesMap;

    public reports = this.reportService.reports;

    public cReports = computed(() => {
        return this.reports().map(report => {
            const expense: Record<string, Category> = {};
            const income: Record<string, Category> = {};

            for (const category of this.categories().values()) {
                (category.type ? expense : income)[category.name] = {
                    icon: category.icon,
                    amount: 0
                } as Category;
            }

            let total = 0;

            for (const transaction of report.transactions) {
                const amount = transaction.amount ?? 0;
                const category = this.categories().get(transaction.category);

                if (category!.type) {
                    total -= amount;
                    expense[category!.name].amount += amount;
                } else {
                    total += amount;
                    income[category!.name].amount += amount;
                }
            }

            return {
                title: report.title,
                total: total,
                expense: expense,
                income: income
            } as cReport;
        })
    });

    public get(dateRange: DateRange<string>, title: string): void {
        this.reportService.get(dateRange, title);
    }

    public delete(cReport: cReport): void {
        this.reportService.delete(this.reports().find(report => report.title === cReport.title)!);
    }

    public refresh(cReport: cReport): void {
        const report = this.reports().find(report => report.title === cReport.title)!

        this.reportService.delete(report);

        this.get(report.range, report.title);
    }
}