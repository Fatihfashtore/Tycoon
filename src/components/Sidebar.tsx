import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  Home,
  Package,
  Store,
  TruckIcon,
  Banknote,
  BookOpen,
} from "lucide-react";

interface SidebarProps {
  isMobile?: boolean;
  activePage?: string;
  onNavigate?: (page: string) => void;
}

const Sidebar = ({
  isMobile = false,
  activePage = "Dashboard",
  onNavigate = () => {},
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", icon: "🏠", lucideIcon: <Home className="h-5 w-5" /> },
    {
      name: "Inventory",
      icon: "🎒",
      lucideIcon: <Package className="h-5 w-5" />,
    },
    { name: "Store", icon: "🏪", lucideIcon: <Store className="h-5 w-5" /> },
    {
      name: "Sell Products",
      icon: "🚚",
      lucideIcon: <TruckIcon className="h-5 w-5" />,
    },
    {
      name: "Send Coins",
      icon: "🏦",
      lucideIcon: <Banknote className="h-5 w-5" />,
    },
    {
      name: "Tutorial",
      icon: "📕",
      lucideIcon: <BookOpen className="h-5 w-5" />,
    },
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const renderNavigationItems = () => (
    <div className="flex flex-col space-y-1 w-full">
      {navigationItems.map((item) => (
        <Button
          key={item.name}
          variant={activePage === item.name ? "secondary" : "ghost"}
          className="justify-start w-full"
          onClick={() => handleNavigation(item.name)}
        >
          <span className="mr-3 text-lg">{item.icon}</span>
          {item.name}
        </Button>
      ))}
    </div>
  );

  // Mobile sidebar with sheet component
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-background w-64 p-4">
          <div className="flex flex-col h-full">
            <div className="py-4">
              <h2 className="text-lg font-semibold">Farm Tycoon</h2>
            </div>
            <Separator className="my-2" />
            {renderNavigationItems()}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop sidebar
  return (
    <div className="hidden md:flex flex-col h-full w-64 bg-background border-r p-4">
      <div className="py-4">
        <h2 className="text-lg font-semibold">Farm Tycoon</h2>
      </div>
      <Separator className="my-2" />
      {renderNavigationItems()}
    </div>
  );
};

export default Sidebar;
