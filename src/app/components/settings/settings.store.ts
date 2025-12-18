import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { CategoryService } from "@core/services/category/category.service";
import { ICategory } from "@core/services/category/category.service.model";
import { MethodService } from "@core/services/method/method.service";
import { IMethod } from "@core/services/method/method.service.model";

@Injectable()
export class SettingsStore {
    private categoryService = inject(CategoryService);
    private methodService = inject(MethodService);

    public categories = this.categoryService.categories;
    public methods = this.methodService.methods;

    public deleteCategory(id: number): Observable<ICategory[]> {
        return this.categoryService.delete(id);
    }

    public deleteMethod(id: number): Observable<IMethod[]> {
        return this.methodService.delete(id);
    }
}