import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const ConsentPage = () => {
  const navigate = useNavigate();
  const { setAnswer, createSession } = useFlow();
  const [birthYear, setBirthYear] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

const handleSubmit = () => {
    if (!birthYear) return;

    setAnswer('birth_year', birthYear);
    setAnswer('consent_given', true);
    navigate('/question/declaration-type');

    createSession(parseInt(birthYear), true).catch(error => {
      console.error('Error al crear la sesión en segundo plano:', error);
    });
  };

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - 16;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">
              ¿Algo Que Declarar?
            </h1>
          </div>

          {/* Año de nacimiento */}
          <div className="mb-8">
            <label htmlFor="birthYear" className="block text-gray-700 font-medium mb-3 text-center">
              Selecciona tu año de nacimiento
            </label>
            <select
              id="birthYear"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
              data-testid="birth-year-select"
            >
              <option value="">Selecciona...</option>
              {Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
                const year = maxYear - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Botón de continuar */}
          <div className="mb-8">
            <button
              onClick={handleSubmit}
              disabled={!birthYear}
              className={`w-full px-8 py-4 font-semibold text-lg rounded-lg transition-colors duration-200 ${
                birthYear
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              data-testid="continue-btn"
            >
              Continuar
            </button>
          </div>

          {/* Separador y enlaces */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-center space-x-4 text-sm">
              <button
                onClick={() => { setShowTerms(true); setShowPrivacy(false); }}
                className="text-blue-600 hover:text-blue-700 hover:underline"
                data-testid="terms-link"
              >
                Términos
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => { setShowPrivacy(true); setShowTerms(false); }}
                className="text-blue-600 hover:text-blue-700 hover:underline"
                data-testid="privacy-link"
              >
                Privacidad
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Términos */}
     {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h2 className="font-bold text-gray-800 text-lg">Términos de Uso de AQD</h2>
              <button onClick={() => setShowTerms(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] text-sm text-gray-700 prose prose-sm">
              <p className="text-gray-500 mb-4"><strong>Última actualización:</strong> 02 de febrero de 2026</p>

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
              <p>Los perfiles comerciales podrán utilizarse para: segmentación publicitaria avanzada, estudios de mercado e informes sectoriales sobre tendencias fiscales y económicas, desarrollo y mejora de productos y servicios propios o de terceros, y análisis estadísticos y de comportamiento de usuario con fines comerciales.</p>

              <h4 className="font-semibold text-gray-700 mt-2">5.3. Cesión de perfiles a terceros</h4>
              <p>Si otorgas tu consentimiento expreso, AQD podrá ceder, licenciar o vender los perfiles comerciales generados a terceros, incluyendo: empresas del sector financiero (bancos, aseguradoras, gestorías), empresas de publicidad y marketing digital, empresas de análisis de datos y estudios de mercado, y otras entidades comerciales que puedan tener interés legítimo en dicha información.</p>
              <p className="mt-2">En todos los casos, los perfiles cedidos no contendrán datos que permitan tu identificación directa. Los perfiles se componen de datos seudonimizados o agregados.</p>

              <h4 className="font-semibold text-gray-700 mt-2">5.4. Consentimiento explícito, libre e informado</h4>
              <p>De conformidad con los artículos 6.1.a), 7 y 13 del RGPD y el artículo 6 de la LOPDGDD:</p>
              <ul className="list-disc ml-4 mt-2">
                <li><strong>Consentimiento granular:</strong> Se te solicitará un consentimiento separado e independiente para la creación de perfiles comerciales y para la cesión de dichos perfiles a terceros, mediante casillas de verificación individuales no premarcadas.</li>
                <li><strong>Consentimiento libre:</strong> Podrás utilizar plenamente la funcionalidad principal de la Aplicación sin necesidad de aceptar la creación de perfiles ni la cesión de datos a terceros.</li>
                <li><strong>Consentimiento informado:</strong> Antes de solicitar tu consentimiento, se te informará de forma clara sobre qué datos se utilizarán, con qué finalidad, a qué categorías de terceros podrán cederse, durante cuánto tiempo se conservarán y cómo puedes revocar tu consentimiento.</li>
                <li><strong>Consentimiento revocable:</strong> Podrás revocar cualquiera de estos consentimientos en cualquier momento contactando a e.goidevs@gmail.com.</li>
                <li><strong>Registro del consentimiento:</strong> Se conservará un registro técnico de tu consentimiento como prueba de su validez conforme al artículo 7.1 del RGPD.</li>
              </ul>

              <h4 className="font-semibold text-gray-700 mt-2">5.5. Tus derechos sobre los perfiles</h4>
              <p>Conservas en todo momento los derechos reconocidos en los artículos 15 a 22 del RGPD: acceso, rectificación, supresión, limitación, oposición y portabilidad. Puedes ejercerlos enviando un email a e.goidevs@gmail.com.</p>

              <h3 className="font-bold text-gray-800 mt-4">6. Limitación de responsabilidad</h3>
              <h4 className="font-semibold text-gray-700 mt-2">6.1. Exclusión de garantías</h4>
              <p>El titular de AQD no garantiza que la Aplicación esté libre de errores, que los resultados sean precisos o aplicables a tu caso, ni que la normativa reflejada esté actualizada en tiempo real.</p>

              <h4 className="font-semibold text-gray-700 mt-2">6.2. Exclusión de responsabilidad por daños</h4>
              <p>En la máxima medida permitida por la ley, el titular no se hace responsable de errores en los cálculos, decisiones fiscales tomadas basándose en los resultados, sanciones de la Agencia Tributaria, ni pérdidas económicas derivadas del uso de la Aplicación.</p>

              <h4 className="font-semibold text-gray-700 mt-2">6.3. Recomendación profesional</h4>
              <p>SIEMPRE recomendamos consultar con un asesor fiscal profesional colegiado o acudir directamente a la Agencia Tributaria antes de tomar cualquier decisión relevante sobre tu declaración de IRPF.</p>

              <h3 className="font-bold text-gray-800 mt-4">7. Propiedad intelectual</h3>
              <p>Todos los contenidos de AQD (código fuente, diseño, textos, lógica de cálculo, marca y logotipo) son propiedad exclusiva del titular y están protegidos por las leyes de propiedad intelectual españolas e internacionales.</p>
              <p className="mt-2">Queda expresamente prohibido copiar, modificar, realizar ingeniería inversa o usar la Aplicación para crear productos o servicios competidores.</p>

              <h3 className="font-bold text-gray-800 mt-4">8. Privacidad y protección de datos</h3>
              <p>El tratamiento de tus datos personales se rige por nuestra Política de Privacidad, que constituye un documento separado y complementario a estos Términos de Uso.</p>

              <h3 className="font-bold text-gray-800 mt-4">9. Publicidad</h3>
              <p>AQD se financia mediante publicidad. Al usar la Aplicación aceptas que se muestren anuncios (personalizados o no, según tu elección de consentimiento). La gestión de la publicidad personalizada se rige por tu elección en el consentimiento de privacidad.</p>

              <h3 className="font-bold text-gray-800 mt-4">10. Modificaciones del servicio y de los términos</h3>
              <p>Nos reservamos el derecho de modificar la Aplicación y estos Términos de Uso. Los cambios relevantes se notificarán mediante aviso dentro de la Aplicación. Si los cambios afectan a tratamientos de datos que requieran consentimiento, se te solicitará un nuevo consentimiento expreso.</p>

              <h3 className="font-bold text-gray-800 mt-4">11. Suspensión y terminación</h3>
              <p>Puedes dejar de usar AQD en cualquier momento. Nos reservamos el derecho de suspender tu acceso si detectamos uso fraudulento, incumples estos términos o es necesario por razones legales.</p>

              <h3 className="font-bold text-gray-800 mt-4">12. Ley aplicable y jurisdicción</h3>
              <p>Estos Términos se rigen por la legislación española, incluyendo el RGPD, la LOPDGDD y la LSSI-CE. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales competentes según la legislación procesal vigente.</p>

              <h3 className="font-bold text-gray-800 mt-4">13. Contacto</h3>
              <p>Para cualquier cuestión relacionada con estos Términos de Uso:</p>
              <p><strong>Email:</strong> e.goidevs@gmail.com</p>
            </div>
          </div>
        </div>
      )}
      {/* Modal de Privacidad */}
     {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h2 className="font-bold text-gray-800 text-lg">Política de Privacidad de AQD</h2>
              <button onClick={() => setShowPrivacy(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] text-sm text-gray-700 prose prose-sm">
              <p className="text-gray-500 mb-4"><strong>Última actualización:</strong> 02 de febrero de 2026</p>

              <h3 className="font-bold text-gray-800 mt-4">1. Responsable del tratamiento</h3>
              <p>En cumplimiento del artículo 13 del RGPD y del artículo 11 de la LOPDGDD, el responsable del tratamiento es el titular de AQD.</p>
              <p className="mt-2"><strong>Email de contacto:</strong> e.goidevs@gmail.com</p>

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
              <p>Identificadores de dispositivo, datos de navegación, cookies y dirección IP (conservada temporalmente para seguridad).</p>

              <h4 className="font-semibold text-gray-700 mt-2">2.3. Datos derivados de la elaboración de perfiles (solo con tu consentimiento)</h4>
              <p>Si otorgas tu consentimiento expreso, podremos generar: perfil económico-fiscal estimado, segmentos de interés, indicadores demográficos agregados y patrones de uso dentro de la Aplicación.</p>

              <h3 className="font-bold text-gray-800 mt-4">3. ¿Para qué usamos tus datos?</h3>
              <h4 className="font-semibold text-gray-700 mt-2">3.1. Finalidades principales (servicio básico)</h4>
              <ul className="list-disc ml-4">
                <li>Determinar si tienes obligación de presentar la declaración del IRPF.</li>
                <li>Análisis estadísticos internos y anónimos sobre el uso de la Aplicación.</li>
                <li>Recordar tus respuestas durante la sesión activa.</li>
                <li>Detectar y prevenir usos fraudulentos o abusivos.</li>
              </ul>

              <h4 className="font-semibold text-gray-700 mt-2">3.2. Publicidad</h4>
              <p>AQD se financia mediante publicidad a través de Google AdMob.</p>
              <p className="mt-2"><strong>Publicidad personalizada (requiere tu consentimiento expreso):</strong> Si aceptas, Google y sus socios crean perfiles basados en tu actividad para mostrarte anuncios más relevantes.</p>
              <p className="mt-2"><strong>Publicidad no personalizada:</strong> Si rechazas, seguirás viendo anuncios basados solo en el contenido de la Aplicación, sin creación de perfiles.</p>

              <h4 className="font-semibold text-gray-700 mt-2">3.3. Creación de perfiles comerciales (requiere consentimiento expreso separado)</h4>
              <p><strong>ATENCIÓN:</strong> Esta finalidad requiere un consentimiento específico, separado e independiente. No es necesario para usar el servicio básico.</p>
              <p className="mt-2">Si otorgas tu consentimiento, AQD utilizará tus datos económicos, fiscales y demográficos (sin datos identificativos directos) para elaborar perfiles comerciales utilizados para: segmentación publicitaria avanzada, estudios de mercado, desarrollo de productos y servicios propios o de terceros, y análisis estadísticos y comerciales.</p>

              <h4 className="font-semibold text-gray-700 mt-2">3.4. Cesión de perfiles comerciales a terceros (requiere consentimiento expreso separado adicional)</h4>
              <p><strong>ATENCIÓN:</strong> Esta finalidad requiere un consentimiento específico adicional, separado del consentimiento de creación de perfiles. No es necesario para usar el servicio básico.</p>
              <p className="mt-2">Si otorgas tu consentimiento, AQD podrá ceder, licenciar o vender los perfiles comerciales a: empresas del sector financiero y asegurador, empresas de publicidad y marketing digital, empresas de análisis de datos y big data, y otras entidades comerciales con interés en datos de perfil económico-fiscal.</p>
              <p className="mt-2">En todos los casos: los perfiles cedidos no contendrán datos que permitan tu identificación directa, los perfiles se componen de datos seudonimizados o agregados, y los terceros estarán contractualmente obligados a respetar la normativa de protección de datos.</p>

              <h4 className="font-semibold text-gray-700 mt-2">3.5. Uso estadístico de datos anonimizados</h4>
              <p>Con independencia de los consentimientos anteriores, podremos realizar análisis agregados y anonimizados de forma irreversible. Los datos anonimizados quedan fuera del ámbito del RGPD (Considerando 26).</p>

              <h3 className="font-bold text-gray-800 mt-4">4. Base legal del tratamiento</h3>
              <ul className="list-disc ml-4">
                <li><strong>Cálculo de obligación de declarar IRPD:</strong> Ejecución del servicio (Art. 6.1.b RGPD).</li>
                <li><strong>Mejora del servicio:</strong> Interés legítimo (Art. 6.1.f RGPD).</li>
                <li><strong>Publicidad personalizada:</strong> Consentimiento explícito (Art. 6.1.a RGPD) — casilla 1.</li>
                <li><strong>Creación de perfiles comerciales:</strong> Consentimiento explícito (Art. 6.1.a RGPD) — casilla 2.</li>
                <li><strong>Cesión de perfiles a terceros:</strong> Consentimiento explícito (Art. 6.1.a RGPD) — casilla 3.</li>
                <li><strong>Seguridad y prevención de fraude:</strong> Interés legítimo (Art. 6.1.f RGPD).</li>
              </ul>

              <h3 className="font-bold text-gray-800 mt-4">5. Sistema de consentimiento granular</h3>
              <p>Se te presentarán casillas de verificación separadas, no premarcadas, para cada finalidad que requiera consentimiento:</p>
              <ul className="list-disc ml-4 mt-2">
                <li><strong>Casilla 1 — Publicidad personalizada:</strong> "Acepto que Google y sus socios creen perfiles basados en mi actividad para mostrarme anuncios personalizados."</li>
                <li><strong>Casilla 2 — Creación de perfiles comerciales:</strong> "Acepto que AQD elabore perfiles comerciales basados en mis datos económicos y fiscales (sin datos identificativos directos) para segmentación publicitaria, estudios de mercado y desarrollo de productos."</li>
                <li><strong>Casilla 3 — Cesión de perfiles a terceros:</strong> "Acepto que AQD ceda, licencie o venda los perfiles comerciales generados a empresas del sector financiero, publicidad, marketing y análisis de datos, siempre sin incluir datos que me identifiquen directamente."</li>
              </ul>
              <p className="mt-2">Si no marcas una casilla, se entenderá como negativa. El servicio básico seguirá funcionando con normalidad sin marcar ninguna casilla opcional.</p>

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
              <p>Si aceptas publicidad personalizada, se comparten ID de publicidad, dirección IP, datos de uso e información técnica del dispositivo. Si la rechazas, Google mostrará anuncios contextuales sin crear perfiles.</p>

              <h4 className="font-semibold text-gray-700 mt-2">8.2. Terceros receptores de perfiles (solo con tu consentimiento)</h4>
              <p>Si has otorgado los consentimientos de las casillas 2 y 3, los perfiles comerciales podrán cederse a las categorías descritas en la sección 3.4. En ningún caso se cederán datos que permitan tu identificación directa.</p>

              <h4 className="font-semibold text-gray-700 mt-2">8.3. Obligaciones legales</h4>
              <p>Podremos revelar datos si lo exige la ley o una autoridad judicial o administrativa competente.</p>

              <h3 className="font-bold text-gray-800 mt-4">9. Tus derechos</h3>
              <p>De conformidad con los artículos 15 a 22 del RGPD tienes derecho a:</p>
              <ul className="list-disc ml-4">
                <li><strong>Acceso (art. 15):</strong> conocer qué datos tenemos sobre ti, incluidos los perfiles comerciales y cesiones realizadas.</li>
                <li><strong>Rectificación (art. 16):</strong> corregir datos incorrectos.</li>
                <li><strong>Supresión (art. 17):</strong> solicitar la eliminación de tus datos y perfiles.</li>
                <li><strong>Limitación (art. 18):</strong> restringir determinados tratamientos.</li>
                <li><strong>Oposición (art. 21):</strong> oponerte al tratamiento, incluida la elaboración de perfiles comerciales.</li>
                <li><strong>Portabilidad (art. 20):</strong> recibir tus datos en formato estructurado.</li>
                <li><strong>No ser objeto de decisiones automatizadas (art. 22).</strong></li>
                <li><strong>Retirar el consentimiento (art. 7.3):</strong> en cualquier momento, sin efectos retroactivos.</li>
              </ul>
              <p className="mt-2">Puedes ejercer tus derechos enviando un email a <strong>e.goidevs@gmail.com</strong>. Responderemos en el plazo máximo de 1 mes (prorrogable a 2 en casos complejos).</p>
              <p className="mt-2">Si consideras que no se respetan tus derechos, puedes reclamar ante la <strong>Agencia Española de Protección de Datos (AEPD):</strong> www.aepd.es</p>

              <h3 className="font-bold text-gray-800 mt-4">10. Cookies y tecnologías similares</h3>
              <p>Esta Aplicación utiliza cookies esenciales, de análisis y de publicidad (solo con tu consentimiento). Puedes gestionar tus preferencias desde los ajustes de tu dispositivo.</p>

              <h3 className="font-bold text-gray-800 mt-4">11. Seguridad de los datos</h3>
              <p>Aplicamos medidas técnicas y organizativas apropiadas: cifrado en tránsito (HTTPS/TLS), acceso restringido a personal autorizado y seudonimización de los datos utilizados en perfiles comerciales. Ningún sistema es 100% seguro.</p>

              <h3 className="font-bold text-gray-800 mt-4">12. Menores de edad</h3>
              <p>Esta Aplicación no está dirigida a menores de 14 años. Si tenemos conocimiento de que hemos recogido datos de un menor sin consentimiento parental, los eliminaremos de inmediato.</p>

              <h3 className="font-bold text-gray-800 mt-4">13. Implementación técnica del consentimiento</h3>
              <p>Para cumplir con el RGPD, utilizamos el User Messaging Platform (UMP) SDK de Google complementado con una capa propia de gestión de consentimiento para los tratamientos adicionales (perfiles comerciales y cesión a terceros). El sistema registra fecha, hora y versión del texto aceptado como prueba del consentimiento.</p>

              <h3 className="font-bold text-gray-800 mt-4">14. Actualizaciones de esta política</h3>
              <p>Podremos actualizar esta política ocasionalmente. Los cambios se notificarán mediante aviso dentro de la Aplicación. Si afectan a tratamientos que requieran consentimiento, se te solicitará un nuevo consentimiento expreso.</p>

              <h3 className="font-bold text-gray-800 mt-4">15. Descargo de responsabilidad</h3>
              <p><strong>AVISO IMPORTANTE:</strong> Esta Aplicación tiene únicamente fines informativos y orientativos. Los resultados NO constituyen asesoramiento fiscal profesional. Ante cualquier duda, consulta con un asesor fiscal profesional o acude a la Agencia Tributaria.</p>

              <h3 className="font-bold text-gray-800 mt-4">16. Contacto</h3>
              <p>Para cualquier cuestión relacionada con esta política o el ejercicio de tus derechos:</p>
              <p><strong>Email:</strong> e.goidevs@gmail.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsentPage;
  );
};

export default ConsentPage;
