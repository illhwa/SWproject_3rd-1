import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    completedSurvey: false,
    hasRecommendations: false,
    walletValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('인증 토큰이 없습니다');
        const response = await axios.get('/api/user/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <div className="loading">로딩 중...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>환영합니다, {userData.name || '투자자'}님!</h1>
        <p>오늘의 투자를 시작해보세요.</p>
      </div>

      <div className="dashboard-cards">
        {/* 설문 */}
        <div className="dashboard-card">
          <div className="card-icon"><i className="fas fa-clipboard-list"></i></div>
          <div className="card-content">
            <h2>투자 성향 설문</h2>
            <p>{userData.completedSurvey ? '설문을 완료했습니다.' : '투자 성향을 파악하기 위한 설문을 완료하세요.'}</p>
            <Link to="/survey" className={`card-button ${userData.completedSurvey ? 'secondary' : 'primary'}`}>
              {userData.completedSurvey ? '설문 다시하기' : '설문 시작하기'}
            </Link>
          </div>
        </div>

        {/* 추천 */}
        <div className="dashboard-card">
          <div className="card-icon"><i className="fas fa-chart-line"></i></div>
          <div className="card-content">
            <h2>주식 추천</h2>
            <p>{userData.hasRecommendations ? '추천 결과가 준비되었습니다.' : '설문을 완료하면 추천을 받을 수 있습니다.'}</p>
            <Link
              to="/recommendations"
              className={`card-button ${userData.completedSurvey ? 'primary' : 'disabled'}`}
              onClick={(e) => {
                if (!userData.completedSurvey) e.preventDefault();
              }}
            >
              {userData.hasRecommendations ? '추천 결과 보기' : '추천 받기'}
            </Link>
          </div>
        </div>

        {/* 지갑 */}
        <div className="dashboard-card">
          <div className="card-icon"><i className="fas fa-wallet"></i></div>
          <div className="card-content">
            <h2>내 지갑</h2>
            <p>{userData.walletValue > 0
              ? `현재 지갑 가치: ${userData.walletValue.toLocaleString()}원`
              : '추천 주식을 지갑에 추가하여 관리해보세요.'}</p>
            <Link to="/wallet" className="card-button primary">지갑 관리하기</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;