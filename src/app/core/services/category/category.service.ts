import { computed, inject, Injectable, signal } from "@angular/core";
import { catchError, EMPTY, Observable, of, tap } from "rxjs";

import { NotificationService } from "../notification/notification.service";
import { categories, ICategory } from "./category.service.model";

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
        return of(categories).pipe(
            tap(c => {
                this.categories.set(c);
            }),
            catchError(() => {
                this.notificationService.show('Get Categories Failed');

                return EMPTY;
            })
        );
    }

    public set(category: ICategory): Observable<ICategory[]> {
        if (category.id != null) {
            const idx = categories.findIndex(c => c.id === category.id);

            if (idx !== -1) {
                categories[idx] = { ...category };
            }
        } else {
            category.id = categories.length ? Math.max(...categories.map(c => c.id!)) + 1 : 0;

            categories.push(category);
        }

        this.categories.set([...categories]);

        return of(this.categories());
    }

    public delete(id: number): Observable<ICategory[]> {
        const idx = categories.findIndex(c => c.id === id);

        if (idx !== -1) categories.splice(idx, 1);

        this.categories.set([...categories]);

        return of(this.categories());
    }
}