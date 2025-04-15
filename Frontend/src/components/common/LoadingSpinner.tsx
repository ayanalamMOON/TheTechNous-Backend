import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ripple = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.3),
                0 0 0 0.5em rgba(var(--primary-rgb), 0.3),
                0 0 0 1em rgba(var(--primary-rgb), 0.3);
  }
  100% {
    box-shadow: 0 0 0 0.5em rgba(var(--primary-rgb), 0.3),
                0 0 0 1em rgba(var(--primary-rgb), 0.3),
                0 0 0 1.5em rgba(var(--primary-rgb), 0);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SpinnerContainer = styled.div<{ size: string }>`
  position: relative;
  width: ${({ size }) => {
    switch (size) {
      case 'small': return '30px';
      case 'large': return '80px';
      default: return '50px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small': return '30px';
      case 'large': return '80px';
      default: return '50px';
    }
  }};
`;

const SpinnerOuter = styled.div<{ color: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: ${({ color }) => color};
  border-right-color: ${({ color }) => color};
  border-radius: 50%;
  animation: ${spin} 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
`;

const SpinnerInner = styled.div<{ color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 65%;
  height: 65%;
  transform: translate(-50%, -50%);
  border: 4px solid transparent;
  border-bottom-color: ${({ color }) => color};
  border-left-color: ${({ color }) => color};
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite reverse;
`;

const SpinnerCore = styled.div<{ color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15px;
  height: 15px;
  transform: translate(-50%, -50%);
  background-color: ${({ color }) => color};
  border-radius: 50%;
  animation: ${ripple} 1.7s ease-out infinite;
`;

const LoadingText = styled.div`
  font-family: var(--font-secondary);
  font-size: var(--font-size-sm);
  margin-top: 12px;
  color: var(--text-secondary);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  color = 'var(--primary)'
}) => {
  return (
    <SpinnerWrapper>
      <div className="text-center">
        <SpinnerContainer size={size}>
          <SpinnerOuter color={color} />
          <SpinnerInner color={color} />
          <SpinnerCore color={color} />
        </SpinnerContainer>
        <LoadingText>Loading...</LoadingText>
      </div>
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;