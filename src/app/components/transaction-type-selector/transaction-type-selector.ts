import { Component, EventEmitter, Output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionType } from '../../models/transactions.enums';

@Component({
    selector: 'transaction-type-selector',
    standalone: true,
    imports: [FormsModule],
    template: `
        <select
            [(ngModel)]="selectedType"
            (change)="onTypeChange(selectedType)"
        >
            <option [ngValue]="null">All</option>
            <option [value]="transactionTypes.INCOME">Income</option>
            <option [value]="transactionTypes.OUTCOME">Outcome</option>
        </select>
    `,
})
export class TransactionTypeSelectorComponent {
    @Output() typeSelected = new EventEmitter<TransactionType | null>();
    transactionsFilter = input<TransactionType | null>(null);

    transactionTypes = TransactionType;
    selectedType: TransactionType | null = null;

    ngOnInit() {
        this.selectedType = this.transactionsFilter();
    }

    onTypeChange(type: TransactionType | null) {
        this.selectedType = type;
        this.typeSelected.emit(this.selectedType);
    }
}
