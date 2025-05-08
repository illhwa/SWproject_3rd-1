// WalletPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WalletPage.css';

const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('인증 토큰이 없습니다');
        const response = await axios.get('/api/user/wallet', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.balance);
        setStocks(response.data.stocks);
        setCoins(response.data.coins);
      } catch (err) {
        setError('지갑 데이터를 불러오는 중 오류가 발생했습니다');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWalletData();
  }, []);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="wallet-container">
      <div className="wallet-header">
        <h1>내 지갑</h1>
        <p>현재 잔액: {balance.toLocaleString()}원</p>
      </div>

      <div className="wallet-actions">
        <button className="card-button primary">주식 추가</button>
        <button className="card-button primary">코인 추가</button>
        <button className="card-button secondary">잔액 입출금</button>
      </div>

      <div className="asset-section">
        <h2>보유 자산</h2>
        <div className="asset-list">
          {stocks.length > 0 ? (
            stocks.map((stock, index) => (
              <div key={index} className="asset-card">
                <h3>{stock.name}</h3>
                <p>수량: {stock.quantity}</p>
                <p>가치: {stock.value.toLocaleString()}원</p>
              </div>
            ))
          ) : (
            <p>보유 주식이 없습니다.</p>
          )}
        </div>
        <div className="asset-list">
          {coins.length > 0 ? (
            coins.map((coin, index) => (
              <div key={index} className="asset-card">
                <h3>{coin.name}</h3>
                <p>수량: {coin.quantity}</p>
                <p>가치: {coin.value.toLocaleString()}원</p>
              </div>
            ))
          ) : (
            <p>보유 코인이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;