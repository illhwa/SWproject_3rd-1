import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axiosInstance'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setMessage('이메일과 비밀번호를 모두 입력하세요.')
      return
    }

    try {
      const res = await axios.post('/auth/signup', { email, password })
      setMessage(res.data.message)
      navigate('/dashboard')
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage('이미 사용 중인 이메일입니다.')
      } else {
        setMessage('회원가입 실패')
      }
    }
  }

  const goToLogin = () => {
    navigate('/login')   // ← 로그인 페이지로 이동
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">회원가입</button>
        &nbsp;&nbsp;
        <button type="button" onClick={goToLogin}>로그인</button>  {/* ← 로그인 버튼 */}
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Signup
