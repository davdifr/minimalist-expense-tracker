import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [FormsModule],
    template: `
        <input
            type="text"
            placeholder="Search"
            [(ngModel)]="serachValue"
            (ngModelChange)="onSearchChange($event)"
        />
    `,
})
export class SearchComponent {
    serachValue = '';

    @Output() searchChange = new EventEmitter<string>();

    onSearchChange(searchValue: string): void {
        this.searchChange.emit(searchValue);
    }
}
