import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CourseForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (cover) formData.append('cover', cover);

    try {
      await api.post('/courses/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/');
    } catch (err) {
      setError(JSON.stringify(err.response?.data?.errors) || 'Ошибка создания');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Создание курса</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Название (до 120 символов)" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} rows="4" style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
        <label>Обложка (jpg/png/webp до 5 МБ):</label>
        <input type="file" accept="image/*" onChange={e => setCover(e.target.files[0])} />
        <button type="submit" style={{ marginTop: '15px' }}>Сохранить</button>
      </form>
    </div>
  );
}