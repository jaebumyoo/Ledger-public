import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@core/modules/material.module';
import { CalendarModule } from '@core/modules/calendar.module';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PlatformComponent } from './components/platform/platform.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MonthlyPickerComponent } from './components/reports/components/monthly-picker/monthly-picker.component';
import { SetTransactionComponent } from './components/register/components/set-transaction/set-transaction.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SetCategoryComponent } from './components/settings/components/set-category/set-category.component';
import { SetMethodComponent } from './components/settings/components/set-method/set-method.component';
import { YearlyPickerComponent } from './components/reports/components/yearly-picker/yearly-picker.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PlatformComponent,
        NavComponent,
        RegisterComponent,
        ReportsComponent,
        MonthlyPickerComponent,
        YearlyPickerComponent,
        SetTransactionComponent,
        SettingsComponent,
        SetCategoryComponent,
        SetMethodComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        CalendarModule
    ],
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
