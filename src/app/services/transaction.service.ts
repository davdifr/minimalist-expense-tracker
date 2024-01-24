import { Injectable, computed, signal } from '@angular/core';
import {
    FinancialTransaction,
    TransactionIOData,
} from '../models/transactions.models';
import {
    TransactionOperation,
    TransactionType,
} from '../models/transactions.enums';
import { Order } from '../models/orders.enum';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    transactionsList = signal<FinancialTransaction[]>([]);
    transactionsTypeFilter = signal<TransactionType | null>(null);
    transactionsOrder = signal<Order | null>(null);

    totalIncome = signal<number>(0);
    totalOutcome = signal<number>(0);
    netTotal = computed(() => this.totalIncome() - this.totalOutcome());

    addTransaction(transaction: FinancialTransaction) {
        this.transactionsList.update((existingTransactions) => [
            ...existingTransactions,
            transaction,
        ]);

        this.updateTotals(
            transaction.type,
            transaction.amount,
            TransactionOperation.Add
        );
    }

    deleteTransaction(transaction: FinancialTransaction) {
        this.transactionsList.update((existingTransactions) =>
            existingTransactions.filter((t) => t.id !== transaction.id)
        );

        this.updateTotals(
            transaction.type,
            transaction.amount,
            TransactionOperation.Remove
        );
    }

    loadTransactionsAndSetTotals(data: TransactionIOData) {
        this.transactionsList.set(data.transactions);
        this.totalIncome.set(data.totals.income);
        this.totalOutcome.set(data.totals.outcome);
    }

    transactionsListFilteredByType(type: TransactionType | null) {
        this.transactionsTypeFilter.update(() => type);
    }

    sortTransactionsByOrder(order: Order | null) {
        this.transactionsOrder.update(() => order);
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
