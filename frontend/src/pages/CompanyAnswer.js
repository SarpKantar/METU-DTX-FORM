import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../styling/CompanyAnswer.css';

const CompanyAnswer = () => {
  const { companyID } = useParams();
  const [companyForm, setCompanyForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyForm = async () => {
      try {
        console.log('Fetching data for companyID:', companyID); // Debugging log
        const q = query(collection(db, 'companyForms'), where('companyID', '==', companyID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0]; // Assuming companyID is unique and we get only one document
          console.log('Document data:', docSnap.data()); // Debugging log
          setCompanyForm(docSnap.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyForm();
  }, [companyID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!companyForm) {
    return <div>No data available for this company.</div>;
  }

  const questions = [
    { key: 'companyName', label: '1. Şirket adı' },
    { key: 'participantName', label: '2. Katılımcı adı' },
    { key: 'phoneNumber', label: '3. Telefon numarası' },
    { key: 'email', label: '4. E-posta' },
    { key: 'companyAddress', label: '5. Şirket adresi' },
    { key: 'companyWebsite', label: '6. Şirket websitesi' },
    { key: 'jobTitle', label: '7. Şirketteki ünvanınız' },
    { key: 'yearsInPosition', label: '8. Bu pozisyonda kaç yıldır çalışıyorsunuz?' },
    { key: 'companyAge', label: '9. Şirketiniz kaç yaşındadır?' },
    { key: 'companySector', label: '10. İşletmenizin sektörü nedir?' },
    { key: 'exportStatus', label: '11. Hizmetlerinizi/ürünlerinizi ihraç ediyor musunuz?' },
    { key: 'eExport', label: '12. E-ihracat yapıyor musunuz?' },
    { key: 'exportPercentage', label: '13. İhracatın toplam cironuz içindeki yüzdesi nedir?' },
    { key: 'targetRegions', label: '14. Gelecek yıl ihracat yapmayı hedeflediğiniz bölgeler var mı?' },
    { key: 'developmentAreas', label: '15. Geliştirme sahalarınızın sayısı nedir?' },
    { key: 'productionAreas', label: '16. Üretim sahalarınızın sayısı nedir?' },
    { key: 'revenue2022', label: '17. 2022 yılındaki cironuz nedir?' },
    { key: 'revenue2021', label: '18. 2021 yılındaki cironuz nedir?' },
    { key: 'innovationBudgetCurrent', label: '19. Bu yıl toplam cironuzun ne kadarını inovasyon ve AR-GE faaliyetlerine ayırmayı planlıyorsunuz?' },
    { key: 'innovationBudgetFuture', label: '20. Önümüzdeki üç yıl içinde toplam cironuzun ne kadarını inovasyon ve Ar-Ge faaliyetlerine ayırmayı planlıyorsunuz?' },
    { key: 'techInvestment', label: '21. Son üç yıldaki teknoloji yatırımınız ne kadardır?' },
    { key: 'fullTimeEmployees', label: '22. Şirketinizdeki tam zamanlı çalışan sayısı nedir?' },
    { key: 'whiteCollarEmployees', label: '23. Şirketinizdeki beyaz yaka sayısı nedir?' },
    { key: 'blueCollarEmployees', label: '24. Şirketinizdeki mavi yaka sayısı nedir?' },
    { key: 'associateDegreeEmployees', label: '25. Şirketinizdeki üniversite (lisans) mezunu çalışan sayısı nedir?' },
    { key: 'bachelorDegreeEmployees', label: '26. Şirketinizdeki üniversite (lisans) mezunu çalışan sayısı nedir?' },
    { key: 'masterDegreeEmployees', label: '27. Şirketinizdeki yüksek lisans (Master) dereceli çalışan sayısı nedir?' },
    { key: 'phdDegreeEmployees', label: '28. Şirketinizdeki doktora dereceli çalışan sayısı nedir?' },
    { key: 'departments', label: '29. Aşağıda listelenen departmanlardan hangileri şirketinizde mevcuttur?' },
    { key: 'digitalAssessment', label: '30. Herhangi bir dijitalleşme değerlendirmesine katıldınız mı? Cevabınız evet ise hangi değerlendirme yöntemine veya hizmetine katıldınız?' },
    { key: 'salesMarketingActivities', label: '31. Lütfen bize şirketinizin satış ve pazarlama yaklaşımından bahsedin. Şirketiniz aşağıdaki faaliyetlerden hangilerini gerçekleştiriyor?' },
    { key: 'developmentPlans', label: '32. Şirketinizde aşağıdakilerden herhangi biri var mı? Lütfen geçerli olanları seçiniz.' },
    { key: 'innovationProjects', label: '33. Son beş yılda şirketinizde inovasyonla ilgili kaç proje yürüttünüz?' },
    { key: 'productVariety', label: '34. Lütfen ürün çeşitliliğinizi belirtir misiniz? Kaç farklı/özgün ürün çeşidi/aileşi üretiyorsunuz?' },
    { key: 'salesReasons', label: '35. Müşterilerinizin ürünlerinizi/hizmetlerinizi rakiplerinize tercih etmesinin en önemli üç nedeni nedir?' },
    { key: 'circularDesign', label: '38. Döngüsel Tasarım/Üretim: Döngüsel Tasarım/Üretim modelleri, bir ürünün geliştirme aşamasına odaklanır. Ürünlerin ve varlıkların döngüsel kaynak verimliliğini artırmayı amaçlar. Ürünler daha uzun süre dayanacak ve bakım, onarımı, yükseltilmesi, yenilenmesi, yeniden üretilmesi veya geri dönüştürülmesi daha kolay olacak şekilde tasarlanır. Buna ek olarak, biyo-bazlı veya tamamen geri dönüştürülebilir malzemeler geliştirilir veya kullanılır.' },
    { key: 'optimalUse', label: '39. Döngüsel (Optimal) Kullanım: Bu iş modelleri, kullanımı optimize ederek ve böylece kullanım ömrünü uzatarak ve kaynakları koruyarak bir ürünün kullanım aşamasına odaklanır. Bu iş modelleri, ürünün sahipliğini korumayı (örneğin bir ürünü satmak yerine hizmet olarak sunarak) ve ürünün ömrünü boyunca sorumluluğunu almayı (örneğin bakım hizmetleri veya ömrünü uzatan diğer eklentiler sunarak) mümkün kılar. Bu iş modelleri, ürün satışından sözleşme satışına geçişi içermektedir.' },
    { key: 'valueRecovery', label: '40. Döngüsel Değer Geri Kazanım: Bu iş modelleri, bir ürünün kullanım aşamasından sonraki çıktısına ve katma değerine odaklanır. Bu modeller, kullanılmış ürünleri yeni ürünlere veya kullanılabilir bileşenlere veya hammaddelere dönüştürerek gelir elde eder. Ters lojistik gelişimi bu model için esastır.' },
    { key: 'supportModels', label: '41. Döngüsel Destek Modelleri: Döngüsel ekonomi stratejilerini mümkün kılan araçların, uygulamaların ve hizmetlerin geliştirilmesi/dağıtılması' },
    { key: 'productStrategy', label: '44. Şirketiniz için geçerli olan ve en çok uygulanan Ürün Yaratma/Geliştirme Stratejisi hangisidir? ' },
    { key: 'additionalStrategies', label: '45. Bunun dışında başka geçerli olan stratejiler var mı? Eğer cevabınız evet ise lütfen yazınız.' },
    { key: 'optimizationConcepts', label: '46. Üretiminizi optimize etmek için temel kavramları kullanıyor musunuz (örneğin Toyota Üretim Sistemi, Yalın Üretim Yönetimi, Sürekli İyileştirme, Toplam Üretken Bakım, Dünya Klasında Üretim, GD³ - Yalın Geliştirme)? EVET/HAYIR' },
    { key: 'productDevelopmentMethod', label: '47. Ürün geliştirme yönteminiz nedir?' },
    { key: 'productionStrategy', label: '48. Üretim Stratejinizi/Yaklaşımınızı nasıl tanımlarsınız?' },
    { key: 'productConfiguration', label: '49. Ürünlerinizi nasıl yapılandırıyor ve modelliyorsunuz? Lütfen, uygun olan bir seçenek işaretleyiniz.' },
    { key: 'workflowProcesses', label: '50. Şirketinizdeki iş akışı süreçleri nelerdir?' },
    { key: 'engineeringDataManagement', label: '51. Mühendislik verilerinizi nasıl yönetiyor ve saklıyorsunuz? Geçerli olan cevaplardan tümünü seçiniz.' },
    { key: 'supplyChainManagement', label: '52. Tedarik zinciri yönetiminizi (SCM) nasıl gerçekleştiriyorsunuz? Lütfen bir seçenek işaretleyiniz.' },
    { key: 'smartProducts', label: '53. Müşterinize akıllı ürünler sunuyor musunuz? Lütfen, uygun olan bir seçenek işaretleyiniz.' },
    { key: 'smartServices', label: '54. Müşterinize akıllı hizmetler sunuyor musunuz? Birden fazla seçenek işaretleyebilirsiniz.' },
    { key: 'productionAutomationLevel', label: '55. Şirketinizdeki üretim otomasyonunun seviyesi nedir? Lütfen bir adet seçenek işaretleyiniz.' },
    
  ];

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

  const components42 = [
    'Hidrolik ve/veya pnömatik dahil mekanik',
    'Elektronik',
    'Yazılım',
    'Ürüne ilgili hizmetler (örn. havadan yazılım güncellemeleri, yedek parçalar, satış sonrası hizmetler, ...)',
    'Ürüne entegre edilmiş hizmetler (örn. Öngörücü Bakım)'
  ];

  const components43 = [
    'Hidrolik ve/veya pnömatik dahil mekanik',
    'Elektronik',
    'Yazılım',
    'Ürüne ilgili hizmetler (örn. havadan yazılım güncellemeleri, yedek parçalar, satış sonrası hizmetler, ...)',
    'Ürüne entegre edilmiş hizmetler (örn. Öngörücü Bakım)'
  ];

  return (
    <div className="company-answer-container">
      <h1>Company Answers</h1>
      <div className="company-answer">
        <table>
          <tbody>
            {questions.map(({ key, label }) => (
              <tr key={key}>
                <th>{label}</th>
                <td>{Array.isArray(companyForm[key]) ? companyForm[key].join(', ') : companyForm[key]?.toString() || 'N/A'}</td>
              </tr>
            ))}
            <tr>
              <th>36. Her bir trend mevcut işinizi nasıl etkiliyor?</th>
              <td>
                <table>
                  <tbody>
                    {trends36.map((trend, index) => (
                      <tr key={index}>
                        <td>{trend}</td>
                        <td>{companyForm.btSystemsUsage36 ? companyForm.btSystemsUsage36[`btSystemsUsage36-trend-36-${index}`] || 'N/A' : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th>37. Her bir trend mevcut işinizi nasıl etkiliyor?</th>
              <td>
                <table>
                  <tbody>
                    {trends37.map((trend, index) => (
                      <tr key={index}>
                        <td>{trend}</td>
                        <td>{companyForm.btSystemsUsage37 ? companyForm.btSystemsUsage37[`btSystemsUsage37-trend-37-${index}`] || 'N/A' : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th>42. Aşağıdaki bileşenlerin/unsurların hâli hazırdaki ürün ve hizmetlerinizle ne kadar ilgili olduğunu belirtir misiniz?</th>
              <td>
                <table>
                  <tbody>
                    {components42.map((component, index) => (
                      <tr key={index}>
                        <td>{component}</td>
                        <td>{companyForm.btSystemsUsage42 ? companyForm.btSystemsUsage42[`component-42-${index}`] || 'N/A' : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th>43. Aşağıdaki bileşenlerin/unsurların hangilerinin önümüzdeki 5 yıl içinde ürün ve hizmetlerinizle ne kadar ilgili olacağını belirtir misiniz?</th>
              <td>
                <table>
                  <tbody>
                    {components43.map((component, index) => (
                      <tr key={index}>
                        <td>{component}</td>
                        <td>{companyForm.btSystemsUsage43 ? companyForm.btSystemsUsage43[`component-43-${index}`] || 'N/A' : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th>56. Aşağıdaki BT sistemlerini ne kadar kullanıyorsunuz?</th>
              <td>
                <table>
                  <tbody>
                    {[
                      { key: 'cad', label: 'CAD' },
                      { key: 'cae', label: 'CAE' },
                      { key: 'cam', label: 'CAM' },
                      { key: 'crm', label: 'CRM' },
                      { key: 'ecad', label: 'E-CAD' },
                      { key: 'erp', label: 'ERP' },
                      { key: 'integrationTools', label: 'Entegrasyon Araçları' },
                      { key: 'iysDys', label: 'IYS/DYS' },
                      { key: 'mes', label: 'MES' },
                      { key: 'mom', label: 'MOM' },
                      { key: 'pdmPlm', label: 'PDM/PLM' },
                      { key: 'projectManagement', label: 'Proje Yönetimi' },
                      { key: 'supplyChain', label: 'Tedarik Zinciri' }
                    ].map(({ key, label }, index) => (
                      <tr key={index}>
                        <td>{label}</td>
                        <td>{companyForm.btSystemsUsage56 ? companyForm.btSystemsUsage56[key] || 'N/A' : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="company-answer-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default CompanyAnswer;