import { Injectable, computed, inject, signal } from '@angular/core';
import {
    FinancialTransaction,
    TransactionIOData,
} from '../models/transactions.models';
import {
    TransactionOperation,
    TransactionType,
} from '../models/transactions.enums';
import { Order } from '../models/orders.enum';
import { LocalStorageService } from './local-storage.service';
import { IndexedDBService } from './indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    #localStorage = inject(LocalStorageService);
    #indexedDB = inject(IndexedDBService);

    transactionsList = signal<FinancialTransaction[]>([]);
    transactionsTypeFilter = signal<TransactionType | null>(null);
    transactionsOrder = signal<Order | null>(null);
    transactionsSearch = signal<string>('');

    totalIncome = signal<number>(0);
    totalOutcome = signal<number>(0);
    netTotal = computed(() => this.totalIncome() - this.totalOutcome());

    currentMonthTotalIncome = computed(() =>
        this.calculateCurrentMonthTotalByType(TransactionType.INCOME)
    );

    currentMonthTotalOutcome = computed(() =>
        this.calculateCurrentMonthTotalByType(TransactionType.OUTCOME)
    );

    constructor() {
        this.loadFilters();

        this.#indexedDB.getTransactions().then((transactions) => {
            this.transactionsList.set(transactions);
        });
    }

    addTransaction(transaction: FinancialTransaction) {
        this.transactionsList.update((existingTransactions) => [
            ...existingTransactions,
            transaction,
        ]);

        this.updateTotals(transaction, TransactionOperation.ADD);

        this.#indexedDB.addTransaction(transaction);
    }

    deleteTransaction(transaction: FinancialTransaction) {
        this.transactionsList.update((existingTransactions) =>
            existingTransactions.filter((t) => t.id !== transaction.id)
        );

        this.updateTotals(transaction, TransactionOperation.REMOVE);

        this.#indexedDB.deleteTransaction(transaction.id);
    }

    async loadTransactionsAndSetTotals(data: TransactionIOData) {
        try {
            this.#indexedDB.clearTransactions();
            this.transactionsList.set(data.transactions);

            this.#indexedDB.addTransactions(data.transactions);
            await this.#indexedDB.getTotals().then((totals) => {
                this.totalIncome.set(totals.income);
                this.totalOutcome.set(totals.outcome);
            });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    transactionsListFilteredByType(type: TransactionType | null) {
        this.transactionsTypeFilter.update(() => type);
        this.#localStorage.setToLocalStorage('transactionsTypeFilter', type);
    }

    sortTransactionsByOrder(order: Order | null) {
        this.transactionsOrder.update(() => order);
        this.#localStorage.setToLocalStorage('transactionsOrder', order);
    }

    transactionsListFilteredBySearch(text: string) {
        this.transactionsSearch.update(() => text);
    }

    private loadFilters() {
        const storedTypeFilter = this.#localStorage.getFromLocalStorage(
            'transactionsTypeFilter'
        );
        const storedOrder =
            this.#localStorage.getFromLocalStorage('transactionsOrder');

        if (storedTypeFilter) {
            this.transactionsTypeFilter.update(() => storedTypeFilter);
        }

        if (storedOrder) {
            this.transactionsOrder.update(() => storedOrder);
        }
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
        transaction: FinancialTransaction,
        operation: TransactionOperation
    ) {
        const totalUpdates = {
            [TransactionType.INCOME]: this.totalIncome,
            [TransactionType.OUTCOME]: this.totalOutcome,
        };

        totalUpdates[transaction.type].update((currentTotal) =>
            operation === TransactionOperation.ADD
                ? currentTotal + transaction.amount
                : currentTotal - transaction.amount
        );
    }
}
