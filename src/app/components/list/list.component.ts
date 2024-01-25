import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { FinancialTransaction } from '../../models/transactions.models';
import { CurrencyPipe } from '@angular/common';
import { TransactionTypeFilterPipe } from '../../pipes/transaction-type-filter';
import { TransactionType } from '../../models/transactions.enums';
import { Order } from '../../models/orders.enum';
import { OrderPipe } from '../../pipes/order.pipe';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [CurrencyPipe, TransactionTypeFilterPipe, OrderPipe, SearchPipe],
    template: `
        @for (transaction of transactionsList().reverse() |
        transactionTypeFilter: transactionsFilter() | order: transactionsOrder()
        | search: transactionsSearch(); track $index) {
        <div>
            {{ transaction.amount | currency : 'EUR' }}
            {{ transaction.type }}
            {{ transaction.description }}
            {{ transaction.date }}
            <button (click)="deleteTransaction(transaction)">Delete</button>
        </div>
        } @empty {
        <div>No transactions</div>
        }
    `,
})
export default class ListComponent {
    @Output() transactionToDelete = new EventEmitter<FinancialTransaction>();

    transactionsList = input.required<FinancialTransaction[]>();
    transactionsFilter = input.required<TransactionType | null>();
    transactionsOrder = input.required<Order | null>();
    transactionsSearch = input.required<string>();

    deleteTransaction(transaction: FinancialTransaction) {
        this.transactionToDelete.emit(transaction);
    }
}
