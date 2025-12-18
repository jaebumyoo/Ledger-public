import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ICategory } from '@core/services/category/category.service.model';
import { IMethod } from '@core/services/method/method.service.model';

import { SettingsStore } from './settings.store';
import { MethodColumns, CategoryColumns } from './settings.model';
import { SetCategoryComponent } from './components/set-category/set-category.component';
import { SetMethodComponent } from './components/set-method/set-method.component';

@Component({
    selector: 'ldgr-p-settings',
    standalone: false,
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css',
    providers: [SettingsStore]
})
export class SettingsComponent {
    private readonly dialog = inject(MatDialog);

    private store = inject(SettingsStore);

    public categoryColumns = CategoryColumns;
    public methodColumns = MethodColumns;

    public categories = this.store.categories;
    public methods = this.store.methods;

    public setCategory(category?: ICategory): void {
        this.dialog.open(SetCategoryComponent, {
            width: '350px',
            enterAnimationDuration: '5ms',
            exitAnimationDuration: '5ms',
            data: category
        });
    }

    public deleteCategory(id: number): void {
        this.store.deleteCategory(id).subscribe();
    }

    public setMethod(method?: IMethod): void {
        this.dialog.open(SetMethodComponent, {
            width: '350px',
            enterAnimationDuration: '5ms',
            exitAnimationDuration: '5ms',
            data: method
        });
    }

    public deleteMethod(id: number): void {
        this.store.deleteMethod(id).subscribe();
    }
}