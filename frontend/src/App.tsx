import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import OnboardingPage from '@/pages/OnboardingPage';
import Dashboard from '@/pages/Dashboard';
import DestinationsPage from '@/pages/DestinationsPage';
import LoadingSpinner from '@/components/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen relative">
        <div className="aurora-bg">
          <div className="aurora-glow-1"></div>
          <div className="aurora-glow-2"></div>
        </div>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/auth"
            element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />}
          />

          {/* Protected Routes */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {user && !user.hasCompletedOnboarding ? (
                  <Navigate to="/onboarding" replace />
                ) : (
                  <Dashboard />
                )}
              </ProtectedRoute>
            }
          />

          {/* Placeholder routes for future features */}
          <Route
            path="/destinations"
            element={<DestinationsPage />}
          />
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-4xl font-display">My Trips - Coming Soon</h1>
                </div>
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-display mb-4">404</h1>
                  <p className="text-xl text-gray-400">Page not found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
