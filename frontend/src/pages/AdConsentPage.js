import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdConsentPage = () => {
  const navigate = useNavigate();
  const [adsChecked, setAdsChecked] = useState(false);
  const [profilesChecked, setProfilesChecked] = useState(false);
  const [thirdPartyChecked, setThirdPartyChecked] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const showDependencyNote = thirdPartyChecked && !profilesChecked;

  useEffect(() => {
    const adPreference = localStorage.getItem('ad_consent');
    const termsAccepted = localStorage.getItem('terms_accepted');
    if (adPreference !== null && termsAccepted === 'true') navigate('/consent');
  }, [navigate]);

  const handleAcceptAll = () => {
    setAdsChecked(true);
    setProfilesChecked(true);
    setThirdPartyChecked(true);
  };

  const handleContinue = () => {
    const effectiveThirdParty = thirdPartyChecked && profilesChecked;
    localStorage.setItem('ad_consent', adsChecked ? 'personalized' : 'basic');
    localStorage.setItem('ad_consent_timestamp', Date.now().toString());
    localStorage.setItem('commercial_profiles', profilesChecked ? 'true' : 'false');
    localStorage.setItem('third_party_sharing', effectiveThirdParty ? 'true' : 'false');
    localStorage.setItem('consent_version', '2.0');
    localStorage.setItem('consent_timestamp', new Date().toISOString());
    localStorage.setItem('terms_accepted', 'true');
    navigate('/consent');
  };

  const handleExit = () => navigate('/');

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif", background: '#EEF4F8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', lineHeight: '1.5' }}>
      <div style={{ background: '#FFFFFF', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.08)', maxWidth: '560px', width: '100%', overflow: 'hidden' }}>

        <div style={{ textAlign: 'center', padding: '20px 28px 0' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>👋</div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', margin: 0 }}>Bienvenido a AQD</h1>
          <p style={{ fontSize: '0.82rem', color: '#2563EB', fontWeight: 500, marginTop: '2px' }}>¿Algo Que Declarar?</p>
        </div>

        <div style={{ padding: '16px 24px 20px' }}>
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', padding: '12px 14px', marginBottom: '16px' }}>
            <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: '1.55', margin: '0 0 8px 0' }}>
              Al usar AQD aceptas que es una <strong>herramienta informativa</strong>, no asesoramiento fiscal profesional. Eres responsable de la veracidad de tus respuestas y debes verificar los resultados con un profesional ante dudas.
            </p>
            <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0 }}>
              Tratamos tu edad e información económica para determinar tu obligación de declarar IRPF. La app se financia con publicidad.
            </p>
          </div>

          <button onClick={handleAcceptAll} style={{ width: '100%', padding: '13px', border: 'none', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', background: '#2563EB', color: 'white', marginBottom: '12px' }}>
            ✓ Acepto todo y continuar
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500 }}>o elige individualmente</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <ConsentOption checked={adsChecked} onChange={setAdsChecked} title="Publicidad personalizada" description="Google y sus socios crean perfiles para mostrarte anuncios relevantes. Si no aceptas, verás anuncios genéricos." />
            <ConsentOption checked={profilesChecked} onChange={setProfilesChecked} title="Perfiles comerciales" description="AQD elabora perfiles basados en tus datos económicos y fiscales (sin identificarte) para publicidad y estudios de mercado." />
            <ConsentOption checked={thirdPartyChecked} onChange={setThirdPartyChecked} title="Cesión a terceros" description="AQD puede ceder o vender los perfiles a empresas del sector financiero, publicidad y análisis de datos, sin incluir datos que te identifiquen." />
          </div>

          {showDependencyNote && (
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '8px 12px', fontSize: '0.72rem', color: '#92400E', lineHeight: '1.45', marginBottom: '12px', display: 'flex', gap: '6px' }}>
              <span style={{ flexShrink: 0 }}>ℹ️</span>
              <span>La cesión a terceros solo es efectiva si también aceptas la creación de perfiles.</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '12px' }}>
            <button onClick={() => setShowTerms(true)} style={{ fontSize: '0.78rem', color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              Ver Términos
            </button>
            <button onClick={() => setShowPrivacy(true)} style={{ fontSize: '0.78rem', color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              Ver Política
            </button>
          </div>

          <button onClick={handleContinue} style={{ width: '100%', padding: '12px', border: '1.5px solid #2563EB', borderRadius: '10px', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer', background: 'white', color: '#2563EB', marginBottom: '8px' }}>
            Siguiente →
          </button>

          <button onClick={handleExit} style={{ width: '100%', padding: '8px', border: 'none', background: 'transparent', fontSize: '0.8rem', color: '#94A3B8', cursor: 'pointer' }}>
            Salir de la app
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#94A3B8', lineHeight: '1.4', margin: '8px 0 0' }}>
            Puedes cambiar estas preferencias contactando con <a href="mailto:e.goidevs@gmail.com" style={{ color: '#94A3B8' }}>e.goidevs@gmail.com</a>
          </p>
        </div>
      </div>

      {/* ===== MODAL TÉRMINOS ===== */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h2 className="font-bold text-gray-800 text-lg">Términos de Uso de AQD</h2>
              <button onClick={() => setShowTerms(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] text-sm text-gray-700 prose prose-sm">
              <p className="text-gray-500 mb-4"><strong>Última actualización:</strong> 22 de febrero de 2026</p>
              <h3 className="font-bold text-gray-800 mt-4">1. Aceptación de los términos</h3>
              <p>Al descargar, instalar o utilizar la aplicación AQD ("¿Algo Que Declarar?"), en adelante "la Aplicación", aceptas expresamente estos Términos de Uso y te comprometes a cumplirlos en su totalidad. Si no estás de acuerdo con alguno de estos términos, no debes utilizar la Aplicación.</p>
              <p className="mt-2">La Aplicación es un servicio de la sociedad de la información en los términos definidos por la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).</p>
              <h3 className="font-bold text-gray-800 mt-4">2. Identificación del titular</h3>
              <p>En cumplimiento del artículo 10 de la LSSI-CE, se informa al usuario que el responsable de la Aplicación es:</p>
              <p className="mt-2"><strong>Email de contacto:</strong> e.goidevs@gmail.com</p>
              <p className="mt-2">El titular pone a disposición del usuario este canal de comunicación para cualquier consulta, queja o ejercicio de derechos.</p>
              <h3 className="font-bold text-gray-800 mt-4">3. Descripción del servicio</h3>
              <p>AQD es una herramienta informativa que te ayuda a determinar si tienes obligación de presentar la declaración del Impuesto sobre la Renta de las Personas Físicas (IRPF) en España, según las respuestas que proporciones.</p>
              <p className="mt-2"><strong>AVISO IMPORTANTE:</strong> AQD es una herramienta orientativa y educativa. NO constituye asesoramiento fiscal profesional ni recomendaciones legales personalizadas. Los resultados ofrecidos no sustituyen la consulta con un profesional colegiado ni la verificación con la Agencia Tributaria.</p>
              <h3 className="font-bold text-gray-800 mt-4">3.1. Limitaciones del servicio</h3>
              <p>AQD proporciona resultados basados en las respuestas que tú introduces, la normativa fiscal vigente en el momento de la última actualización y los supuestos generales y habituales recogidos en dicha normativa.</p>
              <h3 className="font-bold text-gray-800 mt-4">3.2. Lo que AQD NO hace</h3>
              <p>AQD no analiza tu situación fiscal personal completa, no sustituye el asesoramiento de un profesional colegiado, no te representa ante la Agencia Tributaria, no garantiza que el resultado sea aplicable a tu caso específico y no se responsabiliza de cambios normativos posteriores a la última actualización.</p>
              <h3 className="font-bold text-gray-800 mt-4">4. Responsabilidades del usuario</h3>
              <h4 className="font-semibold text-gray-700 mt-2">4.1. Veracidad de la información</h4>
              <p>Eres el único responsable de proporcionar información veraz y completa, interpretar correctamente las preguntas, verificar los resultados con fuentes oficiales o profesionales y tomar decisiones informadas sobre tu situación fiscal.</p>
              <h4 className="font-semibold text-gray-700 mt-2">4.2. Uso adecuado</h4>
              <p>Te comprometes a usar la Aplicación únicamente para fines informativos legales, no utilizarla para fines fraudulentos o ilegales, no intentar manipular o alterar su funcionamiento y no reproducir, distribuir o crear obras derivadas sin autorización expresa.</p>
              <h3 className="font-bold text-gray-800 mt-4">5. Creación de perfiles comerciales y cesión de datos a terceros</h3>
              <p><strong>INFORMACIÓN ESENCIAL SOBRE EL TRATAMIENTO COMERCIAL DE TUS DATOS:</strong> Esta cláusula describe un tratamiento de datos que requiere tu consentimiento expreso, libre, específico e informado conforme al artículo 6.1.a) y 7 del RGPD. Este consentimiento se te solicitará de forma independiente y granular al utilizar la Aplicación, y puedes denegarlo sin que ello afecte al funcionamiento del servicio principal.</p>
              <h4 className="font-semibold text-gray-700 mt-2">5.1. ¿Qué son los perfiles comerciales?</h4>
              <p>Si otorgas tu consentimiento expreso, AQD podrá crear perfiles comerciales basados en los datos que proporciones durante el uso de la Aplicación. Estos perfiles consisten en la agrupación y análisis de tus datos económicos, fiscales y demográficos (sin incluir datos que permitan tu identificación directa, como nombre, DNI/NIE o dirección) para generar un perfil de intereses, hábitos y situación económica general.</p>
              <h4 className="font-semibold text-gray-700 mt-2">5.2. ¿Para qué se utilizan estos perfiles?</h4>
              <p>Los perfiles comerciales podrán utilizarse para: segmentación publicitaria avanzada, estudios de mercado e inform

