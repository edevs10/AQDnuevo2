import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdConsentPage = () => {
  const navigate = useNavigate();
  const [adsChecked, setAdsChecked] = useState(false);
  const [profilesChecked, setProfilesChecked] = useState(false);
  const [thirdPartyChecked, setThirdPartyChecked] = useState(false);
  const showDependencyNote = thirdPartyChecked && !profilesChecked;

  useEffect(() => {
    const adPreference = localStorage.getItem('ad_consent');
    if (adPreference !== null) navigate('/consent');

    
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
    <div style={{
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      background: '#EEF4F8',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 16px',
      lineHeight: '1.5',
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.08)',
        maxWidth: '560px',
        width: '100%',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', padding: '20px 28px 0' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>👋</div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', margin: 0 }}>Bienvenido a AQD</h1>
          <p style={{ fontSize: '0.82rem', color: '#2563EB', fontWeight: 500, marginTop: '2px' }}>¿Algo Que Declarar?</p>
        </div>

        <div style={{ padding: '16px 24px 20px' }}>

          {/* Summary box */}
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', padding: '12px 14px', marginBottom: '16px' }}>
            <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: '1.55', margin: '0 0 8px 0' }}>
              Al usar AQD aceptas que es una <strong>herramienta informativa</strong>, no asesoramiento fiscal profesional. Eres responsable de la veracidad de tus respuestas y debes verificar los resultados con un profesional ante dudas.
            </p>
            <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0 }}>
              Tratamos tu edad e información económica para determinar tu obligación de declarar IRPF. La app se financia con publicidad.
            </p>
          </div>

          {/* Accept all button */}
          <button
            onClick={handleAcceptAll}
            style={{
              width: '100%',
              padding: '13px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: '#2563EB',
              color: 'white',
              marginBottom: '12px',
            }}
          >
            ✓ Acepto todo y continuar
          </button>

          {/* Separator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500 }}>o elige individualmente</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Consent options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <ConsentOption
              checked={adsChecked}
              onChange={setAdsChecked}
              title="Publicidad personalizada"
              description="Google y sus socios crean perfiles para mostrarte anuncios relevantes. Si no aceptas, verás anuncios genéricos."
            />
            <ConsentOption
              checked={profilesChecked}
              onChange={setProfilesChecked}
              title="Perfiles comerciales"
              description="AQD elabora perfiles basados en tus datos económicos y fiscales (sin identificarte) para publicidad y estudios de mercado."
            />
            <ConsentOption
              checked={thirdPartyChecked}
              onChange={setThirdPartyChecked}
              title="Cesión a terceros"
              description="AQD puede ceder o vender los perfiles a empresas del sector financiero, publicidad y análisis de datos, sin incluir datos que te identifiquen."
            />
          </div>

          {showDependencyNote && (
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '8px 12px', fontSize: '0.72rem', color: '#92400E', lineHeight: '1.45', marginBottom: '12px', display: 'flex', gap: '6px' }}>
              <span style={{ flexShrink: 0 }}>ℹ️</span>
              <span>La cesión a terceros solo es efectiva si también aceptas la creación de perfiles.</span>
            </div>
          )}

          {/* Doc links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '12px' }}>
            <button onClick={() => navigate('/terms')} style={{ fontSize: '0.78rem', color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              Ver Términos
            </button>
            <button onClick={() => navigate('/terms')} style={{ fontSize: '0.78rem', color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              Ver Política
            </button>
          </div>

          {/* Next button */}
          <button
            onClick={handleContinue}
            style={{
              width: '100%',
              padding: '12px',
              border: '1.5px solid #2563EB',
              borderRadius: '10px',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: 'white',
              color: '#2563EB',
              marginBottom: '8px',
            }}
          >
            Siguiente →
          </button>

          <button
            onClick={handleExit}
            style={{ width: '100%', padding: '8px', border: 'none', background: 'transparent', fontSize: '0.8rem', color: '#94A3B8', cursor: 'pointer' }}
          >
            Salir de la app
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#94A3B8', lineHeight: '1.4', margin: '8px 0 0' }}>
            Puedes cambiar estas preferencias contactando con e.goidevs@gmail.com
          </p>

        </div>
      </div>
    </div>
  );
};

const ConsentOption = ({ checked, onChange, title, description }) => (
  <div
    onClick={() => onChange(!checked)}
    style={{
      border: `1.5px solid ${checked ? '#2563EB' : '#E2E8F0'}`,
      borderRadius: '10px',
      padding: '10px 12px',
      cursor: 'pointer',
      background: checked ? '#EFF6FF' : 'white',
      transition: 'all 0.2s ease',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <div style={{
        width: '20px', height: '20px', minWidth: '20px',
        border: `2px solid ${checked ? '#2563EB' : '#CBD5E1'}`,
        borderRadius: '6px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: checked ? '#2563EB' : 'white',
        marginTop: '1px',
        transition: 'all 0.2s ease',
        flexShrink: 0,
      }}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div>
        <h3 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E293B', lineHeight: '1.3', margin: 0 }}>{title}</h3>
        <p style={{ fontSize: '0.74rem', color: '#475569', margin: '3px 0 4px', lineHeight: '1.45' }}>{description}</p>
        <span style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '1px 6px', borderRadius: '4px', background: '#ECFDF5', color: '#10B981', border: '1px solid #A7F3D0' }}>
          Opcional
        </span>
      </div>
    </div>
  </div>
);

export default AdConsentPage;
