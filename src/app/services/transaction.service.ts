import { Injectable, computed, signal } from '@angular/core';
import { FinancialTransaction } from '../models/transactions.models';
import {
    TransactionOperation,
    TransactionType,
} from '../models/transactions.enums';

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

        this.update(
            transaction.type,
            transaction.amount,
            TransactionOperation.Add
        );
    }

    remove(transaction: FinancialTransaction) {
        this.transactions.update((transactions) =>
            transactions.filter((t) => t.id !== transaction.id)
        );

        this.update(
            transaction.type,
            transaction.amount,
            TransactionOperation.Remove
        );
    }

    private update(
        type: TransactionType,
        amount: number,
        operation: TransactionOperation
    ) {
        const transactionUpdates = {
            [TransactionType.Income]: this.incomes,
            [TransactionType.Outcome]: this.outcomes,
        };

        transactionUpdates[type].update((current) =>
            operation === TransactionOperation.Add
                ? current + amount
                : current - amount
        );
    }
}
