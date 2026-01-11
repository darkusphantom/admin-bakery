import MobileNav from "@/components/shared/mobile-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen bg-background">
            <main className="pb-20">
                {/* pb-20 añade padding-bottom para que el contenido no quede detrás del MobileNav (h-16 + extra) */}
                {children}
            </main>
            <MobileNav />
        </div>
    );
}
