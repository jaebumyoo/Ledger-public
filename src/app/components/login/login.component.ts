import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginStore } from './login.store';

@Component({
    selector: 'ldgr-p-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [LoginStore]
})
export class LoginComponent {
    private store = inject(LoginStore);
    private snackBar = inject(MatSnackBar);

    public isLoading = this.store.isLoading;
    public errorMessage = this.store.errorMessage;

    public loginForm: FormGroup;

    constructor() {
        this.loginForm = new FormGroup({
            username: new FormControl('public_user', Validators.required),
            password: new FormControl('public_pass', Validators.required)
        });

        this.snackBar.open("This is a demo version of Jay’s personal ledger application. It uses hard - coded sample data for demonstration purposes. The production version is backed by Amazon RDS.");
    }

    public login() {
        this.store.login(this.loginForm.getRawValue());
    }
}
