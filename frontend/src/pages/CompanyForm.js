import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../styling/CompanyForm.css';

const CompanyForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
  const [eExport, setEExport] = useState('');
  const [exportPercentage, setExportPercentage] = useState('');
  const [targetRegions, setTargetRegions] = useState([]);
  const [developmentAreas, setDevelopmentAreas] = useState('');
  const [productionAreas, setProductionAreas] = useState('');
  const [revenue2022, setRevenue2022] = useState('');
  const [revenue2021, setRevenue2021] = useState('');
  const [innovationBudgetCurrent, setInnovationBudgetCurrent] = useState('');
  const [innovationBudgetFuture, setInnovationBudgetFuture] = useState('');
  const [techInvestment, setTechInvestment] = useState('');
  const [fullTimeEmployees, setFullTimeEmployees] = useState('');
  const [whiteCollarEmployees, setWhiteCollarEmployees] = useState('');
  const [blueCollarEmployees, setBlueCollarEmployees] = useState('');
  const [associateDegreeEmployees, setAssociateDegreeEmployees] = useState('');
  const [bachelorDegreeEmployees, setBachelorDegreeEmployees] = useState('');
  const [masterDegreeEmployees, setMasterDegreeEmployees] = useState('');
  const [phdDegreeEmployees, setPhdDegreeEmployees] = useState('');
  const [departments, setDepartments] = useState([]);
  const [digitalAssessment, setDigitalAssessment] = useState('');
  const [salesMarketingActivities, setSalesMarketingActivities] = useState([]);
  const [developmentPlans, setDevelopmentPlans] = useState([]);
  const [innovationProjects, setInnovationProjects] = useState('');
  const [productVariety, setProductVariety] = useState('');
  const [customerPreferences, setCustomerPreferences] = useState([]);
  const [circularDesign, setCircularDesign] = useState('');
  const [optimalUse, setOptimalUse] = useState('');
  const [valueRecovery, setValueRecovery] = useState('');
  const [supportModels, setSupportModels] = useState('');
  const [productStrategy, setProductStrategy] = useState('');
  const [currentRelevance, setCurrentRelevance] = useState({
    hydraulicPneumatic: '',
    electronics: '',
    software: '',
    relatedServices: '',
    integratedServices: ''
  });
  
  const [futureRelevance, setFutureRelevance] = useState({
    hydraulicPneumatic: '',
    electronics: '',
    software: '',
    relatedServices: '',
    integratedServices: ''
  });
  const [businessTrends, setBusinessTrends] = useState({
    greenTechnology: '',
    co2Footprint: '',
    lifecycleAssessments: '',
    complianceRegulations: '',
    itSecurity: '',
    customerJourneyComplexity: '',
    productCustomization: '',
    mechatronicSystems: '',
    embeddedSoftware: '',
    complexSystems: '',
    productServiceSystems: '',
    digitalServices: '',
    sharingEconomy: '',
    dataEconomy: '',
    systemEngineering: '',
    digitalContinuity: '',
    complexSystemSimulation: '',
    artificialIntelligence: '',
    digitalTwin: '',
    digitalPlatforms: '',
    internetOfThings: '', // New trend
    arVr: '', // New trend
    blockchain: '', // New trend
    dataStandards: '', // New trend
    roboticProcessAutomation: '', // New trend
    talentWar: '', // New trend
    newWork: '', // New trend
    agileTeams: '', // New trend
    valueNetworkComplexity: '' // New trend
  });;



const handleNext = (e) => {
  e.preventDefault();
  // Validate required fields on the first page
  if (currentPage === 1) {
    if (
      companyName &&
      participantName &&
      phoneNumber &&
      email &&
      companyAddress &&
      jobTitle &&
      yearsInPosition &&
      companyAge &&
      companySector &&
      exportStatus &&
      eExport &&
      developmentAreas &&
      productionAreas &&
      revenue2022 &&
      revenue2021 &&
      innovationBudgetCurrent &&
      innovationBudgetFuture &&
      techInvestment &&
      fullTimeEmployees &&
      whiteCollarEmployees &&
      blueCollarEmployees &&
      associateDegreeEmployees &&
      bachelorDegreeEmployees &&
      masterDegreeEmployees &&
      phdDegreeEmployees &&
      departments.length > 0 &&
      digitalAssessment &&
      salesMarketingActivities.length > 0
    ) {
      setCurrentPage(2);
    } else {
      alert("Please fill all required fields.");
    }
  }
};

const handleDepartmentsChange = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    setDepartments([...departments, value]);
  } else {
    setDepartments(departments.filter((department) => department !== value));
  }
};

const handleProductStrategyChange = (e) => {
  setProductStrategy(e.target.value);
};

const handleCustomerPreferencesChange = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    setCustomerPreferences([...customerPreferences, value]);
  } else {
    setCustomerPreferences(customerPreferences.filter((preference) => preference !== value));
  }
};

const handleCurrentRelevanceChange = (e) => {
  const { name, value } = e.target;
  setCurrentRelevance({
    ...currentRelevance,
    [name]: value
  });
};
const handleFutureRelevanceChange = (e) => {
  const { name, value } = e.target;
  setFutureRelevance({
    ...futureRelevance,
    [name]: value
  });
};
const handleBusinessTrendsChange = (e) => {
  const { name, value } = e.target;
  setBusinessTrends({
    ...businessTrends,
    [name]: value
  });
};

const handleTargetRegionsChange = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    setTargetRegions([...targetRegions, value]);
  } else {
    setTargetRegions(targetRegions.filter((region) => region !== value));
  }
};
const handleSalesMarketingActivitiesChange = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    setSalesMarketingActivities([...salesMarketingActivities, value]);
  } else {
    setSalesMarketingActivities(salesMarketingActivities.filter((activity) => activity !== value));
  }
};

const handleDevelopmentPlansChange = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    setDevelopmentPlans([...developmentPlans, value]);
  } else {
    setDevelopmentPlans(developmentPlans.filter((plan) => plan !== value));
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
      <form onSubmit={handleNext}>
      {currentPage === 1 && (
        <>
          <div className="form-group">
            <label>Katılımcı Bilgisi</label>
          <div className="name-inputs">
            <label>1. Şirket Adı <span className="required-star">*</span></label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Cevabınızı girin"
              required
            />
            <label>2. Katılımcının adı <span className="required-star">*</span></label>
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Cevabınızı girin"
              required
            />
            <label>3. Telefon numarası <span className="required-star">*</span></label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Cevabınızı girin"
              required
            />
            <label>4. Değerlendirme planlamasıyla ilgili daha fazla iletişim için katılımcının e-postası <span className="required-star">*</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Cevabınızı girin"
              required
            />
            <label>5. Şirket Adresi <span className="required-star">*</span></label>
            <input
              type="text"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              placeholder="Cevabınızı girin"
              required
            />
            <label>6. Şirket Websitesi URL'si</label>
            <input
              type="url"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              placeholder="Cevabınızı girin"
            />
          </div>
        </div>
        <div className="form-group">
          <label>7. Şirketteki ünvanınız <span className="required-star">*</span></label>
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
          <label>8. Bu pozisyonda kaç yıldır çalışıyorsunuz? <span className="required-star">*</span></label>
          <input
            type="number"
            value={yearsInPosition}
            onChange={(e) => setYearsInPosition(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>9. Şirketiniz kaç yaşındadır? <span className="required-star">*</span></label>
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
          <label>10. İşletmenizin sektörü nedir? <span className="required-star">*</span></label>
          <p>Ekli NACE listesine bakınız (Makine ve otomotiv dışında bir sektör ise veya şirket bu iki sektörden birinin tedarikçisi değil ise, lütfen ankete devam etmeyiniz.)</p>
          <input
            type="text"
            value={companySector}
            onChange={(e) => setCompanySector(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>11. Hizmetlerinizi/ürünlerinizi ihraç ediyor musunuz? <span className="required-star">*</span></label>
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
        <div className="form-group">
          <label>12. E-ihracat yapıyor musunuz? <span className="required-star">*</span></label>
          <div className="radio-group">
            <label>
              <input type="radio" name="eExport" value="Evet" onChange={(e) => setEExport(e.target.value)} required /> Evet
            </label>
            <label>
              <input type="radio" name="eExport" value="Hayır" onChange={(e) => setEExport(e.target.value)} required /> Hayır
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>13. İhracatın toplam cironuz içindeki yüzdesi nedir?</label>
          <input
            type="text"
            value={exportPercentage}
            onChange={(e) => setExportPercentage(e.target.value)}
            placeholder="Cevabınızı girin"
          />
        </div>
        <div className="form-group">
          <label>14. Gelecek yıl ihracat yapmayı hedeflediğiniz bölgeler var mı? <span className="required-star">*</span></label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" value="Afrika ülkeleri" onChange={handleTargetRegionsChange} /> Afrika ülkeleri
            </label>
            <label>
              <input type="checkbox" value="Avrupa Birliği ülkeleri" onChange={handleTargetRegionsChange} /> Avrupa Birliği ülkeleri
            </label>
            <label>
              <input type="checkbox" value="Türki Cumhuriyetler" onChange={handleTargetRegionsChange} /> Türki Cumhuriyetler
            </label>
            <label>
              <input type="checkbox" value="Diğer Amerika Ülkeleri" onChange={handleTargetRegionsChange} /> Diğer Amerika Ülkeleri
            </label>
            <label>
              <input type="checkbox" value="Diğer Asya Ülkeleri" onChange={handleTargetRegionsChange} /> Diğer Asya Ülkeleri
            </label>
            <label>
              <input type="checkbox" value="Diğer Ülkeler" onChange={handleTargetRegionsChange} /> Diğer Ülkeler
            </label>
            <label>
              <input type="checkbox" value="Kuzey Amerika Serbest Ticaret Bölgesi" onChange={handleTargetRegionsChange} /> Kuzey Amerika Serbest Ticaret Bölgesi
            </label>
            <label>
              <input type="checkbox" value="Okyanus Ülkeleri" onChange={handleTargetRegionsChange} /> Okyanus Ülkeleri
            </label>
            <label>
              <input type="checkbox" value="Orta Doğu Ülkeleri" onChange={handleTargetRegionsChange} /> Orta Doğu Ülkeleri
            </label>
            <label>
              <input type="checkbox" value="Serbest Bölgeler" onChange={handleTargetRegionsChange} /> Serbest Bölgeler
            </label>
            <label>
              <input type="checkbox" value="Uzakdoğu Ülkeleri" onChange={handleTargetRegionsChange} /> Uzakdoğu Ülkeleri
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>15. Geliştirme sahalarınızın sayısı nedir? <span className="required-star">*</span></label>
          <input
            type="number"
            value={developmentAreas}
            onChange={(e) => setDevelopmentAreas(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>16. Üretim sahalarınızın sayısı nedir? <span className="required-star">*</span></label>
          <input
            type="number"
            value={productionAreas}
            onChange={(e) => setProductionAreas(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>17. 2022 yılındaki Cironuz nedir? <span className="required-star">*</span></label>
          <div className="radio-group">
            <label>
              <input type="radio" name="revenue2022" value="0 - 3 Milyon TL (mikro)" onChange={(e) => setRevenue2022(e.target.value)} required /> 0 - 3 Milyon TL (mikro)
            </label>
            <label>
              <input type="radio" name="revenue2022" value="3 - 25 Milyon TL (small)" onChange={(e) => setRevenue2022(e.target.value)} required /> 3 - 25 Milyon TL (small)
            </label>
            <label>
              <input type="radio" name="revenue2022" value="25 - 125 Milyon TL (orta)" onChange={(e) => setRevenue2022(e.target.value)} required /> 25 - 125 Milyon TL (orta)
            </label>
            <label>
              <input type="radio" name="revenue2022" value="125 - 500 Milyon TL (büyük)" onChange={(e) => setRevenue2022(e.target.value)} required /> 125 - 500 Milyon TL (büyük)
            </label>
            <label>
              <input type="radio" name="revenue2022" value="+ 500 Milyon TL" onChange={(e) => setRevenue2022(e.target.value)} required /> + 500 Milyon TL
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>18. 2021 yılındaki cironuz nedir? <span className="required-star">*</span></label>
          <div className="radio-group">
            <label>
              <input type="radio" name="revenue2021" value="0 - 3 Milyon TL (mikro)" onChange={(e) => setRevenue2021(e.target.value)} required /> 0 - 3 Milyon TL (mikro)
            </label>
            <label>
              <input type="radio" name="revenue2021" value="3 - 25 Milyon TL (küçük)" onChange={(e) => setRevenue2021(e.target.value)} required /> 3 - 25 Milyon TL (küçük)
            </label>
            <label>
              <input type="radio" name="revenue2021" value="25 - 125 Milyon TL (orta)" onChange={(e) => setRevenue2021(e.target.value)} required /> 25 - 125 Milyon TL (orta)
            </label>
            <label>
              <input type="radio" name="revenue2021" value="125 - 500 Milyon TL (büyük)" onChange={(e) => setRevenue2021(e.target.value)} required /> 125 - 500 Milyon TL (büyük)
            </label>
            <label>
              <input type="radio" name="revenue2021" value="+ 500 Milyon TL" onChange={(e) => setRevenue2021(e.target.value)} required /> + 500 Milyon TL
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>19. Bu yıl toplam cironuzun ne kadarını inovasyon ve AR-GE faaliyetlerine ayırmayı planlıyorsunuz? <span className="required-star">*</span></label>
          <input
            type="number"
            value={innovationBudgetCurrent}
            onChange={(e) => setInnovationBudgetCurrent(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>20. Önümüzdeki üç yıl içinde toplam cironuzun ne kadarını inovasyon ve Ar-Ge faaliyetlerine ayırmayı planlıyorsunuz? <span className="required-star">*</span></label>
          <input
            type="number"
            value={innovationBudgetFuture}
            onChange={(e) => setInnovationBudgetFuture(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>21. Son üç yıldaki teknoloji yatırımınız ne kadardır? <span className="required-star">*</span></label>
          <input
            type="text"
            value={techInvestment}
            onChange={(e) => setTechInvestment(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>22. Şirketinizdeki tam zamanlı çalışan sayısı nedir? <span className="required-star">*</span></label>
          <input
            type="number"
            value={fullTimeEmployees}
            onChange={(e) => setFullTimeEmployees(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>23. Şirketinizdeki beyaz yaka sayısı nedir? <span className="required-star">*</span></label>
          <input
            type="number"
            value={whiteCollarEmployees}
            onChange={(e) => setWhiteCollarEmployees(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>24. Şirketinizdeki mavi yaka sayısı nedir? <span className="required-star">*</span></label>
          <input
            type="number"
            value={blueCollarEmployees}
            onChange={(e) => setBlueCollarEmployees(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>25. Şirketinizdeki ön lisans mezunu çalışan sayısı nedir? <span className="required-star">*</span></label>
          <input
            type="number"
            value={associateDegreeEmployees}
            onChange={(e) => setAssociateDegreeEmployees(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>26. Şirketinizdeki üniversite (lisans) mezunu çalışan sayısı nedir? <span className="required-star">*</span></label>
          <input
            type="number"
            value={bachelorDegreeEmployees}
            onChange={(e) => setBachelorDegreeEmployees(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>27. Şirketinizdeki yüksek lisans (Master) dereceli çalışan sayısı nedir? <span className="required-star">*</span></label>
          <input
            type="number"
            value={masterDegreeEmployees}
            onChange={(e) => setMasterDegreeEmployees(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>28. Şirketinizdeki doktora dereceli çalışan sayısı nedir? <span className="required-star">*</span></label>
          <input
            type="number"
            value={phdDegreeEmployees}
            onChange={(e) => setPhdDegreeEmployees(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>29. Aşağıda listelenen departmanlardan hangileri şirketinizde mevcuttur? <span className="required-star">*</span></label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" value="AR-GE ve Teknoloji Geliştirme" onChange={handleDepartmentsChange} /> AR-GE ve Teknoloji Geliştirme
            </label>
            <label>
              <input type="checkbox" value="Sertifikalı AR-GE Merkezi" onChange={handleDepartmentsChange} /> Sertifikalı AR-GE Merkezi
            </label>
            <label>
              <input type="checkbox" value="Tasarım/Ürün Geliştirme" onChange={handleDepartmentsChange} /> Tasarım/Ürün Geliştirme
            </label>
            <label>
              <input type="checkbox" value="Sertifikalı Tasarım Merkezi" onChange={handleDepartmentsChange} /> Sertifikalı Tasarım Merkezi
            </label>
            <label>
              <input type="checkbox" value="Endüstri Mühendisliği" onChange={handleDepartmentsChange} /> Endüstri Mühendisliği
            </label>
            <label>
              <input type="checkbox" value="Üretim/İmalat" onChange={handleDepartmentsChange} /> Üretim/İmalat
            </label>
            <label>
              <input type="checkbox" value="Lojistik" onChange={handleDepartmentsChange} /> Lojistik
            </label>
            <label>
              <input type="checkbox" value="Finans" onChange={handleDepartmentsChange} /> Finans
            </label>
            <label>
              <input type="checkbox" value="Satış & Pazarlama" onChange={handleDepartmentsChange} /> Satış & Pazarlama
            </label>
            <label>
              <input type="checkbox" value="Satın alma" onChange={handleDepartmentsChange} /> Satın alma
            </label>
            <label>
              <input type="checkbox" value="Dış Ticaret ve İhracat" onChange={handleDepartmentsChange} /> Dış Ticaret ve İhracat
            </label>
            <label>
              <input type="checkbox" value="Other" onChange={handleDepartmentsChange} /> Other
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>30. Herhangi bir dijitalleşme değerlendirmesine katıldınız mı? Cevabınız evet ise hangi değerlendirme yöntemine veya hizmetine katıldınız? <span className="required-star">*</span></label>
          <p>Eğer soruya cevabınız evet ise lütfen değerlendirmenin adını ve ofisini yazınız.</p>
          <input
            type="text"
            value={digitalAssessment}
            onChange={(e) => setDigitalAssessment(e.target.value)}
            placeholder="Cevabınızı girin"
            required
          />
        </div>
        <div className="form-group">
          <label>31. Lütfen bize şirketinizin satış ve pazarlama yaklaşımından bahsedin. Şirketiniz aşağıdaki faaliyetlerden hangilerini gerçekleştiriyor? <span className="required-star">*</span></label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" value="Şirketin sosyal medya hesabı var (Linkedin, Instagram, Facebook vb.)" onChange={handleSalesMarketingActivitiesChange} /> Şirketin sosyal medya hesabı var (Linkedin, Instagram, Facebook vb.)
            </label>
            <label>
              <input type="checkbox" value="Şirketin işleyen bir web sayfası var" onChange={handleSalesMarketingActivitiesChange} /> Şirketin işleyen bir web sayfası var
            </label>
            <label>
              <input type="checkbox" value="Şirket e-ticaret yapıyor (kendi web sitesi)" onChange={handleSalesMarketingActivitiesChange} /> Şirket e-ticaret yapıyor (kendi web sitesi)
            </label>
            <label>
              <input type="checkbox" value="Şirket çevrimiçi pazar yeri üzerinden satış yapıyor (amazon vb)" onChange={handleSalesMarketingActivitiesChange} /> Şirket çevrimiçi pazar yeri üzerinden satış yapıyor (amazon vb)
            </label>
            <label>
              <input type="checkbox" value="Şirket tele pazarlama yapıyor" onChange={handleSalesMarketingActivitiesChange} /> Şirket tele pazarlama yapıyor
            </label>
            <label>
              <input type="checkbox" value="Şirket düzenli olarak fuarlara katılıyor" onChange={handleSalesMarketingActivitiesChange} /> Şirket düzenli olarak fuarlara katılıyor
            </label>
            <label>
              <input type="checkbox" value="Şirket aktif olarak reklam veriyor" onChange={handleSalesMarketingActivitiesChange} /> Şirket aktif olarak reklam veriyor
            </label>
            <label>
              <input type="checkbox" value="Şirket eşleştirme etkinliklerine katılıyor" onChange={handleSalesMarketingActivitiesChange} /> Şirket eşleştirme etkinliklerine katılıyor
            </label>
          </div>
          </div>
          <button type="button" onClick={handleNext}>Next</button>
        </>
      )}
      {currentPage === 2 && (
  <>
    <div className="form-group">
      <label>32. Şirketinizde aşağıdakilerden herhangi biri var mı? Lütfen geçerli olanları seçiniz. *</label>
      <div className="checkbox-group">
        <label>
          <input type="checkbox" value="Şirket gelişim planı" onChange={handleDevelopmentPlansChange} /> Şirket gelişim planı: Bir iş geliştirme planı, işletmenin hem uzun hem de kısa vadeli hedeflerini ve bunlara nasıl ulaşmayı planladıklarını gösteren yazılı bir belgedir.
        </label>
        <label>
          <input type="checkbox" value="İş planı" onChange={handleDevelopmentPlansChange} /> İş planı: Bir iş planı, hedeflerini ve bunlara ulaşmak için planlarını vurgulayan belgelenmiş bir stratejidir. Bir şirketin pazara açılma planını, finansal projeksiyonlarını, pazar araştırmasını, iş amacını ve misyon beyanını ana hatlarıyla belirtir.
        </label>
        <label>
          <input type="checkbox" value="Finansal plan" onChange={handleDevelopmentPlansChange} /> Finansal plan: Finansal planlama, gelecekteki finansal hedefleri ve bunlara nasıl ulaşılacağını belirlemek için mevcut finansal durumu değerlendirme sürecidir. Finansal plan, bir şirketin finansal büyümesi için yol haritası görevini gören bir belgedir.
        </label>
      </div>
    </div>
    <div className="form-group">
      <label>33. Son beş yılda şirketinizde inovasyonla ilgili kaç proje yürüttünüz? <span className="required-star">*</span></label>
      <input
        type="number"
        value={innovationProjects}
        onChange={(e) => setInnovationProjects(e.target.value)}
        placeholder="Cevabınızı girin"
        required
      />
    </div>
    <div className="form-group">
      <label>34. Lütfen ürün çeşitliliğinizi belirtir misiniz? Kaç farklı/özgün ürün çeşidi/aileşi üretiyorsunuz? <span className="required-star">*</span></label>
      <input
        type="number"
        value={productVariety}
        onChange={(e) => setProductVariety(e.target.value)}
        placeholder="Cevabınızı girin"
        required
      />
    </div>
    <div className="form-group">
      <label>35. Müşterilerinizin ürünlerinizi/hizmetlerinizi rakiplerinize tercih etmesinin en önemli üç nedeni nedir? <span className="required-star">*</span></label>
      <p>En fazla 3 seçenek işaretleyiniz</p>
      <div className="checkbox-group">
        <label>
          <input type="checkbox" value="Fiyat avantajı" onChange={handleCustomerPreferencesChange} /> Fiyat avantajı
        </label>
        <label>
          <input type="checkbox" value="Ürün kalitesi" onChange={handleCustomerPreferencesChange} /> Ürün kalitesi
        </label>
        <label>
          <input type="checkbox" value="Özel/Niş ürün" onChange={handleCustomerPreferencesChange} /> Özel/Niş ürün
        </label>
        <label>
          <input type="checkbox" value="Hızlı vade/kısa teslimat süresi" onChange={handleCustomerPreferencesChange} /> Hızlı vade/kısa teslimat süresi
        </label>
        <label>
          <input type="checkbox" value="Sürdürülebilir/Ekolojik Ürünler/Hizmetler/Uygulamalar" onChange={handleCustomerPreferencesChange} /> Sürdürülebilir/Ekolojik Ürünler/Hizmetler/Uygulamalar
        </label>
        <label>
          <input type="checkbox" value="Koleksiyon (Çeşitlilik)" onChange={handleCustomerPreferencesChange} /> Koleksiyon (Çeşitlilik)
        </label>
        <label>
          <input type="checkbox" value="Esnek üretim" onChange={handleCustomerPreferencesChange} /> Esnek üretim
        </label>
        <label>
          <input type="checkbox" value="Güvenilirlik" onChange={handleCustomerPreferencesChange} /> Güvenilirlik
        </label>
        <label>
          <input type="checkbox" value="Bilgi/Ustalık" onChange={handleCustomerPreferencesChange} /> Bilgi/Ustalık
        </label>
        <label>
          <input type="checkbox" value="İnovasyon seviyesi" onChange={handleCustomerPreferencesChange} /> İnovasyon seviyesi
        </label>
        <label>
          <input type="checkbox" value="Teknoloji Liderliği" onChange={handleCustomerPreferencesChange} /> Teknoloji Liderliği
        </label>
        <label>
          <input type="checkbox" value="Other" onChange={handleCustomerPreferencesChange} /> Other
        </label>
      </div>
    </div>
    <div className="form-group">
      <label>36. Her bir trend mevcut işinizi nasıl etkiliyor? <span className="required-star">*</span></label>
      <p>Lütfen her satır için geçerli olan cevabı seçiniz.</p>
      <table>
        <thead>
          <tr>
            <th>Trend</th>
            <th>5-Çok olumlu</th>
            <th>4-Olumlu</th>
            <th>3-Ne olumlu ne olumsuz</th>
            <th>2-Olumsuz</th>
            <th>1-Çok olumsuz</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Yeşil Teknoloji</td>
            <td><input type="radio" name="greenTechnology" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="greenTechnology" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="greenTechnology" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="greenTechnology" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="greenTechnology" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>CO2 ayak izi ve döngüsel ekonomi</td>
            <td><input type="radio" name="co2Footprint" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="co2Footprint" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="co2Footprint" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="co2Footprint" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="co2Footprint" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Yaşam döngüsü değerlendirmeleri ve Yaşam döngüsü maliyet hesaplamaları</td>
            <td><input type="radio" name="lifecycleAssessments" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="lifecycleAssessments" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="lifecycleAssessments" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="lifecycleAssessments" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="lifecycleAssessments" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Uyumluluk ve yeni düzenlemeler</td>
            <td><input type="radio" name="complianceRegulations" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complianceRegulations" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complianceRegulations" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complianceRegulations" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complianceRegulations" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>BT sistemlerinin operasyonel güvenliği ve veri emniyeti</td>
            <td><input type="radio" name="itSecurity" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="itSecurity" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="itSecurity" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="itSecurity" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="itSecurity" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Müşteri yolculuğunun karmaşıklığı (tüm ürün yaşam döngüsü aşamalarında kişiselleştirilmiş teklifler ve hizmetler)</td>
            <td><input type="radio" name="customerJourneyComplexity" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="customerJourneyComplexity" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="customerJourneyComplexity" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="customerJourneyComplexity" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="customerJourneyComplexity" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Ürün bireyselleştirme</td>
            <td><input type="radio" name="productCustomization" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="productCustomization" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="productCustomization" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="productCustomization" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="productCustomization" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Mekatronik sistemler</td>
            <td><input type="radio" name="mechatronicSystems" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="mechatronicSystems" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="mechatronicSystems" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="mechatronicSystems" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="mechatronicSystems" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Ürünlerde yazılım tanımlı özellikler/ürünlerde gömülü yazılım</td>
            <td><input type="radio" name="embeddedSoftware" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="embeddedSoftware" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="embeddedSoftware" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="embeddedSoftware" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="embeddedSoftware" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Otonom, dinamik olarak ağa bağlı gibi özelliklere sahip daha büyük bir sistemin parçası olan karmaşık sistemler/ürünler</td>
            <td><input type="radio" name="complexSystems" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complexSystems" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complexSystems" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complexSystems" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complexSystems" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Ürün-Hizmet Sistemleri (entegre ürün ve hizmet paketleri, varsa hizmetlerin ayrı fiyatlandırılması)</td>
            <td><input type="radio" name="productServiceSystems" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="productServiceSystems" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="productServiceSystems" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="productServiceSystems" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="productServiceSystems" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Dijital hizmetler ve iş modelleri</td>
            <td><input type="radio" name="digitalServices" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalServices" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalServices" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalServices" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalServices" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Paylaşım ekonomisi</td>
            <td><input type="radio" name="sharingEconomy" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="sharingEconomy" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="sharingEconomy" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="sharingEconomy" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="sharingEconomy" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Veri ekonomisi (uzaktan hizmetlerden gelir elde etme, kestirimci bakım dahil)</td>
            <td><input type="radio" name="dataEconomy" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="dataEconomy" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="dataEconomy" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="dataEconomy" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="dataEconomy" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Sistem Mühendisliği, ITSM, karmaşık sistemler için geliştirme yöntemleri</td>
            <td><input type="radio" name="systemEngineering" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="systemEngineering" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="systemEngineering" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="systemEngineering" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="systemEngineering" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Dijital süreklilik/ uçtan uca entegrasyon</td>
            <td><input type="radio" name="digitalContinuity" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalContinuity" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalContinuity" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalContinuity" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalContinuity" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Karmaşık sistemlerin simülasyonu ve gerçek zamanlı simülasyonu</td>
            <td><input type="radio" name="complexSystemSimulation" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complexSystemSimulation" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complexSystemSimulation" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complexSystemSimulation" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="complexSystemSimulation" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Yapay zeka</td>
            <td><input type="radio" name="artificialIntelligence" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="artificialIntelligence" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="artificialIntelligence" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="artificialIntelligence" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="artificialIntelligence" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Dijital ikiz</td>
            <td><input type="radio" name="digitalTwin" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalTwin" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalTwin" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalTwin" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalTwin" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Dijital Platformlar ve (Çoklu) Bulut Bilişimi</td>
            <td><input type="radio" name="digitalPlatforms" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalPlatforms" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalPlatforms" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalPlatforms" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="digitalPlatforms" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="form-group">
      <label>37. Her bir trend mevcut işinizi nasıl etkiliyor? <span className="required-star">*</span></label>
      <p>Lütfen her satır için geçerli olan cevabı seçiniz.</p>
      <table>
        <thead>
          <tr>
            <th>Trend</th>
            <th>5-Çok olumlu</th>
            <th>4-Olumlu</th>
            <th>3-Ne olumlu ne olumsuz</th>
            <th>2-Olumsuz</th>
            <th>1-Çok olumsuz</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nesnelerin interneti</td>
            <td><input type="radio" name="internetOfThings" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="internetOfThings" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="internetOfThings" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="internetOfThings" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="internetOfThings" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Sanal gerçeklik ortamları ve arayüzler (AR/VR)</td>
            <td><input type="radio" name="arVr" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="arVr" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="arVr" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="arVr" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="arVr" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Blokzincir teknolojisi</td>
            <td><input type="radio" name="blockchain" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="blockchain" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="blockchain" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="blockchain" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="blockchain" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Veri formatları ve veri aktarımı için yeni (açık) standartlar</td>
            <td><input type="radio" name="dataStandards" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="dataStandards" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="dataStandards" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="dataStandards" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="dataStandards" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Robotik süreç otomasyonu</td>
            <td><input type="radio" name="roboticProcessAutomation" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="roboticProcessAutomation" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="roboticProcessAutomation" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="roboticProcessAutomation" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="roboticProcessAutomation" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Yetenekler savaşı</td>
            <td><input type="radio" name="talentWar" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="talentWar" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="talentWar" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="talentWar" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="talentWar" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Yeni iş (mobil çalışma, yaratıcılık, sanal işbirliği)</td>
            <td><input type="radio" name="newWork" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="newWork" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="newWork" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="newWork" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="newWork" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Çeviklik ve kendi kendini organize eden ekipler</td>
            <td><input type="radio" name="agileTeams" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="agileTeams" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="agileTeams" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="agileTeams" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="agileTeams" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
          <tr>
            <td>Değer yaratma ağlarının karmaşıklığı ve eksik dayanıklılığı</td>
            <td><input type="radio" name="valueNetworkComplexity" value="5" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="valueNetworkComplexity" value="4" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="valueNetworkComplexity" value="3" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="valueNetworkComplexity" value="2" onChange={handleBusinessTrendsChange} /></td>
            <td><input type="radio" name="valueNetworkComplexity" value="1" onChange={handleBusinessTrendsChange} /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="form-group">
      <label>38. Döngüsel Tasarım/Üretim: Döngüsel Tasarım/Üretim modelleri, bir ürünün geliştirme aşamasına odaklanır. Ürünlerin ve varlıkların döngüsel kaynak verimliliğini artırmayı amaçlar. Ürünler daha uzun süre dayanacak ve bakım, onarımı, yükseltilmesi, yenilenmesi, yeniden üretilmesi veya geri dönüştürülmesi daha kolay olacak şekilde tasarlanır. Buna ek olarak, biyo-bazlı veya tamamen geri dönüştürülebilir malzemeler gibi yeni malzemeler geliştirilir veya kullanılır. <span className="required-star">*</span></label>
      <input
        type="text"
        value={circularDesign}
        onChange={(e) => setCircularDesign(e.target.value)}
        placeholder="Cevabınızı girin"
        required
      />
    </div>
    <div className="form-group">
      <label>39. Döngüsel (Optimal) Kullanım: Bu iş modelleri, kullanımı optimize ederek ve böylece kullanım ömrünü uzatarak ve kaynakları koruyarak bir ürünün kullanım aşamasına odaklanır. Bu iş modelleri, ürünün sahipliğini korumayı (örneğin bir ürünü satmak yerine hizmet olarak sunarak) ve ürünün ömrü boyunca sorumluluğunu almayı (örneğin bakım hizmetleri veya ömrünü uzatan diğer eklentiler sunarak) mümkün kılar. Bu iş modelleri, ürün satışından sözleşme satışına geçişi içermektedir. <span className="required-star">*</span></label>
      <input
        type="text"
        value={optimalUse}
        onChange={(e) => setOptimalUse(e.target.value)}
        placeholder="Cevabınızı girin"
        required
      />
    </div>
    <div className="form-group">
      <label>40. Döngüsel Değer Geri Kazanımı: Bu iş modelleri, bir ürünün kullanım aşamasından sonraki çıktısına ve katma değerine odaklanır. Bu modeller, kullanılmış ürünleri yeni ürünlere veya kullanılabilir bileşenlere veya hammaddelere dönüştürerek gelir elde eder. Ters lojistik gelişimi bu model için esastır. <span className="required-star">*</span></label>
      <input
        type="text"
        value={valueRecovery}
        onChange={(e) => setValueRecovery(e.target.value)}
        placeholder="Cevabınızı girin"
        required
      />
    </div>
    <div className="form-group">
      <label>41. Döngüsel Destek Modelleri: Döngüsel ekonomi stratejilerini mümkün kılan araçların, uygulamaların ve hizmetlerin geliştirilmesi/dağıtılması <span className="required-star">*</span></label>
      <input
        type="text"
        value={supportModels}
        onChange={(e) => setSupportModels(e.target.value)}
        placeholder="Cevabınızı girin"
        required
      />
    </div>
    <div className="form-group">
      <label>42. Aşağıdaki bileşenlerin/unsurların hâli hazırdaki ürün ve hizmetlerinizle ne kadar ilgili olduğunu belirtir misiniz? <span className="required-star">*</span></label>
      <p>Günümüz</p>
      <table>
        <thead>
          <tr>
            <th>Bileşen/Unsur</th>
            <th>4-Çok ilgili</th>
            <th>3-Orta derecede ilgili</th>
            <th>2-Biraz ilgili</th>
            <th>1-Hiç ilgisi yok</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hidrolik ve/veya pnömatik dahil mekanik</td>
            <td><input type="radio" name="currentHydraulicPneumatic" value="4" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentHydraulicPneumatic" value="3" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentHydraulicPneumatic" value="2" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentHydraulicPneumatic" value="1" onChange={handleCurrentRelevanceChange} /></td>
          </tr>
          <tr>
            <td>Elektronik</td>
            <td><input type="radio" name="currentElectronics" value="4" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentElectronics" value="3" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentElectronics" value="2" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentElectronics" value="1" onChange={handleCurrentRelevanceChange} /></td>
          </tr>
          <tr>
            <td>Yazılım</td>
            <td><input type="radio" name="currentSoftware" value="4" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentSoftware" value="3" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentSoftware" value="2" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentSoftware" value="1" onChange={handleCurrentRelevanceChange} /></td>
          </tr>
          <tr>
            <td>Ürüne ilgili hizmetler (örn. havadan yazılım güncellemeleri, yedek parçalar, satış sonrası hizmetler, ...)</td>
            <td><input type="radio" name="currentRelatedServices" value="4" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentRelatedServices" value="3" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentRelatedServices" value="2" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentRelatedServices" value="1" onChange={handleCurrentRelevanceChange} /></td>
          </tr>
          <tr>
            <td>Ürüne entegre edilmiş hizmetler (örn. Öngörücü Bakım)</td>
            <td><input type="radio" name="currentIntegratedServices" value="4" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentIntegratedServices" value="3" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentIntegratedServices" value="2" onChange={handleCurrentRelevanceChange} /></td>
            <td><input type="radio" name="currentIntegratedServices" value="1" onChange={handleCurrentRelevanceChange} /></td>
          </tr>
          </tbody>
      </table>
    </div>
    <div className="form-group">
      <label>43. Aşağıdaki bileşenlerin/unsurların hangilerinin önümüzdeki 5 yıl içinde ürün ve hizmetlerinizle ne kadar ilgili olacağını belirtir misiniz? <span className="required-star">*</span></label>
      <p>Gelecek</p>
      <table>
        <thead>
          <tr>
            <th>Bileşen/Unsur</th>
            <th>4-Çok ilgili olacak</th>
            <th>3-Orta derecede ilgili olacak</th>
            <th>2-Biraz ilgili olacak</th>
            <th>1-Hiç ilgisi olmayacak</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hidrolik ve/veya pnömatik dahil mekanik</td>
            <td><input type="radio" name="futureHydraulicPneumatic" value="4" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureHydraulicPneumatic" value="3" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureHydraulicPneumatic" value="2" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureHydraulicPneumatic" value="1" onChange={handleFutureRelevanceChange} /></td>
          </tr>
          <tr>
            <td>Elektronik</td>
            <td><input type="radio" name="futureElectronics" value="4" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureElectronics" value="3" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureElectronics" value="2" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureElectronics" value="1" onChange={handleFutureRelevanceChange} /></td>
          </tr>
          <tr>
            <td>Yazılım</td>
            <td><input type="radio" name="futureSoftware" value="4" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureSoftware" value="3" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureSoftware" value="2" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureSoftware" value="1" onChange={handleFutureRelevanceChange} /></td>
          </tr>
          <tr>
            <td>Ürüne ilgili hizmetler (örn. havadan yazılım güncellemeleri, yedek parçalar, satış sonrası hizmetler, ...)</td>
            <td><input type="radio" name="futureRelatedServices" value="4" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureRelatedServices" value="3" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureRelatedServices" value="2" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureRelatedServices" value="1" onChange={handleFutureRelevanceChange} /></td>
          </tr>
          <tr>
            <td>Ürüne entegre edilmiş hizmetler (örn. Öngörücü Bakım)</td>
            <td><input type="radio" name="futureIntegratedServices" value="4" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureIntegratedServices" value="3" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureIntegratedServices" value="2" onChange={handleFutureRelevanceChange} /></td>
            <td><input type="radio" name="futureIntegratedServices" value="1" onChange={handleFutureRelevanceChange} /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="form-group">
      <label>44. Şirketiniz için geçerli olan ve en çok uygulanan Ürün Yaratma/Geliştirme Stratejisi hangisidir? <span className="required-star">*</span></label>
      <p>Ürün yaratmanın tanımı: Ürün yaratma, yeni bir ürün veya hizmet geliştirme ve pazara sunma sürecini ifade eder. Müşteri ihtiyaçlarının belirlenmesini, pazar araştırması yapılmasını, ürünün tasarlanmasını ve prototipinin oluşturulmasını, hizmetin üretilmesini veya geliştirilmesini ve son olarak müşterilere sunulmasını ve pazarlanmasını içerir. Kısaca ürün geliştirme + üretim.</p>
      <div className="radio-group">
        <label>
          <input 
            type="radio" 
            name="productStrategy" 
            value="Sipariş Üzerine Mühendislik (lot boyutu bir)" 
            onChange={handleProductStrategyChange} 
            checked={productStrategy === "Sipariş Üzerine Mühendislik (lot boyutu bir)"}
            required 
          /> 
          Sipariş Üzerine Mühendislik (lot boyutu bir)
        </label>
        <label>
          <input 
            type="radio" 
            name="productStrategy" 
            value="Siparişe Üzerine tasarım/ Siparişe Göre Yapılandırma (AR-GE tarafından müşteriye özel yapılandırma)" 
            onChange={handleProductStrategyChange} 
            checked={productStrategy === "Siparişe Üzerine tasarım/ Siparişe Göre Yapılandırma (AR-GE tarafından müşteriye özel yapılandırma)"}
            required 
          /> 
          Siparişe Üzerine tasarım/ Siparişe Göre Yapılandırma (AR-GE tarafından müşteriye özel yapılandırma)
        </label>
        <label>
          <input 
            type="radio" 
            name="productStrategy" 
            value="İsteğe/siparişe Göre Üretim (fason üretim, seri ürünlerin siparişe özel üretimi)" 
            onChange={handleProductStrategyChange} 
            checked={productStrategy === "İsteğe/siparişe Göre Üretim (fason üretim, seri ürünlerin siparişe özel üretimi)"}
            required 
          /> 
          İsteğe/siparişe Göre Üretim (fason üretim, seri ürünlerin siparişe özel üretimi)
        </label>
        <label>
          <input 
            type="radio" 
            name="productStrategy" 
            value="Stok için Üretim (seri ürün üretimi)" 
            onChange={handleProductStrategyChange} 
            checked={productStrategy === "Stok için Üretim (seri ürün üretimi)"}
            required 
          /> 
          Stok için Üretim (seri ürün üretimi)
        </label>
      </div>
    </div>
    <button type="submit">Submit</button>
  </>
)}
</form>
  </div>
);
};

export default CompanyForm;