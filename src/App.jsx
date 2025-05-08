// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SurveyPage from './pages/SurveyPage';
import WalletPage from './pages/WalletPage';
import CoinRecommendationsPage from './pages/CoinRecommendationsPage';
import AssetsPage from './pages/AssetsPage';
import NotFoundPage from './pages/NotFoundPage';

// ✅ 로컬 스토리지에 토큰이 있는지 확인하여 로그인 상태 결정
const isAuthenticated = !!localStorage.getItem('token');

// ✅ 인증이 필요한 페이지 보호 컴포넌트
const ProtectedRoute = ({ element }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
      <Route path="/survey" element={<ProtectedRoute element={<SurveyPage />} />} />
      <Route path="/wallet" element={<ProtectedRoute element={<WalletPage />} />} />
      <Route path="/coin-recommendations" element={<ProtectedRoute element={<CoinRecommendationsPage />} />} />
      <Route path="/assets" element={<ProtectedRoute element={<AssetsPage />} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;