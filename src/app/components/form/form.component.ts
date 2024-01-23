import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FinancialTransaction } from '../../models/transactions.models';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { TransactionType } from '../../models/transactions.enums';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './form.component.html',
})
export class FormComponent {
    @Output() transaction = new EventEmitter<FinancialTransaction>();

    #fb = inject(FormBuilder);
    #formattedDate = new Date().toISOString().slice(0, 10);

    form: FormGroup;

    constructor() {
        this.form = this.#fb.group({
            amount: [0, [Validators.required, Validators.min(0.01)]],
            date: [this.#formattedDate, Validators.required],
            description: [],
            type: [TransactionType.Outcome, Validators.required],
            // category: [],
        });
    }

    private resetAndInitializeDateInForm(): void {
        this.form.reset();
        this.form.patchValue({ date: this.#formattedDate });
    }

    private createAndEmitNewTransaction(): void {
        if (this.form.invalid) return;
        const { amount, date, description, type } = this.form.value;
        const newTransaction = {
            id: Date.now().toString(),
            amount,
            date,
            description,
            type,
        };

        this.transaction.emit(newTransaction);
    }

    onSubmit(): void {
        this.createAndEmitNewTransaction();
        this.resetAndInitializeDateInForm();
    }
}
