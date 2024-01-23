import { Component, EventEmitter, Output, input } from '@angular/core';
import { FinancialTransaction } from '../../models/transactions.models';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [CurrencyPipe],
    template: `
        @for (transaction of transactionsList(); track $index) {
        <div>
            {{ transaction.amount | currency : 'EUR' }}
            {{ transaction.type }}
            {{ transaction.description }}
            {{ transaction.date }}
            <button (click)="deleteTransaction(transaction)">Delete</button>
        </div>
        }
    `,
})
export default class ListComponent {
    @Output() transactionToDelete = new EventEmitter<FinancialTransaction>();
    transactionsList = input<FinancialTransaction[]>([]);

    deleteTransaction(transaction: FinancialTransaction) {
        this.transactionToDelete.emit(transaction);
    }
}
