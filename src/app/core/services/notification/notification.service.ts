import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})

export class NotificationService {
    private _snackBar = inject(MatSnackBar);

    public show(message: string) {
        this._snackBar.open(message, '', {
            duration: 1500
        });
    }
}