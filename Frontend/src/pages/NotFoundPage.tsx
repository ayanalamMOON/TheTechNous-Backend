import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { 
      duration: 0.4,
      ease: "easeIn" 
    }
  }
};

// Styled components
const PageContainer = styled.div`
  padding: 120px 0 60px;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 600px;
  width: 100%;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
`;

const ErrorTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const ErrorDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  padding: 0.8rem 1.8rem;
  background-color: var(--primary);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgba(var(--primary-rgb), 0.3);
    color: white;
  }
`;

const SecondaryButton = styled(Link)`
  padding: 0.8rem 1.8rem;
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    color: var(--text-primary);
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <PageContainer>
      <div className="container">
        <ContentWrapper
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <ErrorCode>404</ErrorCode>
          <ErrorTitle>Page Not Found</ErrorTitle>
          <ErrorDescription>
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </ErrorDescription>
          
          <ButtonContainer>
            <PrimaryButton to="/">
              <FiHome /> Go to Homepage
            </PrimaryButton>
            
            <SecondaryButton to="/blog">
              <FiArrowLeft /> Visit Blog
            </SecondaryButton>
          </ButtonContainer>
        </ContentWrapper>
      </div>
    </PageContainer>
  );
};

export default NotFoundPage;