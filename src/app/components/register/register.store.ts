import { computed, inject, Injectable, signal } from "@angular/core";
import { DateTime } from "luxon";
import { catchError, EMPTY, tap } from "rxjs";

import { NotificationService } from "@core/services/notification/notification.service";
import { CategoryService } from "@core/services/category/category.service";
import { MethodService } from "@core/services/method/method.service";
import { ReportService } from "@core/services/report/report.service";
import { UtilService } from "@core/services/util/util.service";
import { ITransaction } from "@core/services/transaction/transaction.model";
import { TransactionService } from "@core/services/transaction/transaction.service";

@Injectable()
export class RegisterStore {
    private notificationService = inject(NotificationService);
    private transactionService = inject(TransactionService);
    private categoryService = inject(CategoryService);
    private methodService = inject(MethodService);
    private reportService = inject(ReportService);
    private util = inject(UtilService);

    public categories = this.categoryService.categoriesMap;
    public methods = this.methodService.methodsMap;

    public isLoading = signal<boolean>(true);
    public record = signal<ITransaction[]>([]);
    public viewDate = signal<Date>(new Date());

    public transactions = computed(() => {
        return this.record().filter(transaction => {
            return transaction.date === this.util.toDateKey(this.viewDate()!)
        })
    });

    constructor() {
        this.getRecord();
    }

    public getBalance(date: Date): number {
        return this.record().filter(transaction => {
            return transaction.date === this.util.toDateKey(date)
        }).reduce((sum, transaction) => {
            const type = this.categories().get(transaction.category)?.type;

            return sum + (type ? -1 : 1) * transaction.amount!;
        }, 0);
    }

    public setMonth(delta: number): void {
        if (delta === 0) {
            const today = new Date();

            this.viewDate.set(today);
        } else {
            const newViewDate = new Date(this.viewDate());
            newViewDate.setMonth(newViewDate.getMonth() + delta);
            this.viewDate.set(newViewDate);
        }

        this.getRecord();
    }

    public getRecord(): void {
        this.isLoading.set(true);

        const range = this.util.getMonthlyRange(DateTime.fromJSDate(this.viewDate()));

        this.transactionService.get(range.start!, range.end!)
            .pipe(
                catchError(() => {
                    this.notificationService.show('Get Records Failed');

                    return EMPTY;
                }))
            .subscribe(record => {
                this.record.set(record);
                this.isLoading.set(false);
            });
    }

    public deleteTransaction(id: number): void {
        this.transactionService.delete(id)
            .pipe(tap(() => {
                this.reportService.refresh(
                    this.record().find(transaction => transaction.id === id)?.date!
                );
            }))
            .subscribe(() => {
                this.getRecord();
            });
    }
}