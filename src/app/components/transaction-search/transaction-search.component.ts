import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'transaction-search',
    standalone: true,
    imports: [FormsModule],
    template: `
        <input
            type="text"
            placeholder="Search"
            [(ngModel)]="searchValue"
            (ngModelChange)="onSearchChange($event)"
        />
    `,
})
export class TransactionSearchComponent {
    @Output() searchChange = new EventEmitter<string>();
    searchValue = '';

    onSearchChange(searchValue: string): void {
        this.searchChange.emit(searchValue);
    }
}
