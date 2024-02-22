import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'economic-overview',
    standalone: true,
    imports: [CurrencyPipe],
    template: `
        <div class="row">
            <div class="card">
                <p class="card__label">Total Income</p>
                <p class="card__text">{{ totalIncome() | currency : 'EUR' }}</p>
            </div>
            <div class="card">
                <p class="card__label">Total Outcome</p>
                <p class="card__text">
                    {{ totalOutcome() | currency : 'EUR' }}
                </p>
            </div>
            <div class="card">
                <p class="card__label">Net Total</p>
                <p class="card__text">{{ netTotal() | currency : 'EUR' }}</p>
            </div>
        </div>
    `,
})
export class EconomicOverviewComponent {
    totalIncome = input<number>();
    totalOutcome = input<number>();
    netTotal = input<number>();
}
