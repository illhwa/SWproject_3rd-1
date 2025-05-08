// CoinRecommendationsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CoinRecommendationsPage.css';

const CoinRecommendationsPage = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoinRecommendations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('인증 토큰이 없습니다');
        const response = await axios.get('/api/user/coin-recommendations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCoins(response.data.coins);
      } catch (err) {
        setError('코인 추천 데이터를 불러오는 중 오류가 발생했습니다');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinRecommendations();
  }, []);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="coin-recommendations-container">
      <h1>AI 코인 추천 목록</h1>
      {coins.length > 0 ? (
        <div className="coin-list">
          {coins.map((coin, index) => (
            <div key={index} className="coin-card">
              <h3>{coin.name}</h3>
              <p>현재 가격: {coin.price.toLocaleString()}원</p>
              <p>변동률: {coin.change}%</p>
              <p>추천 이유: {coin.reason}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>추천된 코인이 없습니다.</p>
      )}
    </div>
  );
};

export default CoinRecommendationsPage;
