import { computed, inject, Injectable, signal } from "@angular/core";
import { catchError, EMPTY, Observable, of, switchMap, tap } from "rxjs";

import { NotificationService } from "../notification/notification.service";
import { ITransaction, transactions } from "./transaction.model";

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    private notificationService = inject(NotificationService);

    public transactions = signal<ITransaction[]>([]);
    public transactionsMap = computed(() => {
        const map = new Map<number, ITransaction>();

        for (const t of this.transactions()) {
            map.set(t.id!, t);
        }

        return map;
    });

    public get(start: string, end: string): Observable<ITransaction[]> {
        return of(transactions.filter(transaction => {
            return transaction.date >= start && transaction.date <= end;
        })).pipe(
            tap(t => {
                this.transactions.set(t);
            }),
            catchError(() => {
                this.notificationService.show('Get Transactions Failed');

                return EMPTY;
            })
        );
    }

    public set(transaction: ITransaction): Observable<number> {
        if (transaction.id != null) {
            const idx = transactions.findIndex(t => t.id === transaction.id);

            if (idx !== -1) {
                transactions[idx] = { ...transaction };
            }
        } else {
            transaction.id = transactions.length ? Math.max(...transactions.map(c => c.id!)) + 1 : 0;

            transactions.push(transaction);
        }

        this.transactions.set([...transactions]);

        return of(transaction.id);
    }

    public delete(id: number): Observable<number> {
        const idx = transactions.findIndex(t => t.id === id);

        if (idx !== -1) transactions.splice(idx, 1);

        this.transactions.set([...transactions]);

        return of(id);
    }
}