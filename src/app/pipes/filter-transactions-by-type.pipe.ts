import { Pipe, PipeTransform } from '@angular/core';
import { FinancialTransaction } from '../models/transactions.models';
import { TransactionType } from '../models/transactions.enums';

@Pipe({
    name: 'filterTransactionsByTypePipe',
    standalone: true,
})
export class FilterTransactionsByTypePipe implements PipeTransform {
    transform(
        list: FinancialTransaction[],
        type: TransactionType | null
    ): FinancialTransaction[] {
        return list.filter((t) => t.type === type || type === null);
    }
}
