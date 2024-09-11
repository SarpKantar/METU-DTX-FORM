import React, { useState,  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import '../styling/LoginPage.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    // Redirect to admin page if already logged in as admin
    if (currentUser && currentUser.email === 'admin@gmail.com') {
      navigate('/admin-dashboard'); // Redirect to admin page
    }
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    setErrorMessage(''); // Önceki hata mesajını temizle
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setCurrentUser(user);

      // Admin e-posta adresini kontrol et
      if (user.email === 'admin@gmail.com') { // Burayı kendi admin e-posta adresinizle değiştirin
        console.log('User is admin, navigating to admin page.');
        navigate('/admin-dashboard'); // Admin sayfasına yönlendir
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