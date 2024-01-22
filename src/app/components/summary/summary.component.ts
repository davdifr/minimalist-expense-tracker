import { Component, input } from '@angular/core';

@Component({
    selector: 'app-summary',
    standalone: true,
    imports: [],
    template: `{{ incomes() }} | {{ outcomes() }} | {{ total() }}`,
})
export class SummaryComponent {
    incomes = input<number>();
    outcomes = input<number>();
    total = input<number>();
}
