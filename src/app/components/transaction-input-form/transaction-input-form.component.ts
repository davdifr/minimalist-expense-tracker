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
    selector: 'transaction-input-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './transaction-input-form.component.html',
})
export class TransactionInputFormComponent {
    @Output() transactionCreated = new EventEmitter<FinancialTransaction>();
    #fb = inject(FormBuilder);
    transactionForm!: FormGroup;

    // Formatted date in ISO 8601 format (YYYY-MM-DD)
    #formattedDate = new Date().toISOString().slice(0, 10);

    readonly initialFormValues = {
        amount: 0.01,
        date: this.#formattedDate,
        type: TransactionType.OUTCOME,
    };

    constructor() {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.transactionForm = this.#fb.group({
            amount: [0.01, [Validators.required, Validators.min(0.01)]],
            date: [this.#formattedDate, Validators.required],
            description: [],
            type: [TransactionType.OUTCOME, Validators.required],
        });
    }

    private resetForm(): void {
        this.transactionForm.reset();
        this.transactionForm.patchValue(this.initialFormValues);
    }

    private emitTransaction(): void {
        if (this.transactionForm.invalid) return;

        const { amount, date, description, type } = this.transactionForm.value;
        const newTransaction = {
            id: Date.now().toString(),
            amount,
            date,
            description,
            type,
        };

        this.transactionCreated.emit(newTransaction);
    }

    onSubmit(): void {
        this.emitTransaction();
        this.resetForm();
    }
}
