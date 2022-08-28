import { Category } from './category.model';

export interface Product {
    id?: string;
    name?: string;
    image?: string;
    price?: number;
    brand?: string;
    description: string;
    countInStock?: number;
    category?: Category;
    dateCreated?: string;
    images?: string[];
    numReviews?: number;
    rating?: number;
    richDescription?: string;
    isFeatured?: boolean;
}
