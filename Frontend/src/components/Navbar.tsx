import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiSearch, FiBell } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const NavbarContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: var(--background);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  height: 80px;
  display: flex;
  align-items: center;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-secondary);
  
  span {
    color: var(--primary);
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-primary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  position: relative;
  font-size: 1.05rem;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: var(--primary);
    transform: scaleX(${props => props.active ? '1' : '0'});
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--primary);
    
    &::after {
      transform: scaleX(1);
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: var(--text-primary);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  
  &:hover {
    background-color: rgba(var(--primary-rgb), 0.1);
    color: var(--primary);
  }
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background-color: var(--danger);
  border-radius: 50%;
`;

const AuthButton = styled(Link)`
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  background-color: var(--primary);
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--primary-light);
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: var(--text-primary);
  border: none;
  cursor: pointer;
  display: none;
  transition: var(--transition);
  
  @media (max-width: 992px) {
    display: flex;
  }
  
  &:hover {
    background-color: rgba(var(--primary-rgb), 0.1);
    color: var(--primary);
  }
`;

const menuAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background-color: var(--background);
  padding: 1rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 999;
`;

const MobileNavLink = styled(Link)<{ active?: boolean }>`
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-primary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(var(--primary-rgb), 0.1);
    color: var(--primary);
  }
`;

const SearchContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1100;
  padding-top: 120px;
`;

const SearchInputContainer = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  background-color: var(--background);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  font-size: 1.1rem;
  color: var(--text-primary);
  background-color: var(--background);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.2);
  }
`;

const SearchResults = styled.div`
  margin-top: 1rem;
  max-height: 400px;
  overflow-y: auto;
`;

const SearchResultItem = styled(Link)`
  display: block;
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(var(--primary-rgb), 0.1);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const UserMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: var(--background);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius);
  padding: 1rem 0;
  z-index: 1000;
  margin-top: 0.5rem;
`;

const UserMenuItem = styled(Link)`
  display: block;
  padding: 0.8rem 1rem;
  color: var(--text-primary);
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(var(--primary-rgb), 0.1);
    color: var(--primary);
  }
`;

const UserMenuButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.8rem 1rem;
  color: var(--text-primary);
  background: none;
  border: none;
  transition: var(--transition);
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: rgba(var(--primary-rgb), 0.1);
    color: var(--primary);
  }
`;

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Demo purpose, would be from auth context
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Check if route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  const toggleSearch = () => {
    setSearchOpen(prev => !prev);
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(prev => !prev);
  };
  
  // For demo purpose, simulating login/logout
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserMenuOpen(false);
  };
  
  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('#user-menu') && !target.closest('#user-button')) {
          setUserMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Close search on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchOpen]);
  
  return (
    <>
      <NavbarContainer style={{ 
        backgroundColor: scrolled ? 'var(--background)' : 'var(--background)',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
      }}>
        <div className="container">
          <NavbarContent>
            <Logo to="/">
              The<span>Tech</span>Nous
            </Logo>
            
            <NavLinks>
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  active={isActive(link.path)}
                >
                  {link.name}
                </NavLink>
              ))}
            </NavLinks>
            
            <NavActions>
              <ActionButton onClick={toggleSearch} aria-label="Search">
                <FiSearch size={20} />
              </ActionButton>
              
              {isLoggedIn ? (
                <>
                  <ActionButton aria-label="Notifications">
                    <FiBell size={20} />
                    <NotificationDot />
                  </ActionButton>
                  
                  <ActionButton 
                    id="user-button"
                    onClick={toggleUserMenu} 
                    aria-label="User menu"
                  >
                    <FiUser size={20} />
                  </ActionButton>
                </>
              ) : (
                <AuthButton to="/auth">
                  <FiUser size={18} />
                  Sign In
                </AuthButton>
              )}
              
              <ActionButton onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
              </ActionButton>
              
              <MobileMenuButton 
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </MobileMenuButton>
            </NavActions>
          </NavbarContent>
        </div>
      </NavbarContainer>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <MobileNavLink 
                key={link.path} 
                to={link.path} 
                active={isActive(link.path)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </MobileNavLink>
            ))}
            
            {!isLoggedIn && (
              <MobileNavLink to="/auth" onClick={handleLogin}>
                Sign In / Register
              </MobileNavLink>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
      
      {/* User Menu */}
      <AnimatePresence>
        {userMenuOpen && (
          <UserMenu
            id="user-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{ right: '90px' }}
          >
            <UserMenuItem to="/profile">
              Profile
            </UserMenuItem>
            <UserMenuItem to="/dashboard">
              Dashboard
            </UserMenuItem>
            <UserMenuItem to="/settings">
              Settings
            </UserMenuItem>
            <UserMenuButton onClick={handleLogout}>
              Logout
            </UserMenuButton>
          </UserMenu>
        )}
      </AnimatePresence>
      
      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <SearchContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSearchOpen(false);
              }
            }}
          >
            <SearchInputContainer
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
            >
              <SearchInput 
                type="text" 
                placeholder="Search for articles, topics, or authors..." 
                autoFocus
              />
              
              {/* Demo search results */}
              <SearchResults>
                <SearchResultItem to="/blog/1">
                  The Future of Web Development: Trends in 2025
                </SearchResultItem>
                <SearchResultItem to="/blog/2">
                  Building Scalable Backend Solutions with Modern Architectures
                </SearchResultItem>
                <SearchResultItem to="/blog/3">
                  Machine Learning in Everyday Applications: Practical Examples
                </SearchResultItem>
              </SearchResults>
            </SearchInputContainer>
          </SearchContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;