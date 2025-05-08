// NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>존재하지 않는 페이지입니다. 메인으로 돌아가세요.</p>
      <Link to="/" style={{ textDecoration: 'none', color: '#3498db' }}>
        메인으로 가기
      </Link>
    </div>
  );
};

export default NotFoundPage;