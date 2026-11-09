export const metadata = {
  title: "Amanuro Stays | Operations & Partner Portal",
  description: "Operations, Resident Database, Advance Deposits, and Expense Management for Amanuro Stays.",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="portal-theme min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500/20 selection:text-amber-300">
      {children}
    </div>
  );
}
