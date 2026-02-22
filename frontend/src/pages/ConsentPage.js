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
              <p>El responsable del tratamiento de los datos personales recogidos a través de esta aplicación es:</p>
              <ul className="list-none ml-0">
                <li><strong>Email de contacto:</strong> e.goidevs@gmail.com</li>
              </ul>
              <p>Ante el responsable se pueden ejercitar todos los derechos reconocidos en el Reglamento General de Protección de Datos (RGPD) y la legislación española aplicable.</p>

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
                <li><strong>Identificadores de dispositivo</strong> (ID de publicidad anónimo, tipo de dispositivo)</li>
                <li><strong>Datos de navegación:</strong> páginas visitadas, tiempo de uso, interacciones</li>
                <li><strong>Datos de cookies y tecnologías similares</strong></li>
                <li><strong>Dirección IP</strong> (conservada de forma temporal para seguridad)</li>
              </ul>

              <h3 className="font-bold text-gray-800 mt-4">3. ¿Para qué usamos tus datos?</h3>
              <h4 className="font-semibold text-gray-700 mt-2">3.1. Finalidades principales</h4>
              <ol className="list-decimal ml-4">
                <li><strong>Prestar el servicio principal:</strong> determinar si tienes obligación de presentar la declaración del IRPF según la normativa española vigente</li>
                <li><strong>Mejorar la aplicación:</strong> análisis estadísticos sobre el uso de la app</li>
                <li><strong>Personalizar la experiencia:</strong> recordar tus respuestas durante la sesión</li>
                <li><strong>Seguridad:</strong> detectar usos fraudulentos o abusivos</li>
              </ol>

              <h4 className="font-semibold text-gray-700 mt-2">3.2. Publicidad y creación de perfiles</h4>
              <p>Mostramos publicidad a través de <strong>Google AdMob</strong> para monetizar la aplicación y mantenerla gratuita.</p>
              
              <p className="mt-2"><strong>3.2.1. Publicidad personalizada (requiere tu consentimiento expreso)</strong></p>
              <p>Si <strong>aceptas la publicidad personalizada</strong>, Google y sus socios publicitarios:</p>
              <ul className="list-disc ml-4">
                <li><strong>Crean perfiles de usuario</strong> basados en tu actividad</li>
                <li><strong>Recopilan datos</strong> como ID de publicidad, dirección IP, eventos dentro de la app, información demográfica inferida, intereses y comportamientos de navegación</li>
                <li><strong>Comparten estos perfiles</strong> con socios publicitarios de Google para mostrarte anuncios más relevantes</li>
              </ul>
              <p><strong>Lista de socios publicitarios de Google:</strong> https://support.google.com/admob/answer/9012903</p>

              <p className="mt-2"><strong>3.2.2. Publicidad NO personalizada (opción alternativa)</strong></p>
              <p>Si <strong>rechazas la publicidad personalizada</strong>:</p>
              <ul className="list-disc ml-4">
                <li>Seguirás viendo anuncios, pero basados solo en el contenido de la app (publicidad contextual)</li>
                <li>Google NO creará perfiles sobre ti</li>
                <li>Google NO compartirá tus datos con sus socios publicitarios para personalización</li>
                <li>Los anuncios pueden ser menos relevantes, pero tu privacidad está más protegida</li>
              </ul>

              <p className="mt-2"><strong>3.2.3. Tu elección y consentimiento</strong></p>
              <p>Al abrir la app por primera vez, se te pedirá explícitamente que elijas:</p>
              <ul className="list-disc ml-4">
                <li>✅ <strong>Aceptar publicidad personalizada</strong> (ayudas a mantener la app gratuita, pero se crean perfiles)</li>
                <li>❌ <strong>Rechazar publicidad personalizada</strong> (más privacidad, anuncios menos relevantes)</li>
              </ul>
              <p>Puedes cambiar tu decisión en cualquier momento desde los ajustes de la app o de tu dispositivo.</p>

              <h4 className="font-semibold text-gray-700 mt-2">3.3. Uso estadístico y comercial</h4>
              <p>Podemos realizar <strong>análisis agregados y anonimizados</strong> de los datos para estudios de mercado sobre tendencias fiscales, informes estadísticos generales y mejora de servicios.</p>
              <p><strong>Importante:</strong> Antes de cualquier uso estadístico o comercial, los datos se <strong>anonimizan de forma irreversible</strong>, imposibilitando tu identificación.</p>

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
                  <tr><td className="border border-gray-300 p-2">Mejora del servicio y análisis interno</td><td className="border border-gray-300 p-2">Interés legítimo (Art. 6.1.f RGPD)</td></tr>
                  <tr><td className="border border-gray-300 p-2"><strong>Publicidad personalizada</strong></td><td className="border border-gray-300 p-2"><strong>Consentimiento explícito (Art. 6.1.a RGPD)</strong></td></tr>
                  <tr><td className="border border-gray-300 p-2">Publicidad NO personalizada</td><td className="border border-gray-300 p-2">Interés legítimo (Art. 6.1.f RGPD)</td></tr>
                  <tr><td className="border border-gray-300 p-2">Seguridad y prevención de fraude</td><td className="border border-gray-300 p-2">Interés legítimo (Art. 6.1.f RGPD)</td></tr>
                </tbody>
              </table>

              <h3 className="font-bold text-gray-800 mt-4">5. ¿Dónde se almacenan tus datos?</h3>
              <p>Los datos se almacenan en servidores seguros. Si utilizamos servicios como Firebase o AdMob de Google, tus datos pueden ser transferidos a Estados Unidos bajo las garantías del Marco de Privacidad de Datos UE-EE.UU. o cláusulas contractuales tipo aprobadas por la UE.</p>

              <h3 className="font-bold text-gray-800 mt-4">6. ¿Cuánto tiempo conservamos tus datos?</h3>
              <ul className="list-disc ml-4">
                <li><strong>Durante el uso de la app:</strong> los datos se conservan mientras usas la aplicación</li>
                <li><strong>Datos en dispositivo:</strong> puedes eliminarlos en cualquier momento borrando los datos de la app o desinstalándola</li>
                <li><strong>Datos anonimizados:</strong> una vez anonimizados, pueden conservarse indefinidamente, ya que no permiten tu identificación</li>
              </ul>

              <h3 className="font-bold text-gray-800 mt-4">7. ¿Con quién compartimos tus datos?</h3>
              <h4 className="font-semibold text-gray-700 mt-2">7.1. Google AdMob (si aceptas publicidad personalizada)</h4>
              <p><strong>Datos compartidos:</strong> ID de publicidad de tu dispositivo, dirección IP, datos de uso de la app, información técnica del dispositivo, ubicación aproximada (a nivel de ciudad).</p>
              <p><strong>Si rechazas publicidad personalizada:</strong> Google seguirá mostrando anuncios contextuales pero NO creará perfiles ni compartirá tus datos con sus socios publicitarios para personalización.</p>

              <h4 className="font-semibold text-gray-700 mt-2">7.2. Datos anonimizados</h4>
              <p>Podemos compartir <strong>datos estadísticos agregados y completamente anonimizados</strong> con colaboradores para estudios de mercado e investigadores del ámbito fiscal/económico. <strong>Nunca se ceden datos que permitan tu identificación personal.</strong></p>

              <h4 className="font-semibold text-gray-700 mt-2">7.3. Obligaciones legales</h4>
              <p>Podemos revelar datos si lo exige la ley o una autoridad competente (tribunal, Agencia Tributaria, fuerzas de seguridad).</p>

              <h3 className="font-bold text-gray-800 mt-4">8. Tus derechos</h3>
              <p>Tienes derecho a:</p>
              <ul className="list-disc ml-4">
                <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti</li>
                <li><strong>Rectificación:</strong> corregir datos incorrectos</li>
                <li><strong>Supresión ("derecho al olvido"):</strong> eliminar tus datos</li>
                <li><strong>Limitación:</strong> restringir ciertos tratamientos</li>
                <li><strong>Oposición:</strong> oponerte al tratamiento por motivos legítimos</li>
                <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado</li>
                <li><strong>Retirar el consentimiento:</strong> en cualquier momento, sin efectos retroactivos</li>
              </ul>
              <p>Esta lista sólo es ejemplificativa. También tienes derecho a cualquier otro establecido por la normativa vigente en materia de protección de datos.</p>
              
              <p className="mt-2"><strong>¿Cómo ejercer tus derechos?</strong></p>
              <p>Envía un email a <strong>e.goidevs@gmail.com</strong> indicando qué derecho quieres ejercer. Responderemos en el plazo máximo de <strong>1 mes</strong>.</p>
              
              <p className="mt-2"><strong>Derecho a reclamar</strong></p>
              <p>Si consideras que no se respetan tus derechos, puedes presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong>: www.aepd.es</p>

              <h3 className="font-bold text-gray-800 mt-4">9. Cookies y tecnologías similares</h3>
              <p>Esta aplicación utiliza cookies y tecnologías de seguimiento similares para:</p>
              <ul className="list-disc ml-4">
                <li><strong>Cookies esenciales:</strong> necesarias para el funcionamiento básico</li>
                <li><strong>Cookies de análisis:</strong> para entender cómo se usa la app</li>
                <li><strong>Cookies de publicidad:</strong> para mostrar anuncios personalizados (AdMob)</li>
              </ul>
              <p>Puedes gestionar las preferencias de publicidad desde los ajustes de tu dispositivo.</p>

              <h3 className="font-bold text-gray-800 mt-4">10. Seguridad de los datos</h3>
              <p>Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos: cifrado de datos en tránsito (HTTPS/TLS), acceso restringido solo a personal autorizado, y protección contra accesos no autorizados.</p>
              <p>No obstante, ningún sistema es 100% seguro. Te recomendamos mantener actualizada tu app y sistema operativo.</p>

              <h3 className="font-bold text-gray-800 mt-4">11. Menores de edad</h3>
              <p>Esta aplicación <strong>no está dirigida a menores de 14 años</strong>. Si tenemos conocimiento de que hemos recogido datos de un menor sin consentimiento parental, los eliminaremos de inmediato.</p>

              <h3 className="font-bold text-gray-800 mt-4">12. Actualizaciones de la política</h3>
              <p>Podemos actualizar esta política de privacidad ocasionalmente. Los cambios se notificarán mediante aviso dentro de la aplicación y actualizando la fecha de "última actualización". Te recomendamos revisar periódicamente esta política.</p>

              <h3 className="font-bold text-gray-800 mt-4">13. DESCARGO DE RESPONSABILIDAD IMPORTANTE</h3>
              <p><strong>Esta aplicación tiene únicamente fines informativos y orientativos.</strong></p>
              <ul className="list-disc ml-4">
                <li>Los resultados ofrecidos <strong>NO constituyen asesoramiento fiscal profesional</strong> ni recomendaciones legales personalizadas</li>
                <li>La <strong>responsabilidad sobre la veracidad</strong> de los datos introducidos es <strong>exclusivamente tuya</strong></li>
                <li><strong>Ante cualquier duda o situación compleja</strong>, se recomienda encarecidamente consultar con un <strong>asesor fiscal profesional</strong> colegiado o acudir directamente a la <strong>Agencia Tributaria</strong></li>
                <li>No nos hacemos responsables de errores, omisiones o decisiones tomadas basándose exclusivamente en los resultados de la app</li>
              </ul>

              <h3 className="font-bold text-gray-800 mt-4">14. Implementación técnica del consentimiento (UMP SDK)</h3>
              <p>Para cumplir con el RGPD, esta aplicación utiliza el <strong>User Messaging Platform (UMP) SDK de Google</strong>, que muestra un banner de consentimiento la primera vez que abres la app, te permite elegir entre publicidad personalizada o no personalizada, almacena tu elección de forma segura, y te permite cambiar tu decisión en cualquier momento.</p>

              <h3 className="font-bold text-gray-800 mt-4">15. Contacto</h3>
              <p>Para cualquier cuestión relacionada con esta política de privacidad o el tratamiento de tus datos personales:</p>
              <p><strong>Email:</strong> e.goidevs@gmail.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsentPage;
