import React from 'react';
import { useFlow } from '../context/FlowContext';

const ResultCard = ({ 
  title, 
  description, 
  mainMessage,
  additionalContent,
  type = 'success',
  actionText = "Comenzar de nuevo",
  onAction,
  isObligated = false
}) => {
  const { resetFlow } = useFlow();

  const APP_URL = "https://www.algoquedeclarar.es";

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

  const getShareText = () => {
    return isObligated
      ? `He usado la app ¿Algo Que Declarar? (AQD) y este es mi resultado:\n"¡Tienes algo que declarar! Presenta la declaración de IRPF 2025."\n\n¿Siempre dudas si te toca declarar IRPF o no? ¡Compruébalo tú también en segundos aquí: ${APP_URL}`
      : `He usado la app ¿Algo Que Declarar? (AQD) y este es mi resultado:\n"¡Enhorabuena! No estás obligado a presentar la declaración de IRPF 2025."\n\n¿Siempre dudas si te toca declarar IRPF o no? ¡Compruébalo tú también en segundos aquí: ${APP_URL}`;
  };

  const handleShare = async () => {
    const shareText = getShareText();

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

  const handleShareWhatsApp = () => {
    const shareText = getShareText();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareTwitter = () => {
    const text = isObligated
      ? "¡Tengo algo que declarar! He comprobado mi obligación de IRPF 2025 con @AlgoQueDeclarar"
      : "¡No tengo que declarar! He comprobado mi obligación de IRPF 2025 con @AlgoQueDeclarar";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(APP_URL)}`;
    window.open(twitterUrl, '_blank');
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

          {/* Botones de compartir */}
          <div className="mb-4">
            <p className="text-gray-600 text-sm mb-3">Compartir resultado en:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {/* WhatsApp */}
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200"
                data-testid="share-whatsapp-btn"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </button>

              {/* X (Twitter) */}
              <button
                onClick={handleShareTwitter}
                className="inline-flex items-center px-4 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200"
                data-testid="share-twitter-btn"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X (Twitter)
              </button>

              {/* Más opciones (nativo) */}
              <button
                onClick={handleShare}
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                data-testid="share-btn"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Más opciones
              </button>
            </div>
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
