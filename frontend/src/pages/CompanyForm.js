import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../styling/CompanyForm.css';

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [yearsInPosition, setYearsInPosition] = useState('');
  const [companyAge, setCompanyAge] = useState('');
  const [companySector, setCompanySector] = useState('');
  const [exportStatus, setExportStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      companyName,
      participantName,
      phoneNumber,
      email,
      companyAddress,
      companyWebsite,
      jobTitle,
      yearsInPosition,
      companyAge,
      companySector,
      exportStatus
    };

    try {
      await addDoc(collection(db, 'companyForms'), formData);
      alert('Form submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting form: ', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="form-container">
      <div className="intro-text">
        <h1>ODTÜ DTX - Dijital Olgunluk Değerlendirmesi için Başvuru Formu</h1>
        <p>
          Bu anket, Avrupa Birliği ve Türkiye Cumhuriyeti mali iş birliği çerçevesinde finanse edilen ve Sanayi ve Teknoloji Bakanlığı tarafından yürütülen Rekabetçi Sektörler Programı kapsamındaki "ODTÜ Dijital İnovasyon Merkezi" Projesi dahilinde yapılmaktadır.
        </p>
        <p>
          Proje kapsamında makine ve otomotiv endüstrisinde faaliyet gösteren firmalara çeşitli düzeylerde dijital dönüşüm desteği sağlanacaktır. Bu destek, ODTÜ Dijital Dönüşüm ve İnovasyon Merkezi'nde (ODTÜ DTX) akıllı ve esnek üretim sistemleri, yapay zeka, büyük veri analitiği, sanal gerçeklik ve artırılmış gerçeklik gibi alanlardaki mevcut kapasiteleri ve ihtiyaçlarına dayalı olarak sunulacaktır.
        </p>
        <p>
          Bu amaçla kuruluşunuzun mevcut dijital dönüşüm durumunu anlamak için bu anket oluşturulmuştur.
        </p>
        <p>
          Zamanınız ve katkınız için teşekkür ederiz.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Katılımcı Bilgisi</label>
          <div className="name-inputs">
            <label>1. Şirket Adı *</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your answer"
              required
            />
            <label>2. Katılımcının adı *</label>
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Enter your answer"
              required
            />
            <label>3. Telefon numarası *</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your answer"
              required
            />
            <label>4. Değerlendirme planlamasıyla ilgili daha fazla iletişim için katılımcının e-postası *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your answer"
              required
            />
            <label>5. Şirket Adresi *</label>
            <input
              type="text"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              placeholder="Enter your answer"
              required
            />
            <label>6. Şirket Websitesi URL'si</label>
            <input
              type="text"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              placeholder="Enter your answer"
            />
          </div>
        </div>
        <div className="form-group">
          <label>7. Şirketteki ünvanınız *</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="jobTitle" value="Şirket sahibi" onChange={(e) => setJobTitle(e.target.value)} required /> Şirket sahibi
            </label>
            <label>
              <input type="radio" name="jobTitle" value="Genel Müdür/CEO" onChange={(e) => setJobTitle(e.target.value)} required /> Genel Müdür/CEO
            </label>
            <label>
              <input type="radio" name="jobTitle" value="BT Müdürü/CTO/CDO" onChange={(e) => setJobTitle(e.target.value)} required /> BT Müdürü/CTO/CDO
            </label>
            <label>
              <input type="radio" name="jobTitle" value="Üretim Müdürü" onChange={(e) => setJobTitle(e.target.value)} required /> Üretim Müdürü
            </label>
            <label>
              <input type="radio" name="jobTitle" value="AR-GE Müdürü" onChange={(e) => setJobTitle(e.target.value)} required /> AR-GE Müdürü
            </label>
            <label>
              <input type="radio" name="jobTitle" value="Proje Direktörü (Dijital Dönüşüm)" onChange={(e) => setJobTitle(e.target.value)} required /> Proje Direktörü (Dijital Dönüşüm)
            </label>
            <label>
              <input type="radio" name="jobTitle" value="İş Geliştirme Müdürü" onChange={(e) => setJobTitle(e.target.value)} required /> İş Geliştirme Müdürü
            </label>
            <label>
              <input type="radio" name="jobTitle" value="Endüstriyel Tasarımcı" onChange={(e) => setJobTitle(e.target.value)} required /> Endüstriyel Tasarımcı
            </label>
            <label>
              <input type="radio" name="jobTitle" value="Pazarlama Müdürü" onChange={(e) => setJobTitle(e.target.value)} required /> Pazarlama Müdürü
            </label>
            <label>
              <input type="radio" name="jobTitle" value="Satış Müdürü" onChange={(e) => setJobTitle(e.target.value)} required /> Satış Müdürü
            </label>
            <label>
              <input type="radio" name="jobTitle" value="Yönetici (diğer)" onChange={(e) => setJobTitle(e.target.value)} required /> Yönetici (diğer)
            </label>
            <label>
              <input type="radio" name="jobTitle" value="Other" onChange={(e) => setJobTitle(e.target.value)} required /> Other
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>8. Bu pozisyonda kaç yıldır çalışıyorsunuz? *</label>
          <input
            type="text"
            value={yearsInPosition}
            onChange={(e) => setYearsInPosition(e.target.value)}
            placeholder="Enter your answer"
            required
          />
        </div>
        <div className="form-group">
          <label>9. Şirketiniz kaç yaşındadır? *</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="companyAge" value="Yeni kuruluş – 1 yaşından küçük" onChange={(e) => setCompanyAge(e.target.value)} required /> Yeni kuruluş – 1 yaşından küçük
            </label>
            <label>
              <input type="radio" name="companyAge" value="1 - 2 yaş" onChange={(e) => setCompanyAge(e.target.value)} required /> 1 - 2 yaş
            </label>
            <label>
              <input type="radio" name="companyAge" value="3 - 5 yaş" onChange={(e) => setCompanyAge(e.target.value)} required /> 3 - 5 yaş
            </label>
            <label>
              <input type="radio" name="companyAge" value="6 - 15 yaş" onChange={(e) => setCompanyAge(e.target.value)} required /> 6 - 15 yaş
            </label>
            <label>
              <input type="radio" name="companyAge" value="16 - 30 yaş" onChange={(e) => setCompanyAge(e.target.value)} required /> 16 - 30 yaş
            </label>
            <label>
              <input type="radio" name="companyAge" value="31 + yaş" onChange={(e) => setCompanyAge(e.target.value)} required /> 31 + yaş
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>10. İşletmenizin sektörü nedir? *</label>
          <p>Ekli NACE listesine bakınız (Makine ve otomotiv dışında bir sektör ise veya şirket bu iki sektörden birinin tedarikçisi değil ise, lütfen ankete devam etmeyiniz.)</p>
          <input
            type="text"
            value={companySector}
            onChange={(e) => setCompanySector(e.target.value)}
            placeholder="Enter your answer"
            required
          />
        </div>
        <div className="form-group">
          <label>11. Hizmetlerinizi/ürünlerinizi ihraç ediyor musunuz? *</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="exportStatus" value="Evet doğrudan" onChange={(e) => setExportStatus(e.target.value)} required /> Evet doğrudan
            </label>
            <label>
              <input type="radio" name="exportStatus" value="Evet, aracılar vasıtasıyla" onChange={(e) => setExportStatus(e.target.value)} required /> Evet, aracılar vasıtasıyla
            </label>
            <label>
              <input type="radio" name="exportStatus" value="Hayır, etmiyoruz" onChange={(e) => setExportStatus(e.target.value)} required /> Hayır, etmiyoruz
            </label>
          </div>
        </div>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default CompanyForm;