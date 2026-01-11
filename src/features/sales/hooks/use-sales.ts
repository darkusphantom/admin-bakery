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

import { supabase } from "@/lib/supabase/client";

export function useSales() {
    const getSales = async (): Promise<Sale[]> => {
        try {
            const { data, error } = await supabase.from("sales").select("*");

            if (error) {
                console.warn("Supabase error (using dummy data):", error.message);
                return DUMMY_SALES;
            }

            if (!data || data.length === 0) {
                console.warn("No data in Supabase (using dummy data)");
                return DUMMY_SALES;
            }

            // Convert DB types if necessary
            return data.map((item: any) => ({
                ...item,
                createdAt: new Date(item.created_at)
            })) as Sale[];
        } catch (err) {
            console.error("Connection failed (using dummy data):", err);
            return DUMMY_SALES;
        }
    };

    return {
        sales: DUMMY_SALES,
        getSales,
    };
}
