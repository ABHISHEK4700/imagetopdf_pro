import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Conversion Studio', path: '/conversion-studio', icon: 'FileImage' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-fixed bg-background/95 backdrop-blur-brand border-b border-border transition-brand ${
        isScrolled ? 'shadow-brand' : ''
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link 
              to="/homepage" 
              className="flex items-center space-x-3 hover-lift"
              onClick={closeMobileMenu}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-depth-1 rounded-lg flex items-center justify-center shadow-brand">
                  <Icon name="FileImage" size={24} color="white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={10} color="white" strokeWidth={3} />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-brand-headline text-xl font-bold text-foreground">
                  ImageToPDF Pro
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Digital Craftsmanship
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-brand hover-lift ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-conversion'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Icon name={item.icon} size={18} strokeWidth={2} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Shield"
              iconPosition="left"
              className="text-sm"
            >
              Security
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Zap"
              iconPosition="left"
              className="cta-primary"
            >
              Start Converting
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="relative"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                strokeWidth={2}
              />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border shadow-brand animate-slide-down">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-brand ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground shadow-conversion'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon name={item.icon} size={20} strokeWidth={2} />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile CTA Section */}
              <div className="pt-4 border-t border-border space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Shield"
                  iconPosition="left"
                  onClick={closeMobileMenu}
                >
                  Security Features
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="Zap"
                  iconPosition="left"
                  className="cta-primary"
                  onClick={closeMobileMenu}
                >
                  Start Converting Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trust Indicators Bar */}
      <div className="hidden lg:block bg-surface/50 border-t border-border">
        <div className="px-8 py-2">
          <div className="flex items-center justify-center space-x-8 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} color="var(--color-success)" />
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} color="var(--color-success)" />
              <span>Auto-delete in 24h</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={14} color="var(--color-success)" />
              <span>2.5M+ conversions this month</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={14} color="var(--color-warning)" />
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;