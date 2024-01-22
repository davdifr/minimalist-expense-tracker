import { IncomeCategory, OutcomeCategory } from './categories.enums';

export enum FinancialTransactionType {
    Income = 'income',
    Outcome = 'outcome',
}

export type operation = 'add' | 'remove';

export interface FinancialItemBase {
    id: string;
    amount: number;
    date: Date;
    description?: string;
}

export interface IncomeTransaction extends FinancialItemBase {
    type: FinancialTransactionType.Income;
    category?: IncomeCategory;
}

export interface OutcomeTransaction extends FinancialItemBase {
    type: FinancialTransactionType.Outcome;
    category?: OutcomeCategory;
}

export type FinancialTransaction = IncomeTransaction | OutcomeTransaction;
