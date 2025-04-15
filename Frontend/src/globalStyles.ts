import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Colors - Light Theme (default) */
    --primary: #3a86ff;
    --primary-light: #5a97ff;
    --primary-dark: #2970e0;
    --primary-rgb: 58, 134, 255;
    
    --secondary: #8338ec;
    --secondary-rgb: 131, 56, 236;
    
    --success: #2ecc71;
    --warning: #f39c12;
    --danger: #e74c3c;
    --info: #3498db;
    
    /* Font Families */
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    --font-secondary: 'Poppins', sans-serif;
    --font-mono: 'Fira Code', 'Courier New', monospace;
    
    /* Spacing Variables */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-xxl: 3rem;
    
    /* Border Radius */
    --border-radius: 0.5rem;
    --border-radius-lg: 1rem;
    --border-radius-sm: 0.25rem;
    --border-radius-full: 9999px;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    
    /* Transitions */
    --transition: all 0.3s ease;
    --transition-fast: all 0.15s ease;
    --transition-slow: all 0.5s ease;
    
    /* Base font size */
    --base-font-size: 16px;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    --font-size-5xl: 3rem;
    
    /* Z-index layers */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
    
    /* Container max widths */
    --container-max-sm: 540px;
    --container-max-md: 720px;
    --container-max-lg: 960px;
    --container-max-xl: 1140px;
    --container-max-2xl: 1320px;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: var(--font-primary);
    font-size: var(--base-font-size);
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--background);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    scroll-behavior: smooth;
    scroll-padding-top: 100px;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-secondary);
    margin-bottom: 1rem;
    line-height: 1.2;
    color: var(--text-primary);
  }
  
  h1 {
    font-size: var(--font-size-5xl);
  }
  
  h2 {
    font-size: var(--font-size-4xl);
  }
  
  h3 {
    font-size: var(--font-size-3xl);
  }
  
  h4 {
    font-size: var(--font-size-2xl);
  }
  
  h5 {
    font-size: var(--font-size-xl);
  }
  
  h6 {
    font-size: var(--font-size-lg);
  }
  
  a {
    text-decoration: none;
    color: var(--primary);
    transition: var(--transition);
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  
  button {
    cursor: pointer;
  }
  
  button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  /* Container classes */
  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  
  @media (min-width: 576px) {
    .container {
      max-width: var(--container-max-sm);
    }
  }
  
  @media (min-width: 768px) {
    .container {
      max-width: var(--container-max-md);
    }
  }
  
  @media (min-width: 992px) {
    .container {
      max-width: var(--container-max-lg);
    }
  }
  
  @media (min-width: 1200px) {
    .container {
      max-width: var(--container-max-xl);
    }
  }
  
  @media (min-width: 1400px) {
    .container {
      max-width: var(--container-max-2xl);
    }
  }
  
  /* Utility classes */
  .text-center {
    text-align: center;
  }
  
  .text-left {
    text-align: left;
  }
  
  .text-right {
    text-align: right;
  }
  
  .text-primary {
    color: var(--primary);
  }
  
  .text-secondary {
    color: var(--secondary);
  }
  
  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-3 { margin-top: 1rem; }
  .mt-4 { margin-top: 1.5rem; }
  .mt-5 { margin-top: 2rem; }
  
  .mb-1 { margin-bottom: 0.25rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-3 { margin-bottom: 1rem; }
  .mb-4 { margin-bottom: 1.5rem; }
  .mb-5 { margin-bottom: 2rem; }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--background-secondary);
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--text-secondary);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--text-primary);
  }
  
  /* Focus styles */
  :focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  
  /* Page transitions */
  .page-transition-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  
  .page-transition-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }
  
  .page-transition-exit {
    opacity: 1;
  }
  
  .page-transition-exit-active {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 300ms, transform 300ms;
  }
`;

export default GlobalStyles;