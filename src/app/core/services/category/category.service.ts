import { computed, inject, Injectable, signal } from "@angular/core";
import { catchError, EMPTY, Observable, switchMap, tap } from "rxjs";

import { NotificationService } from "../notification/notification.service";
import { ICategory } from "./category.service.model";

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private notificationService = inject(NotificationService);

    public categories = signal<ICategory[]>([]);
    public categoriesMap = computed(() => {
        const map = new Map<number, ICategory>();

        for (const c of this.categories()) {
            map.set(c.id!, c);
        }

        return map;
    });

    constructor() {
        this.get().subscribe();
    }

    public get(): Observable<ICategory[]> {
        return this.httpService.get<ICategory[]>(API_URL.CATEGORY).pipe(
            tap(categories => {
                this.categories.set(categories);
            }),
            catchError(() => {
                this.notificationService.show('Get Categories Failed');

                return EMPTY;
            })
        );
    }

    public set(category: ICategory): Observable<ICategory[]> {
        const obs$ = category.id
            ? this.httpService.put(API_URL.CATEGORY, category)
            : this.httpService.post(API_URL.CATEGORY, category);

        return obs$.pipe(
            catchError(() => {
                this.notificationService.show('Set Category Failed');

                return EMPTY;
            }),
            switchMap(id => {
                return this.get();
            })
        );
    }

    public delete(id: number): Observable<ICategory[]> {
        return this.httpService.delete(API_URL.CATEGORY, id).pipe(
            catchError(() => {
                this.notificationService.show('Delete Category Failed');

                return EMPTY;
            }),
            switchMap(id => {
                return this.get();
            })
        );
    }
}