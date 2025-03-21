import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import body from '../assets/body.png';
import backimage from '../assets/backimage.png';
import Loader from '../components/loader/Loader';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || error.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />

      <div className="login-hero">
        <div className="login-banneraera">
          <img src={"https://media-hosting.imagekit.io//89e30dbff3b8435d/backimage.png?Expires=1837165589&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=3PbOSY7VF0GXxj45FpWnB6CsCV-oCufkw8kT0~FnNVfTs6VmYRjIBvomHk5zzQGnZ8N6kIoYm3ykildwezW~~f5N7sIQYgP~2JOFdy4js9xmyxJYJOP0fiH68L1aa7LNuKhBToGJQcOryxm7LrWxwGNaBv8KuY8C8JfKIcIJ8z-N3PS6pEohfnh3auhU48AVnsQd5mwFeGdPx1uuLkEqlroB78hq1TKac8fvmHvryEHQo8J2QdIaV3I-Ihlfe1EmFztuGSLT2UHthhBw9z9ISwBFqyRKZhsQpvwnVZb2Mkmf-ZdeIv~ReHBNnW2Ga9E6KWaeS~aJ8qFwuHECE2P5dQ__"} alt='bodyback' className='login-background-img' />
        </div>
        <div className="login-form-area">
          <div className="login-box">
            <div className='login-heading'>
              <h1>
                Comerica Web Banking®
              </h1>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <p
                className="login-error-message"
                style={{
                  color: '#d32f2f',
                  fontSize: '14px',
                  marginTop: '10px',
                  textAlign: 'center',
                  padding: '12px',
                  backgroundColor: '#ffebee',
                  border: '1px solid #ffcdd2',
                  borderRadius: '8px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {errorMessage}
              </p>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="login-input-group">
                <input
                  type="text"
                  className="login-input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="User Name"
                  required
                />
              </div>
              <div className="login-input-group">
                <input
                  type="password"
                  className="login-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '15px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                  }}
                >
                  <input type="checkbox" name="check" id="rememberMe" />
                  <label htmlFor="rememberMe" style={{ fontWeight: 'normal', fontSize: '16px' }}>
                    Remember me
                  </label>
                </div>
              </div>

              <br />

              <button className="login-sign-in-btn" type="submit" disabled={loading}>
                {loading ? <Loader /> : 'Log in'}
              </button>
            </form>

            {/* Additional Links */}
            <div className="login-links">
              <a href="#" className="login-link">
                Forgot username or password?
              </a>
            </div>
          </div>
        </div>
      </div>

      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;