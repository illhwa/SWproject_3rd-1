import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">StockAdvisor</Link>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item"><Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>대시보드</Link></li>
          <li className="nav-item"><Link to="/survey" className="nav-link" onClick={() => setMenuOpen(false)}>설문조사</Link></li>
          <li className="nav-item"><Link to="/recommendations" className="nav-link" onClick={() => setMenuOpen(false)}>주식 추천</Link></li>
          <li className="nav-item"><Link to="/wallet" className="nav-link" onClick={() => setMenuOpen(false)}>내 지갑</Link></li>
        </ul>

        <div className="nav-auth">
          {user && user.name ? (
            <div className="user-menu">
              <span className="user-name">{user.name}님</span>
              <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">로그인</Link>
              <Link to="/register" className="register-btn">회원가입</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;