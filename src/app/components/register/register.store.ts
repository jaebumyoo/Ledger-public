import { computed, inject, Injectable, signal } from "@angular/core";
import { DateTime } from "luxon";
import { catchError, EMPTY } from "rxjs";

import { NotificationService } from "@core/services/notification/notification.service";
import { CategoryService } from "@core/services/category/category.service";
import { MethodService } from "@core/services/method/method.service";
import { UtilService } from "@core/services/util/util.service";
import { ITransaction } from "@core/services/report/report.service.model";

@Injectable()
export class RegisterStore {
    private notificationService = inject(NotificationService);
    private categoryService = inject(CategoryService);
    private methodService = inject(MethodService);
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
        const query = new URLSearchParams({ start: range.start!, end: range.end! }).toString();

        this.httpService.get<ITransaction[]>(API_URL.TRANSACTION, query)
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
        this.httpService.delete(API_URL.TRANSACTION, id).subscribe(() => {
            this.getRecord();
        });
    }
}