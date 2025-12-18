import { computed, inject, Injectable, signal } from "@angular/core";
import { catchError, EMPTY, Observable, of, switchMap, tap } from "rxjs";

import { NotificationService } from "../notification/notification.service";
import { IMethod } from "./method.service.model";

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
        return this.httpService.get<IMethod[]>(API_URL.METHOD).pipe(
            tap(methods => {
                this.methods.set(methods);
            }),
            catchError(() => {
                this.notificationService.show('Get Methods Failed');

                return EMPTY;
            })
        );
    }

    public set(method: IMethod): Observable<IMethod[]> {
        const obs$ = method.id
            ? this.httpService.put(API_URL.METHOD, method)
            : this.httpService.post(API_URL.METHOD, method);

        return obs$.pipe(
            catchError(() => {
                this.notificationService.show('Set Method Failed');

                return EMPTY;
            }),
            switchMap(id => {
                return this.get();
            })
        );
    }

    public delete(id: number): Observable<IMethod[]> {
        return this.httpService.delete(API_URL.METHOD, id).pipe(
            catchError(() => {
                this.notificationService.show('Delete Method Failed');

                return EMPTY;
            }),
            switchMap(id => {
                return this.get();
            })
        );
    }
}