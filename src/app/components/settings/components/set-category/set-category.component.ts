import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { finalize } from "rxjs";

import { SetCategoryStore } from "./set-category.store";

@Component({
    selector: 'ldgr-p-set-category',
    standalone: false,
    templateUrl: './set-category.component.html',
    styleUrl: './set-category.component.css',
    providers: [SetCategoryStore]
})
export class SetCategoryComponent {
    private store = inject(SetCategoryStore);

    private readonly data = inject(MAT_DIALOG_DATA);
    private readonly dialogRef = inject(MatDialogRef<SetCategoryComponent>);

    public name = signal<string>('');
    public isLoading = signal<boolean>(false);

    public categoryForm = new FormGroup({
        id: new FormControl<number | undefined>(undefined, {
            nonNullable: true
        }),
        name: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        type: new FormControl<boolean>(true, {
            nonNullable: true,
            validators: [Validators.required]
        }),
        icon: new FormControl<string | null>(null)
    });

    constructor() {
        if (this.data) {
            this.name.set(this.data.name);
            this.categoryForm.patchValue(this.data);
        }
    }

    public onSubmit(): void {
        this.isLoading.set(true);

        this.store.onSubmit(this.categoryForm.getRawValue())
            .pipe(
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe(() => {
                this.dialogRef.close();
            });
    }

    public onClose(): void {
        this.dialogRef.close();
    }
}