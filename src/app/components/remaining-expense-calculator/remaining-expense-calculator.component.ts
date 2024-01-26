import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-remaining-expense-calculator',
    standalone: true,
    imports: [FormsModule],
    template: `
        <div>
            <input type="number" [(ngModel)]="target" />
            <button (click)="calculateRemainingExpense()">
                Calculate remaining daily expense
            </button>
            @if (remainingExpense > 0) {
            <p>Remaining daily expense: {{ remainingExpense }}</p>
            } @else if (remainingExpense < 0) {
            <p>You've exceeded your budget</p>
            }
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
