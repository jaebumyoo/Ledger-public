import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";

import { CategoryService } from "@core/services/category/category.service";
import { ICategory } from "@core/services/category/category.service.model";

@Injectable()
export class SetCategoryStore {
    private categoryService = inject(CategoryService);

    public onSubmit(category: ICategory): Observable<ICategory[]> {
        return this.categoryService.set(category);
    }
}