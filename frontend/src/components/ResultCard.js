import React, { useState } from 'react';
import { useFlow } from '../context/FlowContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;


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

  const [reviewStars, setReviewStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

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
      ? `He usado la app ¿Algo Que Declarar? (AQD) y este es mi resultado:\n"¡Tengo algo que declarar! Me toca presentar la declaración de IRPF 2025."\n\n¿Siempre dudas si te toca declarar IRPF o no? ¡Compruébalo tú también en segundos aquí!: ${APP_URL}`
      : `He usado la app ¿Algo Que Declarar? (AQD) y este es mi resultado:\n"¡Buenas noticias! No tengo nada que declarar. Me libro de presentar IRPF 2025"\n\n¿Siempre dudas si te toca declarar IRPF o no? ¡Compruébalo tú también en segundos aquí!: ${APP_URL}`;
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

  const handleShareTelegram = () => {
    const shareText = getShareText();
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(APP_URL)}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, '_blank');
  };

  const handleShareWhatsApp = () => {
    const shareText = getShareText();
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareTwitter = () => {
    const text = isObligated
      ? "¡Tengo algo que declarar! He comprobado mi obligación de IRPF 2025 con @AlgoQueDeclarar"
      : "¡No tengo que declarar! He comprobado mi obligación de IRPF 2025 con @AlgoQueDeclarar";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(APP_URL)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleSubmitReview = async () => {
    if (reviewStars === 0) return;
    setReviewLoading(true);
    try {
      await axios.post(`${API}/reviews`, {
        stars: reviewStars,
        comment: reviewComment.trim() || null,
      });
      setReviewSubmitted(true);
    } catch (err) {
      console.error('Error enviando reseña:', err);
    }
    setReviewLoading(false);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${styles.gradient} flex items-start sm:items-center justify-center p-3 pt-6 sm:p-4 pb-20 sm:pb-24`}>
      <div className="w-full max-w-2xl">
        <div className={`${styles.cardBg} rounded-2xl shadow-xl p-5 sm:p-7 text-center`}>
          {/* Icono */}
          <div className={`w-14 h-14 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-3`}>
            <span className={`text-2xl ${styles.iconColor}`}>
              {styles.icon}
            </span>
          </div>

          {/* Título */}
          <h1 className={`text-2xl font-bold ${styles.titleColor} mb-4`}>
            {title}
          </h1>

          {/* Mensaje principal */}
          {mainMessage && (
            <div className="mb-4 text-sm">
              {mainMessage}
            </div>
          )}

          {/* Botones de compartir */}
          <div className="mb-4">
            <p className="text-gray-600 text-xs mb-2">Compartir resultado en:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {/* WhatsApp */}
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                data-testid="share-whatsapp-btn"
              >
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </button>

              {/* Telegram */}
              <button
                onClick={handleShareTelegram}
                className="inline-flex items-center px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                data-testid="share-telegram-btn"
              >
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Telegram
              </button>

              {/* X (Twitter) */}
              <button
                onClick={handleShareTwitter}
                className="inline-flex items-center px-3 py-1.5 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                data-testid="share-twitter-btn"
              >
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </button>

              {/* Más opciones (nativo) */}
              <button
                onClick={handleShare}
                className="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                data-testid="share-btn"
              >
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Más
              </button>
            </div>
          </div>

         {/* Sección de valoración - oculta en app (TWA/standalone) */}
          {!isObligated && !window.matchMedia('(display-mode: standalone)').matches && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                {/* Izquierda: reseña web */}
                <div className="text-left">
                  {reviewSubmitted ? (
                    <p className="text-green-600 text-sm font-medium">¡Gracias por tu valoración! 🎉</p>
                  ) : (
                    <>
                      <p className="text-gray-700 text-sm font-medium mb-1">¿Te ha resultado útil la app? ¡Valora nuestra web!</p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setReviewStars(star)}
                            onMouseEnter={() => setHoverStars(star)}
                            onMouseLeave={() => setHoverStars(0)}
                            className="text-2xl transition-transform duration-150 hover:scale-110"
                          >
                            <span className={
                              (hoverStars || reviewStars) >= star
                                ? 'text-amber-400'
                                : 'text-gray-300'
                            }>
                              ★
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Derecha: Play Store */}
                <span className="inline-flex items-center px-3 py-1.5 bg-gray-200 text-gray-500 font-medium rounded-lg text-xs whitespace-nowrap self-start">
                  <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Play Store — Próximamente
                </span>
              </div>

              {/* Comentario opcional */}
              {!reviewSubmitted && reviewStars > 0 && (
                <div className="mt-3">
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Deja un comentario (opcional)"
                    maxLength={500}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent mb-2"
                  />
                  <button
                    onClick={handleSubmitReview}
                    disabled={reviewLoading}
                    className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                  >
                    {reviewLoading ? 'Enviando...' : '⭐ Enviar valoración'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Donación */}
          {!isObligated && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-center">
              <p className="text-gray-600 text-xs mb-2">La app es gratuita y sin ánimo de lucro. Si quieres apoyar el proyecto:</p>
              <a href="https://ko-fi.com/edevs10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg font-medium text-white text-sm"
                style={{ background: '#FF5E5B' }}
              >
                ☕ Invítame a un café
              </a>
            </div>
          )}

          {/* Contenido adicional (consejo/info) */}
          {additionalContent && (
            <div className="mb-4 text-sm">
              {additionalContent}
            </div>
          )}

          {/* Texto divulgativo */}
          <p className="text-gray-500 text-xs mb-4">
            Esta información tiene fines divulgativos y no constituye asesoramiento fiscal profesional. Ante cualquier duda, consulta con un/a asesor/a fiscal.
          </p>

          {/* Botón de acción */}
          <button
            onClick={handleAction}
            className={`px-6 py-3 ${styles.buttonBg} text-white text-sm font-medium rounded-lg transition-colors duration-200`}
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
