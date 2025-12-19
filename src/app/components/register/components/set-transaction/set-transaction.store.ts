import { inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

import { TransactionService } from "@core/services/transaction/transaction.service";
import { CategoryService } from "@core/services/category/category.service";
import { MethodService } from "@core/services/method/method.service";
import { ReportService } from "@core/services/report/report.service";
import { ITransaction } from "@core/services/transaction/transaction.model";

@Injectable()
export class SetTransactionStore {
    private transactionService = inject(TransactionService);
    private categoryService = inject(CategoryService);
    private methodService = inject(MethodService);
    private reportService = inject(ReportService);

    public categories = this.categoryService.categories;
    public methods = this.methodService.methods;

    public onSubmit(transaction: ITransaction): Observable<number> {
        return this.transactionService.set(transaction).pipe(
            tap(() => {
                this.reportService.refresh(transaction.date);
            })
        );
    }
}