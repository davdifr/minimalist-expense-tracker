import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { SummaryComponent } from '../../components/summary/summary.component';
import { FormComponent } from '../../components/form/form.component';
import ListComponent from '../../components/list/list.component';
import ExportComponent from '../../components/export/export.component';
import { ImportComponent } from '../../components/import/import.component';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        SummaryComponent,
        ExportComponent,
        ImportComponent,
        FormComponent,
        ListComponent,
    ],
    template: `<app-summary
            [totalIncome]="transactionService.totalIncome()"
            [totalOutcome]="transactionService.totalOutcome()"
            [netTotal]="transactionService.netTotal()"
        />
        <app-export
            [transactionsList]="transactionService.transactionsList()"
            [totalIncome]="transactionService.totalIncome()"
            [totalOutcome]="transactionService.totalOutcome()"
        />
        <app-import
            (transactionsUploaded)="
                transactionService.loadTransactionsAndSetTotals($event)
            "
        />
        <app-form (transaction)="transactionService.addTransaction($event)" />
        <app-list
            [transactionsList]="transactionService.transactionsList()"
            (transactionToDelete)="transactionService.deleteTransaction($event)"
        /> `,
})
export default class MainComponent {
    transactionService = inject(TransactionService);
}
