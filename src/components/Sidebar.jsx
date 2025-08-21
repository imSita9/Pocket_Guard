import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Receipt, 
  BarChart3, 
  AlertTriangle, 
  Settings, 
  Menu, 
  X
} from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: Receipt },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/fraud-alerts', label: 'Fraud Alerts', icon: AlertTriangle },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 }
  };

  return (
    <>
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleMobileMenu}
          className="rounded-full"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        <motion.aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 border-r bg-card md:static",
            isMobileMenuOpen ? "block" : "hidden md:block"
          )}
          variants={sidebarVariants}
          initial="hidden"
          animate={isMobileMenuOpen ? "visible" : "hidden"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex h-16 items-center border-b px-6">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1">
                <FaRupeeSign className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SmartSpend</span>
            </div>
          </div>
          <nav className="space-y-1 p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </motion.aside>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;