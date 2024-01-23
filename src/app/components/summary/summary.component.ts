import { Component, input } from '@angular/core';

@Component({
    selector: 'app-summary',
    standalone: true,
    imports: [],
    template: `{{ totalIncome() }} | {{ totalOutcome() }} | {{ netTotal() }}`,
})
export class SummaryComponent {
    totalIncome = input<number>();
    totalOutcome = input<number>();
    netTotal = input<number>();
}
