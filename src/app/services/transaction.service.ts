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
    transactionsSearch = signal<string>('');

    totalIncome = signal<number>(0);
    totalOutcome = signal<number>(0);
    netTotal = computed(() => this.totalIncome() - this.totalOutcome());

    currentMonthTotalIncome = computed(() =>
        this.calculateCurrentMonthTotalByType(TransactionType.Income)
    );

    currentMonthTotalOutcome = computed(() =>
        this.calculateCurrentMonthTotalByType(TransactionType.Outcome)
    );

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

    transactionsListFilteredBySearch(text: string) {
        this.transactionsSearch.update(() => text);
    }

    calculateCurrentMonthTotalByType(type: TransactionType): number {
        return this.transactionsList()
            .filter(
                (transaction) =>
                    transaction.type === type &&
                    this.isTransactionInCurrentMonth(transaction)
            )
            .reduce((acc, transaction) => acc + transaction.amount, 0);
    }

    private isTransactionInCurrentMonth(transaction: FinancialTransaction) {
        return new Date(transaction.date).getMonth() === new Date().getMonth();
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
