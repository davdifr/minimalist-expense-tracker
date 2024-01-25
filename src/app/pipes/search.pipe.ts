import { Pipe, PipeTransform } from '@angular/core';
import { FinancialTransaction } from '../models/transactions.models';

@Pipe({
    name: 'search',
    standalone: true,
})
export class SearchPipe implements PipeTransform {
    transform(
        list: FinancialTransaction[],
        text: string
    ): FinancialTransaction[] {
        if (!text) {
            return list;
        }

        return list.filter((transaction) =>
            transaction.description?.toLowerCase().includes(text.toLowerCase())
        );
    }
}
