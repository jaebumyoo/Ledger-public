import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";

import { MethodService } from "@core/services/method/method.service";
import { IMethod } from "@core/services/method/method.service.model";

@Injectable()
export class SetMethodStore {
    private methodService = inject(MethodService);

    public onSubmit(method: IMethod): Observable<IMethod[]> {
        return this.methodService.set(method);
    }
}