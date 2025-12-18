import { Component, computed, inject, signal } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { provideNativeDateAdapter } from '@angular/material/core';

import { SetTransactionStore } from "./set-transaction.store";
import { finalize } from "rxjs";
import { UtilService } from "@core/services/util/util.service";

@Component({
    selector: 'ldgr-p-set-transaction',
    standalone: false,
    templateUrl: './set-transaction.component.html',
    styleUrl: './set-transaction.component.css',
    providers: [SetTransactionStore, provideNativeDateAdapter()]
})
export class SetTransactionComponent {
    private store = inject(SetTransactionStore);
    private util = inject(UtilService);

    private readonly data = inject(MAT_DIALOG_DATA);
    private readonly dialogRef = inject(MatDialogRef<SetTransactionComponent>);

    public type = signal<boolean>(true);
    public categories = computed(() => {
        return this.store.categories().filter(category =>
            category.type == this.type()
        )
    });
    public methods = this.store.methods;

    public isLoading = signal<boolean>(false);

    public transactionForm = new FormGroup({
        id: new FormControl<number | undefined>(undefined, {
            nonNullable: true
        }),
        date: new FormControl<Date>(new Date(), {
            nonNullable: true,
            validators: [Validators.required]
        }),
        category: new FormControl<number>(15, {
            nonNullable: true,
            validators: [Validators.required]
        }),
        method: new FormControl<number>(11, {
            nonNullable: true,
            validators: [Validators.required]
        }),
        amount: new FormControl<number | null>(null, {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.min(0),
                Validators.pattern(/^\d+(\.\d{1,2})?$/)
            ]
        }),
        note: new FormControl<string | null>(null)
    });

    constructor() {
        if (this.data.transaction) {
            this.transactionForm.patchValue(this.data.transaction);
        }

        this.transactionForm.get('date')?.setValue(this.data.date);
    }

    public onSubmit(): void {
        this.isLoading.set(true);

        const transaction = {
            ...this.transactionForm.getRawValue(),
            date: this.util.toDateKey(this.transactionForm.getRawValue().date)
        }

        this.store.onSubmit(transaction)
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