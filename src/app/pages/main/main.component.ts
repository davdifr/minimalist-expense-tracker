import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { SummaryComponent } from '../../components/summary/summary.component';
import { TransactionInputFormComponent } from '../../components/transaction-input-form/transaction-input-form.component';
import { SelectTypeComponent } from '../../components/select-type/select-type.component';
import { SelectOrderComponent } from '../../components/select-order/select-order.component';
import { SearchComponent } from '../../components/search/search.component';
import { RemainingExpenseCalculatorComponent } from '../../components/remaining-expense-calculator/remaining-expense-calculator.component';
import ExportTransactionsButtonComponent from '../../components/export-transactions-button/export-transactions-button.component';
import { ImportTransactionsButtonComponent } from '../../components/import-transactions-button/import-transactions-button.component';
import TransactionsListComponent from '../../components/transactions-list/transactions-list.component';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        SummaryComponent,
        ExportTransactionsButtonComponent,
        ImportTransactionsButtonComponent,
        RemainingExpenseCalculatorComponent,
        TransactionInputFormComponent,
        TransactionsListComponent,
        SelectTypeComponent,
        SelectOrderComponent,
        SearchComponent,
    ],
    templateUrl: './main.component.html',
})
export default class MainComponent {
    transactionService = inject(TransactionService);
}
