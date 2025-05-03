import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'        // ← 다시 import
import Wallet from './pages/Wallet'
import Balance from './pages/Balance'
import Dashboard from './pages/Dashboard'
import Survey from './pages/Survey'
import Stocks from './pages/Stocks'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup />} />
+     <Route path="/login" element={<Login />} />   {/* ← 로그인 페이지 라우트 추가 */}
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/balance" element={<Balance />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/stocks" element={<Stocks />} />
    </Routes>
  )
}

export default App
