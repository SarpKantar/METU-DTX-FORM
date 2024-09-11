import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../styling/LoginPage.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage(''); // Önceki hata mesajını temizle
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Admin e-posta adresini kontrol et
      if (user.email === 'admin@gmail.com' && user.password === '123123') { // Burayı kendi admin e-posta adresinizle değiştirin
        navigate('/admin'); // Admin sayfasına yönlendir
      } else {
        setErrorMessage('Bu kullanıcı admin değil.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Giriş başarısız. Lütfen kimlik bilgilerinizi kontrol edin.'); // Hata mesajı ayarla
    }
  };

  return (
    <div className="container">
      <h1 className="title">Admin Girişi</h1>
      <input
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        required
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        required
      />
      <button className="button" onClick={handleLogin}>Giriş Yap</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Hata mesajını göster */}
    </div>
  );
};

export default AdminLogin;