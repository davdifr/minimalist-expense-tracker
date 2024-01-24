import { Component, EventEmitter, Output } from '@angular/core';
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
            <option [ngValue]="null">---</option>
            <option [value]="order.ASC">ASC</option>
            <option [value]="order.DESC">DESC</option>
        </select>
    `,
})
export class SelectOrderComponent {
    @Output() orderSelected = new EventEmitter<Order | null>();
    order = Order;
    selectedOrder: Order | null = null;

    onOrderChange(order: Order | null) {
        this.selectedOrder = order;
        this.orderSelected.emit(this.selectedOrder);
    }
}
