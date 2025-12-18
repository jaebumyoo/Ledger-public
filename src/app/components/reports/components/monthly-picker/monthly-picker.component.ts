import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { provideLuxonDateAdapter } from "@angular/material-luxon-adapter";
import { MatDatepicker } from "@angular/material/datepicker";
import { DateTime } from "luxon";

import { MONTHLY_FORMAT } from "../../reports.model";

@Component({
    selector: 'ldgr-p-monthly-picker',
    standalone: false,
    template: `<mat-form-field>
                    <mat-label>Month and Year</mat-label>
                    <input matInput [matDatepicker]="dp" [formControl]="monthly">
                    <mat-datepicker-toggle matIconSuffix [for]="dp"></mat-datepicker-toggle>
                    <mat-datepicker #dp startView="multi-year" (monthSelected)="setMonth($event, dp)">
                    </mat-datepicker>
                </mat-form-field>`,
    providers: [provideLuxonDateAdapter(MONTHLY_FORMAT)]
})
export class MonthlyPickerComponent {
    @Input({ required: true }) monthly!: FormControl<DateTime>;

    public setMonth(normalizedMonthAndYear: DateTime, datepicker: MatDatepicker<DateTime>) {
        const ctrlValue = DateTime.fromObject({
            month: normalizedMonthAndYear.month,
            year: normalizedMonthAndYear.year
        });

        this.monthly.setValue(ctrlValue);

        datepicker.close();
    }
}