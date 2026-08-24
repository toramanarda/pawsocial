import "./globals.css";
import Sidebar from "@/components/navigation/Sidebar";
import RightUtility from "@/components/navigation/RightUtility";
import MobileNav from "@/components/navigation/MobileNav";

export const metadata = {
  title: "Doggo Social",
  description: "A thoughtful social space for dogs and their humans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#eff3f4]">
          <div className="max-w-[1240px] mx-auto min-h-screen flex justify-center bg-white shadow-doggo md:border-x border-line">
            {/* Sol Masaüstü Menü */}
            <Sidebar />

            {/* Orta Feed Alanı */}
            <div className="flex-1 flex flex-col min-w-0 max-w-[620px] border-r border-line pb-16 md:pb-0">
              <main className="flex-1 min-h-screen bg-white">
                {children}
              </main>
            </div>

            {/* Sağ Masaüstü Panel */}
            <RightUtility />
          </div>

          {/* Mobil Alt Navigasyon */}
          <MobileNav />
        </div>
      </body>
    </html>
  );
}