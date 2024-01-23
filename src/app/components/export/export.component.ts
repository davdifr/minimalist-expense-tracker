import { Component, input } from '@angular/core';
import {
    FinancialTransaction,
    TransactionIOData,
} from '../../models/transactions.models';

@Component({
    selector: 'app-export',
    standalone: true,
    template: `<button
        (click)="downloadTransactions()"
        [disabled]="transactionsList().length === 0"
    >
        Export
    </button>`,
})
export default class ExportComponent {
    transactionsList = input.required<FinancialTransaction[]>();
    totalIncome = input.required<number>();
    totalOutcome = input.required<number>();

    downloadTransactions(): void {
        const data = this.createTransactionIOData();
        const url = this.createBlobUrl(data);
        this.downloadFromUrl(
            url,
            `transaction-list-${this.dateToString()}.txt`
        );
    }

    private createTransactionIOData(): TransactionIOData {
        return {
            transactions: this.transactionsList(),
            totals: {
                income: this.totalIncome(),
                outcome: this.totalOutcome(),
            },
        };
    }

    private createBlobUrl(data: any): string {
        const jsonData = JSON.stringify(data);
        const blob = new Blob([jsonData], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        return url;
    }

    private downloadFromUrl(url: string, filename: string): void {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    }

    private dateToString(): string {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }
}
