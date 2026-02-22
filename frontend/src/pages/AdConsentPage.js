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
        <p>Los perfiles comerciales podrán utilizarse para: segmentación publicitaria avanzada (mostrar anuncios más relevantes según tu perfil), estudios de mercado e informes sectoriales sobre tendencias fiscales y económicas, desarrollo y mejora de productos y servicios propios o de terceros, y análisis estadísticos y de comportamiento de usuario con fines comerciales.</p>
        <h4 className="font-semibold text-gray-700 mt-2">5.3. Cesión de perfiles a terceros</h4>
        <p>Si otorgas tu consentimiento expreso, AQD podrá ceder, licenciar o vender los perfiles comerciales generados a terceros, incluyendo: empresas del sector financiero (bancos, aseguradoras, gestorías), empresas de publicidad y marketing digital, empresas de análisis de datos y estudios de mercado, y otras entidades comerciales que puedan tener interés legítimo en dicha información.</p>
        <p className="mt-2">En todos los casos, los perfiles cedidos no contendrán datos que permitan tu identificación directa (nombre, apellidos, DNI/NIE, dirección postal, teléfono). Los perfiles se componen de datos seudonimizados o agregados.</p>
        <h4 className="font-semibold text-gray-700 mt-2">5.4. Consentimiento explícito, libre e informado</h4>
        <p>De conformidad con los artículos 6.1.a), 7 y 13 del RGPD y el artículo 6 de la LOPDGDD:</p>
        <ul className="list-disc ml-4 mt-2">
          <li><strong>Consentimiento granular:</strong> Se te solicitará un consentimiento separado e independiente para la creación de perfiles comerciales y para la cesión de dichos perfiles a terceros, mediante casillas de verificación individuales no premarcadas.</li>
          <li><strong>Consentimiento libre:</strong> Podrás utilizar plenamente la funcionalidad principal de la Aplicación sin necesidad de aceptar la creación de perfiles ni la cesión de datos a terceros. La negativa no limitará en ningún caso el acceso al servicio básico.</li>
          <li><strong>Consentimiento informado:</strong> Antes de solicitar tu consentimiento, se te informará de forma clara sobre qué datos se utilizarán, con qué finalidad, a qué categorías de terceros podrán cederse, durante cuánto tiempo se conservarán y cómo puedes revocar tu consentimiento.</li>
          <li><strong>Consentimiento revocable:</strong> Podrás revocar cualquiera de estos consentimientos en cualquier momento contactando a <a href="mailto:e.goidevs@gmail.com" className="text-blue-600 underline">e.goidevs@gmail.com</a>, sin que ello afecte a la licitud del tratamiento realizado antes de la revocación.</li>
          <li><strong>Registro del consentimiento:</strong> Se conservará un registro técnico de tu consentimiento (fecha, hora, versión del texto aceptado, casillas activadas) como prueba de su validez conforme al artículo 7.1 del RGPD.</li>
        </ul>
        <h4 className="font-semibold text-gray-700 mt-2">5.5. Tus derechos sobre los perfiles</h4>
        <p>Conservas en todo momento los derechos reconocidos en los artículos 15 a 22 del RGPD: acceso, rectificación, supresión, limitación, oposición y portabilidad. Asimismo, tienes derecho a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado (artículo 22 del RGPD). Puedes ejercerlos enviando un email a <a href="mailto:e.goidevs@gmail.com" className="text-blue-600 underline">e.goidevs@gmail.com</a>.</p>
        <h3 className="font-bold text-gray-800 mt-4">6. Limitación de responsabilidad</h3>
        <h4 className="font-semibold text-gray-700 mt-2">6.1. Exclusión de garantías</h4>
        <p>El titular de AQD no garantiza que la Aplicación esté libre de errores, que los resultados sean precisos o aplicables a tu caso, ni que la normativa reflejada esté actualizada en tiempo real.</p>
        <h4 className="font-semibold text-gray-700 mt-2">6.2. Exclusión de responsabilidad por daños</h4>
        <p>En la máxima medida permitida por la ley, el titular no se hace responsable de errores en los cálculos, decisiones fiscales tomadas basándose en los resultados, sanciones de la Agencia Tributaria, cambios normativos no reflejados, ni pérdidas económicas derivadas del uso de la Aplicación.</p>
        <h4 className="font-semibold text-gray-700 mt-2">6.3. Recomendación profesional</h4>
        <p>SIEMPRE recomendamos consultar con un asesor fiscal profesional colegiado o acudir directamente a la Agencia Tributaria antes de tomar cualquier decisión relevante sobre tu declaración de IRPF.</p>
        <h3 className="font-bold text-gray-800 mt-4">7. Propiedad intelectual</h3>
        <p>Todos los contenidos de AQD (código fuente, diseño, textos, lógica de cálculo, marca y logotipo) son propiedad exclusiva del titular y están protegidos por el Real Decreto Legislativo 1/1996 (Ley de Propiedad Intelectual) y demás normativa aplicable.</p>
        <p className="mt-2">Queda expresamente prohibido copiar, modificar, realizar ingeniería inversa o usar la Aplicación para crear productos o servicios competidores.</p>
        <h3 className="font-bold text-gray-800 mt-4">8. Privacidad y protección de datos</h3>
        <p>El tratamiento de tus datos personales se rige por nuestra Política de Privacidad, que constituye un documento separado y complementario a estos Términos de Uso. Debes leerla y aceptarla para utilizar la Aplicación.</p>
        <h3 className="font-bold text-gray-800 mt-4">9. Publicidad</h3>
        <p>AQD se financia mediante publicidad. Al usar la Aplicación aceptas que se muestren anuncios (personalizados o no, según tu elección), entiendes que no podemos controlar el contenido exacto de todos los anuncios y reconoces que la interacción con anuncios es bajo tu propia responsabilidad.</p>
        <h3 className="font-bold text-gray-800 mt-4">10. Enlaces a terceros</h3>
        <p>AQD puede contener enlaces a sitios web de terceros (por ejemplo, Agencia Tributaria). No nos responsabilizamos del contenido, políticas de privacidad ni servicios ofrecidos por terceros.</p>
        <h3 className="font-bold text-gray-800 mt-4">11. Modificaciones del servicio y de los términos</h3>
        <p>Nos reservamos el derecho de modificar la Aplicación y estos Términos de Uso. Los cambios relevantes se notificarán mediante aviso dentro de la Aplicación actualizando la fecha de "última actualización". Si los cambios afectan a tratamientos de datos que requieran consentimiento, se te solicitará un nuevo consentimiento expreso.</p>
        <h3 className="font-bold text-gray-800 mt-4">12. Suspensión y terminación</h3>
        <p>Puedes dejar de usar AQD en cualquier momento. Nos reservamos el derecho de suspender tu acceso si detectamos uso fraudulento, incumples estos términos o es necesario por razones legales. La suspensión puede ser inmediata en casos de uso abusivo grave.</p>
        <h3 className="font-bold text-gray-800 mt-4">13. Disponibilidad del servicio</h3>
        <p>No garantizamos que AQD esté disponible de forma ininterrumpida. No se otorgará compensación alguna por interrupciones, dado que la Aplicación es gratuita.</p>
        <h3 className="font-bold text-gray-800 mt-4">        14. Indemnización</h3>
        <p>Aceptas mantener indemne al titular de AQD frente a cualquier reclamación, pérdida, daño o gasto derivado de tu uso de la Aplicación, incumplimiento de estos términos, violación de derechos de terceros o información falsa que proporciones.</p>
        <h3 className="font-bold text-gray-800 mt-4">15. Ley aplicable y jurisdicción</h3>
        <p>Estos Términos se rigen por la legislación española, incluyendo el RGPD, la LOPDGDD y la LSSI-CE. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales competentes según la legislación procesal vigente.</p>
        <h3 className="font-bold text-gray-800 mt-4">16. Divisibilidad</h3>
        <p>Si alguna disposición fuera declarada nula por un tribunal competente, las demás disposiciones permanecerán en pleno vigor y efecto.</p>
        <h3 className="font-bold text-gray-800 mt-4">17. Renuncia</h3>
        <p>La falta de ejercicio de cualquier derecho de estos términos no constituirá una renuncia a dicho derecho.</p>
        <h3 className="font-bold text-gray-800 mt-4">18. Contacto</h3>
        <p><strong>Email:</strong> <a href="mailto:e.goidevs@gmail.com" className="text-blue-600 underline">e.goidevs@gmail.com</a></p>
        <h3 className="font-bold text-gray-800 mt-4">19. Idioma</h3>
        <p>Estos términos se redactan en español. En caso de traducción a otros idiomas, prevalecerá la versión en español.</p>
      </div>
    </div>
  </div>
)}

{/* ===== MODAL POLÍTICA DE PRIVACIDAD ===== */}
{showPrivacy && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b bg-gray-50">
        <h2 className="font-bold text-gray-800 text-lg">Política de Privacidad de AQD</h2>
        <button onClick={() => setShowPrivacy(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
      </div>
      <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] text-sm text-gray-700 prose prose-sm">
        <p className="text-gray-500 mb-4"><strong>Última actualización:</strong> 22 de febrero de 2026</p>
        <h3 className="font-bold text-gray-800 mt-4">1. Responsable del tratamiento</h3>
        <p>En cumplimiento del artículo 13 del RGPD y del artículo 11 de la LOPDGDD, el responsable del tratamiento de los datos personales recogidos a través de esta Aplicación es el titular de AQD.</p>
        <p className="mt-2"><strong>Email de contacto:</strong> e.goidevs@gmail.com</p>
        <p className="mt-2">Ante el responsable se pueden ejercitar todos los derechos reconocidos en el RGPD, la LOPDGDD y demás normativa aplicable.</p>
        <h3 className="font-bold text-gray-800 mt-4">2. ¿Qué datos personales recogemos?</h3>
        <h4 className="font-semibold text-gray-700 mt-2">2.1. Datos proporcionados por el usuario</h4>
        <ul className="list-disc ml-4">
          <li><strong>Fecha de nacimiento:</strong> para calcular tu edad y determinar obligaciones fiscales específicas.</li>
          <li><strong>Datos económicos:</strong> ingresos del trabajo, rendimientos del capital, ganancias patrimoniales, etc.</li>
          <li><strong>Datos familiares:</strong> estado civil, número de hijos, personas a cargo, etc.</li>
          <li><strong>Datos laborales:</strong> situación laboral, tipo de contrato, número de pagadores, etc.</li>
        </ul>
        <p className="mt-2">Estos datos NO incluyen tu nombre, apellidos, DNI/NIE, dirección, teléfono ni ningún dato que permita identificarte directamente.</p>
        <h4 className="font-semibold text-gray-700 mt-2">2.2. Datos técnicos y de uso</h4>
        <p>Identificadores de dispositivo (ID de publicidad anónimo, tipo de dispositivo), datos de navegación (páginas visitadas, tiempo de uso, interacciones), datos de cookies y tecnologías similares, y dirección IP (conservada temporalmente para seguridad).</p>
        <h4 className="font-semibold text-gray-700 mt-2">2.3. Datos derivados de la elaboración de perfiles (solo con tu consentimiento)</h4>
        <p>Si otorgas tu consentimiento expreso, podremos generar: perfil económico-fiscal estimado (rango de ingresos, tipo de contribuyente), segmentos de interés, indicadores demográficos agregados y patrones de uso y comportamiento dentro de la Aplicación.</p>
        <h3 className="font-bold text-gray-800 mt-4">3. ¿Para qué usamos tus datos?</h3>
        <h4 className="font-semibold text-gray-700 mt-2">3.1. Finalidades principales (servicio básico)</h4>
        <ul className="list-disc ml-4">
          <li>Determinar si tienes obligación de presentar la declaración del IRPF.</li>
          <li>Análisis estadísticos internos y anónimos sobre el uso de la Aplicación.</li>
          <li>Recordar tus respuestas durante la sesión activa.</li>
          <li>Detectar y prevenir usos fraudulentos o abusivos.</li>
        </ul>
        <h4 className="font-semibold text-gray-700 mt-2">3.2. Publicidad</h4>
        <p>Mostramos publicidad a través de Google AdMob para financiar la Aplicación y mantenerla gratuita.</p>
        <p className="mt-2"><strong>3.2.1. Publicidad personalizada (requiere tu consentimiento expreso):</strong> Si aceptas, Google y sus socios crean perfiles basados en tu actividad. <a href="https://support.google.com/admob/answer/9012903" className="text-blue-600 underline">Lista de socios publicitarios de Google.</a></p>
        <p className="mt-2"><strong>3.2.2. Publicidad no personalizada:</strong> Si rechazas, seguirás viendo anuncios basados solo en el contenido de la Aplicación.</p>
        <h4 className="font-semibold text-gray-700 mt-2">3.3. Creación de perfiles comerciales (requiere consentimiento expreso separado)</h4>
        <p>Si otorgas tu consentimiento, AQD utilizará tus datos económicos, fiscales y demográficos (sin datos identificativos directos) para elaborar perfiles comerciales utilizados para segmentación publicitaria avanzada, estudios de mercado, desarrollo de productos y análisis estadísticos.</p>
        <h4 className="font-semibold text-gray-700 mt-2">3.4. Cesión de perfiles comerciales a terceros (requiere consentimiento expreso separado adicional)</h4>
        <p>Si otorgas tu consentimiento, AQD podrá ceder, licenciar o vender los perfiles comerciales a empresas del sector financiero y asegurador, empresas de publicidad y marketing digital, empresas de análisis de datos y otras entidades comerciales. En todos los casos sin datos que permitan tu identificación directa.</p>
        <h4 className="font-semibold text-gray-700 mt-2">3.5. Uso estadístico de datos anonimizados</h4>
        <p>Con independencia de los consentimientos anteriores, podremos realizar análisis agregados y anonimizados de forma irreversible. Los datos anonimizados quedan fuera del ámbito del RGPD (Considerando 26).</p>
        <h3 className="font-bold text-gray-800 mt-4">4. Base legal del tratamiento</h3>
        <ul className="list-disc ml-4">
          <li><strong>Cálculo de obligación de declarar IRPF:</strong> Ejecución del servicio (Art. 6.1.b RGPD).</li>
          <li><strong>Mejora del servicio y análisis interno:</strong> Interés legítimo (Art. 6.1.f RGPD).</li>
          <li><strong>Publicidad personalizada:</strong> Consentimiento explícito (Art. 6.1.a RGPD) — casilla 1.</li>
          <li><strong>Publicidad no personalizada:</strong> Interés legítimo (Art. 6.1.f RGPD).</li>
          <li><strong>Creación de perfiles comerciales:</strong> Consentimiento explícito (Art. 6.1.a RGPD) — casilla 2.</li>
          <li><strong>Cesión de perfiles a terceros:</strong> Consentimiento explícito (Art. 6.1.a RGPD) — casilla 3.</li>
          <li><strong>Seguridad y prevención de fraude:</strong> Interés legítimo (Art. 6.1.f RGPD).</li>
          <li><strong>Datos anonimizados para estadísticas:</strong> No aplica RGPD (Considerando 26).</li>
        </ul>
        <h3 className="font-bold text-gray-800 mt-4">5. Sistema de consentimiento granular</h3>
        <ul className="list-disc ml-4 mt-2">
          <li><strong>Casilla 1 — Publicidad personalizada:</strong> Acepto que Google y sus socios publicitarios creen perfiles basados en mi actividad para mostrarme anuncios personalizados.</li>
          <li><strong>Casilla 2 — Creación de perfiles comerciales:</strong> Acepto que AQD elabore perfiles comerciales basados en mis datos económicos y fiscales (sin datos identificativos directos).</li>
          <li><strong>Casilla 3 — Cesión de perfiles a terceros:</strong> Acepto que AQD ceda, licencie o venda los perfiles comerciales generados a empresas del sector financiero, publicidad, marketing y análisis de datos.</li>
        </ul>
        <h3 className="font-bold text-gray-800 mt-4">6. ¿Dónde se almacenan tus datos?</h3>
        <p>Los datos se almacenan en servidores seguros. Si utilizamos servicios de Google, tus datos pueden ser transferidos a Estados Unidos bajo las garantías del Marco de Privacidad de Datos UE-EE.UU. o cláusulas contractuales tipo aprobadas por la Comisión Europea (Art. 46.2.c RGPD).</p>
        <h3 className="font-bold text-gray-800 mt-4">7. ¿Cuánto tiempo conservamos tus datos?</h3>
        <ul className="list-disc ml-4">
          <li><strong>Durante el uso:</strong> los datos se conservan mientras usas la Aplicación activamente.</li>
          <li><strong>Perfiles comerciales:</strong> mientras mantengas tu consentimiento activo. Si lo revocas, se eliminarán en un plazo máximo de 30 días.</li>
          <li><strong>Perfiles cedidos a terceros:</strong> en caso de revocación, notificaremos a los terceros para que procedan a la eliminación en un plazo máximo de 60 días.</li>
          <li><strong>Registro de consentimientos:</strong> mínimo 5 años como prueba de cumplimiento normativo (Art. 5.2 RGPD).</li>
          <li><strong>Datos anonimizados:</strong> pueden conservarse indefinidamente al no permitir tu identificación.</li>
        </ul>
        <h3 className="font-bold text-gray-800 mt-4">8. ¿Con quién compartimos tus datos?</h3>
        <h4 className="font-semibold text-gray-700 mt-2">8.1. Google AdMob</h4>
        <p>Si aceptas publicidad personalizada: se comparten ID de publicidad, dirección IP, datos de uso e información técnica del dispositivo. Si la rechazas, Google mostrará anuncios contextuales sin crear perfiles.</p>
        <h4 className="font-semibold text-gray-700 mt-2">8.2. Terceros receptores de perfiles (solo con tu consentimiento)</h4>
        <p>Si has otorgado los consentimientos de las casillas 2 y 3, los perfiles comerciales podrán cederse a las categorías descritas en la sección 3.4. En ningún caso se cederán datos que permitan tu identificación directa.</p>
        <h4 className="font-semibold text-gray-700 mt-2">8.3. Obligaciones legales</h4>
        <p>Podremos revelar datos si lo exige la ley o una autoridad judicial o administrativa competente.</p>
        <h3 className="font-bold text-gray-800 mt-4">9. Tus derechos</h3>
        <p>De conformidad con los artículos 15 a 22 del RGPD tienes derecho a: acceso, rectificación, supresión, limitación del tratamiento, oposición, portabilidad y a no ser objeto de decisiones automatizadas.</p>
        <p className="mt-2">Envía un email a <strong>e.goidevs@gmail.com</strong>. Responderemos en el plazo máximo de 1 mes. Si consideras que no se respetan tus derechos, puedes reclamar ante la <strong>Agencia Española de Protección de Datos (AEPD):</strong> www.aepd.es</p>
        <h3 className="font-bold text-gray-800 mt-4">10. Cookies y tecnologías similares</h3>
        <p>Esta Aplicación utiliza cookies esenciales, cookies de análisis y cookies de publicidad (para anuncios personalizados a través de AdMob, solo con tu consentimiento). Puedes gestionar tus preferencias desde los ajustes de tu dispositivo.</p>

              <h3 className="font-bold text-gray-800 mt-4">11. Seguridad de los datos</h3>
              <p>Aplicamos medidas técnicas y organizativas apropiadas: cifrado en tránsito (HTTPS/TLS), acceso restringido a personal autorizado, protección contra accesos no autorizados y seudonimización de los datos utilizados en perfiles comerciales. Ningún sistema es 100% seguro. Te recomendamos mantener actualizadas tu Aplicación y sistema operativo.</p>

              <h3 className="font-bold text-gray-800 mt-4">12. Menores de edad</h3>
              <p>Esta Aplicación no está dirigida a menores de 14 años. No recogemos conscientemente datos de menores. Si tenemos conocimiento de ello sin consentimiento parental (art. 8 RGPD y art. 7 LOPDGDD), los eliminaremos de inmediato.</p>

              <h3 className="font-bold text-gray-800 mt-4">13. Implementación técnica del consentimiento (UMP SDK)</h3>
              <p>Para cumplir con el RGPD y la Directiva ePrivacy, utilizamos el User Messaging Platform (UMP) SDK de Google, complementado con una capa propia de gestión de consentimiento para los tratamientos adicionales (perfiles comerciales y cesión a terceros). El sistema registra fecha, hora y versión del texto aceptado como prueba del consentimiento, y te permite cambiar tu decisión en cualquier momento desde los ajustes.</p>

              <h3 className="font-bold text-gray-800 mt-4">14. Actualizaciones de esta política</h3>
              <p>Podremos actualizar esta política ocasionalmente. Los cambios se notificarán mediante aviso dentro de la Aplicación actualizando la fecha de "última actualización". Si afectan a tratamientos que requieran consentimiento, se te solicitará un nuevo consentimiento expreso.</p>

              <h3 className="font-bold text-gray-800 mt-4">15. Descargo de responsabilidad</h3>
              <p><strong>AVISO IMPORTANTE:</strong> Esta Aplicación tiene únicamente fines informativos y orientativos. Los resultados NO constituyen asesoramiento fiscal profesional ni recomendaciones legales personalizadas. La responsabilidad sobre la veracidad de los datos introducidos es exclusivamente tuya. Ante cualquier duda, consulta con un asesor fiscal profesional colegiado o acude directamente a la Agencia Tributaria.</p>

              <h3 className="font-bold text-gray-800 mt-4">16. Contacto</h3>
              <p>Para cualquier cuestión relacionada con esta política o el ejercicio de tus derechos:</p>
              <p><strong>Email:</strong> e.goidevs@gmail.com</p>
              <p><strong>Delegado de Protección de Datos:</strong> e.goidevs@gmail.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdConsentPage;

