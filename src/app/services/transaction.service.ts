import { Injectable, signal } from '@angular/core';
import { FinancialTransaction } from '../models/transactions.models';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    #transactions = signal<FinancialTransaction[]>([]);

    addTransaction(transaction: FinancialTransaction): void {
        this.#transactions.update((transactions) => [
            ...transactions,
            transaction,
        ]);
    }

    removeTransaction(transactionId: string): void {
        this.#transactions.update((transactions) =>
            transactions.filter((t) => t.id !== transactionId)
        );
    }

    getTransactions(): FinancialTransaction[] {
        return this.#transactions();
    }
}
