// src/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import CartIcon from './CartIcon';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

interface NavItem {
  href: string;
  label: string;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link 
    href={href} 
    className="header-link px-4 py-2 hover:bg-opacity-20 rounded transition-colors font-medium"
  >
    {children}
  </Link>
);

const DesktopNav = ({ navLinks }: { navLinks: NavItem[] }) => (
  <div className="hidden md:flex items-center space-x-4">
    {navLinks.map(({ href, label }) => (
      <NavLink key={href} href={href}>
        {label}
      </NavLink>
    ))}
  </div>
);

const MobileNav = ({ 
  isOpen, 
  navLinks 
}: { 
  isOpen: boolean; 
  navLinks: NavItem[] 
}) => (
  isOpen && (
    <div className="md:hidden py-2">
      <div className="flex flex-col space-y-2">
        {navLinks.map(({ href, label }) => (
          <NavLink key={href} href={href}>
            {label}
          </NavLink>
        ))}
        <div className="md:hidden">
          <CartIcon />
        </div>
      </div>
    </div>
  )
);

const MobileMenuButton = ({ 
  onClick 
}: { 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className="md:hidden px-3 py-2 btn btn-secondary rounded-md"
    aria-label="Открыть меню"
  >
    Меню
  </button>
);

const Logo = () => (
  <Link 
    href="/" 
    className="text-xl font-bold text-white hover:text-gray-100 transition-colors"
  >
    MyStore
  </Link>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavItem[] = [
    { href: '/products', label: 'Товары' },
    { href: '/categories', label: 'Категории' },
    { href: '/sales', label: 'Акции' },
  ];

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header className="fixed top-0 left-0 right-0 header shadow-md z-10 border-b border-blue-700">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <div className="flex items-center">
            <DesktopNav navLinks={navLinks} />
            <div className="hidden md:block ml-4">
              <CartIcon />
            </div>
          </div>
          <MobileMenuButton onClick={toggleMenu} />
        </div>
        <MobileNav isOpen={isMenuOpen} navLinks={navLinks} />
      </nav>
    </header>
  );
};

export default Header;



