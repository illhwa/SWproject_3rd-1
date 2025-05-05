import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function Stocks() {
  const [recommendations, setRecommendations] = useState([]);
  const [risk, setRisk] = useState('');
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get('/survey/recommendations', {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('응답 전체:', res.data);

        if (res.data && res.data.recommendations && res.data.recommendations.length > 0) {
          setRecommendations(res.data.recommendations);
          setRisk(res.data.risk_tolerance);
          setGoal(res.data.investment_goal);
        } else {
          setError('추천할 주식이 충분하지 않습니다.');
        }

      } catch (err) {
        setError('추천 주식을 불러오지 못했습니다.');
        console.error('주식 추천 오류:', err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/dashboard')}>← 돌아가기</button>
      <h2>추천 주식 목록</h2>

      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>당신의 투자 성향: <strong>{risk}</strong></p>
          <p>투자 목표: <strong>{goal}</strong></p>

          <ul>
            {recommendations.map((stock, idx) => (
              <li key={idx}>
                {stock.symbol} - 현재가: ${stock.latestClose} ({stock.changePercent}%)
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Stocks;
