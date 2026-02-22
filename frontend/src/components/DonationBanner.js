import React, { useState } from 'react';

const DonationBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const goToKofi = () => {
    window.open('https://ko-fi.com/edevs10', '_blank');
  };

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '14px',
      padding: '20px 24px',
      marginTop: '24px',
      textAlign: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>💙</div>
      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1E293B', margin: '0 0 4px' }}>
        ¿Te ha sido útil AQD?
      </p>
      <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0 0 16px' }}>
        La app es gratuita y sin ánimo de lucro. Si quieres apoyar el proyecto, puedes hacer una pequeña donación.
      </p>
      <button
        onClick={goToKofi}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 24px',
          borderRadius: '8px',
          background: '#FF5E5B',
          color: 'white',
          fontSize: '0.85rem',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        ☕ Invítame a un café
      </button>
      <div>
        <button
          onClick={() => setDismissed(true)}
          style={{
            marginTop: '12px',
            background: 'none',
            border: 'none',
            fontSize: '0.75rem',
            color: '#94A3B8',
            cursor: 'pointer',
          }}
        >
          No, gracias
        </button>
      </div>
    </div>
  );
};

export default DonationBanner;
