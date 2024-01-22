import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { SummaryComponent } from '../../components/summary/summary.component';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [SummaryComponent],
    template: `<app-summary
        [incomes]="ts.incomes()"
        [outcomes]="ts.outcomes()"
        [total]="ts.total()"
    /> `,
})
export default class MainComponent {
    ts = inject(TransactionService);
}
