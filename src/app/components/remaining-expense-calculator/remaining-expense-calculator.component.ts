import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-remaining-expense-calculator',
    standalone: true,
    imports: [FormsModule, CurrencyPipe],
    template: `
        <div class="row row__number">
            <div class="card card__number">
                <h2>Calculate remaining daily expenses</h2>
                <div class="card__input">
                    <input
                        type="number"
                        name="number"
                        class="input__number"
                        [(ngModel)]="target"
                    />
                    <button class="btn" (click)="calculateRemainingExpense()">
                        Calculate
                    </button>
                </div>
            </div>
            <div class="card">
                <p class="card__label">Remaining daily expenses</p>

                @if (remainingExpense >= 0) {
                <p class="card__text-big">
                    {{ remainingExpense | currency : 'EUR' }}
                </p>
                }@else if (remainingExpense < 0) {
                <p class="card__text-big">N.P</p>
                }
            </div>
        </div>
    `,
})
export class RemainingExpenseCalculatorComponent {
    currentMonthTotalIncome = input.required<number>();
    currentMonthTotalOutcome = input.required<number>();

    target: number = 0;
    remainingExpense: number = 0;

    calculateRemainingExpense() {
        const totalBudgetAfterExpenses =
            this.currentMonthTotalIncome() - this.currentMonthTotalOutcome();
        const dailySpendable =
            (totalBudgetAfterExpenses - this.target) /
            this.getNumberOfDaysLeftInCurrentMonth();

        this.remainingExpense = parseFloat(dailySpendable.toFixed(2));
    }

    private getNumberOfDaysLeftInCurrentMonth() {
        const date = new Date();
        return this.getNumberOfDaysInCurrentMonth(date) - date.getDate() + 1;
    }

    private getNumberOfDaysInCurrentMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
}
