// src/components/Header.test.tsx
// Move mocks to a separate file or section
/// <reference types="jest" />
import '@testing-library/jest-dom';

const mockNextLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href}>{children}</a>
);

const mockCartIcon = () => <div data-testid="cart-icon">Cart Icon</div>;

// Setup mocks
jest.mock('next/link', () => mockNextLink);
jest.mock('./CartIcon', () => mockCartIcon);

import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  // Setup common test data
  const navigationLinks = ['Товары', 'Категории', 'Акции'];
  
  // Setup function to reduce duplication
  const setupHeader = () => {
    return render(<Header />);
  };

  beforeEach(() => {
    // Clean up between tests if needed
    jest.clearAllMocks();
  });

  test('should render with correct header class', () => {
    setupHeader();
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header');
  });

  test('should render logo', () => {
    setupHeader();
    expect(screen.getByText('MyStore')).toBeInTheDocument();
  });

  test('should render all navigation links', () => {
    setupHeader();
    navigationLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });

  describe('Mobile Menu', () => {
    test('should initially have navigation links visible', () => {
      setupHeader();
      expect(screen.getByText(navigationLinks[0])).toBeInTheDocument();
    });

    test('should show additional menu items when mobile menu is toggled', () => {
      setupHeader();
      const menuButton = screen.getByText('Меню');
      
      fireEvent.click(menuButton);
      
      const visibleLinks = screen.getAllByText(navigationLinks[0]);
      expect(visibleLinks.length).toBeGreaterThan(1);
    });
  });
});


