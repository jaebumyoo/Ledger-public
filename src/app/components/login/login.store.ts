import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { key } from "./login.model";

@Injectable()
export class LoginStore {
    private router = inject(Router);

    public errorMessage = signal('');
    public isLoading = signal(false);

    public login(credential: { username: string; password: string }): void {
        this.isLoading.set(true);

        if (credential.username === key.username &&
            credential.password === key.password
        ) {
            this.errorMessage.set('');
            this.isLoading.set(false);

            this.router.navigate(['/platform/register']);
        } else {
            this.errorMessage.set('Access Denied');
            this.isLoading.set(false);
        }
    }
}