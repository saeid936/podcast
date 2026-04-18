import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './client/theme';
import MainLayout from './client/components/layout/MainLayout';
import Dashboard from './client/pages/Dashboard';
import Upload from './client/pages/Upload';
import Login from './client/pages/Login';
import Register from './client/pages/Register';
import Discover from './client/pages/Discover';
import Library from './client/pages/Library';
import PlaylistDetail from './client/pages/PlaylistDetail';
import { AnimatePresence, motion } from 'motion/react';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth Routes (No Sidebar/Player) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main App Routes (With Sidebar & Player) */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Dashboard />
              </PageWrapper>
            }
          />
          <Route
            path="/discover"
            element={
              <PageWrapper>
                <Discover />
              </PageWrapper>
            }
          />
          <Route
            path="/library"
            element={
              <PageWrapper>
                <Library />
              </PageWrapper>
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <PageWrapper>
                <PlaylistDetail />
              </PageWrapper>
            }
          />
          <Route
            path="/upload"
            element={
              <PageWrapper>
                <Upload />
              </PageWrapper>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
