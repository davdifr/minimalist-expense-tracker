import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FinancialTransaction } from '../../models/transactions.models';
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

    #formattedDate = new Date().toISOString().slice(0, 10);

    constructor() {
        this.form = this.#fb.group({
            amount: [0, [Validators.required, Validators.min(0.01)]],
            date: [this.#formattedDate, Validators.required],
            description: [],
            type: ['outcome', Validators.required],
            // category: [],
        });
    }

    onSubmit() {
        if (this.form.invalid) return;
        this.transaction.emit(this.form.value);
        this.reset();
    }

    private reset() {
        this.form.reset();
        this.form.patchValue({ date: this.#formattedDate });
    }
}
