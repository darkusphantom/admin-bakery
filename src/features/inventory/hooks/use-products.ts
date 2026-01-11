import { Product } from "../types";

const DUMMY_PRODUCTS: Product[] = [
    { id: "1", name: "Pan Francés", price: 0.50, stock: 120, category: "Panes" },
    { id: "2", name: "Croissant", price: 2.50, stock: 45, category: "Bollería" },
    { id: "3", name: "Pastel de Chocolate", price: 15.00, stock: 10, category: "Pasteles" },
    { id: "4", name: "Empanada de Queso", price: 3.00, stock: 30, category: "Salados" },
    { id: "5", name: "Café Americano", price: 2.00, stock: 1000, category: "Bebidas" },
];

import { supabase } from "@/lib/supabase/client";

export function useProducts() {
    const getProducts = async (): Promise<Product[]> => {
        try {
            const { data, error } = await supabase.from("products").select("*");

            if (error) {
                console.warn("Supabase error (using dummy data):", error.message);
                return DUMMY_PRODUCTS;
            }

            if (!data || data.length === 0) {
                console.warn("No data in Supabase (using dummy data)");
                return DUMMY_PRODUCTS;
            }

            return data as Product[];
        } catch (err) {
            console.error("Connection failed (using dummy data):", err);
            return DUMMY_PRODUCTS;
        }
    };

    return {
        products: DUMMY_PRODUCTS, // Initial render fallback
        getProducts,
    };
}
