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
    transactionList = signal<FinancialTransaction[]>([]);
    totalIncome = signal<number>(0);
    totalOutcome = signal<number>(0);
    netTotal = computed(() => this.totalIncome() - this.totalOutcome());

    addTransaction(transaction: FinancialTransaction) {
        this.transactionList.update((existingTransactions) => [
            ...existingTransactions,
            transaction,
        ]);

        this.updateTotals(
            transaction.type,
            transaction.amount,
            TransactionOperation.Add
        );
    }

    removeTransaction(transaction: FinancialTransaction) {
        this.transactionList.update((existingTransactions) =>
            existingTransactions.filter((t) => t.id !== transaction.id)
        );

        this.updateTotals(
            transaction.type,
            transaction.amount,
            TransactionOperation.Remove
        );
    }

    private updateTotals(
        transactionType: TransactionType,
        transactionAmount: number,
        operation: TransactionOperation
    ) {
        const totalUpdates = {
            [TransactionType.Income]: this.totalIncome,
            [TransactionType.Outcome]: this.totalOutcome,
        };

        totalUpdates[transactionType].update((currentTotal) =>
            operation === TransactionOperation.Add
                ? currentTotal + transactionAmount
                : currentTotal - transactionAmount
        );
    }
}
