"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileNav() {
    const pathname = usePathname();

    const navItems = [
        {
            href: "/",
            label: "Inicio",
            icon: Home,
        },
        {
            href: "/ventas",
            label: "Ventas",
            icon: DollarSign,
        },
        {
            href: "/inventario",
            label: "Inventario",
            icon: Package,
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 z-50 w-full bg-background border-t border-border pb-safe">
            <div className="flex h-16 items-center justify-around">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
                            )}
                        >
                            <Icon className={cn("h-6 w-6", isActive && "fill-current/20")} />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
