import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

    public isLoading = this.store.isLoading;
    public errorMessage = this.store.errorMessage;

    public loginForm: FormGroup;

    constructor() {
        this.loginForm = new FormGroup({
            username: new FormControl('public_user', Validators.required),
            password: new FormControl('public_pass', Validators.required)
        });
    }

    public login() {
        this.store.login(this.loginForm.getRawValue());
    }
}
