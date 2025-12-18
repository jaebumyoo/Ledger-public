import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable()
export class LoginStore {
    private router = inject(Router);

    public errorMessage = signal('');
    public isLoading = signal(false);

    public login(credential: { username: string; password: string }): void {
        this.isLoading.set(true);

        this.encryptData$(credential.password).subscribe({
            next: () => {
                this.errorMessage.set('');
                this.isLoading.set(false);

                this.router.navigate(['/platform/register']);
            },
            error: () => {
                this.errorMessage.set('Access Denied');
                this.isLoading.set(false);
            }
        });
    }

    private encryptData$(data: string): Observable<string> {
        return of();
    }
}