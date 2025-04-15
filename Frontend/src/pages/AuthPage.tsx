import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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

const formVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
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
`;

const AuthContainer = styled(motion.div)`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: var(--background);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius);
  overflow: hidden;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
`;

const AuthImageSection = styled.div`
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 992px) {
    display: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") center center, linear-gradient(135deg, var(--primary), var(--secondary));
    opacity: 0.1;
    z-index: 0;
  }
`;

const ImageContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const ImageTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const ImageDescription = styled.p`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ImageIllustration = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  aspect-ratio: 1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath fill='white' fill-opacity='0.8' d='M30.913,118.302C21.481,134.405,27.298,156.86,44.346,166.292C61.393,175.724,87.483,170.572,104.574,156.757C121.664,142.943,129.755,120.467,115.184,107.28C100.613,94.093,40.344,102.2,30.913,118.302Z'/%3E%3Cpath fill='white' fill-opacity='0.6' d='M135.458,27.738C135.458,43.047,111.067,43.07,91.352,53.328C71.638,63.587,66.629,98.79,50.72,98.79C34.81,98.79,14.022,74.219,14.022,58.911C14.022,43.602,39.537,7,75,7C110.463,7,135.458,12.43,135.458,27.738Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
`;

const AuthFormSection = styled.div`
  padding: 3rem 2rem;
  
  @media (max-width: 576px) {
    padding: 2rem 1rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border);
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem;
  width: 50%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-primary)'};
  position: relative;
  transition: var(--transition);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary);
    transform: scaleX(${props => props.active ? '1' : '0'});
    transition: transform 0.3s ease;
  }
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.8rem;
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  background-color: var(--background);
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.5;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
`;

const PasswordIcon = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: var(--primary);
`;

const ForgotPassword = styled(Link)`
  color: var(--primary);
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 1rem;
  
  &:hover {
    background-color: var(--primary-light);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const OrSeparator = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--border);
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.8rem;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(var(--primary-rgb), 0.05);
    border-color: var(--primary);
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const BottomText = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  
  a {
    color: var(--primary);
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Handle form changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: name === 'rememberMe' ? checked : value
    });
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, call API endpoint
    console.log('Login submitted:', loginForm);
    alert('Login functionality will be implemented soon!');
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, call API endpoint
    console.log('Registration submitted:', registerForm);
    alert('Registration functionality will be implemented soon!');
  };
  
  return (
    <PageContainer>
      <div className="container">
        <AuthContainer
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <AuthImageSection>
            <ImageContent>
              <ImageTitle>Welcome to TheTechNous</ImageTitle>
              <ImageDescription>
                Join our community of tech enthusiasts and professionals to discover, share, and discuss the latest in technology.
              </ImageDescription>
              <ImageIllustration />
            </ImageContent>
          </AuthImageSection>
          
          <AuthFormSection>
            <TabContainer>
              <Tab 
                active={activeTab === 'login'} 
                onClick={() => setActiveTab('login')}
              >
                Login
              </Tab>
              <Tab 
                active={activeTab === 'register'} 
                onClick={() => setActiveTab('register')}
              >
                Register
              </Tab>
            </TabContainer>
            
            {activeTab === 'login' ? (
              <Form
                key="login-form"
                initial="hidden"
                animate="visible"
                variants={formVariants}
                onSubmit={handleLoginSubmit}
              >
                <FormGroup>
                  <InputLabel htmlFor="login-email">Email Address</InputLabel>
                  <InputWrapper>
                    <InputIcon><FiMail /></InputIcon>
                    <Input
                      type="email"
                      id="login-email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </InputWrapper>
                </FormGroup>
                
                <FormGroup>
                  <InputLabel htmlFor="login-password">Password</InputLabel>
                  <InputWrapper>
                    <InputIcon><FiLock /></InputIcon>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="login-password"
                      name="password"
                      placeholder="******"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required
                    />
                    <PasswordIcon 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </PasswordIcon>
                  </InputWrapper>
                </FormGroup>
                
                <FormActions>
                  <RememberMe>
                    <Checkbox 
                      type="checkbox" 
                      id="remember-me"
                      name="rememberMe"
                      checked={loginForm.rememberMe}
                      onChange={handleLoginChange}
                    />
                    <label htmlFor="remember-me">Remember me</label>
                  </RememberMe>
                  
                  <ForgotPassword to="/forgot-password">
                    Forgot password?
                  </ForgotPassword>
                </FormActions>
                
                <SubmitButton type="submit">Login</SubmitButton>
                
                <OrSeparator>Or continue with</OrSeparator>
                
                <SocialButtons>
                  <SocialButton type="button">
                    <FiGithub />
                    GitHub
                  </SocialButton>
                  <SocialButton type="button">
                    <FiTwitter />
                    Twitter
                  </SocialButton>
                </SocialButtons>
              </Form>
            ) : (
              <Form
                key="register-form"
                initial="hidden"
                animate="visible"
                variants={formVariants}
                onSubmit={handleRegisterSubmit}
              >
                <FormGroup>
                  <InputLabel htmlFor="register-name">Full Name</InputLabel>
                  <InputWrapper>
                    <InputIcon><FiUser /></InputIcon>
                    <Input
                      type="text"
                      id="register-name"
                      name="name"
                      placeholder="John Doe"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      required
                    />
                  </InputWrapper>
                </FormGroup>
                
                <FormGroup>
                  <InputLabel htmlFor="register-email">Email Address</InputLabel>
                  <InputWrapper>
                    <InputIcon><FiMail /></InputIcon>
                    <Input
                      type="email"
                      id="register-email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      required
                    />
                  </InputWrapper>
                </FormGroup>
                
                <FormGroup>
                  <InputLabel htmlFor="register-password">Password</InputLabel>
                  <InputWrapper>
                    <InputIcon><FiLock /></InputIcon>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="register-password"
                      name="password"
                      placeholder="******"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      required
                    />
                    <PasswordIcon 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </PasswordIcon>
                  </InputWrapper>
                </FormGroup>
                
                <FormGroup>
                  <InputLabel htmlFor="register-confirm-password">Confirm Password</InputLabel>
                  <InputWrapper>
                    <InputIcon><FiLock /></InputIcon>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      id="register-confirm-password"
                      name="confirmPassword"
                      placeholder="******"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                    />
                    <PasswordIcon 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </PasswordIcon>
                  </InputWrapper>
                </FormGroup>
                
                <SubmitButton 
                  type="submit"
                  disabled={registerForm.password !== registerForm.confirmPassword}
                >
                  Create Account
                </SubmitButton>
                
                <OrSeparator>Or register with</OrSeparator>
                
                <SocialButtons>
                  <SocialButton type="button">
                    <FiGithub />
                    GitHub
                  </SocialButton>
                  <SocialButton type="button">
                    <FiTwitter />
                    Twitter
                  </SocialButton>
                </SocialButtons>
              </Form>
            )}
            
            <BottomText>
              {activeTab === 'login' ? (
                <>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('register'); }}>Register now</a></>
              ) : (
                <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('login'); }}>Login now</a></>
              )}
            </BottomText>
          </AuthFormSection>
        </AuthContainer>
      </div>
    </PageContainer>
  );
};

export default AuthPage;