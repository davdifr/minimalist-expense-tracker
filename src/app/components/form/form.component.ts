import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
    FinancialTransaction,
    FinancialTransactionType,
} from '../../models/transactions.models';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './form.component.html',
})
export class FormComponent {
    @Output() transaction = new EventEmitter<FinancialTransaction>();

    #fb = inject(FormBuilder);
    form: FormGroup;

    // enums
    types = Object.values(FinancialTransactionType);

    constructor() {
        const formattedDate = new Date().toISOString().slice(0, 10);

        this.form = this.#fb.group({
            amount: [0, [Validators.required, Validators.min(0.01)]],
            date: [formattedDate, Validators.required],
            description: [],
            type: [FinancialTransactionType.Income, Validators.required],
            // category: [],
        });
    }

    onSubmit() {
        if (this.form.invalid) return;
        this.transaction.emit(this.form.value);
        this.form.reset();
    }
}
