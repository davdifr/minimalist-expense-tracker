import { Component, Output, EventEmitter } from '@angular/core';
import {
    FinancialTransaction,
    TransactionIOData,
} from '../../models/transactions.models';

@Component({
    selector: 'app-import',
    standalone: true,
    template: `
        <input
            #fileInput
            type="file"
            (change)="onFileSelected($event)"
            accept=".txt"
        />
        <button (click)="fileInput.click()">Import</button>
    `,
    styles: [
        `
            input {
                display: none;
            }
        `,
    ],
})
export class ImportComponent {
    @Output() transactionsUploaded = new EventEmitter<TransactionIOData>();

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsText(file, 'UTF-8');
        reader.onload = (event) => {
            const data = JSON.parse(event.target?.result as string);
            this.transactionsUploaded.emit(data);
        };

        reader.onerror = (event) => {
            console.log('error', event);
        };
    }
}
