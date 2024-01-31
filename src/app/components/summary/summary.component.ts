import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-summary',
    standalone: true,
    imports: [CurrencyPipe],
    template: `
        <div class="row">
            <div class="card">
                <p class="card__label">Total income</p>
                <p class="card__text">{{ totalIncome() | currency : 'EUR' }}</p>
            </div>
            <div class="card">
                <p class="card__label">Total income</p>
                <p class="card__text">
                    {{ totalOutcome() | currency : 'EUR' }}
                </p>
            </div>
            <div class="card">
                <p class="card__label">Total income</p>
                <p class="card__text">{{ netTotal() | currency : 'EUR' }}</p>
            </div>
        </div>
    `,
})
export class SummaryComponent {
    totalIncome = input<number>();
    totalOutcome = input<number>();
    netTotal = input<number>();
}
