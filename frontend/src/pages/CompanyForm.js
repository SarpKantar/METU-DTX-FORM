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
  const [innovationProjects, setInnovationProjects] = useState('');
  const [productVariety, setProductVariety] = useState('');
  const [circularDesign, setCircularDesign] = useState('');
  const [developmentPlans, setDevelopmentPlans] = useState([]);
  const [customerPreferences, setCustomerPreferences] = useState([]);
  const [additionalStrategies, setAdditionalStrategies] = useState('');
  const [optimizationConcepts, setOptimizationConcepts] = useState('');
  const [productDevelopmentMethod, setProductDevelopmentMethod] = useState('');
  const [productionStrategy, setProductionStrategy] = useState('');
  const [productConfiguration, setProductConfiguration] = useState('');
  const [workflowProcesses, setWorkflowProcesses] = useState([]);
  const [engineeringDataManagement, setEngineeringDataManagement] = useState([]);
  const [supplyChainManagement, setSupplyChainManagement] = useState('');
  const [smartProducts, setSmartProducts] = useState('');
  const [smartServices, setSmartServices] = useState([]);
  const [productionAutomationLevel, setProductionAutomationLevel] = useState('');
  const [optimalUse, setOptimalUse] = useState('');
  const [valueRecovery, setValueRecovery] = useState('');
  const [supportModels, setSupportModels] = useState('');
  const [productStrategy, setProductStrategy] = useState(''); // Add this line
  const [digitalizationStatus, setDigitalizationStatus] = useState('');
  const [digitalizationChallenges, setDigitalizationChallenges] = useState({});
  const [btSystemChains, setBtSystemChains] = useState([]); // Add this line
  const [machineControlMethod, setMachineControlMethod] = useState('');
  const [otherResponse, setOtherResponse] = useState('');
  const [digitalTechnologyReasons, setDigitalTechnologyReasons] = useState({});
  const [digitalizationGoals, setDigitalizationGoals] = useState([]);
  const [managementApproach, setManagementApproach] = useState([]);

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

  const [btSystemsUsage, setBtSystemsUsage] = useState({});

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
    internetOfThings: '', 
    arVr: '', 
    blockchain: '', 
    dataStandards: '', 
    roboticProcessAutomation: '', 
    talentWar: '', 
    newWork: '', 
    agileTeams: '', 
    valueNetworkComplexity: '' 
  });

  const navigate = useNavigate();
  const handleNext = (e) => {
    e.preventDefault();
  
    const requiredFieldsPage1 = [
      companyName,
      participantName,
      phoneNumber,
      email,
      companyAddress,
      jobTitle,
      yearsInPosition,
      companyAge,
      companySector,
      exportStatus,
      eExport,
      developmentAreas,
      productionAreas,
      revenue2022,
      revenue2021,
      innovationBudgetCurrent,
      innovationBudgetFuture,
      techInvestment,
      fullTimeEmployees,
      whiteCollarEmployees,
      blueCollarEmployees,
      associateDegreeEmployees,
      bachelorDegreeEmployees,
      masterDegreeEmployees,
      phdDegreeEmployees,
      departments.length > 0,
      digitalAssessment,
      salesMarketingActivities.length > 0
    ];
  
    const requiredFieldsPage2 = [
      btSystemsUsage,
      machineControlMethod,
      digitalizationStatus
    ];
  
    const requiredFieldsPage3 = [
      digitalizationChallenges,
      digitalTechnologyReasons
    ];
  
    const isPageValid = (requiredFields) => {
      return requiredFields.every(field => field);
    };
  
    if (currentPage === 1) {
      if (isPageValid(requiredFieldsPage1)) {
        setCurrentPage(2);
      } else {
        alert("Please fill all required fields.");
      }
    } else if (currentPage === 2) {
      if (isPageValid(requiredFieldsPage2)) {
        setCurrentPage(3);
      } else {
        alert("Please fill all required fields.");
      }
    } else if (currentPage === 3) {
      if (isPageValid(requiredFieldsPage3)) {
        setCurrentPage(4);
      } else {
        alert("Please fill all required fields.");
      }
    } 
  };

  /* Zorunlu olmayan sorular: 6, 13, 57, 60, 61, 63 */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyData = {
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
      exportStatus,
      eExport,
      exportPercentage,
      targetRegions,
      developmentAreas,
      productionAreas,
      revenue2022,
      revenue2021,
      innovationBudgetCurrent,
      innovationBudgetFuture,
      techInvestment,
      fullTimeEmployees,
      whiteCollarEmployees,
      blueCollarEmployees,
      associateDegreeEmployees,
      bachelorDegreeEmployees,
      masterDegreeEmployees,
      phdDegreeEmployees,
      departments,
      digitalAssessment,
      salesMarketingActivities,
      developmentPlans,
      innovationProjects,
      productVariety,
      customerPreferences,
      circularDesign,
      optimalUse,
      valueRecovery,
      supportModels,
      productStrategy,
      additionalStrategies,
      optimizationConcepts,
      productDevelopmentMethod,
      productionStrategy,
      productConfiguration,
      workflowProcesses,
      engineeringDataManagement,
      supplyChainManagement,
      smartProducts,
      smartServices,
      productionAutomationLevel,
      btSystemsUsage,
      machineControlMethod,
      digitalizationStatus,
      digitalizationChallenges,
      digitalTechnologyReasons,
      otherResponse,
      digitalizationGoals,
      managementApproach
    };
  
    try {
      await addDoc(collection(db, 'companyForms'), companyData);
      alert('Company form submitted successfully!');
      navigate('/login/company'); 
    } catch (error) {
      console.error('Error submitting form: ', error);
      alert('Error submitting form');
    }
  };

  const handleBtSystemChainsChange = (e) => {
    const { value, checked } = e.target;
    setBtSystemChains((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleDepartmentsChange = (e) => {
    const { value, checked } = e.target;
    setDepartments((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSalesMarketingActivitiesChange = (e) => {
    const { value, checked } = e.target;
    setSalesMarketingActivities((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleManagementApproachChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setManagementApproach([...managementApproach, name]);
    } else {
      setManagementApproach(managementApproach.filter((approach) => approach !== name));
    }
  };

  const handleDevelopmentPlansChange = (e) => {
    const { value, checked } = e.target;
    setDevelopmentPlans((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleCustomerPreferencesChange = (e) => {
    const { value, checked } = e.target;
    setCustomerPreferences((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setDigitalizationGoals([...digitalizationGoals, name]);
    } else {
      setDigitalizationGoals(digitalizationGoals.filter((goal) => goal !== name));
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

  const handleProductStrategyChange = (e) => {
    setProductStrategy(e.target.value);
  };

  const handleWorkflowProcessesChange = (e) => {
    const { value, checked } = e.target;
    setWorkflowProcesses((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleEngineeringDataManagementChange = (e) => {
    const { value, checked } = e.target;
    setEngineeringDataManagement((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSmartServicesChange = (e) => {
    const { value, checked } = e.target;
    setSmartServices((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
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
          <button type="button" className="button" onClick={() => setCurrentPage(2)}>Go to Page 2</button>
          <button type="button" className="button" onClick={() => setCurrentPage(3)}>Go to Page 3</button>
          <button type="button" className="button" onClick={() => setCurrentPage(4)}>Go to Page 4</button>
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
          <input type="checkbox" value="Finansal plan" onChange={handleDevelopmentPlansChange} /> Finansal plan: Finansal planlama, gelecekteki finansal hedefleri ve bunlara nasıl ulaşılacağını belirlemek iin mevcut finansal durumu değerlendirme sürecidir. Finansal plan, bir şirketin finansal büyümesi için yol haritası görevini gören bir belgedir.
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
        <div className="bt-systems-usage">
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
              {[
                'Yeşil Teknoloji',
                'CO2 ayak izi ve döngüsel ekonomi',
                'Yaşam döngüsü değerlendirmeleri ve Yaşam döngüsü maliyet hesaplamaları',
                'Uyumluluk ve yeni düzenlemeler',
                'BT sistemlerinin operasyonel güvenliği ve veri yönetimi',
                'Müşteri yolculuğunun karmaşıklığı (tüm ürün yaşam döngüsü aşamalarında kişiselleştirilmiş teklifler ve hizmetler)',
                'Ürün bireyselleştirme',
                'Mekatronik sistemler',
                'Ürünlerde yazılım tanımlı özellikler/ürünlerde gömülü yazılım',
                'Otonom, dinamik olarak ağa bağlı gibi özelliklere sahip daha büyük bir sistemin parçası olan karmaşık sistemler/ürünler',
                'Ürün-Hizmet Sistemleri (entegre ürün ve hizmet paketleri, varsa hizmetlerin ayrı fiyatlandırılması)',
                'Dijital hizmetler ve iş modelleri',
                'Paylaşım ekonomisi',
                'Veri ekonomisi (uzaktan hizmetlerden gelir elde etme, kestirimci bakım için)',
                'Sistem Mühendisliği, ITSM, karmaşık sistemler için geliştirme yöntemleri',
                'Dijital süreklilik/ uçtan uca entegrasyon',
                'Karmaşık sistemlerin simülasyonu ve gerçek zamanlı simülasyon',
                'Yapay zeka',
                'Dijital ikiz',
                'Dijital Platformlar ve (Çoklu) Bulut Bilişimi'
              ].map((trend, index) => (
                <tr key={index}>
                  <td>{trend}</td>
                  {[5, 4, 3, 2, 1].map((value) => (
                    <td key={value}>
                      <input
                        type="radio"
                        name={`trend-${index}`}
                        value={value}
                        checked={btSystemsUsage[`trend-${index}`] === value.toString()}
                        onChange={(e) => setBtSystemsUsage({ ...btSystemsUsage, [`trend-${index}`]: e.target.value })}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="form-group">
        <label>37. Her bir trend mevcut işinizi nasıl etkiliyor? <span className="required-star">*</span></label>
        <p>Lütfen her satır için geçerli olan cevabı seçiniz.</p>
        <div className="bt-systems-usage">
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
              {[
                'Nesnelerin interneti',
                'Sanal gerçeklik ortamları ve arayüzler (AR/VR)',
                'Blokzincir teknolojisi',
                'Veri formatları ve veri aktarımı için yeni (açık) standartlar',
                'Robotik süreç otomasyonu',
                'Yetenekler savaşı',
                'Yeni iş (mobil çalışma, yaratıcılık, sanal işbirliği)',
                'Çeviklik ve kendi kendini organize eden ekipler',
                'Değer yaratma ağlarının karmaşıklığı ve eksik dayanıklılığı'
              ].map((trend, index) => (
                <tr key={index}>
                  <td>{trend}</td>
                  {[5, 4, 3, 2, 1].map((value) => (
                    <td key={value}>
                      <input
                        type="radio"
                        name={`trend-37-${index}`}
                        value={value}
                        checked={btSystemsUsage[`trend-37-${index}`] === value.toString()}
                        onChange={(e) => setBtSystemsUsage({ ...btSystemsUsage, [`trend-37-${index}`]: e.target.value })}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        <div className="bt-systems-usage">
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
              {[
                'Hidrolik ve/veya pnömatik dahil mekanik',
                'Elektronik',
                'Yazılım',
                'Ürüne ilgili hizmetler (örn. havadan yazılım güncellemeleri, yedek parçalar, satış sonrası hizmetler, ...)',
                'Ürüne entegre edilmiş hizmetler (örn. Öngörücü Bakım)'
              ].map((component, index) => (
                <tr key={index}>
                  <td>{component}</td>
                  {[4, 3, 2, 1].map((value) => (
                    <td key={value}>
                      <input
                        type="radio"
                        name={`component-42-${index}`}
                        value={value}
                        checked={btSystemsUsage[`component-42-${index}`] === value.toString()}
                        onChange={(e) => setBtSystemsUsage({ ...btSystemsUsage, [`component-42-${index}`]: e.target.value })}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="form-group">
        <label>43. Aşağıdaki bileşenlerin/unsurların hangilerinin önümüzdeki 5 yıl içinde ürün ve hizmetlerinizle ne kadar ilgili olacağını belirtir misiniz? <span className="required-star">*</span></label>
        <p>Gelecek</p>
        <div className="bt-systems-usage">
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
              {[
                'Hidrolik ve/veya pnömatik dahil mekanik',
                'Elektronik',
                'Yazılım',
                'Ürüne ilgili hizmetler (örn. havadan yazılım güncellemeleri, yedek parçalar, satış sonrası hizmetler, ...)',
                'Ürüne entegre edilmiş hizmetler (örn. Öngörücü Bakım)'
              ].map((component, index) => (
                <tr key={index}>
                  <td>{component}</td>
                  {[4, 3, 2, 1].map((value) => (
                    <td key={value}>
                      <input
                        type="radio"
                        name={`component-43-${index}`}
                        value={value}
                        checked={btSystemsUsage[`component-43-${index}`] === value.toString()}
                        onChange={(e) => setBtSystemsUsage({ ...btSystemsUsage, [`component-43-${index}`]: e.target.value })}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    <button type="button" onClick={handleNext}>Next</button>
    <button type="button" className="button" onClick={() => setCurrentPage(1)}>Go to Page 1</button>
    <button type="button" className="button" onClick={() => setCurrentPage(3)}>Go to Page 3</button>
    <button type="button" className="button" onClick={() => setCurrentPage(4)}>Go to Page 4</button>
  </>
)}
{currentPage === 3 && (
  <>
    <div className="form-group">
      <label>45. Bunun dışında başka geçerli olan stratejiler var mı? Eğer cevabınız evet ise lütfen yazınız.</label>
      <input
        type="text"
        value={additionalStrategies}
        onChange={(e) => setAdditionalStrategies(e.target.value)}
        placeholder="Enter your answer"
      />
    </div>
          <div className="form-group">
            <label>46. Üretiminizi optimize etmek için temel kavramları kullanıyor musunuz (örneğin Toyota Üretim Sistemi, Yalın Üretim Yönetimi, Sürekli İyileştirme, Toplam Üretken Bakım, Dünya Klasında Üretim, GD³ - Yalın Geliştirme)? EVET/HAYIR</label>
            <input
              type="text"
              value={optimizationConcepts}
              onChange={(e) => setOptimizationConcepts(e.target.value)}
              placeholder="Enter your answer"
            />
          </div>

          <div className="form-group">
            <label>47. Ürün geliştirme yönteminiz nedir?</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="productDevelopmentMethod" value="Kontrat/sözleşmeli ürün geliştirme" onChange={(e) => setProductDevelopmentMethod(e.target.value)} /> Kontrat/sözleşmeli ürün geliştirme
              </label>
              <label>
                <input type="radio" name="productDevelopmentMethod" value="Kendi ürünlerinin kurum içi geliştirilmesi" onChange={(e) => setProductDevelopmentMethod(e.target.value)} /> Kendi ürünlerinin kurum içi geliştirilmesi
              </label>
              <label>
                <input type="radio" name="productDevelopmentMethod" value="Kendi ürün geliştirmesi yok" onChange={(e) => setProductDevelopmentMethod(e.target.value)} /> Kendi ürün geliştirmesi yok
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>48. Üretim Stratejinizi/Yaklaşımınızı nasıl tanımlarsınız?</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="productionStrategy" value="Tek seferlik üretim / Tek lot" onChange={(e) => setProductionStrategy(e.target.value)} /> Tek seferlik üretim / Tek lot
              </label>
              <label>
                <input type="radio" name="productionStrategy" value="Küçük seri üretim" onChange={(e) => setProductionStrategy(e.target.value)} /> Küçük seri üretim
              </label>
              <label>
                <input type="radio" name="productionStrategy" value="Seri üretim" onChange={(e) => setProductionStrategy(e.target.value)} /> Seri üretim
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>49. Ürünlerinizi nasıl yapılandırıyor ve modelliyorsunuz? Lütfen, uygun olan bir seçenek işaretleyiniz.</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="productConfiguration" value="Bilgi, belgelere dayalı olarak yönetilir ve belgelerde saklanır" onChange={(e) => setProductConfiguration(e.target.value)} /> Bilgi, belgelere dayalı olarak yönetilir ve belgelerde saklanır
              </label>
              <label>
                <input type="radio" name="productConfiguration" value="Hiyerarşik ürün yapıları kullanılmaktadır. Öznitelikler ve meta veriler ürün yapılarına bağlanır." onChange={(e) => setProductConfiguration(e.target.value)} /> Hiyerarşik ürün yapıları kullanılmaktadır. Öznitelikler ve meta veriler ürün yapılarına bağlanır.
              </label>
              <label>
                <input type="radio" name="productConfiguration" value="Hiyerarşik ürün yapıları kullanılmaktadır. Öznitelikler ve meta veriler ürün yapılarıyla bağlantılıdır. Bu, mekanik, elektrik/elektronik veya yazılım gibi ilgili tüm alanlar için geçerlidir." onChange={(e) => setProductConfiguration(e.target.value)} /> Hiyerarşik ürün yapıları kullanılmaktadır. Öznitelikler ve meta veriler ürün yapılarıyla bağlantılıdır. Bu, mekanik, elektrik/elektronik veya yazılım gibi ilgili tüm alanlar için geçerlidir.
              </label>
              <label>
                <input type="radio" name="productConfiguration" value="Alana özgü ürün yapıları (mekanik, elektrik/elektronik, yazılım) entegre edilmiştir (örneğin çoklu CAD malzeme listesi)" onChange={(e) => setProductConfiguration(e.target.value)} /> Alana özgü ürün yapıları (mekanik, elektrik/elektronik, yazılım) entegre edilmiştir (örneğin çoklu CAD malzeme listesi)
              </label>
              <label>
                <input type="radio" name="productConfiguration" value="Alt sistem modeli ve alana özgü modeller temel unsurlarımızdır (gereksinimler, işlevler, ürünler ve test durumları çift yönlü olarak bağlantılıdır)" onChange={(e) => setProductConfiguration(e.target.value)} /> Alt sistem modeli ve alana özgü modeller temel unsurlarımızdır (gereksinimler, işlevler, ürünler ve test durumları çift yönlü olarak bağlantılıdır)
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>50. Ürün oluşturma sürecinizdeki iş akışları ve süreçler nasıl uygulanıyor? Lütfen, uygun olanların hepsini işaretleyiniz.</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" value="Dijital ama belge tabanlı" onChange={(e) => handleWorkflowProcessesChange(e)} /> Dijital ama belge tabanlı
              </label>
              <label>
                <input type="checkbox" value="Sistem içi iş akışları" onChange={(e) => handleWorkflowProcessesChange(e)} /> Sistem içi iş akışları
              </label>
              <label>
                <input type="checkbox" value="Sistemler ve alanlar arası iş akışları" onChange={(e) => handleWorkflowProcessesChange(e)} /> Sistemler ve alanlar arası iş akışları
              </label>
              <label>
                <input type="checkbox" value="Siparişi gerçekleştirmek için otomatikleştirilmiş standart süreçler (örn. satın alma ve mühendisliğin birbirine bağlanması, depo yönetimi)" onChange={(e) => handleWorkflowProcessesChange(e)} /> Siparişi gerçekleştirmek için otomatikleştirilmiş standart süreçler (örn. satın alma ve mühendisliğin birbirine bağlanması, depo yönetimi)
              </label>
              <label>
                <input type="checkbox" value="Disiplinler arası ürün geliştirme için otomatikleştirilmiş standart süreçler (Alanlar arası parça listelerinin türetilmesi, iş emirlerinin otomatik oluşturulması)" onChange={(e) => handleWorkflowProcessesChange(e)} /> Disiplinler arası ürün geliştirme için otomatikleştirilmiş standart süreçler (Alanlar arası parça listelerinin türetilmesi, iş emirlerinin otomatik oluşturulması)
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>51. Mühendislik verilerinizi nasıl yönetiyor ve saklıyorsunuz? Geçerli olan cevaplardan tümünü seçiniz.</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" value="Kağıt tabanlı" onChange={(e) => handleEngineeringDataManagementChange(e)} /> Kağıt tabanlı
              </label>
              <label>
                <input type="checkbox" value="Dosya sistemi, doküman klasörleri" onChange={(e) => handleEngineeringDataManagementChange(e)} /> Dosya sistemi, doküman klasörleri
              </label>
              <label>
                <input type="checkbox" value="Belge yönetim sistemi (Sharepoint, …)" onChange={(e) => handleEngineeringDataManagementChange(e)} /> Belge yönetim sistemi (Sharepoint, …)
              </label>
              <label>
                <input type="checkbox" value="Sisteme özgü veri tabanları (ERP, PLM, ...)" onChange={(e) => handleEngineeringDataManagementChange(e)} /> Sisteme özgü veri tabanları (ERP, PLM, ...)
              </label>
              <label>
                <input type="checkbox" value="Birbirine bağlı veri tabanları (Tek Kaynak/ Veri Gölü)" onChange={(e) => handleEngineeringDataManagementChange(e)} /> Birbirine bağlı veri tabanları (Tek Kaynak/ Veri Gölü)
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>52. Tedarik zinciri yönetiminizi (SCM) nasıl gerçekleştiriyorsunuz? Lütfen bir seçenek işaretleyiniz.</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="supplyChainManagement" value="Tedarik zinciri süreçleri açıkça tanımlanmamıştır. Tedarik zinciri içindeki her kuruluş, kendi yönetim sistemlerini kullanarak süreçlerini ayrı ayrı yönetir." onChange={(e) => setSupplyChainManagement(e.target.value)} /> Tedarik zinciri süreçleri açıkça tanımlanmamıştır. Tedarik zinciri içindeki her kuruluş, kendi yönetim sistemlerini kullanarak süreçlerini ayrı ayrı yönetir.
              </label>
              <label>
                <input type="radio" name="supplyChainManagement" value="Tedarik zinciri süreçleri, manuel ve kâğıt tabanlı araçların desteğiyle insanlar tarafından tanımlanır ve yürütülür." onChange={(e) => setSupplyChainManagement(e.target.value)} /> Tedarik zinciri süreçleri, manuel ve kâğıt tabanlı araçların desteğiyle insanlar tarafından tanımlanır ve yürütülür.
              </label>
              <label>
                <input type="radio" name="supplyChainManagement" value="Tanımlanmış tedarik zinciri entegrasyon süreçleri, dijital araçların desteğiyle insanlar tarafından tamamlanır." onChange={(e) => setSupplyChainManagement(e.target.value)} /> Tanımlanmış tedarik zinciri entegrasyon süreçleri, dijital araçların desteğiyle insanlar tarafından tamamlanır.
              </label>
              <label>
                <input type="radio" name="supplyChainManagement" value="Dijitalleştirilmiş tedarik zinciri süreçleri ve sistemleri, sınırlı insan müdahalesi ile değer zinciri boyunca iş ortakları ve müşteriler arasında güvenli bir şekilde entegre edilir." onChange={(e) => setSupplyChainManagement(e.target.value)} /> Dijitalleştirilmiş tedarik zinciri süreçleri ve sistemleri, sınırlı insan müdahalesi ile değer zinciri boyunca iş ortakları ve müşteriler arasında güvenli bir şekilde entegre edilir.
              </label>
              <label>
                <input type="radio" name="supplyChainManagement" value="Otomatik tedarik zinciri süreçleri ve sistemleri verileri aktif olarak analiz etmekte ve bunlara tepki vermektedir. Tedarik zinciri birlikte çalışabilirliği güvenli ve gerçek zamanlı iletişim yeteneğine sahiptir." onChange={(e) => setSupplyChainManagement(e.target.value)} /> Otomatik tedarik zinciri süreçleri ve sistemleri verileri aktif olarak analiz etmekte ve bunlara tepki vermektedir. Tedarik zinciri birlikte çalışabilirliği güvenli ve gerçek zamanlı iletişim yeteneğine sahiptir.
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>53. Müşterinize akıllı ürünler sunuyor musunuz? Lütfen, uygun olan bir seçenek işaretleyiniz.</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="smartProducts" value="Akıllı ürünümüz yok" onChange={(e) => setSmartProducts(e.target.value)} /> Akıllı ürünümüz yok
              </label>
              <label>
                <input type="radio" name="smartProducts" value="Bazı ürünlerimiz akıllı" onChange={(e) => setSmartProducts(e.target.value)} /> Bazı ürünlerimiz akıllı
              </label>
              <label>
                <input type="radio" name="smartProducts" value="Ürünlerimizin yaklaşık %50'si akıllı" onChange={(e) => setSmartProducts(e.target.value)} /> Ürünlerimizin yaklaşık %50'si akıllı
              </label>
              <label>
                <input type="radio" name="smartProducts" value="Hepsi veya tamamına yakın ürünümüz akıllı" onChange={(e) => setSmartProducts(e.target.value)} /> Hepsi veya tamamına yakın ürünümüz akıllı
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>54. Müşterinize akıllı hizmetler sunuyor musunuz? Birden fazla seçenek işaretleyebilirsiniz.</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" value="Müşterilerimize hizmet sunuyoruz, ancak bunlar akıllı değil" onChange={(e) => handleSmartServicesChange(e)} /> Müşterilerimize hizmet sunuyoruz, ancak bunlar akıllı değil
              </label>
              <label>
                <input type="checkbox" value="Müşterilerimize akıllı veya internet tabanlı hizmetler sunuyoruz." onChange={(e) => handleSmartServicesChange(e)} /> Müşterilerimize akıllı veya internet tabanlı hizmetler sunuyoruz.
              </label>
              <label>
                <input type="checkbox" value="Entegre ürün-hizmet sistemleri (paket/değer önerisi olarak ürün ve hizmetler) sunuyoruz." onChange={(e) => handleSmartServicesChange(e)} /> Entegre ürün-hizmet sistemleri (paket/değer önerisi olarak ürün ve hizmetler) sunuyoruz.
              </label>
              <label>
                <input type="checkbox" value="Müşterilerimize PAAS (Platform as a Service), IAAS (Infrastructure as a Service) veya SAAS (Software as a Service) gibi iş modelleri sunuyoruz." onChange={(e) => handleSmartServicesChange(e)} /> Müşterilerimize PAAS (Platform as a Service), IAAS (Infrastructure as a Service) veya SAAS (Software as a Service) gibi iş modelleri sunuyoruz.
              </label>
              <label>
                <input type="checkbox" value="Müşterilerimize performansa dayalı iş modelleri (kullanım başına ödeme planları gibi) sunuyoruz." onChange={(e) => handleSmartServicesChange(e)} /> Müşterilerimize performansa dayalı iş modelleri (kullanım başına ödeme planları gibi) sunuyoruz.
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>55. Şirketinizdeki üretim otomasyonunun seviyesi nedir? Lütfen bir adet seçenek işaretleyiniz.</label>
            <div className="radio-group">
          <label>
            <input type="radio" name="productionAutomationLevel" value="Üretim süreçleri manuel olarak yapılmaktadır." onChange={(e) => setProductionAutomationLevel(e.target.value)} /> Üretim süreçleri manuel olarak yapılmaktadır.
          </label>
          <label>
            <input type="radio" name="productionAutomationLevel" value="İnsan müdahalesi gerektiren makine ve ekipman uygulamaları" onChange={(e) => setProductionAutomationLevel(e.target.value)} /> İnsan müdahalesi gerektiren makine ve ekipman uygulamaları
          </label>
          <label>
            <input type="radio" name="productionAutomationLevel" value="Bilgisayar tabanlı makine ve ekipmanların minimum insan müdahalesi ile uygulanması (örneğin, süreci başlatmak ve bitirmek için veya planlanmamış olaylar için insan müdahalesi gereklidir)." onChange={(e) => setProductionAutomationLevel(e.target.value)} /> Bilgisayar tabanlı makine ve ekipmanların minimum insan müdahalesi ile uygulanması (örneğin, süreci başlatmak ve bitirmek için veya planlanmamış olaylar için insan müdahalesi gereklidir).
          </label>
          <label>
            <input type="radio" name="productionAutomationLevel" value="Ekipman, makine ve bilgisayar tabanlı sistemlerin modifikasyonu, yeniden yapılandırılması ve yeniden görevlendirilmesi, sınırlı insan müdahalesi ile hızlı ve kolay bir şekilde yapılabiliyor" onChange={(e) => setProductionAutomationLevel(e.target.value)} /> Ekipman, makine ve bilgisayar tabanlı sistemlerin modifikasyonu, yeniden yapılandırılması ve yeniden görevlendirilmesi, sınırlı insan müdahalesi ile hızlı ve kolay bir şekilde yapılabiliyor
          </label>
          <label>
            <input type="radio" name="productionAutomationLevel" value="Makinelerimiz tamamen entegre ve analitik kabiliyete sahip, tepki verebilen, değişiklikleri aktarabilen ve atölye ve kurumsal yönetim sistemleriyle yakınsayan bir yapıya sahip" onChange={(e) => setProductionAutomationLevel(e.target.value)} /> Makinelerimiz tamamen entegre ve analitik kabiliyete sahip, tepki verebilen, değişiklikleri aktarabilen ve atölye ve kurumsal yönetim sistemleriyle yakınsayan bir yapıya sahip
          </label>
        </div>
        </div>

  <div className="form-group">
  <label>56. Şirketinizde aşağıdaki BT-Sistemlerinden hangilerini halihazırda kullanıyorsunuz? Ve bunların kullanım yoğunluğu nedir? (Lütfen her satır için geçerli olan cevabı seçiniz.)</label>
  <div className="bt-systems-usage">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>5-Tam işlevsellik</th>
          <th>4-genişletilmiş işlevsellik</th>
          <th>3-Temel işlevsellik</th>
          <th>2-mevcut değil ancak kısa vadede olacak</th>
          <th>1-mevcut değil ve kısa vadede olmayacak</th>
        </tr>
      </thead>
      <tbody>
        {[
          { label: 'İçerik/Doküman Yönetim Sistemi (İYS/DYS)', key: 'iysDys' },
          { label: 'Proje Yönetim Araçları (çevik yönetim dahil)', key: 'projectManagement' },
          { label: 'Müşteri İlişkileri Yönetimi (CRM)', key: 'crm' },
          { label: 'Ürün Verisi/Yaşam Döngüsü Yönetimi (PDM/PLM)', key: 'pdmPlm' },
          { label: 'Bilgisayar Destekli Tasarım (CAD)', key: 'cad' },
          { label: 'Elektronik CAD (ECAD)', key: 'ecad' },
          { label: 'Bilgisayar Destekli Mühendislik (CAE) (FEM, CFD, MBS, ...)', key: 'cae' },
          { label: 'Bilgisayar Destekli Üretim (CAM)', key: 'cam' },
          { label: 'Kurumsal Kaynak Planlama (ERP)', key: 'erp' },
          { label: 'Üretim Yürütme Sistemi (MES)', key: 'mes' },
          { label: 'Üretim Operasyonları Yönetimi (MOM)', key: 'mom' },
          { label: 'Tedarik zinciri yönetim araçları / network planlama araçları', key: 'supplyChain' },
          { label: 'Tedarikçi entegrasyonu araçları (veri alışverişi platformu, sanal masaüstü, EDI...)', key: 'integrationTools' }
        ].map((system) => (
          <tr key={system.key}>
            <td>{system.label}</td>
            {[5, 4, 3, 2, 1].map((value) => (
              <td key={value}>
                <input
                  type="radio"
                  name={system.key}
                  value={value}
                  checked={btSystemsUsage[system.key] === value.toString()}
                  onChange={(e) => setBtSystemsUsage({ ...btSystemsUsage, [system.key]: e.target.value })}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  <div className="form-group question-57">
        <label>57. Şirketinizde bu BT sistemlerinin mevcut olduğunu söyleyiniz. Lütfen şirketinizde halihazırda mevcut olan BT-Araç zincirlerini (sistemler arasında veri aktarımı ve iş akışları için ara yüzler) belirtir misiniz? Uygun olanları seçiniz.</label>
        <p><i>BİR ÖNCEKİ ENTEGRASYON SORUSUNUN TAKİP SORUSU</i></p>
        <p><i>Bu soru, 57. soruda, 5-4-3 (Tam, Genişletilmiş, Temel işlevsellik) cevaplarını veren katılımcılar içindir.</i></p>
        {[
          'CRM-PLM',
          'CRM-ERP',
          'CAD – CAM',
          'CAD – PLM',
          'E-CAD – PLM',
          'PLM – CAE (Simülasyon Platformu)',
          'PLM – ERP',
          'PLM – MES'
        ].map((chain) => (
          <div className="checkbox-group" key={chain}>
            <input
              type="checkbox"
              value={chain}
              checked={btSystemChains.includes(chain)}
              onChange={handleBtSystemChainsChange}
            />
            <label>{chain}</label>
          </div>
        ))}
      </div>
              <button type="button" onClick={handleNext}>Next</button>
              <button type="button" className="button" onClick={() => setCurrentPage(1)}>Go to Page 1</button>
              <button type="button" className="button" onClick={() => setCurrentPage(2)}>Go to Page 2</button>
              <button type="button" className="button" onClick={() => setCurrentPage(4)}>Go to Page 4</button>
            </>
          )}

  {currentPage === 4 && (
          <>
            <div className="form-group question-58">
            <label>58. Üretim sürecinde kullandığınız ana makine kontrol yöntemi nedir? *</label>
            <p>Lütfen aşağıdakilerden sadece birini seçin.</p>
            <p><strong>SCADA'nın Tanımı:</strong> SCADA, Denetleyici Kontrol ve Veri Toplama anlamına gelir. Üretim, enerji üretimi ve altyapı sistemleri gibi endüstriyel süreçleri izlemek ve kontrol etmek için kullanılan bir sistemi ifade eder. SCADA sistemleri tipik olarak çeşitli sensörlerden ve cihazlardan gerçek zamanlı veri toplayan ve ardından elde edilen yazılım, donanım ve ağ bileşenlerinden oluşur. Bu veriler daha sonra bir kontrol odasındaki operatörlere gösterilerek operatörlerin bilinçli kararlar almalarına ve süreçleri kontrol etmelerine olanak tanır. SCADA sistemleri karmaşık endüstriyel operasyonların yönetilmesinde ve optimize edilmesinde çok önemli bir rol oynar.</p>
            <div className="bt-systems-usage">
              {[
                'Röle tabanlı sistem uygulamaları',
                'PLC/CNC tabanlı sistem uygulamaları',
                'Yerel ağ özelliğine sahip PLC/SCADA/CNC tabanlı sistem uygulamaları',
                'Analitik kabiliyete sahip geniş ağ SCADA/CNC tabanlı sistem uygulamaları',
                'Tepki verebilen, değişiklikleri aktarabilen ve kurumsal yönetim sistemleriyle birleşebilen tam entegre SCADA tabanlı sistem uygulamaları'
              ].map((method, index) => (
                <div className="checkbox-group" key={index}>
                  <input
                    type="radio"
                    name="machineControlMethod"
                    value={method}
                    checked={machineControlMethod === method}
                    onChange={(e) => setMachineControlMethod(e.target.value)}
                  />
                  <label>{method}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group question-59">
            <label>59. Aşağıdaki ifadelerden şirketinize en uygun olan seçeneği işaretleyiniz. *</label>
            <div className="bt-systems-usage">
              {[
                '1- Dijitalleşmiş bir şirketiz, ciromuzun önemli bir kısmını dijital kapasitemizi (modelleme, prototipleme, test etme, satış) geliştirmeye ayırıyoruz.',
                '2- Şirketimizin dijitalleşmiş olduğunu söylemek zor, ancak yakın zamanda dijital dönüşüm için bir miktar bütçe harcadık.',
                '3- Şirketimiz ağırlıklı olarak dijital olmayan üretim ve satışa odaklanmıştır; şimdiye kadar dijital tasarım / modelleme / prototipleme / satış konusunda herhangi bir çalışma yapmadık, ancak yakın gelecekte dijitalleşmeye yatırım yapmayı planlıyoruz.',
                '4- Şirketimiz ağırlıklı olarak dijital olmayan üretim ve satışa odaklanmıştır; şimdiye kadar dijital tasarım / modelleme / prototipleme / satış konusunda herhangi bir çalışma yapmadık, yakın gelecekte yapacağımızı sanmıyoruz.'
              ].map((status, index) => (
                <div className="checkbox-group" key={index}>
                  <input
                    type="radio"
                    name="digitalizationStatus"
                    value={status}
                    checked={digitalizationStatus === status}
                    onChange={(e) => setDigitalizationStatus(e.target.value)}
                  />
                  <label>{status}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>60. SORU 59'da 2-3-4 SEÇENEKLERİNİ İŞARETLEDİYSENİZ CEVAPLAYINIZ.</label>
            <p>Şirketinizin tamamen dijitalleşmediğini söylediniz? Neden? Lütfen bu zorlukların dijitalleşmenizi ne derece etkilediğini belirtir misiniz?</p>
            <div className="bt-systems-usage">
              <table>
                <thead>
                  <tr>
                    <th>Zorluk</th>
                    <th>5-Çok etkiliyor</th>
                    <th>4-Etkiliyor</th>
                    <th>3-Biraz etkiliyor</th>
                    <th>2-Pek etkilemiyor</th>
                    <th>1-Hiç etkilemiyor</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'Üretimimiz dijital üretim metodları gerektirmiyor',
                    'Dijital teknoloji sağlayıcıları yetersiz',
                    'Katı süreçlerimiz ve/veya kurumsal yapılarımız var',
                    'Mali sorunlarımız/bütçe yetersizliğimiz var',
                    'Dijital dönüşüm pahalı',
                    'İş yükümüz çok fazla',
                    'Çalışanlarımız değişim sürecine katılma konusunda isteksiz',
                    'Yönetimimiz dijital dönüşümü düşünmüyor',
                    'Mevcut BT sistemlerimiz kısıtlı (eski/güncellenmiş versiyonu/kötü BT sistemleri, eksik yazılımlar, genel olarak eksik yazılım sistemleri dahil)',
                    'Yetersiz devlet teşvikleri',
                    'Dijital dönüşüm için gerekli kalifiye personelimiz yok (Dijital dönüşümle ilgili yanlış/eksik çalışan becerileri)',
                    'Tüketicilerimiz bu teknolojiyi talep etmiyor',
                    'Rakiplerimizin hiçbiri bu teknolojiye sahip değil',
                    'Nitelikli uzmanlara ulaşamıyoruz/bulamıyoruz',
                    'Kısıtlı envanterimiz var (eski makinelerden dijital süreçlere entegrasyonu, eski makinelerden elde edilen verilerin dijital sistemlerde kullanılamaması)',
                    'Erişiminizin kısıtlayıcı ve sınırlayıcı olması (örneğin, geniş bant erişiminin olmaması)',
                    'Dijital dönüşüm için eksik veya belirsiz düzenlemeler (örneğin, geleceğe yönelik veri alışverişi formatlarının, yazılım mimarilerinin, dokümantasyon düzenlemelerinin seçimine ilişkin endişeler)',
                    'Faydalarından emin değiliz',
                    'Yenilikçi olmayan bir şirket kültürümüz var',
                    'Dijitalleşme stratejimiz ve yol haritamız yok'
                  ].map((challenge, index) => (
                    <tr key={index}>
                      <td>{challenge}</td>
                      {[5, 4, 3, 2, 1].map((value) => (
                        <td key={value}>
                          <input
                            type="radio"
                            name={`digitalizationChallenge-${index}`}
                            value={value}
                            checked={digitalizationChallenges[`digitalizationChallenge-${index}`] === value.toString()}
                            onChange={(e) => setDigitalizationChallenges({ ...digitalizationChallenges, [`digitalizationChallenge-${index}`]: e.target.value })}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="form-group">
            <label>61. DİĞER (Lütfen yazınız)</label>
            <input
              type="text"
              name="otherResponse"
              value={otherResponse}
              onChange={(e) => setOtherResponse(e.target.value)}
              placeholder="Yanıtınızı girin"
            />
          </div>
          <div className="form-group">
            <label>62. Aşağıdaki dijital teknolojileri kullanma sebeplerinin şirketiniz için önem derecesini belirtir misiniz? *</label>
            <div className="bt-systems-usage">
              <table>
                <thead>
                  <tr>
                    <th>Sebepler</th>
                    <th>5-Çok önemli</th>
                    <th>4-Önemli</th>
                    <th>3-Ne önemli ne önemsiz</th>
                    <th>2-Pek önemli değil</th>
                    <th>1-Hiç önemli değil</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'Yeni müşterilerin taleplerini karşılama',
                    'COVID-19 sırasında dijitalleşmenin öneminin artması',
                    'Rekabette geride kalma endişeleri',
                    'Geleceğe daha kolay ve hızlı uyum sağlama',
                    'Üretim ve süreç verimliliği',
                    'Hizmetlerin sağlanmasının kolaylaştırılması',
                    'Müşteri talep ve beklentilerini yakından analiz etme',
                    'Sektörde lider olma',
                    'Pazara sunma süresinde azalma',
                    'Süreç ve ürün kalitesinin artması',
                    'Düşük ürün geliştirme ve üretim maliyetleri',
                    'Verilerin etkin kullanımı'
                  ].map((reason, index) => (
                    <tr key={index}>
                      <td>{reason}</td>
                      {[5, 4, 3, 2, 1].map((value) => (
                        <td key={value}>
                          <input
                            type="radio"
                            name={`digitalTechnologyReason-${index}`}
                            value={value}
                            checked={digitalTechnologyReasons[`digitalTechnologyReason-${index}`] === value.toString()}
                            onChange={(e) => setDigitalTechnologyReasons({ ...digitalTechnologyReasons, [`digitalTechnologyReason-${index}`]: e.target.value })}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="form-group">
            <label>63. DİĞER (Lütfen yazınız)</label>
            <input
              type="text"
              name="otherResponse"
              value={otherResponse}
              onChange={(e) => setOtherResponse(e.target.value)}
              placeholder="Yanıtınızı girin"
            />
          </div>
          <div className="form-group question-64">
            <label>64. Aşağıdaki ifadelerden şirketinizin dijitalleşme hedefleri veya stratejisine en çok uyan ifadeleri seçiniz. *</label>
            <div className="bt-systems-usage">
              {[
                'Yönetim toplantılarımızda dijitalleşme ve dijital dönüşüm konularını düzenli olarak görüşüyoruz.',
                'Dijitalleşme hedeflerimiz şirket yönetimimiz ve ona bağlı çalışanlarımız tarafından geliştirilmektedir.',
                'Resmi ve belgelenmiş dijitalleşme hedeflerimiz var; bu hedefler şirketimizin stratejik hedefleriyle bağlantılı.',
                'Şirketimizde dijitalleşme ve dijital dönüşüm bağlamındaki girişimlerin planlanması, yönetilmesi ve yürütülmesinden sorumlu bir pozisyonumuz (CDO – Baş Dijital Sorumlusu gibi bir rol tanımıyla) bulunmaktadır.',
                'Resmi ve belgelenmiş bir dijitalleşme stratejimiz var.',
                'Dijitalleşme stratejimiz şirketimizin iş stratejisiyle bağlantılıdır.',
                'Dijitalleşme stratejimiz düzenli olarak gözden geçirilmektedir.',
                'Dijitalleşme stratejisi ölçütlerimiz ve ilgili KPI’larımız/hedeflerimiz mevcuttur.',
                'Dijitalleşme stratejisi sürecimiz ve stratejinin güncellenmesi şirket içindeki tüm çalışanlara şeffaf bir şekilde aktarılmaktadır.',
                'Kuruluşumuzu, ürünlerimizi veya süreçlerimizi dijitalleştirmek için bütçe ve kaynak ayırdığımız programlarımız ve projelerimiz var.',
                'Dijitalleşme stratejimiz mevcut değil.'
              ].map((goal, index) => (
                <div className="checkbox-group" key={index}>
                  <input
                    type="checkbox"
                    name={`digitalizationGoal-${index}`}
                    checked={digitalizationGoals.includes(`digitalizationGoal-${index}`)}
                    onChange={handleCheckboxChange}
                  />
                  <label>{goal}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group question-65">
            <label>65. Yönetiminizin dijital dönüşümü yönlendirme ve gerçekleştirme ile ilgili yaklaşımını ve kapasitesini şu ifadelere bakarak belirtir misiniz? Uygun olan tüm şıkları seçebilirsiniz. *</label>
            <div className="bt-systems-usage">
              {[
                'Yönetim dijital dönüşüme, akıllı ürün ve hizmetlerin gerekliliklerine ve dijital teknolojilere/trendlere aşina değildir.',
                'Yönetim, dijital dönüşümün gerektirdiği değişikliklerin farkındadır, ancak yanıt vermeden veya girişimleri geliştirmek için dış taraflara bağlı kalmadan önce meslektaşları tarafından kitlesel olarak benimsenmesini beklemeyi tercih etmektedir. (Bekle ve gör)',
                'Yönetim, stratejik bir bakış açısına ve dijital dönüşümün yarattığı fırsat ve tehditleri detaylı analiz etme yetisine sahiptir ve bunu erken benimseyenlerden olmak için bir plan hazırlamaktadır. (Hızlı takipçi)',
                'Yönetim, son teknoloji ve trendlere yararlanıyor ve erken benimseyenlerden olmak için sürdürülebilir bir plan geliştiriyor, şirket içinde dijitalleşmeyi başarılı uygulamak için kaynakları verimli bir şekilde organize ve koordine ediyor. (Hız belirleyici)',
                'Yönetim, dijital dönüşümle ilgili net bir vizyona ve hayal gücüne sahip, kurumsal dönüşüm çerçevesini değişen ihtiyaçlara ve teknoloji trendlerine kendi bağımsız kararlarıyla uyarlayıp uygulayabiliyor.',
                'Yönetim, sürekli olarak gözden geçirilen, izlenen ve sürdürülebilir bir plan uygulayabiliyor.',
                'Yönetim, personeli dijital dönüşüme motive etmek ve hazırlamak için her bir personel grubuyla özel iletişim kuruyor.'
              ].map((approach, index) => (
                <div className="checkbox-group" key={index}>
                  <input
                    type="checkbox"
                    name={`managementApproach-${index}`}
                    checked={managementApproach.includes(`managementApproach-${index}`)}
                    onChange={handleManagementApproachChange}
                  />
                  <label>{approach}</label>
                </div>
              ))}
            </div>
          </div>
            <button type="submit" className="button">Submit</button>
            <button type="button" className="button" onClick={() => setCurrentPage(1)}>Go to Page 1</button>
            <button type="button" className="button" onClick={() => setCurrentPage(2)}>Go to Page 2</button>
            <button type="button" className="button" onClick={() => setCurrentPage(3)}>Go to Page 3</button>
          </>
        )}

      </form>
    </div>
  );
};

export default CompanyForm;