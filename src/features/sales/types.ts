export interface Sale {
    id: string;
    total: number;
    createdAt: Date;
    items: SaleItem[];
}

export interface SaleItem {
    productId: string;
    quantity: number;
    price: number;
}
