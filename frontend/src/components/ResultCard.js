import React from 'react';
import { useFlow } from '../context/FlowContext';

const ResultCard = ({ 
  title, 
  description, 
  mainMessage,
  additionalContent,
  type = 'success', // 'success', 'info', 'warning'
  actionText = "Comenzar de nuevo",
  onAction,
  isObligated = false
}) => {
  const { resetFlow } = useFlow();

  const APP_URL = "https://play.google.com/store/apps/details?id=com.aqd.app"; // Cambiar por URL real

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          gradient: 'from-green-50 to-blue-50',
          cardBg: 'bg-white',
          titleColor: 'text-green-600',
          icon: '✓',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          buttonBg: 'bg-green-600 hover:bg-green-700'
        };
      case 'info':
        return {
          gradient: 'from-blue-50 to-green-50',
          cardBg: 'bg-white',
          titleColor: 'text-blue-600',
          icon: 'ℹ',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          buttonBg: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'warning':
        return {
          gradient: 'from-orange-50 to-yellow-50',
          cardBg: 'bg-white',
          titleColor: 'text-orange-600',
          icon: '⚠',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          buttonBg: 'bg-orange-600 hover:bg-orange-700'
        };
      default:
        return {
          gradient: 'from-gray-50 to-gray-100',
          cardBg: 'bg-white',
          titleColor: 'text-gray-600',
          icon: '◯',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          buttonBg: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  const styles = getTypeStyles();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      resetFlow();
      window.location.href = '/';
    }
  };

  const handleShare = async () => {
    const shareText = isObligated
      ? `He usado la app ¿Algo Que Declarar? (AQD) y este es mi resultado:\n"¡Tienes algo que declarar! Presenta la declaración de IRPF 2025."\n\n¿Siempre dudas si te toca declarar IRPF o no? ¡Compruébalo tú también en segundos aquí: ${APP_URL}`
      : `He usado la app ¿Algo Que Declarar? (AQD) y este es mi resultado:\n"¡Enhorabuena! No estás obligado a presentar la declaración de IRPF 2025."\n\n¿Siempre dudas si te toca declarar IRPF o no? ¡Compruébalo tú también en segundos aquí: ${APP_URL}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: '¿Algo Que Declarar?',
          text: shareText,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('¡Texto copiado al portapapeles!');
      } catch (err) {
        console.error('Error copying to clipboard');
      }
    }
  };

  const handleRate = () => {
    window.open(APP_URL, '_blank');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${styles.gradient} flex items-center justify-center p-4`}>
      <div className="w-full max-w-2xl">
        <div className={`${styles.cardBg} rounded-2xl shadow-xl p-8 text-center`}>
          {/* Icono */}
          <div className={`w-20 h-20 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <span className={`text-3xl ${styles.iconColor}`}>
              {styles.icon}
            </span>
          </div>

          {/* Título */}
          <h1 className={`text-3xl font-bold ${styles.titleColor} mb-6`}>
            {title}
          </h1>

          {/* Mensaje principal */}
          {mainMessage && (
            <div className="mb-6">
              {mainMessage}
            </div>
          )}

          {/* Botón compartir */}
          <div className="mb-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
              data-testid="share-btn"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Compartir resultado
            </button>
          </div>

          {/* Sección de valoración - solo para no obligados */}
          {!isObligated && (
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <p className="text-gray-700 font-medium mb-1">¿Te ha resultado útil la app?</p>
              <p className="text-gray-600 text-sm mb-3">¡Tu valoración en Play Store nos ayudaría muchísimo!</p>
              <button
                onClick={handleRate}
                className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200"
                data-testid="rate-btn"
              >
                <span className="mr-2">⭐</span>
                Valorar en Play Store
              </button>
            </div>
          )}

          {/* Contenido adicional (consejo/info) */}
          {additionalContent && (
            <div className="mb-6">
              {additionalContent}
            </div>
          )}

          {/* Texto divulgativo */}
          <p className="text-gray-500 text-sm mb-6">
            Esta información tiene fines divulgativos y no constituye asesoramiento fiscal profesional. Ante cualquier duda, consulta con un asesor fiscal.
          </p>

          {/* Botón de acción */}
          <button
            onClick={handleAction}
            className={`px-8 py-4 ${styles.buttonBg} text-white font-medium rounded-lg transition-colors duration-200`}
            data-testid="new-query-btn"
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
