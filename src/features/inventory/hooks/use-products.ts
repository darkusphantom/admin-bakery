import { Product } from "../types";

const DUMMY_PRODUCTS: Product[] = [
    { id: "1", name: "Pan Francés", price: 0.50, stock: 120, category: "Panes" },
    { id: "2", name: "Croissant", price: 2.50, stock: 45, category: "Bollería" },
    { id: "3", name: "Pastel de Chocolate", price: 15.00, stock: 10, category: "Pasteles" },
    { id: "4", name: "Empanada de Queso", price: 3.00, stock: 30, category: "Salados" },
    { id: "5", name: "Café Americano", price: 2.00, stock: 1000, category: "Bebidas" },
];

export function useProducts() {
    // Simulating async data fetching
    const getProducts = async (): Promise<Product[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(DUMMY_PRODUCTS), 500);
        });
    };

    return {
        products: DUMMY_PRODUCTS, // Return direct data for initial render if needed, or use state
        getProducts,
    };
}
