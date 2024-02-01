import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IndexedDBService } from './services/indexed-db.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
})
export class AppComponent {
    #indexedDB = inject(IndexedDBService);

    title = 'minimalist-expense-tracker';
}
