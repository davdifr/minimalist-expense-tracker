import { Injectable, computed, signal } from '@angular/core';
import {
    FinancialTransaction,
    TransactionType,
    TransactionOperation,
} from '../models/transactions.models';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    transactions = signal<FinancialTransaction[]>([]);
    incomes = signal<number>(0);
    outcomes = signal<number>(0);
    total = computed(() => this.incomes() - this.outcomes());

    add(transaction: FinancialTransaction) {
        this.transactions.update((transactions) => [
            ...transactions,
            transaction,
        ]);

        this.update(transaction.type, transaction.amount, 'add');
    }

    remove(transaction: FinancialTransaction) {
        this.transactions.update((transactions) =>
            transactions.filter((t) => t.id !== transaction.id)
        );

        this.update(transaction.type, transaction.amount, 'remove');
    }

    private update(
        type: TransactionType,
        amount: number,
        operation: TransactionOperation
    ) {
        const transactionUpdates = {
            ['income']: this.incomes,
            ['outcome']: this.outcomes,
        };

        transactionUpdates[type].update((current) =>
            operation === 'add' ? current + amount : current - amount
        );
    }
}
