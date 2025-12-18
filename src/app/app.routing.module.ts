import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PlatformComponent } from './components/platform/platform.component';
import { RegisterComponent } from './components/register/register.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'platform',
        component: PlatformComponent,
        children: [
            { path: 'register', component: RegisterComponent },
            { path: 'reports', component: ReportsComponent },
            { path: 'settings', component: SettingsComponent },
            { path: '', redirectTo: 'register', pathMatch: 'full' },
        ],
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
