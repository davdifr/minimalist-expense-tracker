import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionInputFormComponent } from '../../components/transaction-input-form/transaction-input-form.component';
import { TransactionSearchComponent } from '../../components/transaction-search/transaction-search.component';
import { RemainingExpenseCalculatorComponent } from '../../components/remaining-expense-calculator/remaining-expense-calculator.component';
import ExportTransactionsButtonComponent from '../../components/export-transactions-button/export-transactions-button.component';
import { ImportTransactionsButtonComponent } from '../../components/import-transactions-button/import-transactions-button.component';
import TransactionsListComponent from '../../components/transactions-list/transactions-list.component';
import { EconomicOverviewComponent } from '../../components/economic-overview/economic-overview.component';
import { SortingPreferenceSelectorComponent } from '../../components/sorting-preference-selector/sorting-preference-selector.component';
import { TransactionTypeSelectorComponent } from '../../components/transaction-type-selector/transaction-type-selector';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        EconomicOverviewComponent,
        ExportTransactionsButtonComponent,
        ImportTransactionsButtonComponent,
        RemainingExpenseCalculatorComponent,
        TransactionInputFormComponent,
        TransactionsListComponent,
        TransactionTypeSelectorComponent,
        SortingPreferenceSelectorComponent,
        TransactionSearchComponent,
    ],
    templateUrl: './main.component.html',
})
export default class MainComponent {
    transactionService = inject(TransactionService);
}
