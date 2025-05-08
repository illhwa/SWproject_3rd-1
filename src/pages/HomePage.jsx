import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>맞춤형 주식 및 코인 추천 서비스</h1>
          <p>당신의 투자 성향에 맞는 최적의 주식과 코인을 발견하세요.</p>
          <div className="hero-buttons">
            <Link to="/survey" className="primary-btn">설문 시작하기</Link>
            <Link to="/register" className="secondary-btn">회원가입</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <i className="fas fa-chart-line"></i>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>주요 기능</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-clipboard-list"></i></div>
            <h3>맞춤형 설문조사</h3>
            <p>간단한 설문을 통해 당신의 투자 성향을 분석합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-chart-pie"></i></div>
            <h3>AI 주식 추천</h3>
            <p>당신의 성향에 맞는 최적의 주식을 AI가 추천해드립니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-coins"></i></div>
            <h3>AI 코인 추천</h3>
            <p>당신의 성향에 맞는 최적의 코인을 AI가 추천해드립니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-wallet"></i></div>
            <h3>가상 지갑</h3>
            <p>추천 받은 주식과 코인의 성과를 모니터링하세요.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-chart-bar"></i></div>
            <h3>자산 보기</h3>
            <p>실시간으로 자산 현황을 확인해보세요.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;