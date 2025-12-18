import { inject, Injectable } from "@angular/core";
import { catchError, EMPTY, Observable } from "rxjs";

import { HttpService } from "@core/services/http/http.service";
import { NotificationService } from "@core/services/notification/notification.service";
import { CategoryService } from "@core/services/category/category.service";
import { MethodService } from "@core/services/method/method.service";
import { API_URL } from "@core/services/http/http.service.model";
import { ITransaction } from "@core/services/report/report.service.model";

@Injectable()
export class SetTransactionStore {
    private httpService = inject(HttpService);
    private notificationService = inject(NotificationService);
    private categoryService = inject(CategoryService);
    private methodService = inject(MethodService);

    public categories = this.categoryService.categories;
    public methods = this.methodService.methods;

    public onSubmit(transaction: ITransaction): Observable<number> {
        return (transaction.id
            ? this.httpService.put(API_URL.TRANSACTION, transaction)
            : this.httpService.post(API_URL.TRANSACTION, transaction))
            .pipe(
                catchError(() => {
                    this.notificationService.show('Set Records Failed');

                    return EMPTY;
                }))
    }
}