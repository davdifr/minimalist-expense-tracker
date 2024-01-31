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
    templateUrl: './main.component.html',
})
export default class MainComponent {
    transactionService = inject(TransactionService);
}
