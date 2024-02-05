import { TransactionType } from './transactions.enums';

export interface FinancialItemBase {
    id: string;
    amount: number;
    date: Date;
    description?: string;
}

export interface IncomeTransaction extends FinancialItemBase {
    type: TransactionType.INCOME;
    category?: string;
}

export interface OutcomeTransaction extends FinancialItemBase {
    type: TransactionType.OUTCOME;
    category?: string;
}

export type FinancialTransaction = IncomeTransaction | OutcomeTransaction;

export interface TransactionIOData {
    transactions: FinancialTransaction[];
    totals: {
        income: number;
        outcome: number;
    };
}
