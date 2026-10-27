import { useState } from 'react';
import { useAuth, AuthProvider } from './auth';

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await login(email, password); } catch (err) { setError('Неверный email или пароль'); }
  };
  return (
    <div className="card" style={{ maxWidth: '350px', margin: '50px auto' }}>
      <h2>Вход в систему</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Привет, {user?.username}!</h2>
        <button onClick={logout} style={{ width: 'auto', background: '#dc3545' }}>Выйти</button>
      </div>
      <p>Здесь будет ваш список курсов.</p>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  if (loading) return <p>Загрузка...</p>;
  return user ? <Dashboard /> : <LoginForm />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>📷 Онлайн-курсы фотографа</h1>
        <AppContent />
      </div>
    </AuthProvider>
  );
}
