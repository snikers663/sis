import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', username: '', password: '', password_confirm: '' });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    
    if (form.password !== form.password_confirm) {
      setErrors({ password_confirm: 'Пароли не совпадают' });
      return;
    }

    try {
      await api.post('/auth/register/', form);
      navigate('/login'); // После успеха кидаем на вход
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setGeneralError('Ошибка при регистрации');
      }
    }
  };

  return (
    <div className="card" style={{ maxWidth: '350px', margin: '50px auto' }}>
      <h2>Регистрация</h2>
      {generalError && <p className="error">{generalError}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        {errors.email && <p className="error">{errors.email}</p>}
        
        <input type="text" placeholder="Логин" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required />
        {errors.username && <p className="error">{errors.username}</p>}
        
        <input type="password" placeholder="Пароль (от 8 символов)" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        {errors.password && <p className="error">{errors.password}</p>}
        
        <input type="password" placeholder="Повторите пароль" value={form.password_confirm} onChange={e => setForm({...form, password_confirm: e.target.value})} required />
        {errors.password_confirm && <p className="error">{errors.password_confirm}</p>}
        
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
}