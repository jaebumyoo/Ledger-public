import { Component, inject, Input } from '@angular/core';
import { MatTabNavPanel } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
    selector: 'ldgr-p-nav',
    standalone: false,
    styles: [
        `.nav-bar {
            position: relative;
            display: flex;
            align-items: center;

            background-color: white;
        }`,
        `.nav-center {
            display: flex;
        }`,
        `.logout-link {
            position: absolute;
            right: 15px;
        }`
    ],
    templateUrl: './nav.component.html'
})
export class NavComponent {
    @Input() tabPanel!: MatTabNavPanel;

    private router = inject(Router);

    public logout(): void {
        this.router.navigate(['login']);
    }
}
