import { Injectable } from '@angular/core';
import { FinancialTransaction } from '../models/transactions.models';
import { TransactionType } from '../models/transactions.enums';

@Injectable({
    providedIn: 'root',
})
export class IndexedDBService {
    private db!: IDBDatabase;
    private readonly dbName = 'financial-transactions';
    private readonly storeName = 'transactions';
    private readonly version = 1;

    constructor() {
        this.init();
    }

    private init(): void {
        const request = indexedDB.open(this.dbName, this.version);

        request.onerror = (event: any) => {
            console.error('Database error: ' + event.target.errorCode);
        };

        request.onsuccess = (event: any) => {
            this.db = event.target.result;
        };

        request.onupgradeneeded = (event: any) => {
            this.db = event.target.result;
            this.db.createObjectStore(this.storeName, { keyPath: 'id' });
        };
    }

    public async addTransaction(
        transaction: FinancialTransaction
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const transactionObjectStore = this.db
                .transaction(this.storeName, 'readwrite')
                .objectStore(this.storeName);
            const request = transactionObjectStore.add(transaction);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event: any) => {
                reject(event.target.errorCode);
            };
        });
    }

    public async getTransactions(): Promise<FinancialTransaction[]> {
        return new Promise((resolve, reject) => {
            const transactionObjectStore = this.db
                .transaction(this.storeName, 'readonly')
                .objectStore(this.storeName);
            const request = transactionObjectStore.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event: any) => {
                reject(event.target.errorCode);
            };
        });
    }

    public async deleteTransaction(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const transactionObjectStore = this.db
                .transaction(this.storeName, 'readwrite')
                .objectStore(this.storeName);
            const request = transactionObjectStore.delete(id);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event: any) => {
                reject(event.target.errorCode);
            };
        });
    }

    public async addTransactions(
        transactions: FinancialTransaction[]
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const transactionObjectStore = this.db
                .transaction(this.storeName, 'readwrite')
                .objectStore(this.storeName);

            transactions.forEach((transaction) => {
                const request = transactionObjectStore.add(transaction);

                request.onsuccess = () => {
                    resolve();
                };

                request.onerror = (event: any) => {
                    reject(event.target.errorCode);
                };
            });
        });
    }

    public async clearTransactions(): Promise<void> {
        return new Promise((resolve, reject) => {
            const transactionObjectStore = this.db
                .transaction(this.storeName, 'readwrite')
                .objectStore(this.storeName);
            const request = transactionObjectStore.clear();

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event: any) => {
                reject(event.target.errorCode);
            };
        });
    }

    public async getTotals(): Promise<{ income: number; outcome: number }> {
        return new Promise((resolve, reject) => {
            const transactionObjectStore = this.db
                .transaction(this.storeName, 'readonly')
                .objectStore(this.storeName);
            const request = transactionObjectStore.getAll();

            request.onsuccess = () => {
                const transactions = request.result;
                const totals = transactions.reduce(
                    (acc, transaction) => {
                        if (transaction.type === TransactionType.Income) {
                            acc.income += transaction.amount;
                        } else {
                            acc.outcome += transaction.amount;
                        }

                        return acc;
                    },
                    { income: 0, outcome: 0 }
                );

                resolve(totals);
            };

            request.onerror = (event: any) => {
                reject(event.target.errorCode);
            };
        });
    }
}
