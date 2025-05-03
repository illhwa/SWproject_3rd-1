import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '2rem' }}>
      <h2>기능 선택</h2>
      <button onClick={() => navigate('/survey')}>설문조사</button><br /><br />
      <button onClick={() => navigate('/stocks')}>주식 추천</button><br /><br />
      <button onClick={() => navigate('/coins')}>코인 추천</button>
    </div>
  )
}

export default Dashboard
