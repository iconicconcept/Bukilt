import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/booking/BookingModal";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container-custom py-8 animate-fade">
        {children}
      </main>
      <Footer />
      <BookingModal />
    </div>
  );
}
