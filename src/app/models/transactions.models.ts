import { TransactionType } from './transactions.enums';

export interface FinancialItemBase {
    id: string;
    amount: number;
    date: Date;
    description?: string;
}

export interface IncomeTransaction extends FinancialItemBase {
    type: TransactionType.Income;
    category?: string;
}

export interface OutcomeTransaction extends FinancialItemBase {
    type: TransactionType.Outcome;
    category: string;
}

export type FinancialTransaction = IncomeTransaction | OutcomeTransaction;
