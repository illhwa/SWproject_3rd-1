// AssetsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AssetsPage.css';

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('인증 토큰이 없습니다');
        const response = await axios.get('/api/user/assets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssets(response.data.assets);
      } catch (err) {
        setError('자산 데이터를 불러오는 중 오류가 발생했습니다');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="assets-container">
      <h1>자산 보기</h1>
      {assets.length > 0 ? (
        <div className="assets-list">
          {assets.map((asset, index) => (
            <div key={index} className="asset-card">
              <h3>{asset.name}</h3>
              <p>수량: {asset.quantity}</p>
              <p>가치: {asset.value.toLocaleString()}원</p>
            </div>
          ))}
        </div>
      ) : (
        <p>보유 자산이 없습니다.</p>
      )}
    </div>
  );
};

export default AssetsPage;