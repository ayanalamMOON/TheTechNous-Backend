import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GlobalStyles } from './globalStyles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy-loaded pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default App;