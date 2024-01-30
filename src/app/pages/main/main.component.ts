import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { SummaryComponent } from '../../components/summary/summary.component';
import { FormComponent } from '../../components/form/form.component';
import ListComponent from '../../components/list/list.component';
import ExportComponent from '../../components/export/export.component';
import { ImportComponent } from '../../components/import/import.component';
import { SelectTypeComponent } from '../../components/select-type/select-type.component';
import { SelectOrderComponent } from '../../components/select-order/select-order.component';
import { SearchComponent } from '../../components/search/search.component';
import { RemainingExpenseCalculatorComponent } from '../../components/remaining-expense-calculator/remaining-expense-calculator.component';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        SummaryComponent,
        ExportComponent,
        ImportComponent,
        RemainingExpenseCalculatorComponent,
        FormComponent,
        ListComponent,
        SelectTypeComponent,
        SelectOrderComponent,
        SearchComponent,
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

        <app-remaining-expense-calculator
            [currentMonthTotalIncome]="
                transactionService.currentMonthTotalIncome()
            "
            [currentMonthTotalOutcome]="
                transactionService.currentMonthTotalOutcome()
            "
        />
        <app-form (transaction)="transactionService.addTransaction($event)" />
        <app-list
            [transactionsList]="transactionService.transactionsList()"
            [transactionsFilter]="transactionService.transactionsTypeFilter()"
            [transactionsOrder]="transactionService.transactionsOrder()"
            [transactionsSearch]="transactionService.transactionsSearch()"
            (transactionToDelete)="transactionService.deleteTransaction($event)"
        />
        <app-select-type
            (typeSelected)="
                transactionService.transactionsListFilteredByType($event)
            "
            [transactionsFilter]="transactionService.transactionsTypeFilter()"
        />
        <app-select-order
            (orderSelected)="transactionService.sortTransactionsByOrder($event)"
            [transactionsOrder]="transactionService.transactionsOrder()"
        />
        <app-search
            (searchChange)="
                transactionService.transactionsListFilteredBySearch($event)
            "
        />`,
})
export default class MainComponent {
    transactionService = inject(TransactionService);
}
