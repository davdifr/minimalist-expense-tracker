import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-summary',
    standalone: true,
    imports: [CurrencyPipe],
    template: `{{ totalIncome() | currency : 'EUR' }} |
        {{ totalOutcome() | currency : 'EUR' }} |
        {{ netTotal() | currency : 'EUR' }}`,
})
export class SummaryComponent {
    totalIncome = input<number>();
    totalOutcome = input<number>();
    netTotal = input<number>();
}
