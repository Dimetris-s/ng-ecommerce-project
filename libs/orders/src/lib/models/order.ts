import { User } from '@dmtrsprod/users';
import { OrderItem } from './order-item';

export interface Order {
    id?: string;
    orderItems?: OrderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: string;
    totalPrice?: string;
    user?: User;
    dateOrdered?: string;
}
