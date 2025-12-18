import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { provideLuxonDateAdapter } from "@angular/material-luxon-adapter";
import { MatDatepicker } from "@angular/material/datepicker";
import { DateTime } from "luxon";

import { YEARLY_FORMAT } from "../../reports.model";

@Component({
    selector: 'ldgr-p-yearly-picker',
    standalone: false,
    template: `<mat-form-field>
                    <mat-label>Year</mat-label>
                    <input matInput [matDatepicker]="dp" [formControl]="yearly">
                    <mat-datepicker-toggle matIconSuffix [for]="dp"></mat-datepicker-toggle>
                    <mat-datepicker #dp startView="multi-year" (yearSelected)="setYear($event, dp)">
                    </mat-datepicker>
                </mat-form-field>`,
    providers: [provideLuxonDateAdapter(YEARLY_FORMAT)]
})
export class YearlyPickerComponent {
    @Input({ required: true }) yearly!: FormControl<DateTime>;

    public setYear(normalizedMonthAndYear: DateTime, datepicker: MatDatepicker<DateTime>) {
        const ctrlValue = DateTime.fromObject({
            year: normalizedMonthAndYear.year
        });

        this.yearly.setValue(ctrlValue);

        datepicker.close();
    }
}