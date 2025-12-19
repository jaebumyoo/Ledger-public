import { computed, inject, Injectable, signal } from "@angular/core";
import { catchError, EMPTY, Observable, of, switchMap, tap } from "rxjs";

import { NotificationService } from "../notification/notification.service";
import { IMethod, methods } from "./method.service.model";

@Injectable({
    providedIn: 'root',
})
export class MethodService {
    private notificationService = inject(NotificationService);

    public methods = signal<IMethod[]>([]);
    public methodsMap = computed(() => {
        const map = new Map<number, IMethod>();

        for (const m of this.methods()) {
            map.set(m.id!, m);
        }

        return map;
    });

    constructor() {
        this.get().subscribe();
    }

    public get(): Observable<IMethod[]> {
        return of(methods).pipe(
            tap(m => {
                this.methods.set(m);
            }),
            catchError(() => {
                this.notificationService.show('Get Methods Failed');

                return EMPTY;
            })
        );
    }

    public set(method: IMethod): Observable<IMethod[]> {
        if (method.id != null) {
            const idx = methods.findIndex(m => m.id === method.id);

            if (idx !== -1) {
                methods[idx] = { ...method };
            }
        } else {
            method.id = methods.length ? Math.max(...methods.map(m => m.id!)) + 1 : 0;

            methods.push(method);
        }

        this.methods.set([...methods]);

        return of(this.methods());
    }

    public delete(id: number): Observable<IMethod[]> {
        const idx = methods.findIndex(m => m.id === id);

        if (idx !== -1) methods.splice(idx, 1);

        this.methods.set([...methods]);

        return of(this.methods());
    }
}