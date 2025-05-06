import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from '../components/survey/ProgressBar';
import SurveyStep from '../components/survey/SurveyStep';
import '../styles/SurveyPage.css';

const SurveyPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [surveyData, setSurveyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        setSurveyData([
          {
            id: 1,
            title: '투자 경험',
            questions: [
              {
                id: 'exp_level',
                text: '투자 경험이 어느 정도 되시나요?',
                type: 'single',
                options: [
                  { value: 'none', label: '투자 경험이 없습니다' },
                  { value: 'beginner', label: '1년 미만' },
                  { value: 'intermediate', label: '1-3년' },
                  { value: 'advanced', label: '3-5년' },
                  { value: 'expert', label: '5년 이상' }
                ]
              },
              {
                id: 'trading_freq',
                text: '평균적으로 얼마나 자주 주식을 거래하시나요?',
                type: 'single',
                options: [
                  { value: 'daily', label: '매일' },
                  { value: 'weekly', label: '주 1-3회' },
                  { value: 'monthly', label: '월 1-3회' },
                  { value: 'quarterly', label: '분기당 1-3회' },
                  { value: 'yearly', label: '연 1-3회' },
                  { value: 'never', label: '거래한 적 없음' }
                ]
              }
            ]
          },
          {
            id: 2,
            title: '위험 성향',
            questions: [
              {
                id: 'risk_tolerance',
                text: '주식 투자에서 어느 정도의 위험을 감수할 수 있으신가요?',
                type: 'single',
                options: [
                  { value: 'very_low', label: '매우 낮음 (원금 손실 없음)' },
                  { value: 'low', label: '낮음 (약간의 원금 손실 가능)' },
                  { value: 'medium', label: '중간 (적정 수준의 위험 감수)' },
                  { value: 'high', label: '높음 (상당한 위험 감수 가능)' },
                  { value: 'very_high', label: '매우 높음 (높은 위험 감수 가능)' }
                ]
              },
              {
                id: 'investment_horizon',
                text: '주식 투자의 주요 목표 기간은 얼마나 되시나요?',
                type: 'single',
                options: [
                  { value: 'short', label: '단기 (1년 이내)' },
                  { value: 'medium', label: '중기 (1-3년)' },
                  { value: 'long', label: '장기 (3-10년)' },
                  { value: 'very_long', label: '초장기 (10년 이상)' }
                ]
              }
            ]
          },
          {
            id: 3,
            title: '투자 선호도',
            questions: [
              {
                id: 'industry_preference',
                text: '어떤 산업 분야에 관심이 있으신가요? (여러 개 선택 가능)',
                type: 'multiple',
                options: [
                  { value: 'tech', label: 'IT/기술' },
                  { value: 'finance', label: '금융' },
                  { value: 'healthcare', label: '헬스케어' },
                  { value: 'consumer', label: '소비재' },
                  { value: 'energy', label: '에너지' },
                  { value: 'industrial', label: '산업재' },
                  { value: 'real_estate', label: '부동산' }
                ]
              },
              {
                id: 'dividend_preference',
                text: '배당금에 대한 선호도는 어떠신가요?',
                type: 'single',
                options: [
                  { value: 'high', label: '높은 배당금 선호' },
                  { value: 'balanced', label: '성장과 배당금 균형' },
                  { value: 'growth', label: '배당금보다 성장 선호' },
                  { value: 'no_preference', label: '특별한 선호 없음' }
                ]
              }
            ]
          },
          {
            id: 4,
            title: '투자 자금',
            questions: [
              {
                id: 'investment_amount',
                text: '투자 가능한 금액대는 어느 정도인가요?',
                type: 'single',
                options: [
                  { value: 'less_than_1m', label: '100만원 미만' },
                  { value: '1m_to_5m', label: '100만원 - 500만원' },
                  { value: '5m_to_10m', label: '500만원 - 1000만원' },
                  { value: '10m_to_50m', label: '1000만원 - 5000만원' },
                  { value: 'more_than_50m', label: '5000만원 이상' }
                ]
              },
              {
                id: 'income_proportion',
                text: '투자 금액은 본인 소득의 몇 %를 차지하나요?',
                type: 'single',
                options: [
                  { value: 'less_than_10', label: '10% 미만' },
                  { value: '10_to_30', label: '10% - 30%' },
                  { value: '30_to_50', label: '30% - 50%' },
                  { value: 'more_than_50', label: '50% 이상' }
                ]
              }
            ]
          }
        ]);
        setLoading(false);
      } catch (err) {
        setError('설문 데이터를 불러오는 중 오류가 발생했습니다');
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, []);

  const handleNext = () => {
    const currentQuestions = surveyData[currentStep].questions;
    const allAnswered = currentQuestions.every(q => {
      if (q.type === 'multiple') {
        return answers[q.id] && answers[q.id].length > 0;
      }
      return answers[q.id] !== undefined;
    });

    if (!allAnswered) {
      alert('모든 질문에 답변해주세요.');
      return;
    }

    if (currentStep < surveyData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { message: '로그인이 필요합니다.' } });
        return;
      }

      await axios.post('/api/survey/submit', answers, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/recommendations', { state: { fromSurvey: true } });
    } catch (err) {
      setError('설문 제출 중 오류가 발생했습니다');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">설문을 불러오는 중...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="survey-container">
      <div className="survey-card">
        <ProgressBar currentStep={currentStep} totalSteps={surveyData.length} />
        <div className="survey-header">
          <h2>{surveyData[currentStep].title}</h2>
          <p>투자 성향을 파악하기 위한 질문입니다.</p>
        </div>
        <SurveyStep
          questions={surveyData[currentStep].questions}
          answers={answers}
          onAnswerChange={handleAnswerChange}
        />
        <div className="survey-navigation">
          {currentStep > 0 && (
            <button className="prev-btn" onClick={handlePrev} disabled={submitting}>이전</button>
          )}
          <button className="next-btn" onClick={handleNext} disabled={submitting}>
            {currentStep === surveyData.length - 1 ? '제출하기' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;