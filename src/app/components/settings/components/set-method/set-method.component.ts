import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { SetMethodStore } from "./set-method.store";
import { finalize } from "rxjs";

@Component({
    selector: 'ldgr-p-set-method',
    standalone: false,
    templateUrl: './set-method.component.html',
    styleUrl: './set-method.component.css',
    providers: [SetMethodStore]
})
export class SetMethodComponent {
    private store = inject(SetMethodStore);

    private readonly data = inject(MAT_DIALOG_DATA);
    private readonly dialogRef = inject(MatDialogRef<SetMethodComponent>);

    public name = signal<string>('');
    public isLoading = signal<boolean>(false);

    public methodForm = new FormGroup({
        id: new FormControl<number | undefined>(undefined, {
            nonNullable: true
        }),
        name: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        icon: new FormControl<string | null>(null)
    });

    constructor() {
        if (this.data) {
            this.name.set(this.data.name);
            this.methodForm.patchValue(this.data);
        }
    }

    public onSubmit(): void {
        this.isLoading.set(true);

        this.store.onSubmit(this.methodForm.getRawValue())
            .pipe(
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe(() => {
                this.onClose(true);
            });
    }

    public onClose(refresh: boolean = false): void {
        this.dialogRef.close(refresh);
    }
}