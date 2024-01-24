import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { FinancialTransaction } from '../../models/transactions.models';
import { CurrencyPipe } from '@angular/common';
import { TransactionTypeFilterPipe } from '../../pipes/transaction-type-filter';
import { TransactionType } from '../../models/transactions.enums';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [CurrencyPipe, TransactionTypeFilterPipe],
    template: `
        @for (transaction of transactionsList() | transactionTypeFilter:
        transactionsFilter(); track $index) {
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

    transactionsList = input.required<FinancialTransaction[]>();
    transactionsFilter = input.required<TransactionType | null>();

    deleteTransaction(transaction: FinancialTransaction) {
        this.transactionToDelete.emit(transaction);
    }
}
