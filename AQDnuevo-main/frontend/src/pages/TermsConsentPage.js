import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TermsConsentPage = () => {
  const navigate = useNavigate();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfUse, setShowTermsOfUse] = useState(false);

  useEffect(() => {
    const hasAcceptedTerms = localStorage.getItem('terms_accepted');
    if (hasAcceptedTerms === 'true') {
      navigate('/ad-consent');
    }
  }, [navigate]);

  const handleAccept = () => {
    localStorage.setItem('terms_accepted', 'true');
    localStorage.setItem('terms_accepted_timestamp', Date.now().toString());
    navigate('/ad-consent');
  };

  const handleExit = () => {
    window.close();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-4xl mb-2 block">👋</span>
            <h1 className="text-2xl font-bold text-gray-800">Bienvenido a AQD</h1>
            <p className="text-blue-600 font-semibold mt-1">¿Algo Que Declarar?</p>
          </div>

          {/* Resumen de términos y privacidad */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 mb-3">
              Resumen de política de privacidad y términos y condiciones
            </h2>
            
            <p className="text-sm text-gray-700 mb-2">Al usar AQD aceptas que:</p>
            <ul className="space-y-1 text-sm text-gray-700 mb-4">
              <li className="flex items-start"><span className="mr-2">•</span> Es solo una herramienta informativa, no asesoramiento fiscal profesional</li>
              <li className="flex items-start"><span className="mr-2">•</span> Eres responsable de la veracidad de tus respuestas</li>
              <li className="flex items-start"><span className="mr-2">•</span> Debes verificar los resultados con un profesional ante dudas</li>
              <li className="flex items-start"><span className="mr-2">•</span> El titular de AQD no se responsabiliza de decisiones tomadas basándose solo en la app</li>
              <li className="flex items-start"><span className="mr-2">•</span> Respetarás los derechos de propiedad intelectual</li>
              <li className="flex items-start"><span className="mr-2">•</span> Podremos modificar el servicio o estos términos</li>
            </ul>

            <p className="text-sm text-gray-800 font-semibold mb-4">
              Siempre consulta con un asesor fiscal profesional ante dudas o situaciones complejas.
            </p>

            <h3 className="text-sm font-bold text-gray-800 mb-2">¿Qué datos usamos y para qué?</h3>
            <p className="text-sm text-gray-700">
              Tratamos tus datos personales (edad, información económica y familiar) para determinar la normativa aplicable y tu obligación de declarar IRPF. Tus datos pueden usarse de forma anónima para estadísticas.
            </p>
          </div>

          {/* Links a documentos completos */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => { setShowPrivacyPolicy(true); setShowTermsOfUse(false); }}
              className="text-blue-600 font-medium hover:text-blue-700 flex items-center text-sm"
              data-testid="view-privacy-policy"
            >
              <span className="mr-1">📄</span> Ver Política
            </button>
            <button
              onClick={() => { setShowTermsOfUse(true); setShowPrivacyPolicy(false); }}
              className="text-blue-600 font-medium hover:text-blue-700 flex items-center text-sm"
              data-testid="view-terms-of-use"
            >
              <span className="mr-1">📋</span> Ver Términos
            </button>
          </div>

          {/* Botón de aceptar */}
          <div className="space-y-3">
            <button
              onClick={handleAccept}
              className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              data-testid="accept-terms-btn"
            >
              <span className="mr-2">✓</span> Acepto y continuar
            </button>
            
            <button
              onClick={handleExit}
              className="w-full px-6 py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors duration-200 text-sm"
              data-testid="exit-btn"
            >
              Salir de la app
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Términos */}
      {showTermsOfUse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h2 className="font-bold text-gray-800 text-lg">Términos de Uso de AQD</h2>
              <button onClick={() => setShowTermsOfUse(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] text-sm text-gray-700 prose prose-sm">
              <p className="text-gray-500 mb-4"><strong>Última actualización:</strong> 02 de febrero de 2026</p>
              
              <h3 className="font-bold text-gray-800 mt-4">1. Aceptación de los términos</h3>
              <p>Al descargar, instalar o utilizar la aplicación AQD ("¿Algo Que Declarar?"), aceptas expresamente estos Términos de Uso y te comprometes a cumplirlos. Si no estás de acuerdo con estos términos, no utilices la aplicación.</p>

              <h3 className="font-bold text-gray-800 mt-4">2. Descripción del servicio</h3>
              <p>AQD es una herramienta informativa que te ayuda a determinar si tienes obligación de presentar la declaración del Impuesto sobre la Renta de las Personas Físicas (IRPF) en España, según las respuestas que proporciones.</p>
              <p><strong>Importante:</strong> AQD es una herramienta orientativa y educativa, <strong>NO</strong> constituye asesoramiento fiscal profesional ni recomendaciones legales personalizadas.</p>

              <h3 className="font-bold text-gray-800 mt-4">3. Naturaleza informativa del servicio</h3>
              <h4 className="font-semibold text-gray-700 mt-2">3.1. Limitaciones del servicio</h4>
              <p>AQD proporciona resultados basados en:</p>
              <ul className="list-disc ml-4">
                <li>Las respuestas que tú introduces</li>
                <li>La normativa fiscal vigente en el momento de la última actualización</li>
                <li>Casos generales y habituales</li>
              </ul>
              
              <h4 className="font-semibold text-gray-700 mt-2">3.2. Lo que AQD NO hace</h4>
              <ul className="list-disc ml-4">
                <li>NO analiza tu situación fiscal personal completa</li>
                <li>NO sustituye el asesoramiento de un profesional colegiado</li>
                <li>NO te representa ante la Agencia Tributaria</li>
                <li>NO garantiza que el resultado sea aplicable a tu caso específico</li>
                <li>NO se responsabiliza de cambios normativos posteriores a la última actualización</li>
              </ul>

              <h3 className="font-bold text-gray-800 mt-4">4. Responsabilidades del usuario</h3>
              <h4 className="font-semibold text-gray-700 mt-2">4.1. Veracidad de la información</h4>
              <p>Eres el único responsable de:</p>
              <ul className="list-disc ml-4">
                <li>Proporcionar información veraz y completa</li>
                <li>Interpretar correctamente las preguntas</li>
                <li>Verificar los resultados con fuentes oficiales o profesionales</li>
                <li>Tomar decisiones informadas sobre tu situación fiscal</li>
              </ul>
              
              <h4 className="font-semibold text-gray-700 mt-2">4.2. Uso adecuado</h4>
              <p>Te comprometes a:</p>
              <ul className="list-disc ml-4">
                <li>Usar la aplicación únicamente para fines informativos legales</li>
                <li>NO usar la aplicación para fines fraudulentos o ilegales</li>
                <li>NO intentar manipular o alterar el funcionamiento de la app</li>
                <li>NO reproducir, distribuir o crear obras derivadas sin autorización</li>
              </ul>

              <h3 className="font-bold text-gray-800 mt-4">5. Limitación de responsabilidad</h3>
              <h4 className="font-semibold text-gray-700 mt-2">5.1. Exclusión de garantías</h4>
              <p>El titular de AQD NO garantiza que:</p>
              <ul className="list-disc ml-4">
                <li>La aplicación esté libre de errores o interrupciones</li>
                <li>Los resultados sean precisos, completos o aplicables a tu caso</li>
                <li>El servicio esté disponible en todo momento</li>
                <li>La normativa reflejada esté actualizada en tiempo real</li>
              </ul>
              
              <h4 className="font-semibold text-gray-700 mt-2">5.2. Exclusión de responsabilidad por daños</h4>
              <p>En la máxima medida permitida por la ley, el titular de AQD NO se hace responsable de:</p>
              <ul className="list-disc ml-4">
                <li><strong>Errores en los cálculos</strong> derivados de respuestas incorrectas o incompletas</li>
                <li><strong>Decisiones fiscales</strong> tomadas basándose únicamente en los resultados de la app</li>
                <li><strong>Sanciones, multas o recargos</strong> de la Agencia Tributaria</li>
                <li><strong>Cambios normativos</strong> no reflejados en la app</li>
                <li><strong>Interpretaciones erróneas</strong> de las preguntas o resultados</li>
                <li><strong>Pérdidas económicas</strong> directas o indirectas derivadas del uso de la app</li>
                <li><strong>Daños a tu dispositivo</strong> o pérdida de datos</li>
              </ul>
              
              <h4 className="font-semibold text-gray-700 mt-2">5.3. Recomendación profesional</h4>
              <p><strong>SIEMPRE</strong> recomendamos que consultes con un asesor fiscal profesional colegiado o acudas directamente a la Agencia Tributaria antes de tomar cualquier decisión relevante sobre tu declaración de IRPF, especialmente en situaciones complejas o ante dudas.</p>

              <h3 className="font-bold text-gray-800 mt-4">6. Propiedad intelectual</h3>
              <p>Todos los contenidos de AQD son propiedad exclusiva del titular y están protegidos por las leyes de propiedad intelectual. Se te concede una licencia personal, no exclusiva, no transferible y revocable para usar AQD únicamente para tus propios fines informativos.</p>

              <h3 className="font-bold text-gray-800 mt-4">7. Privacidad y protección de datos</h3>
              <p>El tratamiento de tus datos personales se rige por nuestra <strong>Política de Privacidad</strong>, que debes leer y aceptar para usar la aplicación.</p>

              <h3 className="font-bold text-gray-800 mt-4">8. Modificaciones del servicio</h3>
              <p>Nos reservamos el derecho de modificar, actualizar o mejorar la aplicación en cualquier momento. Los cambios relevantes se notificarán mediante aviso dentro de la aplicación.</p>

              <h3 className="font-bold text-gray-800 mt-4">9. Suspensión y terminación</h3>
              <p>Puedes dejar de usar AQD en cualquier momento. Nos reservamos el derecho de suspender o terminar tu acceso si detectamos uso fraudulento o abusivo.</p>

              <h3 className="font-bold text-gray-800 mt-4">10. Disponibilidad del servicio</h3>
              <p>No garantizamos que AQD esté disponible de forma ininterrumpida. No se otorgará compensación por interrupciones del servicio, dado que la app es gratuita.</p>

              <h3 className="font-bold text-gray-800 mt-4">11. Publicidad</h3>
              <p>AQD se financia mediante publicidad. Al usar la app aceptas que se muestren anuncios.</p>

              <h3 className="font-bold text-gray-800 mt-4">12. Enlaces a terceros</h3>
              <p>No nos responsabilizamos del contenido de sitios de terceros ni de sus políticas de privacidad.</p>

              <h3 className="font-bold text-gray-800 mt-4">13. Indemnización</h3>
              <p>Aceptas mantener indemne al titular de AQD frente a cualquier reclamación derivada de tu uso de la aplicación o incumplimiento de estos términos.</p>

              <h3 className="font-bold text-gray-800 mt-4">14. Ley aplicable y jurisdicción</h3>
              <p>Estos Términos de Uso se rigen por la legislación española.</p>

              <h3 className="font-bold text-gray-800 mt-4">15. Divisibilidad</h3>
              <p>Si alguna disposición fuera declarada nula, las demás permanecerán en vigor.</p>

              <h3 className="font-bold text-gray-800 mt-4">16. Renuncia</h3>
              <p>La falta de ejercicio de cualquier derecho no constituirá una renuncia a dicho derecho.</p>

              <h3 className="font-bold text-gray-800 mt-4">17. Contacto</h3>
              <p><strong>Email:</strong> e.goidevs@gmail.com</p>

              <h3 className="font-bold text-gray-800 mt-4">18. Idioma</h3>
              <p>Estos términos se redactan en español. En caso de traducción, prevalecerá la versión en español.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Privacidad */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h2 className="font-bold text-gray-800 text-lg">Política de Privacidad de AQD</h2>
              <button onClick={() => setShowPrivacyPolicy(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] text-sm text-gray-700 prose prose-sm">
              <p className="text-gray-500 mb-4"><strong>Última actualización:</strong> 02 de febrero de 2026</p>

              <h3 className="font-bold text-gray-800 mt-4">1. Responsable del tratamiento</h3>
              <p>El responsable del tratamiento de los datos personales es:</p>
              <p><strong>Email de contacto:</strong> e.goidevs@gmail.com</p>
              <p>Ante el responsable se pueden ejercitar todos los derechos reconocidos en el RGPD y la legislación española aplicable.</p>

              <h3 className="font-bold text-gray-800 mt-4">2. ¿Qué datos personales recogemos?</h3>
              <h4 className="font-semibold text-gray-700 mt-2">2.1. Datos proporcionados por el usuario</h4>
              <ul className="list-disc ml-4">
                <li><strong>Fecha de nacimiento:</strong> para calcular tu edad y determinar obligaciones fiscales específicas</li>
                <li><strong>Datos económicos:</strong> ingresos del trabajo, rendimientos del capital, ganancias patrimoniales, etc.</li>
                <li><strong>Datos familiares:</strong> estado civil, número de hijos, personas a cargo, etc.</li>
                <li><strong>Datos laborales:</strong> situación laboral, tipo de contrato, número de pagadores, etc.</li>
              </ul>
              <p>Estos datos <strong>NO</strong> incluyen tu nombre, apellidos, DNI/NIE, dirección, teléfono ni ningún dato que permita identificarte directamente.</p>
              
              <h4 className="font-semibold text-gray-700 mt-2">2.2. Datos técnicos y de uso</h4>
              <ul className="list-disc ml-4">
                <li>Identificadores de dispositivo (ID de publicidad anónimo, tipo de dispositivo)</li>
                <li>Datos de navegación: páginas visitadas, tiempo de uso, interacciones</li>
                <li>Datos de cookies y tecnologías similares</li>
                <li>Dirección IP (conservada de forma temporal para seguridad)</li>
              </ul>

              <h3 className="font-bold text-gray-800 mt-4">3. ¿Para qué usamos tus datos?</h3>
              <h4 className="font-semibold text-gray-700 mt-2">3.1. Finalidades principales</h4>
              <ol className="list-decimal ml-4">
                <li><strong>Prestar el servicio principal:</strong> determinar si tienes obligación de presentar la declaración del IRPF</li>
                <li><strong>Mejorar la aplicación:</strong> análisis estadísticos sobre el uso de la app</li>
                <li><strong>Personalizar la experiencia:</strong> recordar tus respuestas durante la sesión</li>
                <li><strong>Seguridad:</strong> detectar usos fraudulentos o abusivos</li>
              </ol>

              <h4 className="font-semibold text-gray-700 mt-2">3.2. Publicidad y creación de perfiles</h4>
              <p>Mostramos publicidad a través de <strong>Google AdMob</strong> para monetizar la aplicación y mantenerla gratuita.</p>
              
              <p className="mt-2"><strong>Publicidad personalizada (requiere tu consentimiento expreso):</strong></p>
              <p>Si aceptas, Google y sus socios crean perfiles de usuario basados en tu actividad, recopilan datos como ID de publicidad, dirección IP, eventos dentro de la app, y comparten estos perfiles con socios publicitarios.</p>
              
              <p className="mt-2"><strong>Publicidad NO personalizada (opción alternativa):</strong></p>
              <p>Si rechazas, seguirás viendo anuncios contextuales pero Google NO creará perfiles sobre ti ni compartirá tus datos para personalización.</p>

              <h4 className="font-semibold text-gray-700 mt-2">3.3. Uso estadístico y comercial</h4>
              <p>Podemos realizar análisis agregados y anonimizados de los datos. Antes de cualquier uso estadístico, los datos se anonimizan de forma irreversible.</p>

              <h3 className="font-bold text-gray-800 mt-4">4. Base legal del tratamiento</h3>
              <table className="w-full text-xs border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Finalidad</th>
                    <th className="border border-gray-300 p-2 text-left">Base legal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 p-2">Cálculo de obligación de declarar IRPF</td><td className="border border-gray-300 p-2">Ejecución del servicio (Art. 6.1.b RGPD)</td></tr>
                  <tr><td className="border border-gray-300 p-2">Uso básico de la aplicación</td><td className="border border-gray-300 p-2">Consentimiento (Art. 6.1.a RGPD)</td></tr>
                  <tr><td className="border border-gray-300 p-2"><strong>Publicidad personalizada</strong></td><td className="border border-gray-300 p-2"><strong>Consentimiento explícito (Art. 6.1.a RGPD)</strong></td></tr>
                  <tr><td className="border border-gray-300 p-2">Publicidad NO personalizada</td><td className="border border-gray-300 p-2">Interés legítimo (Art. 6.1.f RGPD)</td></tr>
                </tbody>
              </table>

              <h3 className="font-bold text-gray-800 mt-4">5. ¿Dónde se almacenan tus datos?</h3>
              <p>Los datos se almacenan en servidores seguros. Si utilizamos servicios de Google, tus datos pueden ser transferidos a Estados Unidos bajo las garantías del Marco de Privacidad de Datos UE-EE.UU.</p>

              <h3 className="font-bold text-gray-800 mt-4">6. ¿Cuánto tiempo conservamos tus datos?</h3>
              <p>Los datos se conservan mientras usas la aplicación. Puedes eliminarlos en cualquier momento borrando los datos de la app o desinstalándola.</p>

              <h3 className="font-bold text-gray-800 mt-4">7. ¿Con quién compartimos tus datos?</h3>
              <p><strong>Google AdMob:</strong> Si aceptas publicidad personalizada, se comparten ID de publicidad, dirección IP, datos de uso e información técnica del dispositivo.</p>
              <p><strong>Datos anonimizados:</strong> Podemos compartir datos estadísticos agregados y completamente anonimizados.</p>
              <p><strong>Obligaciones legales:</strong> Podemos revelar datos si lo exige la ley o una autoridad competente.</p>

              <h3 className="font-bold text-gray-800 mt-4">8. Tus derechos</h3>
              <p>Tienes derecho a: acceso, rectificación, supresión, limitación, oposición, portabilidad y retirar el consentimiento.</p>
              <p><strong>¿Cómo ejercer tus derechos?</strong> Envía un email a e.goidevs@gmail.com. Responderemos en máximo 1 mes.</p>
              <p><strong>Derecho a reclamar:</strong> Ante la Agencia Española de Protección de Datos (www.aepd.es)</p>

              <h3 className="font-bold text-gray-800 mt-4">9. Cookies y tecnologías similares</h3>
              <p>Utilizamos cookies esenciales, de análisis y de publicidad. Puedes gestionar las preferencias desde los ajustes de tu dispositivo.</p>

              <h3 className="font-bold text-gray-800 mt-4">10. Seguridad de los datos</h3>
              <p>Aplicamos medidas técnicas y organizativas apropiadas: cifrado de datos en tránsito (HTTPS/TLS), acceso restringido y protección contra accesos no autorizados.</p>

              <h3 className="font-bold text-gray-800 mt-4">11. Menores de edad</h3>
              <p>Esta aplicación <strong>no está dirigida a menores de 14 años</strong>.</p>

              <h3 className="font-bold text-gray-800 mt-4">12. Actualizaciones de la política</h3>
              <p>Los cambios se notificarán mediante aviso dentro de la aplicación.</p>

              <h3 className="font-bold text-gray-800 mt-4">13. DESCARGO DE RESPONSABILIDAD IMPORTANTE</h3>
              <p><strong>Esta aplicación tiene únicamente fines informativos y orientativos.</strong> Los resultados NO constituyen asesoramiento fiscal profesional. Ante cualquier duda, consulta con un asesor fiscal profesional o la Agencia Tributaria.</p>

              <h3 className="font-bold text-gray-800 mt-4">14. Implementación técnica del consentimiento</h3>
              <p>Utilizamos el User Messaging Platform (UMP) SDK de Google para gestionar el consentimiento de publicidad según el RGPD.</p>

              <h3 className="font-bold text-gray-800 mt-4">15. Contacto</h3>
              <p><strong>Email:</strong> e.goidevs@gmail.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsConsentPage;
