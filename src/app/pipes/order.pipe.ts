import { Pipe, PipeTransform } from '@angular/core';
import { FinancialTransaction } from '../models/transactions.models';
import { Order } from '../models/orders.enum';

@Pipe({
    name: 'order',
    standalone: true,
})
export class OrderPipe implements PipeTransform {
    transform(
        list: FinancialTransaction[],
        order: Order | null
    ): FinancialTransaction[] {
        if (!list || !order) {
            return list;
        }

        return list.sort((a, b) => {
            if (order === Order.ASC) {
                return a.amount - b.amount;
            } else {
                return b.amount - a.amount;
            }
        });
    }
}
