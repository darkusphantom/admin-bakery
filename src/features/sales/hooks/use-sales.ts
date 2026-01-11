import { Sale } from "../types";

const DUMMY_SALES: Sale[] = [
    {
        id: "sale-001",
        total: 10.50,
        createdAt: new Date("2023-10-25T08:30:00"),
        items: [
            { productId: "1", quantity: 5, price: 0.50 },
            { productId: "5", quantity: 2, price: 4.00 }, // 2x2.00
        ]
    },
    {
        id: "sale-002",
        total: 5.00,
        createdAt: new Date("2023-10-25T09:15:00"),
        items: [
            { productId: "2", quantity: 2, price: 2.50 },
        ]
    },
];

export function useSales() {
    const getSales = async (): Promise<Sale[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(DUMMY_SALES), 500);
        });
    };

    return {
        sales: DUMMY_SALES,
        getSales,
    };
}
