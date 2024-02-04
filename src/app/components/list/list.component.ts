import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { FinancialTransaction } from '../../models/transactions.models';
import { CurrencyPipe } from '@angular/common';
import { FilterTransactionsByTypePipe } from '../../pipes/transaction-type-filter';
import { TransactionType } from '../../models/transactions.enums';
import { Order } from '../../models/orders.enum';
import { SortTransactionsByAmountPipe } from '../../pipes/sort-transactions-by-amount.pipe';
import { FilterTransactionsByDescriptionPipe } from '../../pipes/filter-transactions-by-description.pipe';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [
        CurrencyPipe,
        FilterTransactionsByTypePipe,
        SortTransactionsByAmountPipe,
        FilterTransactionsByDescriptionPipe,
    ],
    template: `
        @for (transaction of transactionsList().reverse() |
        filterTransactionsByTypePipe: transactionsFilter() |
        sortTransactionsByAmount: transactionsOrder() |
        filterTransactionsByDescriptionPipe: transactionsSearch(); track $index)
        {

        <div class="transaction transaction-{{ transaction.type }}">
            <p class="transaction__label">{{ transaction.type }}</p>
            <div class="transaction__content">
                <h3>{{ transaction.amount | currency : 'EUR' }}</h3>
                <p class="transaction__date">
                    <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 14.385C7.79333 14.385 7.61333 14.3084 7.46 14.155C7.30667 14.0017 7.23 13.8217 7.23 13.615C7.23 13.4084 7.30667 13.2287 7.46 13.076C7.61333 12.9227 7.79333 12.846 8 12.846C8.20667 12.846 8.38667 12.9227 8.54 13.076C8.69333 13.2294 8.77 13.4094 8.77 13.616C8.77 13.822 8.69333 14.0017 8.54 14.155C8.38667 14.3084 8.20667 14.385 8 14.385ZM12 14.385C11.7933 14.385 11.6133 14.3084 11.46 14.155C11.3067 14.0017 11.23 13.8217 11.23 13.615C11.23 13.4084 11.3067 13.2287 11.46 13.076C11.6133 12.9227 11.7933 12.846 12 12.846C12.2067 12.846 12.3867 12.9227 12.54 13.076C12.6933 13.2294 12.77 13.4094 12.77 13.616C12.77 13.822 12.6933 14.0017 12.54 14.155C12.3867 14.3084 12.2067 14.385 12 14.385ZM16 14.385C15.7933 14.385 15.6133 14.3084 15.46 14.155C15.3067 14.0017 15.23 13.8217 15.23 13.615C15.23 13.4084 15.3067 13.2287 15.46 13.076C15.6133 12.9227 15.7933 12.846 16 12.846C16.2067 12.846 16.3867 12.9227 16.54 13.076C16.6933 13.2294 16.77 13.4094 16.77 13.616C16.77 13.822 16.6933 14.0017 16.54 14.155C16.3867 14.3084 16.2067 14.385 16 14.385ZM5.615 21.5C5.155 21.5 4.771 21.346 4.463 21.038C4.15433 20.7294 4 20.345 4 19.885V7.11502C4 6.65502 4.15433 6.27102 4.463 5.96302C4.771 5.65435 5.155 5.50002 5.615 5.50002H7.385V3.27002H8.462V5.50002H15.615V3.27002H16.615V5.50002H18.385C18.845 5.50002 19.229 5.65435 19.537 5.96302C19.8457 6.27102 20 6.65502 20 7.11502V19.885C20 20.345 19.846 20.729 19.538 21.037C19.2293 21.3457 18.845 21.5 18.385 21.5H5.615ZM5.615 20.5H18.385C18.5383 20.5 18.6793 20.436 18.808 20.308C18.936 20.1794 19 20.0384 19 19.885V11.115H5V19.885C5 20.0384 5.064 20.1794 5.192 20.308C5.32067 20.436 5.46167 20.5 5.615 20.5ZM5 10.115H19V7.11502C19 6.96169 18.936 6.82069 18.808 6.69202C18.6793 6.56402 18.5383 6.50002 18.385 6.50002H5.615C5.46167 6.50002 5.32067 6.56402 5.192 6.69202C5.064 6.82069 5 6.96169 5 7.11502V10.115Z"
                            fill="#818181"
                        />
                    </svg>
                    {{ transaction.date }}
                </p>
                <p class="transaction__category">
                    {{ transaction.description }}
                </p>
            </div>
            <button
                class="btn btn-danger"
                (click)="deleteTransaction(transaction)"
            >
                <svg
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M27.8438 6.70312H22.1719V5.15625C22.1719 4.47249 21.9003 3.81673 21.4168 3.33324C20.9333 2.84975 20.2775 2.57813 19.5938 2.57812H13.4062C12.7225 2.57812 12.0667 2.84975 11.5832 3.33324C11.0997 3.81673 10.8281 4.47249 10.8281 5.15625V6.70312H5.15625C5.0195 6.70312 4.88835 6.75745 4.79165 6.85415C4.69495 6.95085 4.64062 7.082 4.64062 7.21875C4.64062 7.3555 4.69495 7.48665 4.79165 7.58335C4.88835 7.68005 5.0195 7.73438 5.15625 7.73438H6.70312V26.8125C6.70312 27.2228 6.8661 27.6162 7.15619 27.9063C7.44629 28.1964 7.83974 28.3594 8.25 28.3594H24.75C25.1603 28.3594 25.5537 28.1964 25.8438 27.9063C26.1339 27.6162 26.2969 27.2228 26.2969 26.8125V7.73438H27.8438C27.9805 7.73438 28.1117 7.68005 28.2084 7.58335C28.305 7.48665 28.3594 7.3555 28.3594 7.21875C28.3594 7.082 28.305 6.95085 28.2084 6.85415C28.1117 6.75745 27.9805 6.70312 27.8438 6.70312ZM11.8594 5.15625C11.8594 4.74599 12.0223 4.35254 12.3124 4.06244C12.6025 3.77235 12.996 3.60938 13.4062 3.60938H19.5938C20.004 3.60938 20.3975 3.77235 20.6876 4.06244C20.9776 4.35254 21.1406 4.74599 21.1406 5.15625V6.70312H11.8594V5.15625ZM25.2656 26.8125C25.2656 26.9493 25.2113 27.0804 25.1146 27.1771C25.0179 27.2738 24.8868 27.3281 24.75 27.3281H8.25C8.11325 27.3281 7.9821 27.2738 7.8854 27.1771C7.7887 27.0804 7.73438 26.9493 7.73438 26.8125V7.73438H25.2656V26.8125ZM13.9219 13.4062V21.6562C13.9219 21.793 13.8676 21.9242 13.7709 22.0209C13.6742 22.1175 13.543 22.1719 13.4062 22.1719C13.2695 22.1719 13.1383 22.1175 13.0416 22.0209C12.9449 21.9242 12.8906 21.793 12.8906 21.6562V13.4062C12.8906 13.2695 12.9449 13.1383 13.0416 13.0416C13.1383 12.9449 13.2695 12.8906 13.4062 12.8906C13.543 12.8906 13.6742 12.9449 13.7709 13.0416C13.8676 13.1383 13.9219 13.2695 13.9219 13.4062ZM20.1094 13.4062V21.6562C20.1094 21.793 20.0551 21.9242 19.9584 22.0209C19.8617 22.1175 19.7305 22.1719 19.5938 22.1719C19.457 22.1719 19.3258 22.1175 19.2291 22.0209C19.1324 21.9242 19.0781 21.793 19.0781 21.6562V13.4062C19.0781 13.2695 19.1324 13.1383 19.2291 13.0416C19.3258 12.9449 19.457 12.8906 19.5938 12.8906C19.7305 12.8906 19.8617 12.9449 19.9584 13.0416C20.0551 13.1383 20.1094 13.2695 20.1094 13.4062Z"
                        fill="#D95A5A"
                    />
                </svg>
            </button>
        </div>
        }
    `,
})
export default class ListComponent {
    @Output() transactionToDelete = new EventEmitter<FinancialTransaction>();

    transactionsList = input.required<FinancialTransaction[]>();
    transactionsFilter = input.required<TransactionType | null>();
    transactionsOrder = input.required<Order | null>();
    transactionsSearch = input.required<string>();

    deleteTransaction(transaction: FinancialTransaction) {
        this.transactionToDelete.emit(transaction);
    }
}
