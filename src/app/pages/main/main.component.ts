import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { SummaryComponent } from '../../components/summary/summary.component';
import { FormComponent } from '../../components/form/form.component';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [SummaryComponent, FormComponent],
    template: `<app-summary
            [incomes]="ts.incomes()"
            [outcomes]="ts.outcomes()"
            [total]="ts.total()"
        />
        <app-form (transaction)="ts.add($event)" />`,
})
export default class MainComponent {
    ts = inject(TransactionService);
}
