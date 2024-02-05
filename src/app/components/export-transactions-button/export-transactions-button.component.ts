import { Component, input } from '@angular/core';
import {
    FinancialTransaction,
    TransactionIOData,
} from '../../models/transactions.models';

@Component({
    selector: 'export-transactions-button',
    standalone: true,
    template: `
        <button
            class="btn btn-light"
            (click)="downloadTransactions()"
            [disabled]="transactionsList().length === 0"
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M26.5 14V26C26.5 26.3978 26.342 26.7794 26.0607 27.0607C25.7794 27.342 25.3978 27.5 25 27.5H7C6.60218 27.5 6.22064 27.342 5.93934 27.0607C5.65804 26.7794 5.5 26.3978 5.5 26V14C5.5 13.6022 5.65804 13.2206 5.93934 12.9393C6.22064 12.658 6.60218 12.5 7 12.5H10C10.1326 12.5 10.2598 12.5527 10.3536 12.6464C10.4473 12.7402 10.5 12.8674 10.5 13C10.5 13.1326 10.4473 13.2598 10.3536 13.3536C10.2598 13.4473 10.1326 13.5 10 13.5H7C6.86739 13.5 6.74021 13.5527 6.64645 13.6464C6.55268 13.7402 6.5 13.8674 6.5 14V26C6.5 26.1326 6.55268 26.2598 6.64645 26.3536C6.74021 26.4473 6.86739 26.5 7 26.5H25C25.1326 26.5 25.2598 26.4473 25.3536 26.3536C25.4473 26.2598 25.5 26.1326 25.5 26V14C25.5 13.8674 25.4473 13.7402 25.3536 13.6464C25.2598 13.5527 25.1326 13.5 25 13.5H22C21.8674 13.5 21.7402 13.4473 21.6464 13.3536C21.5527 13.2598 21.5 13.1326 21.5 13C21.5 12.8674 21.5527 12.7402 21.6464 12.6464C21.7402 12.5527 21.8674 12.5 22 12.5H25C25.3978 12.5 25.7794 12.658 26.0607 12.9393C26.342 13.2206 26.5 13.6022 26.5 14ZM11.3538 8.35375L15.5 4.2075V17C15.5 17.1326 15.5527 17.2598 15.6464 17.3536C15.7402 17.4473 15.8674 17.5 16 17.5C16.1326 17.5 16.2598 17.4473 16.3536 17.3536C16.4473 17.2598 16.5 17.1326 16.5 17V4.2075L20.6462 8.35375C20.6927 8.40021 20.7479 8.43706 20.8086 8.4622C20.8692 8.48734 20.9343 8.50028 21 8.50028C21.0657 8.50028 21.1308 8.48734 21.1914 8.4622C21.2521 8.43706 21.3073 8.40021 21.3538 8.35375C21.4002 8.3073 21.4371 8.25215 21.4622 8.19145C21.4873 8.13075 21.5003 8.0657 21.5003 8C21.5003 7.9343 21.4873 7.86925 21.4622 7.80855C21.4371 7.74786 21.4002 7.69271 21.3538 7.64625L16.3538 2.64625C16.3073 2.59976 16.2522 2.56288 16.1915 2.53772C16.1308 2.51256 16.0657 2.49961 16 2.49961C15.9343 2.49961 15.8692 2.51256 15.8085 2.53772C15.7478 2.56288 15.6927 2.59976 15.6462 2.64625L10.6462 7.64625C10.5998 7.69271 10.5629 7.74786 10.5378 7.80855C10.5127 7.86925 10.4997 7.9343 10.4997 8C10.4997 8.0657 10.5127 8.13075 10.5378 8.19145C10.5629 8.25215 10.5998 8.3073 10.6462 8.35375C10.7401 8.44757 10.8673 8.50028 11 8.50028C11.0657 8.50028 11.1308 8.48734 11.1914 8.4622C11.2521 8.43706 11.3073 8.40021 11.3538 8.35375Z"
                    fill="black"
                />
            </svg>

            Export
        </button>
    `,
})
export default class ExportTransactionsButtonComponent {
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
