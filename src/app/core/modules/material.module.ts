import { NgModule } from "@angular/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    exports: [
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatExpansionModule
    ]
})
export class MaterialModule { }