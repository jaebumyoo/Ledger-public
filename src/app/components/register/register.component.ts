import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarMonthViewDay } from 'angular-calendar';

import { UtilService } from '@core/services/util/util.service';
import { ITransaction } from '@core/services/report/report.service.model';

import { RegisterStore } from './register.store';
import { RegisterColumns } from './register.model';
import { SetTransactionComponent } from './components/set-transaction/set-transaction.component';

@Component({
    selector: 'ldgr-p-register',
    standalone: false,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    providers: [RegisterStore]
})
export class RegisterComponent {
    private readonly dialog = inject(MatDialog);

    private store = inject(RegisterStore);
    private util = inject(UtilService);

    public registerColumns = RegisterColumns;

    public categories = this.store.categories;
    public methods = this.store.methods;

    public isLoading = this.store.isLoading;
    public viewDate = this.store.viewDate;
    public transactions = this.store.transactions;

    public isSelected(d: Date): boolean {
        return this.util.toDateKey(d) === this.util.toDateKey(this.viewDate());
    }

    public getBalance(date: Date): number {
        return this.store.getBalance(date);
    }

    public setTransaction(transaction?: ITransaction): void {
        const dialogRef = this.dialog.open(SetTransactionComponent, {
            width: '350px',
            enterAnimationDuration: '5ms',
            exitAnimationDuration: '5ms',
            data: {
                transaction: transaction,
                date: this.viewDate()
            }
        });

        dialogRef.afterClosed().subscribe((refresh: boolean) => {
            if (refresh) {
                this.store.getRecord();
            }
        });
    }

    public deleteTransaction(id: number): void {
        this.store.deleteTransaction(id);
    }

    public dayClicked({ day }: { day: CalendarMonthViewDay }): void {
        this.viewDate.set(day.date);
    }

    public prevMonth(): void { this.store.setMonth(-1); }
    public nextMonth(): void { this.store.setMonth(1); }
    public today(): void { this.store.setMonth(0); }
}