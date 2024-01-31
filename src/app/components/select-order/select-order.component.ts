import { Component, EventEmitter, Output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionType } from '../../models/transactions.enums';
import { Order } from '../../models/orders.enum';

@Component({
    selector: 'app-select-order',
    standalone: true,
    imports: [FormsModule],
    template: `
        <select
            [(ngModel)]="selectedOrder"
            (change)="onOrderChange(selectedOrder)"
        >
            <option [ngValue]="null">Insertion order</option>
            <option [value]="order.ASC">Ascendent</option>
            <option [value]="order.DESC">Descendent</option>
        </select>
    `,
})
export class SelectOrderComponent {
    @Output() orderSelected = new EventEmitter<Order | null>();
    transactionsOrder = input<Order | null>(null);

    order = Order;
    selectedOrder: Order | null = null;

    ngOnInit() {
        this.selectedOrder = this.transactionsOrder();
    }

    onOrderChange(order: Order | null) {
        this.selectedOrder = order;
        this.orderSelected.emit(this.selectedOrder);
    }
}
