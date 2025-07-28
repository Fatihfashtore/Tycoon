import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import Sidebar from "./Sidebar";
import AnimalPenGrid from "./AnimalPenGrid";

interface HomeProps {
  user: User;
}

const Home = ({ user }: HomeProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleNavigation = (page: string) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  // Get user data from metadata or use defaults
  const username = user.user_metadata?.username || "Farlen";
  const coins = user.user_metadata?.coins || 325;
  const level = user.user_metadata?.level || 3;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80"
            alt="Farm Tycoon Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="font-bold text-lg hidden sm:inline">
            Farm Tycoon
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-sm sm:text-base">Username: {username}</span>
            <span className="text-sm sm:text-base">💰 {coins}</span>
            <span className="text-sm sm:text-base">🔰 Level {level}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            🚪 Logout
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block w-64 border-r bg-white">
          <Sidebar activePage={activePage} onNavigate={handleNavigation} />
        </div>

        {/* Sidebar - Mobile */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 z-20"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar
              isMobile={true}
              activePage={activePage}
              onNavigate={handleNavigation}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto">
            {activePage === "Dashboard" && (
              <>
                <h1 className="text-2xl font-bold mb-6">
                  🏠 Dashboard - Your Animal Pens
                </h1>
                <AnimalPenGrid />
              </>
            )}
            {activePage === "Inventory" && (
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">🎒 Inventory</h1>
                <p className="text-gray-600">
                  Your inventory items will appear here.
                </p>
              </div>
            )}
            {activePage === "Store" && (
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">🏪 Store</h1>
                <p className="text-gray-600">
                  Browse and purchase items from the store.
                </p>
              </div>
            )}
            {activePage === "Sell Products" && (
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">🚚 Sell Products</h1>
                <p className="text-gray-600">Sell your farm products here.</p>
              </div>
            )}
            {activePage === "Send Coins" && (
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">🏦 Send Coins</h1>
                <p className="text-gray-600">Send coins to other players.</p>
              </div>
            )}
            {activePage === "Tutorial" && (
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">📕 Tutorial</h1>
                <p className="text-gray-600">Learn how to play Farm Tycoon.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white p-4 text-center text-sm text-gray-500">
        <p>Farm Tycoon v1.0 © 2025 | Your Ultimate Farming Experience</p>
      </footer>
    </div>
  );
};

export default Home;
