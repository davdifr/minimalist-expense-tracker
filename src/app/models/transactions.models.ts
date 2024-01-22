import { IncomeCategory, OutcomeCategory } from './categories.enums';

export type TransactionType = 'income' | 'outcome';
export type TransactionOperation = 'add' | 'remove';

export interface FinancialItemBase {
    id: string;
    amount: number;
    date: Date;
    description?: string;
}

export interface IncomeTransaction extends FinancialItemBase {
    type: 'income';
    category?: IncomeCategory;
}

export interface OutcomeTransaction extends FinancialItemBase {
    type: 'outcome';
    category?: OutcomeCategory;
}

export type FinancialTransaction = IncomeTransaction | OutcomeTransaction;
