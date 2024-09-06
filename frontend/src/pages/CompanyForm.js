import React, { useState, useEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, doc, setDoc, getDoc ,getDocs, doc, query, where } from 'firebase/firestore';
import '../styling/CompanyForm.css';
import { useAuth } from "../context/AuthContext";

const CompanyForm = () => {
  const { currentUser } = useAuth(); // Kullanıcı kimliğini almak için
  const [email, setEmail] = useState(currentUser ? currentUser.email : '');

  const initialPage = parseInt(localStorage.getItem('currentPage'), 10) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [companyName, setCompanyName] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
  const [salesReasons, setSalesReasons] = useState([]);
  const [valueRecovery, setValueRecovery] = useState('');
  const [supportModels, setSupportModels] = useState('');
  const [productStrategy, setProductStrategy] = useState(''); // Add this line
  const [digitalizationStatus, setDigitalizationStatus] = useState('');
  const [digitalizationChallenges, setDigitalizationChallenges] = useState({});
  const [btSystemChains, setBtSystemChains] = useState([]); // Add this line
  const [machineControlMethod, setMachineControlMethod] = useState('');
  const [digitalTechnologyReasons, setDigitalTechnologyReasons] = useState({});
  const [digitalizationGoals, setDigitalizationGoals] = useState([]);
  const [managementApproach, setManagementApproach] = useState([]);
  const [otherJobTitle, setOtherJobTitle] = useState('');
  const [otherDepartment, setOtherDepartment] = useState('');
  const [otherDepartment35, setOtherDepartment35] = useState('');
  const [companyID, setCompanyID] = useState(''); // State for companyID
  const [otherResponse61, setOtherResponse61] = useState('');
  const [otherResponse63, setOtherResponse63] = useState('');
  const [btSystemsUsage36, setBtSystemsUsage36] = useState({});
  const [btSystemsUsage37, setBtSystemsUsage37] = useState({});
  const [btSystemsUsage42, setBtSystemsUsage42] = useState({});
  const [btSystemsUsage43, setBtSystemsUsage43] = useState({});
  const [btSystemsUsage56, setBtSystemsUsage56] = useState({});

  
  useEffect(() => {
    const savedCurrentPage = localStorage.getItem('currentPage');
    if (savedCurrentPage) {
      setCurrentPage(parseInt(savedCurrentPage, 10));
      console.log('Loaded currentPage from localStorage:', savedCurrentPage);
    }
  }, []); // Bu kancanın ilk sırada olduğundan emin olun
  
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    console.log('Saved currentPage to localStorage:', currentPage);
  }, [currentPage]);

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      console.log('Loaded Saved Form Data:', savedFormData); // Konsol logu ekleyelim
      setCompanyName(savedFormData.companyName || '');
      setParticipantName(savedFormData.participantName || '');
      setPhoneNumber(savedFormData.phoneNumber || '');
      setCompanyAddress(savedFormData.companyAddress || '');
      setCompanyWebsite(savedFormData.companyWebsite || '');
      setJobTitle(savedFormData.jobTitle || '');
      setOtherJobTitle(savedFormData.otherJobTitle || ''); // Diğer iş unvanını yükleyelim
      setYearsInPosition(savedFormData.yearsInPosition || '');
      setCompanyAge(savedFormData.companyAge || '');
      setCompanySector(savedFormData.companySector || '');
      setExportStatus(savedFormData.exportStatus || '');
      setEExport(savedFormData.eExport || '');
      setExportPercentage(savedFormData.exportPercentage || '');
      setTargetRegions(savedFormData.targetRegions || []);
      setDevelopmentAreas(savedFormData.developmentAreas || '');
      setProductionAreas(savedFormData.productionAreas || '');
      setRevenue2022(savedFormData.revenue2022 || '');
      setRevenue2021(savedFormData.revenue2021 || '');
      setInnovationBudgetCurrent(savedFormData.innovationBudgetCurrent || '');
      setInnovationBudgetFuture(savedFormData.innovationBudgetFuture || '');
      setTechInvestment(savedFormData.techInvestment || '');
      setFullTimeEmployees(savedFormData.fullTimeEmployees || '');
      setWhiteCollarEmployees(savedFormData.whiteCollarEmployees || '');
      setBlueCollarEmployees(savedFormData.blueCollarEmployees || '');
      setAssociateDegreeEmployees(savedFormData.associateDegreeEmployees || '');
      setBachelorDegreeEmployees(savedFormData.bachelorDegreeEmployees || '');
      setMasterDegreeEmployees(savedFormData.masterDegreeEmployees || '');
      setPhdDegreeEmployees(savedFormData.phdDegreeEmployees || '');
      setDepartments(savedFormData.departments || []);
      setDigitalAssessment(savedFormData.digitalAssessment || '');
      setSalesMarketingActivities(savedFormData.salesMarketingActivities || []);
      setInnovationProjects(savedFormData.innovationProjects || '');
      setProductVariety(savedFormData.productVariety || '');
      setCircularDesign(savedFormData.circularDesign || '');
      setDevelopmentPlans(Array.isArray(savedFormData.developmentPlans) ? savedFormData.developmentPlans : []);
      setCustomerPreferences(savedFormData.customerPreferences || []);
      setAdditionalStrategies(savedFormData.additionalStrategies || '');
      setOptimizationConcepts(savedFormData.optimizationConcepts || '');
      setProductDevelopmentMethod(savedFormData.productDevelopmentMethod || '');
      setProductionStrategy(savedFormData.productionStrategy || '');
      setProductConfiguration(savedFormData.productConfiguration || '');
      setWorkflowProcesses(savedFormData.workflowProcesses || []);
      setEngineeringDataManagement(savedFormData.engineeringDataManagement || []);
      setSupplyChainManagement(savedFormData.supplyChainManagement || '');
      setSmartProducts(savedFormData.smartProducts || '');
      setSmartServices(savedFormData.smartServices || []);
      setProductionAutomationLevel(savedFormData.productionAutomationLevel || '');
      setBtSystemsUsage36(savedFormData.btSystemsUsage36 || {});
      setBtSystemsUsage37(savedFormData.btSystemsUsage37 || {});
      setBtSystemsUsage42(savedFormData.btSystemsUsage42 || {});
      setBtSystemsUsage43(savedFormData.btSystemsUsage43 || {});
      setBtSystemChains(savedFormData.btSystemChains || []);
      setMachineControlMethod(savedFormData.machineControlMethod || '');
      setDigitalizationStatus(savedFormData.digitalizationStatus || '');
      setDigitalizationChallenges(savedFormData.digitalizationChallenges || {});
      setOtherResponse61(savedFormData.otherResponse61 || '');
      setDigitalTechnologyReasons(savedFormData.digitalTechnologyReasons || {});
      setDigitalizationGoals(savedFormData.digitalizationGoals || []);
      setManagementApproach(savedFormData.managementApproach || []);
      setOtherResponse63(savedFormData.otherResponse63 || '');
      setSalesReasons(savedFormData.salesReasons || []);
      setOtherDepartment35(savedFormData.otherDepartment35 || '');
    }
  }, [email]);

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

  const handleInputChange = (name, value) => {
    const savedFormData = JSON.parse(localStorage.getItem('formData')) || {};
    savedFormData[name] = value;
    localStorage.setItem('formData', JSON.stringify(savedFormData));
    console.log('Saved Form Data:', savedFormData); // Konsol logu ekleyelim
  };

const handleJobTitleChange = (e) => {
  const { value } = e.target;
  setJobTitle(value);
  if (value !== 'other') {
    setOtherJobTitle('');
    handleInputChange('otherJobTitle', '');
  }
  handleInputChange('jobTitle', value);
};

  useEffect(() => {
    const fetchCompanyID = async () => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user) {
        console.log('User UID:', user.uid); // Debugging line
        // Query the companyUsers collection using the user's email
        const querySnapshot = await getDocs(query(collection(db, 'companyUsers'), where('email', '==', user.email)));
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Get the first matching document
          console.log('User Document Data:', userDoc.data()); // Debugging line
          setCompanyID(userDoc.data().companyID); // Set the companyID from Firestore
        } else {
          console.error('No such document in companyUsers collection!'); // Debugging line
        }
      } else {
        console.error('No user found in sessionStorage!'); // Debugging line
      }
    };

    fetchCompanyID();
  }, []);

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engelle
    const requiredFields = {
        1: [
            { field: companyName, questionNumber: 1 },
            { field: participantName, questionNumber: 2 },
            { field: phoneNumber, questionNumber: 3 },
            { field: email, questionNumber: 4 },
            { field: companyAddress, questionNumber: 5 },
            { field: jobTitle, questionNumber: 7 },
            { field: yearsInPosition, questionNumber: 8 }
        ],
        2: [
            { field: companyAge, questionNumber: 9 },
            { field: companySector, questionNumber: 10 },
            { field: exportStatus, questionNumber: 11 },
            { field: eExport, questionNumber: 12 },
            { field: targetRegions, questionNumber: 14 },
            { field: developmentAreas, questionNumber: 15 },
            { field: productionAreas, questionNumber: 16 },
            { field: revenue2022, questionNumber: 17 },
            { field: revenue2021, questionNumber: 18 },
            { field: innovationBudgetCurrent, questionNumber: 19 },
            { field: innovationBudgetFuture, questionNumber: 20 },
            { field: techInvestment, questionNumber: 21 },
            { field: fullTimeEmployees, questionNumber: 22 },
            { field: whiteCollarEmployees, questionNumber: 23 },
            { field: blueCollarEmployees, questionNumber: 24 },
            { field: associateDegreeEmployees, questionNumber: 25 },
            { field: bachelorDegreeEmployees, questionNumber: 26 },
            { field: masterDegreeEmployees, questionNumber: 27 },
            { field: phdDegreeEmployees, questionNumber: 28 },
            { field: departments, questionNumber: 29 },
            { field: digitalAssessment, questionNumber: 30 },
            { field: salesMarketingActivities, questionNumber: 31 }
        ],
        3: [
            { field: developmentPlans, questionNumber: 32 },
            { field: innovationProjects, questionNumber: 33 }
        ],
        4: [
            { field: productVariety, questionNumber: 34 },
            { field: salesReasons, questionNumber: 35 },
            { field: btSystemsUsage36, questionNumber: 36 },
            { field: btSystemsUsage37, questionNumber: 37 }
        ],
        5: [
            { field: circularDesign, questionNumber: 38 },
            { field: optimalUse, questionNumber: 39 },
            { field: valueRecovery, questionNumber: 40 },
            { field: supportModels, questionNumber: 41 },
            { field: btSystemsUsage42, questionNumber: 42 },
            { field: btSystemsUsage43, questionNumber: 43 },
            { field: productStrategy, questionNumber: 44 }
        ],
        6: [
            { field: additionalStrategies, questionNumber: 45 },
            { field: optimizationConcepts, questionNumber: 46 }
        ],
        7: [
            { field: productDevelopmentMethod, questionNumber: 47 },
            { field: productionStrategy, questionNumber: 48 },
            { field: productConfiguration, questionNumber: 49 },
            { field: workflowProcesses, questionNumber: 50 },
            { field: engineeringDataManagement, questionNumber: 51 },
            { field: supplyChainManagement, questionNumber: 52 },
            { field: smartProducts, questionNumber: 53 },
            { field: smartServices, questionNumber: 54 },
            { field: productionAutomationLevel, questionNumber: 55 }
        ],
        8: [
            { field: btSystemsUsage56, questionNumber: 56 },
            { field: btSystemChains, questionNumber: 57 },
            { field: machineControlMethod, questionNumber: 58 }
        ]
    };
    const checkboxQuestions = {
        2: [
            { field: targetRegions, questionNumber: 14 },
            { field: departments, questionNumber: 29 },
            { field: salesMarketingActivities, questionNumber: 31 }
        ],
        3: [
            { field: developmentPlans, questionNumber: 32 }
        ],
        4: [
            { field: salesReasons, questionNumber: 35 }
        ],
        7: [
            { field: workflowProcesses, questionNumber: 50 },
            { field: engineeringDataManagement, questionNumber: 51 },
            { field: smartServices, questionNumber: 54 }
        ],
        8: [
            { field: btSystemChains, questionNumber: 57 }
        ]
    };

    const missingFields = Object.entries(requiredFields)
        .filter(([key]) => currentPage === parseInt(key))
        .flatMap(([key, fields]) => fields.map(({ field, questionNumber }) => !field ? questionNumber : null))
        .filter(Boolean);

    // Checkbox kontrolü
    for (const [key, fields] of Object.entries(checkboxQuestions)) {
        if (currentPage === parseInt(key)) {
            fields.forEach(({ field, questionNumber }) => {
                if (!field.length) {
                    missingFields.push(questionNumber);
                }
            });
        }
    }

    if (currentPage === 4) {
        const trends36 = [
            'Yeşil Teknoloji', 'CO2 ayak izi ve döngüsel ekonomi', 'Yaşam döngüsü değerlendirmeleri ve Yaşam döngüsü maliyet hesaplamaları',
            'Uyumluluk ve yeni düzenlemeler', 'BT sistemlerinin operasyonel güvenliği ve veri yönetimi',
            'Müşteri yolculuğunun karmaşıklığı (tüm ürün yaşam döngüsü aşamalarında kişiselleştirilmiş teklifler ve hizmetler)',
            'Ürün bireyselleştirme', 'Mekatronik sistemler', 'Ürünlerde yazılım tanımlı özellikler/ürünlerde gömülü yazılım',
            'Otonom, dinamik olarak ağa bağlı gibi özelliklere sahip daha büyük bir sistemin parçası olan karmaşık sistemler/ürünler',
            'Ürün-Hizmet Sistemleri (entegre ürün ve hizmet paketleri, varsa hizmetlerin ayrı fiyatlandırılması)',
            'Dijital hizmetler ve iş modelleri', 'Paylaşım ekonomisi', 'Veri ekonomisi (uzaktan hizmetlerden gelir elde etme, kestirimci bakım için)',
            'Sistem Mühendisliği, ITSM, karmaşık sistemler için geliştirme yöntemleri', 'Dijital süreklilik/ uçtan uca entegrasyon',
            'Karmaşık sistemlerin simülasyonu ve gerçek zamanlı simülasyon', 'Yapay zeka', 'Dijital ikiz', 'Dijital Platformlar ve (Çoklu) Bulut Bilişimi'
        ];
        const trends37 = [
            'Nesnelerin interneti', 'Sanal gerçeklik ortamları ve arayüzler (AR/VR)', 'Blokzincir teknolojisi',
            'Veri formatları ve veri aktarımı için yeni (açık) standartlar', 'Robotik süreç otomasyonu', 'Yetenekler savaşı',
            'Yeni iş (mobil çalışma, yaratıcılık, sanal işbirliği)', 'Çeviklik ve kendi kendini organize eden ekipler',
            'Değer yaratma ağlarının karmaşıklığı ve eksik dayanıklılığı'
        ];

        trends36.forEach((trend, index) => {
            if (!btSystemsUsage36[`trend-${index}`]) {
                missingFields.push(36);
            }
        });

        trends37.forEach((trend, index) => {
            if (!btSystemsUsage37[`trend-37-${index}`]) {
                missingFields.push(37);
            }
        });
    }

    if (currentPage === 5) {
        const components42 = Array.from({ length: 5 }, (_, i) => `component-42-${i}`);
        const components43 = Array.from({ length: 5 }, (_, i) => `component-43-${i}`);

        components42.forEach((component) => {
            if (!btSystemsUsage42[component]) missingFields.push(42);
        });

        components43.forEach((component) => {
            if (!btSystemsUsage43[component]) missingFields.push(43);
        });
    }

    if (currentPage === 8) {
        const requiredKeys = [
            'iysDys', 'projectManagement', 'crm', 'pdmPlm', 'cad', 'ecad', 'cae', 'cam', 'erp', 'mes', 'mom', 'supplyChain', 'integrationTools'
        ];
        const allAnswered = requiredKeys.every(key => btSystemsUsage56[key]);
        if (!allAnswered) {
            missingFields.push(56);
        }
    }

    // Eksik alanları kontrol et
    if (missingFields.length > 0) {
        const uniqueMissingFields = [...new Set(missingFields)].sort((a, b) => a - b); // Tekil soruları al ve sırala
        const message = `Sonraki sayfaya geçmeden önce aşağıdaki ${uniqueMissingFields.length} soruyu tamamlamanız gerekiyor: ${uniqueMissingFields.join(', ')} numaralı ${uniqueMissingFields.length > 1 ? 'sorular' : 'soru'}.`;
        alert(message);
        return;
    }

    // İleri git
    setCurrentPage((prevPage) => prevPage + 1);
};
  /* Zorunlu olmayan sorular: 6, 13, 57, 60, 61, 63 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 9. sayfadaki zorunlu alanları kontrol et
    const requiredFields = [
        { field: digitalizationStatus, questionNumber: 59 },
        { field: digitalTechnologyReasons, questionNumber: 62 },
        { field: digitalizationGoals.length > 0, questionNumber: 64 }, // Checkbox kontrolü
        { field: managementApproach.length > 0, questionNumber: 65 }  // Checkbox kontrolü
    ];

    // 59. soruda 2, 3 veya 4 seçildiyse 60. soruyu zorunlu yap
    const digitalizationStatusValues = ['2- Şirketimizin dijitalleşmiş olduğunu söylemek zor, ancak yakın zamanda dijital dönüşüm için bir miktar bütçe harcadık.',
                '3- Şirketimiz ağırlıklı olarak dijital olmayan üretim ve satışa odaklanmıştır; şimdiye kadar dijital tasarım / modelleme / prototipleme / satış konusunda herhangi bir çalışma yapmadık, ancak yakın gelecekte dijitalleşmeye yatırım yapmayı planlıyoruz.',
                '4- Şirketimiz ağırlıklı olarak dijital olmayan üretim ve satışa odaklanmıştır; şimdiye kadar dijital tasarım / modelleme / prototipleme / satış konusunda herhangi bir çalışma yapmadık, yakın gelecekte yapacağımızı sanmıyoruz.'];
    const isDigitalizationStatusSelected = digitalizationStatusValues.includes(digitalizationStatus);
    if (isDigitalizationStatusSelected) {
        const digitalizationChallengesKeys = [
            'digitalizationChallenge-0', 'digitalizationChallenge-1', 'digitalizationChallenge-2', 'digitalizationChallenge-3',
            'digitalizationChallenge-4', 'digitalizationChallenge-5', 'digitalizationChallenge-6', 'digitalizationChallenge-7',
            'digitalizationChallenge-8', 'digitalizationChallenge-9', 'digitalizationChallenge-10', 'digitalizationChallenge-11',
            'digitalizationChallenge-12', 'digitalizationChallenge-13', 'digitalizationChallenge-14', 'digitalizationChallenge-15',
            'digitalizationChallenge-16', 'digitalizationChallenge-17', 'digitalizationChallenge-18', 'digitalizationChallenge-19'
        ];
        const allDigitalizationChallengesAnswered = digitalizationChallengesKeys.every(key => digitalizationChallenges[key]);
        if (!allDigitalizationChallengesAnswered) {
            requiredFields.push({ field: false, questionNumber: 60 });
        }
    }

    // 62. sorunun kontrolü
    const digitalTechnologyReasonsKeys = [
        'digitalTechnologyReason-0', 'digitalTechnologyReason-1', 'digitalTechnologyReason-2', 'digitalTechnologyReason-3',
        'digitalTechnologyReason-4', 'digitalTechnologyReason-5', 'digitalTechnologyReason-6', 'digitalTechnologyReason-7',
        'digitalTechnologyReason-8', 'digitalTechnologyReason-9', 'digitalTechnologyReason-10', 'digitalTechnologyReason-11'
    ];
    const allDigitalTechnologyReasonsAnswered = digitalTechnologyReasonsKeys.every(key => digitalTechnologyReasons[key]);

    if (!allDigitalTechnologyReasonsAnswered) {
        requiredFields.push({ field: false, questionNumber: 62 });
    }

    const missingFields = requiredFields
        .map(({ field, questionNumber }) => !field ? questionNumber : null)
        .filter(Boolean)
        .sort((a, b) => a - b); // Soru numaralarını sırala

    if (missingFields.length > 0) {
        const message = `Formu göndermeden önce aşağıdaki ${missingFields.length} soruyu tamamlamanız gerekiyor: ${missingFields.join(', ')} numaralı ${missingFields.length > 1 ? 'sorular' : 'soru'}.`;
        alert(message);
        return;
    }

    const companyData = {
        companyName,
        participantName,
        phoneNumber,
        email,
        companyID,
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
        btSystemsUsage36,
        btSystemsUsage37,
        btSystemsUsage42,
        btSystemsUsage43,
        btSystemsUsage56,
        machineControlMethod,
        digitalizationStatus,
        digitalizationChallenges,
        digitalTechnologyReasons,
        otherResponse61,
        otherResponse63,
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

    const saveFormData = async (email, formData) => {
      try {
          await setDoc(doc(db, "companyForms", email), formData, { merge: true });
      } catch (error) {
          console.error("Error saving form data: ", error);
      }
    };

    const loadFormData = async (email) => {
      try {
          const docRef = doc(db, "companyForms", email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              return docSnap.data();
          } else {
              console.log("No such document!");
              return null;
          }
      } catch (error) {
          console.error("Error loading form data: ", error);
          return null;
      }
  };
  const handleClearForm = (page) => {
    const savedFormData = JSON.parse(localStorage.getItem('formData')) || {};
  
    if (page === 1) {
      setCompanyName('');
      setParticipantName('');
      setPhoneNumber('');
      setEmail(currentUser ? currentUser.email : ''); // Email'i başlangıç değerine döndür
      setCompanyAddress('');
      setJobTitle('');
      setYearsInPosition('');
      setCompanyWebsite('');
  
      // LocalStorage'dan sadece bu sayfadaki verileri temizle
      delete savedFormData.companyName;
      delete savedFormData.participantName;
      delete savedFormData.phoneNumber;
      delete savedFormData.email;
      delete savedFormData.companyAddress;
      delete savedFormData.jobTitle;
      delete savedFormData.yearsInPosition;
      delete savedFormData.companyWebsite;
    } else if (page === 2) {
      setCompanyAge('');
      setCompanySector('');
      setExportStatus('');
      setEExport('');
      setExportPercentage('');
      setTargetRegions([]);
      setDevelopmentAreas('');
      setProductionAreas('');
      setRevenue2022('');
      setRevenue2021('');
      setInnovationBudgetCurrent('');
      setInnovationBudgetFuture('');
      setTechInvestment('');
      setFullTimeEmployees('');
      setWhiteCollarEmployees('');
      setBlueCollarEmployees('');
      setAssociateDegreeEmployees('');
      setBachelorDegreeEmployees('');
      setMasterDegreeEmployees('');
      setPhdDegreeEmployees('');
      setDepartments([]);
      setDigitalAssessment('');
      setSalesMarketingActivities([]);
  
      // LocalStorage'dan sadece bu sayfadaki verileri temizle
      delete savedFormData.companyAge;
      delete savedFormData.companySector;
      delete savedFormData.exportStatus;
      delete savedFormData.eExport;
      delete savedFormData.exportPercentage;
      delete savedFormData.targetRegions;
      delete savedFormData.developmentAreas;
      delete savedFormData.productionAreas;
      delete savedFormData.revenue2022;
      delete savedFormData.revenue2021;
      delete savedFormData.innovationBudgetCurrent;
      delete savedFormData.innovationBudgetFuture;
      delete savedFormData.techInvestment;
      delete savedFormData.fullTimeEmployees;
      delete savedFormData.whiteCollarEmployees;
      delete savedFormData.blueCollarEmployees;
      delete savedFormData.associateDegreeEmployees;
      delete savedFormData.bachelorDegreeEmployees;
      delete savedFormData.masterDegreeEmployees;
      delete savedFormData.phdDegreeEmployees;
      delete savedFormData.departments;
      delete savedFormData.digitalAssessment;
      delete savedFormData.salesMarketingActivities;
    } else if (page === 3) {
      setDevelopmentPlans([]);
      setInnovationProjects('');
  
      // LocalStorage'dan sadece bu sayfadaki verileri temizle
      delete savedFormData.developmentPlans;
      delete savedFormData.innovationProjects;
    } else if (page === 4) {
      setProductVariety('');
      setSalesReasons('');
      setBtSystemsUsage36({});
      setBtSystemsUsage37({});
  
      // LocalStorage'dan sadece bu sayfadaki verileri temizle
      delete savedFormData.productVariety;
      delete savedFormData.salesReasons;
      delete savedFormData.btSystemsUsage36;
      delete savedFormData.btSystemsUsage37;
    } else if (page === 5) {
      setCircularDesign('');
      setOptimalUse('');
      setValueRecovery('');
      setSupportModels('');
      setBtSystemsUsage42({});
      setBtSystemsUsage43({});
      setProductStrategy('');
  
      // LocalStorage'dan sadece bu sayfadaki verileri temizle
      delete savedFormData.circularDesign;
      delete savedFormData.optimalUse;
      delete savedFormData.valueRecovery;
      delete savedFormData.supportModels;
      delete savedFormData.btSystemsUsage42;
      delete savedFormData.btSystemsUsage43;
      delete savedFormData.productStrategy;
    } else if (page === 6) {
      setAdditionalStrategies('');
      setOptimizationConcepts('');
  
      // LocalStorage'dan sadece bu sayfadaki verileri temizle
      delete savedFormData.additionalStrategies;
      delete savedFormData.optimizationConcepts;
    } else if (page === 7) {
      setProductDevelopmentMethod('');
      setProductionStrategy('');
      setProductConfiguration('');
      setWorkflowProcesses([]);
      setEngineeringDataManagement([]);
      setSupplyChainManagement('');
      setSmartProducts('');
      setSmartServices([]);
      setProductionAutomationLevel('');
  
      // LocalStorage'dan sadece bu sayfadaki verileri temizle
      delete savedFormData.productDevelopmentMethod;
      delete savedFormData.productionStrategy;
      delete savedFormData.productConfiguration;
      delete savedFormData.workflowProcesses;
      delete savedFormData.engineeringDataManagement;
      delete savedFormData.supplyChainManagement;
      delete savedFormData.smartProducts;
      delete savedFormData.smartServices;
      delete savedFormData.productionAutomationLevel;
    } else if (page === 8) {
      setBtSystemsUsage56({});
      setBtSystemChains([]);
      setMachineControlMethod('');
  
      // LocalStorage'dan sadece bu sayfadaki verileri temizle
      delete savedFormData.btSystemsUsage56;
      delete savedFormData.btSystemChains;
      delete savedFormData.machineControlMethod;
    } else if (page === 9) {
      setDigitalizationStatus('');
      setDigitalizationChallenges({});
      setOtherResponse61('');
      setOtherResponse63('');
      setDigitalTechnologyReasons({});
      setDigitalizationGoals([]);
      setManagementApproach([]);
  
      // LocalStorage'dan sadece bu sayfadaki verileri temizle
      delete savedFormData.digitalizationStatus;
      delete savedFormData.digitalizationChallenges;
      delete savedFormData.otherResponse61;
      delete savedFormData.otherResponse63;
      delete savedFormData.digitalTechnologyReasons;
      delete savedFormData.digitalizationGoals;
      delete savedFormData.managementApproach;
    }
  
    // Güncellenmiş form verilerini localStorage'a kaydedin
    localStorage.setItem('formData', JSON.stringify(savedFormData));
  };

  const handleBtSystemChainsChange = (e) => {
    const { value, checked } = e.target;
    setBtSystemChains((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSalesReasonsChange = (value) => {
    setSalesReasons((prevReasons) => {
      let updatedReasons;
      if (prevReasons.includes(value)) {
        updatedReasons = prevReasons.filter((reason) => reason !== value);
      } else {
        if (prevReasons.length < 3) {
          updatedReasons = [...prevReasons, value];
        } else {
          alert("En fazla 3 seçenek işaretleyebilirsiniz.");
          return prevReasons;
        }
      }
      // Güncellenmiş state'i localStorage'a kaydedin
      const savedFormData = JSON.parse(localStorage.getItem('formData')) || {};
      savedFormData.salesReasons = updatedReasons;
      localStorage.setItem('formData', JSON.stringify(savedFormData));
      console.log('Saved Form Data:', savedFormData); // Konsol logu ekleyelim
      return updatedReasons;
    });
  };

  const handleTargetRegionsChange = (e) => {
      const value = e.target.value;
      const updatedRegions = targetRegions.includes(value)
          ? targetRegions.filter((region) => region !== value)
          : [...targetRegions, value];
      setTargetRegions(updatedRegions);
      handleInputChange('targetRegions', updatedRegions);
  };

  const handleDepartmentsChange = (e) => {
      const value = e.target.value;
      const updatedDepartments = departments.includes(value)
          ? departments.filter((department) => department !== value)
          : [...departments, value];
      setDepartments(updatedDepartments);
      handleInputChange('departments', updatedDepartments);
  };

  const handleSalesMarketingActivitiesChange = (e) => {
      const value = e.target.value;
      const updatedActivities = salesMarketingActivities.includes(value)
          ? salesMarketingActivities.filter((activity) => activity !== value)
          : [...salesMarketingActivities, value];
      setSalesMarketingActivities(updatedActivities);
      handleInputChange('salesMarketingActivities', updatedActivities);
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
    const value = e.target.value;
    const updatedDevelopmentPlans = developmentPlans.includes(value)
      ? developmentPlans.filter((plan) => plan !== value)
      : [...developmentPlans, value];
    console.log('Updated Development Plans:', updatedDevelopmentPlans); // Konsol logu ekleyelim
    setDevelopmentPlans(updatedDevelopmentPlans);
    handleInputChange('developmentPlans', updatedDevelopmentPlans);
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

  const handleProductStrategyChange = (e) => {
    setProductStrategy(e.target.value);
  };

  const handleWorkflowProcessesChange = (e) => {
    if (!e.target) return;
    const { value } = e.target;
    setWorkflowProcesses((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
};

const handleEngineeringDataManagementChange = (e) => {
    if (!e.target) return;
    const { value } = e.target;
    setEngineeringDataManagement((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
};

const handleSmartServicesChange = (e) => {
    if (!e.target) return;
    const { value } = e.target;
    setSmartServices((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
};

  return (
    <div className="form-container">
      <div className="intro-text">
        <h1>ODTÜ DTX - Dijital Olgunluk Değerlendirmesi Başvuru Formu</h1>
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
              <p className="page-parts">Katılımcı Bilgisi</p>
              <p className="question-note">1'den 8'e kadar olan soruları cevaplayın.</p>
          </div>

          <div className="form-group">
              <label>1. Şirket adı <span className="required-star">*</span></label>
              <input
                  type="text"
                  value={companyName}
                  onChange={(e) => {
                      setCompanyName(e.target.value);
                      handleInputChange('companyName', e.target.value);
                  }}
                  placeholder="Cevabınızı girin"
                  required
              />
          </div>

          <div className="form-group">
              <label>2. Katılımcının adı <span className="required-star">*</span></label>
              <input
                  type="text"
                  value={participantName}
                  onChange={(e) => {
                      setParticipantName(e.target.value);
                      handleInputChange('participantName', e.target.value);
                  }}
                  placeholder="Cevabınızı girin"
                  required
              />
          </div>

          <div className="form-group">
              <label>3. Telefon numarası <span className="required-star">*</span></label>
              <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      handleInputChange('phoneNumber', e.target.value);
                  }}
                  placeholder="Cevabınızı girin"
                  required
              />
          </div>

          <div className="form-group">
              <label>4. Katılımcının e-postası <span className="required-star">*</span></label>
              <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                      setEmail(e.target.value);
                      handleInputChange('email', e.target.value);
                  }}
                  placeholder="Cevabınızı girin"
                  required
              />
          </div>

          <div className="form-group">
              <label>5. Şirket Adresi <span className="required-star">*</span></label>
              <input
                  type="text"
                  value={companyAddress}
                  onChange={(e) => {
                      setCompanyAddress(e.target.value);
                      handleInputChange('companyAddress', e.target.value);
                  }}
                  placeholder="Cevabınızı girin"
                  required
              />
          </div>

          <div className="form-group">
              <label>6. Şirket Websitesi URL'si</label>
              <input
                  type="url"
                  value={companyWebsite}
                  onChange={(e) => {
                      setCompanyWebsite(e.target.value);
                      handleInputChange('companyWebsite', e.target.value);
                  }}
                  placeholder="Cevabınızı girin"
              />
          </div>

          <div className="form-group">
              <label>7. Şirketteki ünvanınız <span className="required-star">*</span></label>
              <div className="radio-group">
                  {["Şirket sahibi", "Genel Müdür/CEO", "BT Müdürü/CTO/CDO", "Üretim Müdürü", "AR-GE Müdürü", "Proje Direktörü (Dijital Dönüşüm)", "İş Geliştirme Müdürü", "Endüstriyel Tasarımcı", "Pazarlama Müdürü", "Satış Müdürü", "Yönetici (diğer)"].map((title) => (
                      <label key={title}>
                          <input
                              type="radio"
                              value={title}
                              checked={jobTitle === title}
                              onChange={handleJobTitleChange}
                          />
                          {title}
                      </label>
                  ))}
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                          type="radio"
                          value="other"
                          checked={jobTitle === 'other'}
                          onChange={handleJobTitleChange}
                      />
                      <input
                          type="text"
                          value={otherJobTitle}
                          onChange={(e) => {
                              setOtherJobTitle(e.target.value);
                              handleInputChange('otherJobTitle', e.target.value);
                          }}
                          placeholder="Diğer"
                          style={{ marginLeft: '10px' }}
                      />
                  </label>
              </div>
          </div>

          <div className="form-group">
              <label>8. Bu pozisyonda kaç yıldır çalışıyorsunuz? <span className="required-star">*</span></label>
              <input
                  type="number"
                  value={yearsInPosition}
                  onChange={(e) => {
                      setYearsInPosition(e.target.value);
                      handleInputChange('yearsInPosition', e.target.value);
                  }}
                  placeholder="Cevabınızı girin"
                  required
              />
          </div>
        <button type="button" style={{ backgroundColor: '#007BFF' }} onClick={handleNext}>İleri</button>
        <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>İleri</button>
        <button type="button" onClick={() => handleClearForm(currentPage)}>Formu Temizle</button>
        </>
      )}{currentPage === 2 && (
        <>
          <div className="form-group">
            <p className="page-parts">Şirket Profili</p>
            <p className="question-note">9'dan 31'e kadar olan soruları cevaplayın.</p>
            <label>9. Şirketiniz kaç yaşındadır? <span className="required-star">*</span></label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="companyAge"
                  value="Yeni kuruluş - 1 yaşından küçük"
                  checked={companyAge === "Yeni kuruluş - 1 yaşından küçük"}
                  onChange={() => {
                    setCompanyAge("Yeni kuruluş - 1 yaşından küçük");
                    handleInputChange('companyAge', "Yeni kuruluş - 1 yaşından küçük");
                  }}
                  required
                /> Yeni kuruluş – 1 yaşından küçük
              </label>
              <label>
                <input
                  type="radio"
                  name="companyAge"
                  value="1 - 2 yaş"
                  checked={companyAge === "1 - 2 yaş"}
                  onChange={() => {
                    setCompanyAge("1 - 2 yaş");
                    handleInputChange('companyAge', "1 - 2 yaş");
                  }}
                  required
                /> 1 - 2 yaş
              </label>
              <label>
                <input
                  type="radio"
                  name="companyAge"
                  value="3 - 5 yaş"
                  checked={companyAge === "3 - 5 yaş"}
                  onChange={() => {
                    setCompanyAge("3 - 5 yaş");
                    handleInputChange('companyAge', "3 - 5 yaş");
                  }}
                  required
                /> 3 - 5 yaş
              </label>
              <label>
                <input
                  type="radio"
                  name="companyAge"
                  value="6 - 15 yaş"
                  checked={companyAge === "6 - 15 yaş"}
                  onChange={() => {
                    setCompanyAge("6 - 15 yaş");
                    handleInputChange('companyAge', "6 - 15 yaş");
                  }}
                  required
                /> 6 - 15 yaş
              </label>
              <label>
                <input
                  type="radio"
                  name="companyAge"
                  value="16 - 30 yaş"
                  checked={companyAge === "16 - 30 yaş"}
                  onChange={() => {
                    setCompanyAge("16 - 30 yaş");
                    handleInputChange('companyAge', "16 - 30 yaş");
                  }}
                  required
                /> 16 - 30 yaş
              </label>
              <label>
                <input
                  type="radio"
                  name="companyAge"
                  value="31 + yaş"
                  checked={companyAge === "31 + yaş"}
                  onChange={() => {
                    setCompanyAge("31 + yaş");
                    handleInputChange('companyAge', "31 + yaş");
                  }}
                  required
                /> 31 + yaş
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>10. İşletmenizin sektörü nedir? <span className="required-star">*</span></label>
            <p className="question-note">Ekli NACE listesine bakınız.</p>
            <p className="question-note"><strong>(Makine ve otomotiv dışında bir sektör ise veya şirket bu iki sektörden birinin tedarikçisi değil ise, lütfen ankete devam etmeyiniz.)</strong></p>
            <input
              type="text"
              value={companySector}
              onChange={(e) => {
                setCompanySector(e.target.value);
                handleInputChange('companySector', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>11. Hizmetlerinizi/ürünlerinizi ihraç ediyor musunuz? <span className="required-star">*</span></label>
            <div className="radio-group">
              {["Evet doğrudan", "Evet, aracılar vasıtasıyla", "Hayır, etmiyoruz"].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="exportStatus"
                    value={option}
                    checked={exportStatus === option}
                    onChange={() => {
                      setExportStatus(option);
                      handleInputChange('exportStatus', option);
                    }}
                    required
                  /> {option}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>12. E-ihracat yapıyor musunuz? <span className="required-star">*</span></label>
            <div className="radio-group">
              {["Evet", "Hayır"].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="eExport"
                    value={option}
                    checked={eExport === option}
                    onChange={() => {
                      setEExport(option);
                      handleInputChange('eExport', option);
                    }}
                    required
                  /> {option}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>13. İhracatın toplam cironuz içindeki yüzdesi nedir?</label>
            <p className="question-note">(Soru 11 ve Soru 12 EVET kodlandı ise İHRACAT ve E-İHRACAT VARDIR).</p>
            <input
              type="text"
              value={exportPercentage}
              onChange={(e) => {
                setExportPercentage(e.target.value);
                handleInputChange('exportPercentage', e.target.value);
              }}
              placeholder="Cevabınızı girin"
            />
          </div>
          <div className="form-group">
            <label>14. Gelecek yıl ihracat yapmayı hedeflediğiniz bölgeler var mı? <span className="required-star">*</span></label>
            <div className="checkbox-group">
              {["Afrika ülkeleri", "Avrupa Birliği ülkeleri", "Türki Cumhuriyetler", "Diğer Amerika Ülkeleri", "Diğer Asya Ülkeleri", "Diğer Ülkeler", "Kuzey Amerika Serbest Ticaret Bölgesi", "Okyanus Ülkeleri", "Orta Doğu Ülkeleri", "Serbest Bölgeler", "Uzakdoğu Ülkeleri"].map((region) => (
                <label key={region}>
                  <input
                    type="checkbox"
                    value={region}
                    checked={targetRegions.includes(region)}
                    onChange={handleTargetRegionsChange}
                  /> {region}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>15. Geliştirme sahalarınızın sayısı nedir? <span className="required-star">*</span></label>
            <input
              type="number"
              value={developmentAreas}
              onChange={(e) => {
                setDevelopmentAreas(e.target.value);
                handleInputChange('developmentAreas', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>16. Üretim sahalarınızın sayısı nedir? <span className="required-star">*</span></label>
            <input
              type="number"
              value={productionAreas}
              onChange={(e) => {
                setProductionAreas(e.target.value);
                handleInputChange('productionAreas', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>17. 2022 yılındaki Cironuz nedir? <span className="required-star">*</span></label>
            <div className="radio-group">
              {["0 - 3 Milyon TL (mikro)", "3 - 25 Milyon TL (small)", "25 - 125 Milyon TL (orta)", "125 - 500 Milyon TL (büyük)", "+ 500 Milyon TL"].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="revenue2022"
                    value={option}
                    checked={revenue2022 === option}
                    onChange={() => {
                      setRevenue2022(option);
                      handleInputChange('revenue2022', option);
                    }}
                    required
                  /> {option}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>18. 2021 yılındaki cironuz nedir? <span className="required-star">*</span></label>
            <div className="radio-group">
              {["0 - 3 Milyon TL (mikro)", "3 - 25 Milyon TL (küçük)", "25 - 125 Milyon TL (orta)", "125 - 500 Milyon TL (büyük)", "+ 500 Milyon TL"].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="revenue2021"
                    value={option}
                    checked={revenue2021 === option}
                    onChange={() => {
                      setRevenue2021(option);
                      handleInputChange('revenue2021', option);
                    }}
                    required
                  /> {option}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>19. Bu yıl toplam cironuzun ne kadarını inovasyon ve AR-GE faaliyetlerine ayırmayı planlıyorsunuz? <span className="required-star">*</span></label>
            <input
              type="number"
              value={innovationBudgetCurrent}
              onChange={(e) => {
                setInnovationBudgetCurrent(e.target.value);
                handleInputChange('innovationBudgetCurrent', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>20. Önümüzdeki üç yıl içinde toplam cironuzun ne kadarını inovasyon ve Ar-Ge faaliyetlerine ayırmayı planlıyorsunuz? <span className="required-star">*</span></label>
            <p className="question-note">(Yüzde yazınız)</p>
            <input
              type="number"
              value={innovationBudgetFuture}
              onChange={(e) => {
                setInnovationBudgetFuture(e.target.value);
                handleInputChange('innovationBudgetFuture', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>21. Son üç yıldaki teknoloji yatırımınız ne kadardır? <span className="required-star">*</span></label>
            <p className="question-note">TL/Cironuzdaki yüzdelik payı</p>
            <input
              type="text"
              value={techInvestment}
              onChange={(e) => {
                setTechInvestment(e.target.value);
                handleInputChange('techInvestment', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>22. Şirketinizdeki tam zamanlı çalışan sayısı nedir? <span className="required-star">*</span></label>
            <input
              type="number"
              value={fullTimeEmployees}
              onChange={(e) => {
                setFullTimeEmployees(e.target.value);
                handleInputChange('fullTimeEmployees', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>23. Şirketinizdeki beyaz yaka sayısı nedir? <span className="required-star">*</span></label>
            <input
              type="number"
              value={whiteCollarEmployees}
              onChange={(e) => {
                setWhiteCollarEmployees(e.target.value);
                handleInputChange('whiteCollarEmployees', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>24. Şirketinizdeki mavi yaka sayısı nedir? <span className="required-star">*</span></label>
            <input
              type="number"
              value={blueCollarEmployees}
              onChange={(e) => {
                setBlueCollarEmployees(e.target.value);
                handleInputChange('blueCollarEmployees', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>25. Şirketinizdeki ön lisans mezunu çalışan sayısı nedir? <span className="required-star">*</span></label>
            <input
              type="number"
              value={associateDegreeEmployees}
              onChange={(e) => {
                setAssociateDegreeEmployees(e.target.value);
                handleInputChange('associateDegreeEmployees', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>26. Şirketinizdeki üniversite (lisans) mezunu çalışan sayısı nedir? <span className="required-star">*</span></label>
            <input
              type="number"
              value={bachelorDegreeEmployees}
              onChange={(e) => {
                setBachelorDegreeEmployees(e.target.value);
                handleInputChange('bachelorDegreeEmployees', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>27. Şirketinizdeki yüksek lisans (Master) dereceli çalışan sayısı nedir? <span className="required-star">*</span></label>
            <input
              type="number"
              value={masterDegreeEmployees}
              onChange={(e) => {
                setMasterDegreeEmployees(e.target.value);
                handleInputChange('masterDegreeEmployees', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>28. Şirketinizdeki doktora dereceli çalışan sayısı nedir? <span className="required-star">*</span></label>
            <input
              type="number"
              value={phdDegreeEmployees}
              onChange={(e) => {
                setPhdDegreeEmployees(e.target.value);
                handleInputChange('phdDegreeEmployees', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>29. Aşağıda listelenen departmanlardan hangileri şirketinizde mevcuttur? <span className="required-star">*</span></label>
            <div className="checkbox-group">
              {["AR-GE ve Teknoloji Geliştirme", "Sertifikalı AR-GE Merkezi", "Tasarım/Ürün Geliştirme", "Sertifikalı Tasarım Merkezi", "Endüstri Mühendisliği", "Üretim/İmalat", "Lojistik", "Finans", "Satış & Pazarlama", "Satın alma", "Dış Ticaret ve İhracat"].map((department) => (
                <label key={department}>
                  <input
                    type="checkbox"
                    value={department}
                    checked={departments.includes(department)}
                    onChange={handleDepartmentsChange}
                  /> {department}
                </label>
              ))}
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  value="other"
                  checked={departments.includes('other')}
                  onChange={handleDepartmentsChange}
                />
                <input
                  type="text"
                  value={otherDepartment}
                  onChange={(e) => {
                    setOtherDepartment(e.target.value);
                    handleInputChange('otherDepartment', e.target.value);
                  }}
                  placeholder="Diğer"
                  style={{ marginLeft: '10px' }}
                />
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>30. Herhangi bir dijitalleşme değerlendirmesine katıldınız mı? Cevabınız evet ise hangi değerlendirme yöntemine veya hizmetine katıldınız? <span className="required-star">*</span></label>
            <p className="question-note">Eğer soruya cevabınız evet ise lütfen değerlendirmenin adını ve ofisini yazınız.</p>
            <input
              type="text"
              value={digitalAssessment}
              onChange={(e) => {
                setDigitalAssessment(e.target.value);
                handleInputChange('digitalAssessment', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
            <label>31. Lütfen bize şirketinizin satış ve pazarlama yaklaşımından bahsedin. Şirketiniz aşağıdaki faaliyetlerden hangilerini gerçekleştiriyor? <span className="required-star">*</span></label>
            <div className="checkbox-group">
              {[
                "Şirketin sosyal medya hesabı var (Linkedin, Instagram, Facebook vb.)",
                "Şirketin işleyen bir web sayfası var",
                "Şirket e-ticaret yapıyor (kendi web sitesi)",
                "Şirket çevrimiçi pazar yeri üzerinden satış yapıyor (amazon vb)",
                "Şirket tele pazarlama yapıyor",
                "Şirket düzenli olarak fuarlara katılıyor",
                "Şirket aktif olarak reklam veriyor",
                "Şirket eşleştirme etkinliklerine katılıyor"
              ].map((activity) => (
                <label key={activity}>
                  <input
                    type="checkbox"
                    value={activity}
                    checked={salesMarketingActivities.includes(activity)}
                    onChange={handleSalesMarketingActivitiesChange}
                  /> {activity}
                </label>
              ))}
            </div>
          </div>
              <button type="button" style={{ backgroundColor: '#007BFF' }} onClick={handleNext}>İleri</button>
              <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>Geri</button>
              <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>İleri</button>
              <button type="button" onClick={() => handleClearForm(currentPage)}>Formu Temizle</button>

        </>
      )}
      {currentPage === 3 && (
        <>
          <div className="form-group">
            <p className="page-parts">Şirket Stratejisi</p>
            <p className="question-note">32. ve 33. soruları cevaplayın.</p>
            <label>32. Şirketinizde aşağıdakilerden herhangi biri var mı? Lütfen geçerli olanları seçiniz. <span className="required-star">*</span></label>
            <div className="checkbox-group">
              {[
                { value: "Şirket gelişim planı", label: "Şirket gelişim planı: Bir iş geliştirme planı, işletmenin hem uzun hem de kısa vadeli hedeflerini ve bunlara nasıl ulaşmayı planladıklarını gösteren yazılı bir belgedir." },
                { value: "İş planı", label: "İş planı: Bir iş planı, hedeflerini ve bunlara ulaşmak için planlarını vurgulayan belgelenmiş bir stratejidir. Bir şirketin pazara açılma planını, finansal projeksiyonlarını, pazar araştırmasını, iş amacını ve misyon beyanını ana hatlarıyla belirtir." },
                { value: "Finansal plan", label: "Finansal plan: Finansal planlama, gelecekteki finansal hedefleri ve bunlara nasıl ulaşılacağını belirlemek için mevcut finansal durumu değerlendirme sürecidir. Finansal plan, bir şirketin finansal büyümesi için yol haritası görevini gören bir belgedir." }
              ].map((plan) => (
                <label key={plan.value}>
                  <input  
                    type="checkbox"
                    value={plan.value}
                    checked={developmentPlans.includes(plan.value)}
                    onChange={handleDevelopmentPlansChange}
                  /> {plan.label}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>33. Son beş yılda şirketinizde inovasyonla ilgili kaç proje yürüttünüz? <span className="required-star">*</span></label>
            <input
              type="number"
              value={innovationProjects}
              onChange={(e) => {
                setInnovationProjects(e.target.value);
                handleInputChange('innovationProjects', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
              <button type="button" style={{ backgroundColor: '#007BFF' }} onClick={handleNext}>İleri</button>
              <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>Geri</button>
              <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>İleri</button>
              <button type="button" onClick={() => handleClearForm(currentPage)}>Formu Temizle</button>

    </>
      )}
      {currentPage === 4 && (
        <>
          <div className="form-group">
            <p className="page-parts">Ürün Portföyü ve Ürün Oluşturma</p>
            <p className="question-note">34'ten 37'ye kadar olan soruları cevaplayın.</p>
            <label>34. Lütfen ürün çeşitliliğinizi belirtir misiniz? Kaç farklı/özgün ürün çeşidi/aileşi üretiyorsunuz? <span className="required-star">*</span></label>
            <input
              type="number"
              value={productVariety}
              onChange={(e) => {
                setProductVariety(e.target.value);
                handleInputChange('productVariety', e.target.value);
              }}
              placeholder="Cevabınızı girin"
              required
            />
          </div>
          <div className="form-group">
          <label>35. Müşterilerinizin ürünlerinizi/hizmetlerinizi rakiplerinize tercih etmesinin en önemli üç nedeni nedir? <span className="required-star">*</span></label>
          <p className="question-note">En fazla 3 seçenek işaretleyiniz.</p>
          <div className="checkbox-group">
            {[
              "Fiyat avantajı", "Ürün kalitesi", "Özel/Niş ürün", "Hızlı vade/kısa teslimat süresi",
              "Sürdürülebilir/Ekolojik Ürünler/Hizmetler/Uygulamalar", "Koleksiyon (Çeşitlilik)",
              "Esnek üretim", "Güvenilirlik", "Bilgi/Ustalık", "İnovasyon seviyesi", "Teknoloji Liderliği"
            ].map((reason) => (
              <label key={reason}>
                <input
                  type="checkbox"
                  value={reason}
                  checked={salesReasons.includes(reason)}
                  onChange={(e) => {
                    handleSalesReasonsChange(e.target.value);
                  }}
                />
                {reason}
              </label>
            ))}
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                value="other35"
                checked={salesReasons.includes('other35')}
                onChange={(e) => {
                  handleSalesReasonsChange(e.target.value);
                }}
              />
              <input
                type="text"
                value={otherDepartment35}
                onChange={(e) => {
                  setOtherDepartment35(e.target.value);
                  handleInputChange('otherDepartment35', e.target.value);
                }}
                placeholder="Diğer"
                style={{ marginLeft: '10px' }}
              />
            </label>
          </div>
        </div>
          <div className="form-group">
            <label>36. Her bir trend mevcut işinizi nasıl etkiliyor? <span className="required-star">*</span></label>
            <p className="question-note">Lütfen her satır için geçerli olan cevabı seçiniz.</p>
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
                            name={`trend-36-${index}`}
                            value={value}
                            checked={btSystemsUsage36[`trend-36-${index}`] === value.toString()}
                            onChange={(e) => {
                              setBtSystemsUsage36({ ...btSystemsUsage36, [`trend-36-${index}`]: e.target.value });
                              handleInputChange(`btSystemsUsage36-trend-36-${index}`, e.target.value);
                            }}
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
            <p className="question-note">Lütfen her satır için geçerli olan cevabı seçiniz.</p>
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
                            checked={btSystemsUsage37[`trend-37-${index}`] === value.toString()}
                            onChange={(e) => {
                              setBtSystemsUsage37({ ...btSystemsUsage37, [`trend-37-${index}`]: e.target.value });
                              handleInputChange(`btSystemsUsage37-trend-37-${index}`, e.target.value);
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button type="button" style={{ backgroundColor: '#007BFF' }} onClick={handleNext}>İleri</button>
          <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>Geri</button>
          <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>İleri</button>
          <button type="button" onClick={() => handleClearForm(currentPage)}>Formu Temizle</button>
        </>
      )}
      {currentPage === 5 && (
  <>
    <div className="form-group">
    <p class="page-parts">Lütfen seçim yaparak şirketinizin döngüsel ekonomiye yaklaşımını belirtiniz.</p>
    <p class="page-parts">Bunları şirketinizde uyguluyor musunuz, evet ise nasıl? Lütfen bize biraz detay veriniz ve döngüsel ekonominin her başlığı hakkında yorum yapınız.</p>
    <p class="question-note">38'ten 44'e kadar olan soruları cevaplayın.</p>
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
        <p class="question-note">Günümüz</p>
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
                        checked={btSystemsUsage42[`component-42-${index}`] === value.toString()}
                        onChange={(e) => setBtSystemsUsage42({ ...btSystemsUsage42, [`component-42-${index}`]: e.target.value })}
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
        <p class="question-note">Gelecek</p>
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
                        checked={btSystemsUsage43[`component-43-${index}`] === value.toString()}
                        onChange={(e) => setBtSystemsUsage43({ ...btSystemsUsage43, [`component-43-${index}`]: e.target.value })}
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
      <p class="question-note"><strong>Ürün yaratmanın tanımı:</strong> Ürün yaratma, yeni bir ürün veya hizmet geliştirme ve pazara sunma sürecini ifade eder. Müşteri ihtiyaçlarının belirlenmesini, pazar araştırması yapılmasını, ürünün tasarlanmasını ve prototipinin oluşturulmasını, hizmetin üretilmesini veya geliştirilmesini ve son olarak müşterilere sunulmasını ve pazarlanmasını içerir. Kısaca ürün geliştirme + üretim.</p>
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
              <button type="button" style={{ backgroundColor: '#007BFF' }} onClick={handleNext}>İleri</button>
              <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>Geri</button>
              <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>İleri</button>
              <button type="button" onClick={() => handleClearForm(currentPage)}>Formu Temizle</button>

  </>
)}
{currentPage === 6 && (
  <>
    <div className="form-group">
    <p class="page-parts">Değer Zinciri Stratejileri</p>
    <p class="question-note">45. ve 46. soruları cevaplayın.</p>
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
            <p class="question-note">Cevabınız Evet ise lütfen yazınız.</p>
            <input
              type="text"
              value={optimizationConcepts}
              onChange={(e) => setOptimizationConcepts(e.target.value)}
              placeholder="Enter your answer"
            />
          </div>
          <button type="button" style={{ backgroundColor: '#007BFF' }} onClick={handleNext}>İleri</button>
          <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>Geri</button>
          <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>İleri</button>
          <button type="button" onClick={() => handleClearForm(currentPage)}>Formu Temizle</button>

        </>
      )}
      {currentPage === 7 && (
        <>
          <div className="form-group">
            <p className="page-parts">Ürün Oluşturma</p>
            <p className="question-note">47'den 55'e kadar olan soruları cevaplayın.</p>
            <label>47. Ürün geliştirme yönteminiz nedir? <span className="required-star">*</span></label>
            <div className="radio-group">
              <label>
                <input type="radio" name="productDevelopmentMethod" value="Kontrat/sözleşmeli ürün geliştirme" checked={productDevelopmentMethod === "Kontrat/sözleşmeli ürün geliştirme"} onChange={(e) => setProductDevelopmentMethod(e.target.value)} /> Kontrat/sözleşmeli ürün geliştirme
              </label>
              <label>
                <input type="radio" name="productDevelopmentMethod" value="Kendi ürünlerinin kurum içi geliştirilmesi" checked={productDevelopmentMethod === "Kendi ürünlerinin kurum içi geliştirilmesi"} onChange={(e) => setProductDevelopmentMethod(e.target.value)} /> Kendi ürünlerinin kurum içi geliştirilmesi
              </label>
              <label>
                <input type="radio" name="productDevelopmentMethod" value="Kendi ürün geliştirmesi yok" checked={productDevelopmentMethod === "Kendi ürün geliştirmesi yok"} onChange={(e) => setProductDevelopmentMethod(e.target.value)} /> Kendi ürün geliştirmesi yok
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>48. Üretim Stratejinizi/Yaklaşımınızı nasıl tanımlarsınız? <span className="required-star">*</span></label>
            <div className="radio-group">
              <label>
                <input type="radio" name="productionStrategy" value="Tek seferlik üretim / Tek lot" checked={productionStrategy === "Tek seferlik üretim / Tek lot"} onChange={(e) => setProductionStrategy(e.target.value)} /> Tek seferlik üretim / Tek lot
              </label>
              <label>
                <input type="radio" name="productionStrategy" value="Küçük seri üretim" checked={productionStrategy === "Küçük seri üretim"} onChange={(e) => setProductionStrategy(e.target.value)} /> Küçük seri üretim
              </label>
              <label>
                <input type="radio" name="productionStrategy" value="Seri üretim" checked={productionStrategy === "Seri üretim"} onChange={(e) => setProductionStrategy(e.target.value)} /> Seri üretim
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>49. Ürünlerinizi nasıl yapılandırıyor ve modelliyorsunuz? Lütfen, uygun olan bir seçenek işaretleyiniz. <span className="required-star">*</span></label>
            <div className="radio-group">
              <label>
                <input type="radio" name="productConfiguration" value="Bilgi, belgelere dayalı olarak yönetilir ve belgelerde saklanır" checked={productConfiguration === "Bilgi, belgelere dayalı olarak yönetilir ve belgelerde saklanır"} onChange={(e) => setProductConfiguration(e.target.value)} /> Bilgi, belgelere dayalı olarak yönetilir ve belgelerde saklanır
              </label>
              <label>
                <input type="radio" name="productConfiguration" value="Hiyerarşik ürün yapıları kullanılmaktadır. Öznitelikler ve meta veriler ürün yapılarına bağlanır." checked={productConfiguration === "Hiyerarşik ürün yapıları kullanılmaktadır. Öznitelikler ve meta veriler ürün yapılarına bağlanır."} onChange={(e) => setProductConfiguration(e.target.value)} /> Hiyerarşik ürün yapıları kullanılmaktadır. Öznitelikler ve meta veriler ürün yapılarına bağlanır.
              </label>
              <label>
                <input type="radio" name="productConfiguration" value="Hiyerarşik ürün yapıları kullanılmaktadır. Öznitelikler ve meta veriler ürün yapılarıyla bağlantılıdır. Bu, mekanik, elektrik/elektronik veya yazılım gibi ilgili tüm alanlar için geçerlidir." checked={productConfiguration === "Hiyerarşik ürün yapıları kullanılmaktadır. Öznitelikler ve meta veriler ürün yapılarıyla bağlantılıdır. Bu, mekanik, elektrik/elektronik veya yazılım gibi ilgili tüm alanlar için geçerlidir."} onChange={(e) => setProductConfiguration(e.target.value)} /> Hiyerarşik ürün yapıları kullanılmaktadır. Öznitelikler ve meta veriler ürün yapılarıyla bağlantılıdır. Bu, mekanik, elektrik/elektronik veya yazılım gibi ilgili tüm alanlar için geçerlidir.
              </label>
              <label>
                <input type="radio" name="productConfiguration" value="Alana özgü ürün yapıları (mekanik, elektrik/elektronik, yazılım) entegre edilmiştir (örneğin çoklu CAD malzeme listesi)" checked={productConfiguration === "Alana özgü ürün yapıları (mekanik, elektrik/elektronik, yazılım) entegre edilmiştir (örneğin çoklu CAD malzeme listesi)"} onChange={(e) => setProductConfiguration(e.target.value)} /> Alana özgü ürün yapıları (mekanik, elektrik/elektronik, yazılım) entegre edilmiştir (örneğin çoklu CAD malzeme listesi)
              </label>
              <label>
                <input type="radio" name="productConfiguration" value="Alt sistem modeli ve alana özgü modeller temel unsurlarımızdır (gereksinimler, işlevler, ürünler ve test durumları çift yönlü olarak bağlantılıdır)" checked={productConfiguration === "Alt sistem modeli ve alana özgü modeller temel unsurlarımızdır (gereksinimler, işlevler, ürünler ve test durumları çift yönlü olarak bağlantılıdır)"} onChange={(e) => setProductConfiguration(e.target.value)} /> Alt sistem modeli ve alana özgü modeller temel unsurlarımızdır (gereksinimler, işlevler, ürünler ve test durumları çift yönlü olarak bağlantılıdır)
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>50. Ürün oluşturma sürecinizdeki iş akışları ve süreçler nasıl uygulanıyor? Lütfen, uygun olanların hepsini işaretleyiniz. <span className="required-star">*</span></label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" value="Dijital ama belge tabanlı" checked={workflowProcesses.includes("Dijital ama belge tabanlı")} onChange={handleWorkflowProcessesChange} /> Dijital ama belge tabanlı
              </label>
              <label>
                <input type="checkbox" value="Sistem içi iş akışları" checked={workflowProcesses.includes("Sistem içi iş akışları")} onChange={handleWorkflowProcessesChange} /> Sistem içi iş akışları
              </label>
              <label>
                <input type="checkbox" value="Sistemler ve alanlar arası iş akışları" checked={workflowProcesses.includes("Sistemler ve alanlar arası iş akışları")} onChange={handleWorkflowProcessesChange} /> Sistemler ve alanlar arası iş akışları
              </label>
              <label>
                <input type="checkbox" value="Siparişi gerçekleştirmek için otomatikleştirilmiş standart süreçler (örn. satın alma ve mühendisliğin birbirine bağlanması, depo yönetimi)" checked={workflowProcesses.includes("Siparişi gerçekleştirmek için otomatikleştirilmiş standart süreçler (örn. satın alma ve mühendisliğin birbirine bağlanması, depo yönetimi)")} onChange={handleWorkflowProcessesChange} /> Siparişi gerçekleştirmek için otomatikleştirilmiş standart süreçler (örn. satın alma ve mühendisliğin birbirine bağlanması, depo yönetimi)
              </label>
              <label>
                <input type="checkbox" value="Disiplinler arası ürün geliştirme için otomatikleştirilmiş standart süreçler (Alanlar arası parça listelerinin türetilmesi, iş emirlerinin otomatik oluşturulması)" checked={workflowProcesses.includes("Disiplinler arası ürün geliştirme için otomatikleştirilmiş standart süreçler (Alanlar arası parça listelerinin türetilmesi, iş emirlerinin otomatik oluşturulması)")} onChange={handleWorkflowProcessesChange} /> Disiplinler arası ürün geliştirme için otomatikleştirilmiş standart süreçler (Alanlar arası parça listelerinin türetilmesi, iş emirlerinin otomatik oluşturulması)
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>51. Mühendislik verilerinizi nasıl yönetiyor ve saklıyorsunuz? Geçerli olan cevaplardan tümünü seçiniz. <span className="required-star">*</span></label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" value="Kağıt tabanlı" checked={engineeringDataManagement.includes("Kağıt tabanlı")} onChange={handleEngineeringDataManagementChange} /> Kağıt tabanlı
              </label>
              <label>
                <input type="checkbox" value="Dosya sistemi, doküman klasörleri" checked={engineeringDataManagement.includes("Dosya sistemi, doküman klasörleri")} onChange={handleEngineeringDataManagementChange} /> Dosya sistemi, doküman klasörleri
              </label>
              <label>
                <input type="checkbox" value="Belge yönetim sistemi (Sharepoint, …)" checked={engineeringDataManagement.includes("Belge yönetim sistemi (Sharepoint, …)")} onChange={handleEngineeringDataManagementChange} /> Belge yönetim sistemi (Sharepoint, …)
              </label>
              <label>
                <input type="checkbox" value="Sisteme özgü veri tabanları (ERP, PLM, ...)" checked={engineeringDataManagement.includes("Sisteme özgü veri tabanları (ERP, PLM, ...)")} onChange={handleEngineeringDataManagementChange} /> Sisteme özgü veri tabanları (ERP, PLM, ...)
              </label>
              <label>
                <input type="checkbox" value="Birbirine bağlı veri tabanları (Tek Kaynak/ Veri Gölü)" checked={engineeringDataManagement.includes("Birbirine bağlı veri tabanları (Tek Kaynak/ Veri Gölü)")} onChange={handleEngineeringDataManagementChange} /> Birbirine bağlı veri tabanları (Tek Kaynak/ Veri Gölü)
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>52. Tedarik zinciri yönetiminizi (SCM) nasıl gerçekleştiriyorsunuz? Lütfen bir seçenek işaretleyiniz. <span className="required-star">*</span></label>
            <div className="radio-group">
              <label>
                <input type="radio" name="supplyChainManagement" value="Tedarik zinciri süreçleri açıkça tanımlanmamıştır. Tedarik zinciri içindeki her kuruluş, kendi yönetim sistemlerini kullanarak süreçlerini ayrı ayrı yönetir." checked={supplyChainManagement === "Tedarik zinciri süreçleri açıkça tanımlanmamıştır. Tedarik zinciri içindeki her kuruluş, kendi yönetim sistemlerini kullanarak süreçlerini ayrı ayrı yönetir."} onChange={(e) => setSupplyChainManagement(e.target.value)} /> Tedarik zinciri süreçleri açıkça tanımlanmamıştır. Tedarik zinciri içindeki her kuruluş, kendi yönetim sistemlerini kullanarak süreçlerini ayrı ayrı yönetir.
              </label>
              <label>
                <input type="radio" name="supplyChainManagement" value="Tedarik zinciri süreçleri, manuel ve kâğıt tabanlı araçların desteğiyle insanlar tarafından tanımlanır ve yürütülür." checked={supplyChainManagement === "Tedarik zinciri süreçleri, manuel ve kâğıt tabanlı araçların desteğiyle insanlar tarafından tanımlanır ve yürütülür."} onChange={(e) => setSupplyChainManagement(e.target.value)} /> Tedarik zinciri süreçleri, manuel ve kâğıt tabanlı araçların desteğiyle insanlar tarafından tanımlanır ve yürütülür.
              </label>
              <label>
                <input type="radio" name="supplyChainManagement" value="Tanımlanmış tedarik zinciri entegrasyon süreçleri, dijital araçların desteğiyle insanlar tarafından tamamlanır." checked={supplyChainManagement === "Tanımlanmış tedarik zinciri entegrasyon süreçleri, dijital araçların desteğiyle insanlar tarafından tamamlanır."} onChange={(e) => setSupplyChainManagement(e.target.value)} /> Tanımlanmış tedarik zinciri entegrasyon süreçleri, dijital araçların desteğiyle insanlar tarafından tamamlanır.
              </label>
              <label>
                <input type="radio" name="supplyChainManagement" value="Dijitalleştirilmiş tedarik zinciri süreçleri ve sistemleri, sınırlı insan müdahalesi ile değer zinciri boyunca iş ortakları ve müşteriler arasında güvenli bir şekilde entegre edilir." checked={supplyChainManagement === "Dijitalleştirilmiş tedarik zinciri süreçleri ve sistemleri, sınırlı insan müdahalesi ile değer zinciri boyunca iş ortakları ve müşteriler arasında güvenli bir şekilde entegre edilir."} onChange={(e) => setSupplyChainManagement(e.target.value)} /> Dijitalleştirilmiş tedarik zinciri süreçleri ve sistemleri, sınırlı insan müdahalesi ile değer zinciri boyunca iş ortakları ve müşteriler arasında güvenli bir şekilde entegre edilir.
              </label>
              <label>
                <input type="radio" name="supplyChainManagement" value="Otomatik tedarik zinciri süreçleri ve sistemleri verileri aktif olarak analiz etmekte ve bunlara tepki vermektedir. Tedarik zinciri birlikte çalışabilirliği güvenli ve gerçek zamanlı iletişim yeteneğine sahiptir." checked={supplyChainManagement === "Otomatik tedarik zinciri süreçleri ve sistemleri verileri aktif olarak analiz etmekte ve bunlara tepki vermektedir. Tedarik zinciri birlikte çalışabilirliği güvenli ve gerçek zamanlı iletişim yeteneğine sahiptir."} onChange={(e) => setSupplyChainManagement(e.target.value)} /> Otomatik tedarik zinciri süreçleri ve sistemleri verileri aktif olarak analiz etmekte ve bunlara tepki vermektedir. Tedarik zinciri birlikte çalışabilirliği güvenli ve gerçek zamanlı iletişim yeteneğine sahiptir.
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>53. Müşterinize akıllı ürünler sunuyor musunuz? Lütfen, uygun olan bir seçenek işaretleyiniz. <span className="required-star">*</span></label>
            <p className="question-note"><strong>Akıllı ürünlerin tanımı:</strong> Akıllı ürün, akıllı teknolojilerle donatılmış ve internete veya diğer ağlara bağlanabilen bir üründür. Bu ürünler tipik olarak uzaktan kontrol edilebilir, izlenebilir veya otomatikleştirilebilir. Akıllı ürünlere örnek olarak akıllı telefonlar, akıllı termostatlar ve güvenlik sistemleri gibi akıllı ev cihazları, akıllı TV'ler, akıllı saatler ve diğer birçok bağlı cihaz verilebilir.
            </p>
            <div className="radio-group">
              <label>
                <input type="radio" name="smartProducts" value="Akıllı ürünümüz yok" checked={smartProducts === "Akıllı ürünümüz yok"} onChange={(e) => setSmartProducts(e.target.value)} /> Akıllı ürünümüz yok
              </label>
              <label>
                <input type="radio" name="smartProducts" value="Bazı ürünlerimiz akıllı" checked={smartProducts === "Bazı ürünlerimiz akıllı"} onChange={(e) => setSmartProducts(e.target.value)} /> Bazı ürünlerimiz akıllı
              </label>
              <label>
                <input type="radio" name="smartProducts" value="Ürünlerimizin yaklaşık %50'si akıllı" checked={smartProducts === "Ürünlerimizin yaklaşık %50'si akıllı"} onChange={(e) => setSmartProducts(e.target.value)} /> Ürünlerimizin yaklaşık %50'si akıllı
              </label>
              <label>
                <input type="radio" name="smartProducts" value="Hepsi veya tamamına yakın ürünümüz akıllı" checked={smartProducts === "Hepsi veya tamamına yakın ürünümüz akıllı"} onChange={(e) => setSmartProducts(e.target.value)} /> Hepsi veya tamamına yakın ürünümüz akıllı
              </label>
            </div>
          </div>

          
          <div className="form-group">
      <label>54. Müşterinize akıllı hizmetler sunuyor musunuz? Birden fazla seçenek işaretleyebilirsiniz. <span className="required-star">*</span></label>
      <p className="question-note"><strong>Akıllı hizmetlerin tanımı:</strong> Akıllı hizmet, işlevselliğini, verimliliğini ve kullanıcı deneyimini geliştirmek için akıllı teknolojileri ve veri analizini kullanan bir hizmettir. Kişiselleştirilmiş ve otomatikleştirilmiş hizmetler sağlamak için bağlı cihazlardan, sensörlerden ve veri analitiğinden yararlanır. Akıllı hizmetlere örnek olarak akıllı ev otomasyon hizmetleri, kişiselleştirilmiş öneri sistemleri, akıllı sanal asistanlar ve uzaktan izleme ve bakım hizmetleri verilebilir. Bu hizmetler kullanıcılar için kolaylık, üretkenlik ve etkinliği artırmayı amaçlamaktadır.</p>
      <div className="checkbox-group">
        <label>
          <input type="checkbox" value="Müşterilerimize hizmet sunuyoruz, ancak bunlar akıllı değil" checked={smartServices.includes("Müşterilerimize hizmet sunuyoruz, ancak bunlar akıllı değil")} onChange={handleSmartServicesChange} /> Müşterilerimize hizmet sunuyoruz, ancak bunlar akıllı değil
        </label>
        <label>
          <input type="checkbox" value="Müşterilerimize akıllı veya internet tabanlı hizmetler sunuyoruz." checked={smartServices.includes("Müşterilerimize akıllı veya internet tabanlı hizmetler sunuyoruz.")} onChange={handleSmartServicesChange} /> Müşterilerimize akıllı veya internet tabanlı hizmetler sunuyoruz.
        </label>
        <label>
          <input type="checkbox" value="Entegre ürün-hizmet sistemleri (paket/değer önerisi olarak ürün ve hizmetler) sunuyoruz." checked={smartServices.includes("Entegre ürün-hizmet sistemleri (paket/değer önerisi olarak ürün ve hizmetler) sunuyoruz.")} onChange={handleSmartServicesChange} /> Entegre ürün-hizmet sistemleri (paket/değer önerisi olarak ürün ve hizmetler) sunuyoruz.
        </label>
        <label>
          <input type="checkbox" value="Müşterilerimize PAAS (Platform as a Service), IAAS (Infrastructure as a Service) veya SAAS (Software as a Service) gibi iş modelleri sunuyoruz." checked={smartServices.includes("Müşterilerimize PAAS (Platform as a Service), IAAS (Infrastructure as a Service) veya SAAS (Software as a Service) gibi iş modelleri sunuyoruz.")} onChange={handleSmartServicesChange} /> Müşterilerimize PAAS (Platform as a Service), IAAS (Infrastructure as a Service) veya SAAS (Software as a Service) gibi iş modelleri sunuyoruz.
        </label>
        <label>
          <input type="checkbox" value="Müşterilerimize performansa dayalı iş modelleri (kullanım başına ödeme planları gibi) sunuyoruz." checked={smartServices.includes("Müşterilerimize performansa dayalı iş modelleri (kullanım başına ödeme planları gibi) sunuyoruz.")} onChange={handleSmartServicesChange} /> Müşterilerimize performansa dayalı iş modelleri (kullanım başına ödeme planları gibi) sunuyoruz.
        </label>
      </div>
    </div>

    <div className="form-group">
      <label>55. Şirketinizdeki üretim otomasyonunun seviyesi nedir? Lütfen bir adet seçenek işaretleyiniz. <span className="required-star">*</span></label>
      <div className="radio-group">
        <label>
          <input type="radio" name="productionAutomationLevel" value="Üretim süreçleri manuel olarak yapılmaktadır." checked={productionAutomationLevel === "Üretim süreçleri manuel olarak yapılmaktadır."} onChange={(e) => setProductionAutomationLevel(e.target.value)} /> Üretim süreçleri manuel olarak yapılmaktadır.
        </label>
        <label>
          <input type="radio" name="productionAutomationLevel" value="İnsan müdahalesi gerektiren makine ve ekipman uygulamaları" checked={productionAutomationLevel === "İnsan müdahalesi gerektiren makine ve ekipman uygulamaları"} onChange={(e) => setProductionAutomationLevel(e.target.value)} /> İnsan müdahalesi gerektiren makine ve ekipman uygulamaları
        </label>
        <label>
          <input type="radio" name="productionAutomationLevel" value="Bilgisayar tabanlı makine ve ekipmanların minimum insan müdahalesi ile uygulanması (örneğin, süreci başlatmak ve bitirmek için veya planlanmamış olaylar için insan müdahalesi gereklidir)." checked={productionAutomationLevel === "Bilgisayar tabanlı makine ve ekipmanların minimum insan müdahalesi ile uygulanması (örneğin, süreci başlatmak ve bitirmek için veya planlanmamış olaylar için insan müdahalesi gereklidir)."} onChange={(e) => setProductionAutomationLevel(e.target.value)} /> Bilgisayar tabanlı makine ve ekipmanların minimum insan müdahalesi ile uygulanması (örneğin, süreci başlatmak ve bitirmek için veya planlanmamış olaylar için insan müdahalesi gereklidir).
        </label>
        <label>
          <input type="radio" name="productionAutomationLevel" value="Ekipman, makine ve bilgisayar tabanlı sistemlerin modifikasyonu, yeniden yapılandırılması ve yeniden görevlendirilmesi, sınırlı insan müdahalesi ile hızlı ve kolay bir şekilde yapılabiliyor" checked={productionAutomationLevel === "Ekipman, makine ve bilgisayar tabanlı sistemlerin modifikasyonu, yeniden yapılandırılması ve yeniden görevlendirilmesi, sınırlı insan müdahalesi ile hızlı ve kolay bir şekilde yapılabiliyor"} onChange={(e) => setProductionAutomationLevel(e.target.value)} /> Ekipman, makine ve bilgisayar tabanlı sistemlerin modifikasyonu, yeniden yapılandırılması ve yeniden görevlendirilmesi, sınırlı insan müdahalesi ile hızlı ve kolay bir şekilde yapılabiliyor
        </label>
        <label>
          <input type="radio" name="productionAutomationLevel" value="Makinelerimiz tamamen entegre ve analitik kabiliyete sahip, tepki verebilen, değişiklikleri aktarabilen ve atölye ve kurumsal yönetim sistemleriyle yakınsayan bir yapıya sahip" checked={productionAutomationLevel === "Makinelerimiz tamamen entegre ve analitik kabiliyete sahip, tepki verebilen, değişiklikleri aktarabilen ve atölye ve kurumsal yönetim sistemleriyle yakınsayan bir yapıya sahip"} onChange={(e) => setProductionAutomationLevel(e.target.value)} /> Makinelerimiz tamamen entegre ve analitik kabiliyete sahip, tepki verebilen, değişiklikleri aktarabilen ve atölye ve kurumsal yönetim sistemleriyle yakınsayan bir yapıya sahip
        </label>
      </div>
    </div>

        <button type="button" style={{ backgroundColor: '#007BFF' }} onClick={handleNext}>İleri</button>
        <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>Geri</button>
        <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>İleri</button>
        <button type="button" onClick={() => handleClearForm(currentPage)}>Formu Temizle</button>
        </>
      )}
      {currentPage === 8 && (
  <>
      <div className="form-group">
      <p class="page-parts">BT Sistemleri Peyzajı</p>
      <p class="question-note">56'dan 58'e kadar olan soruları cevaplayın.</p>
      <label>56. Şirketinizde aşağıdaki BT-Sistemlerinden hangilerini halihazırda kullanıyorsunuz? Ve bunların kullanım yoğunluğu nedir? (Lütfen her satır için geçerli olan cevabı seçiniz.) <span className="required-star">*</span></label>
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
                      checked={btSystemsUsage56[system.key] === value.toString()}
                      onChange={(e) => setBtSystemsUsage56({ ...btSystemsUsage56, [system.key]: e.target.value })}
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
            <label>57. Şirketinizde bu BT sistemlerinin mevcut olduğunu söyleyiniz. Lütfen şirketinizde halihazırda mevcut olan BT-Araç zincirlerini (sistemler arasında veri aktarımı ve iş akışları için ara yüzler) belirtir misiniz? Uygun olanları seçiniz. <span className="required-star">*</span></label>
            <p class="question-note"><i>BİR ÖNCEKİ ENTEGRASYON SORUSUNUN TAKİP SORUSU</i></p>
            <p class="question-note"><i>Bu soru, 57. soruda, 5-4-3 (Tam, Genişletilmiş, Temel işlevsellik) cevaplarını veren katılımcılar içindir.</i></p>
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
            <div className="form-group question-58">
            <label>58. Üretim sürecinde kullandığınız ana makine kontrol yöntemi nedir? <span className="required-star">*</span></label>
            <p class="question-note">Lütfen aşağıdakilerden sadece birini seçin.</p>
            <p class="question-note"><strong>SCADA'nın Tanımı:</strong> SCADA, Denetleyici Kontrol ve Veri Toplama anlamına gelir. Üretim, enerji üretimi ve altyapı sistemleri gibi endüstriyel süreçleri izlemek ve kontrol etmek için kullanılan bir sistemi ifade eder. SCADA sistemleri tipik olarak çeşitli sensörlerden ve cihazlardan gerçek zamanlı veri toplayan ve ardından elde edilen yazılım, donanım ve ağ bileşenlerinden oluşur. Bu veriler daha sonra bir kontrol odasındaki operatörlere gösterilerek operatörlerin bilinçli kararlar almalarına ve süreçleri kontrol etmelerine olanak tanır. SCADA sistemleri karmaşık endüstriyel operasyonların yönetilmesinde ve optimize edilmesinde çok önemli bir rol oynar.</p>
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
          <button type="button" style={{ backgroundColor: '#007BFF' }} onClick={handleNext}>İleri</button>
          <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>Geri</button>
          <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>İleri</button>
          <button type="button" onClick={() => handleClearForm(currentPage)}>Formu Temizle</button>
            </>
          )}
{currentPage === 9 && (
    <>
    <div className="form-group question-59">
    <p class="page-parts">Dijitalleşme Düzeyi Öz Değerlendirmesi</p>
    <p class="question-note">59'dan 65'e kadar olan soruları cevaplayın.</p>
      <label>59. Aşağıdaki ifadelerden şirketinize en uygun olan seçeneği işaretleyiniz. <span className="required-star">*</span></label>
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
      <label>Şirketinizin tamamen dijitalleşmediğini söylediniz? Neden? Lütfen bu zorlukların dijitalleşmenizi ne derece etkilediğini belirtir misiniz?</label>
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
        name="otherResponse61"
        value={otherResponse61}
        onChange={(e) => setOtherResponse61(e.target.value)}
        placeholder="Yanıtınızı girin"
      />
    </div>
    <div className="form-group">
      <label>62. Aşağıdaki dijital teknolojileri kullanma sebeplerinin şirketiniz için önem derecesini belirtir misiniz? <span className="required-star">*</span></label>
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
        name="otherResponse63"
        value={otherResponse63}
        onChange={(e) => setOtherResponse63(e.target.value)}
        placeholder="Yanıtınızı girin"
      />
    </div>
    <div className="form-group question-64">
      <label>64. Aşağıdaki ifadelerden şirketinizin dijitalleşme hedefleri veya stratejisine en çok uyan ifadeleri seçiniz. <span className="required-star">*</span></label>
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
      <label>65. Yönetiminizin dijital dönüşümü yönlendirme ve gerçekleştirme ile ilgili yaklaşımını ve kapasitesini şu ifadelere bakarak belirtir misiniz? Uygun olan tüm şıkları seçebilirsiniz. <span className="required-star">*</span></label>
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
            <button type="submit" className="button">Gönder</button>
            <button type="button" className="button" onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>Geri</button>
            <button type="button" onClick={() => handleClearForm(currentPage)}>Formu Temizle</button>
          </>
        )}

      </form>
    </div>
  );
};

export default CompanyForm;