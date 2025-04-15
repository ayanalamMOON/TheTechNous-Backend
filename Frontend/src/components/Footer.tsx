import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiArrowRight, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background-color: var(--background);
  padding: 4rem 0 2rem;
  border-top: 1px solid var(--border);
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterBrand = styled.div`
  @media (max-width: 992px) {
    grid-column: span 2;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const FooterLogo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-secondary);
  display: inline-block;
  margin-bottom: 1rem;
  
  span {
    color: var(--primary);
  }
`;

const FooterDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  max-width: 25rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  background-color: rgba(var(--primary-rgb), 0.1);
  transition: var(--transition);
  
  &:hover {
    background-color: var(--primary);
    color: white;
    transform: translateY(-3px);
  }
`;

const FooterColumn = styled.div``;

const FooterColumnTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 2.5rem;
    height: 2px;
    background-color: var(--primary);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  transition: var(--transition);
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--primary);
    transform: translateX(3px);
  }
`;

const FooterContactItem = styled.div`
  margin-bottom: 1rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--primary);
    flex-shrink: 0;
  }
`;

const NewsletterForm = styled.form`
  margin-top: 1rem;
`;

const NewsletterInput = styled.div`
  position: relative;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  background-color: var(--background);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const SubmitButton = styled(motion.button)`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--primary);
  color: white;
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--primary-light);
  }
`;

const FormHelperText = styled.p<{ error?: boolean }>`
  font-size: 0.85rem;
  margin-top: 0.5rem;
  color: ${props => props.error ? 'var(--danger)' : 'var(--success)'};
`;

const FooterBottom = styled.div`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const FooterCopyright = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterBottomLink = styled(Link)`
  color: var(--text-secondary);
  font-size: 0.9rem;
  
  &:hover {
    color: var(--primary);
  }
`;

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    // Simulate success
    setSubscribed(true);
    setError('');
    setEmail('');
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };
  
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterBrand>
            <FooterLogo to="/">
              The<span>Tech</span>Nous
            </FooterLogo>
            <FooterDescription>
              TheTechNous is a platform for tech enthusiasts to share knowledge, connect, and stay updated with the latest in technology and digital innovation.
            </FooterDescription>
            <SocialLinks>
              <SocialLink href="https://github.com" target="_blank" aria-label="GitHub">
                <FiGithub size={20} />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" aria-label="Twitter">
                <FiTwitter size={20} />
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterBrand>
          
          <FooterColumn>
            <FooterColumnTitle>Quick Links</FooterColumnTitle>
            <FooterLinks>
              <FooterLinkItem>
                <FooterLink to="/">Home</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/blog">Blog</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/about">About Us</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/contact">Contact</FooterLink>
              </FooterLinkItem>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterColumnTitle>Resources</FooterColumnTitle>
            <FooterLinks>
              <FooterLinkItem>
                <FooterLink to="/resources">Documentation</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/faq">FAQ & Support</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/tutorials">Tutorials</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/community">Community</FooterLink>
              </FooterLinkItem>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterColumnTitle>Newsletter</FooterColumnTitle>
            <FooterDescription>
              Subscribe to our newsletter to receive updates and valuable tech content.
            </FooterDescription>
            
            <NewsletterForm onSubmit={handleSubmit}>
              <NewsletterInput>
                <FormInput
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <SubmitButton 
                  type="submit" 
                  whileTap={{ scale: 0.9 }}
                  aria-label="Subscribe to newsletter"
                >
                  <FiArrowRight size={16} />
                </SubmitButton>
              </NewsletterInput>
              
              {error && <FormHelperText error>{error}</FormHelperText>}
              {subscribed && <FormHelperText>Thank you for subscribing!</FormHelperText>}
            </NewsletterForm>
            
            <FooterContactItem>
              <FiMail size={16} />
              contact@thetechnous.com
            </FooterContactItem>
          </FooterColumn>
        </FooterContent>
        
        <FooterBottom>
          <FooterCopyright>
            © {new Date().getFullYear()} TheTechNous. All rights reserved.
          </FooterCopyright>
          
          <FooterBottomLinks>
            <FooterBottomLink to="/privacy">Privacy Policy</FooterBottomLink>
            <FooterBottomLink to="/terms">Terms of Service</FooterBottomLink>
            <FooterBottomLink to="/cookies">Cookie Policy</FooterBottomLink>
          </FooterBottomLinks>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer;