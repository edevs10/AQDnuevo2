import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Política de Privacidad de AQD</h1>
          <p className="text-gray-500 mb-6"><strong>Última actualización:</strong> 22 de febrero de 2026</p>

          <div className="text-sm text-gray-700 prose prose-sm">
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
              <p>Si otorgas tu consentimiento expreso, podremos generar: perfil económico-fiscal estimado (rango de ingresos, tipo de contribuyente), segmentos de interés (categorías comerciales inferidas de tu perfil), indicadores demográficos agregados (franja de edad, situación familiar generalizada) y patrones de uso y comportamiento dentro de la Aplicación.</p>

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
              <p className="mt-2"><strong>3.2.1. Publicidad personalizada (requiere tu consentimiento expreso):</strong> Si aceptas, Google y sus socios crean perfiles basados en tu actividad y comparten datos como ID de publicidad, dirección IP, eventos dentro de la Aplicación e información demográfica inferida.</p>
              <p className="mt-2"><strong>3.2.2. Publicidad no personalizada:</strong> Si rechazas, seguirás viendo anuncios basados solo en el contenido de la Aplicación. Google no creará perfiles ni compartirá tus datos para personalización.</p>
              <p className="mt-2"><strong>3.2.3. Tu elección:</strong> Al abrir la Aplicación por primera vez, se te pedirá que elijas. Puedes cambiar tu decisión en cualquier momento desde los ajustes.</p>

              <h4 className="font-semibold text-gray-700 mt-2">3.3. Creación de perfiles comerciales (requiere consentimiento expreso separado)</h4>
              <p><strong>ATENCIÓN:</strong> Esta finalidad requiere un consentimiento específico, separado e independiente. No es necesario para usar el servicio básico.</p>
              <p className="mt-2">Si otorgas tu consentimiento, AQD utilizará tus datos económicos, fiscales y demográficos (sin datos identificativos directos) para elaborar perfiles comerciales utilizados para: segmentación publicitaria avanzada, estudios de mercado e informes sectoriales, desarrollo de productos y servicios propios o de terceros, y análisis estadísticos y comerciales.</p>

              <h4 className="font-semibold text-gray-700 mt-2">3.4. Cesión de perfiles comerciales a terceros (requiere consentimiento expreso separado adicional)</h4>
              <p><strong>ATENCIÓN:</strong> Esta finalidad requiere un consentimiento específico adicional, separado del consentimiento de creación de perfiles. No es necesario para usar el servicio básico.</p>
              <p className="mt-2">Si otorgas tu consentimiento, AQD podrá ceder, licenciar o vender los perfiles comerciales a: empresas del sector financiero y asegurador, empresas de publicidad, marketing digital y publicidad programática, empresas de análisis de datos y big data, y otras entidades comerciales con interés en datos de perfil económico-fiscal.</p>
              <p className="mt-2">En todos los casos: los perfiles no contendrán datos que permitan tu identificación directa, se componen de datos seudonimizados o agregados, los terceros estarán contractualmente obligados a respetar la normativa de protección de datos y no podrán intentar reidentificarte.</p>

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
              <p>Se te presentarán casillas de verificación separadas, no premarcadas, para cada finalidad que requiera consentimiento.</p>

              <h3 className="font-bold text-gray-800 mt-4">6. ¿Dónde se almacenan tus datos?</h3>
              <p>Los datos se almacenan en servidores seguros. Si utilizamos servicios de Google, tus datos pueden ser transferidos a Estados Unidos bajo las garantías del Marco de Privacidad de Datos UE-EE.UU. o cláusulas contractuales tipo aprobadas por la Comisión Europea (Art. 46.2.c RGPD).</p>

              <h3 className="font-bold text-gray-800 mt-4">7. ¿Cuánto tiempo conservamos tus datos?</h3>
              <ul className="list-disc ml-4">
                <li><strong>Durante el uso:</strong> los datos se conservan mientras usas la Aplicación activamente.</li>
                <li><strong>Datos en dispositivo:</strong> puedes eliminarlos borrando los datos de la Aplicación o desinstalándola.</li>
                <li><strong>Perfiles comerciales:</strong> mientras mantengas tu consentimiento activo. Si lo revocas, se eliminarán en un plazo máximo de 30 días.</li>
                <li><strong>Perfiles cedidos a terceros:</strong> en caso de revocación, notificaremos a los terceros para que procedan a la eliminación en un plazo máximo de 60 días.</li>
                <li><strong>Registro de consentimientos:</strong> mínimo 5 años como prueba de cumplimiento normativo (Art. 5.2 RGPD).</li>
                <li><strong>Datos anonimizados:</strong> pueden conservarse indefinidamente al no permitir tu identificación.</li>
              </ul>

              <h3 className="font-bold text-gray-800 mt-4">8. ¿Con quién compartimos tus datos?</h3>
              <p>Google AdMob (si aceptas publicidad personalizada), terceros receptores de perfiles (solo con tu consentimiento), datos anonimizados para estudios de mercado, y en caso de obligación legal ante autoridad competente.</p>

              <h3 className="font-bold text-gray-800 mt-4">9. Tus derechos</h3>
              <p>De conformidad con los artículos 15 a 22 del RGPD y los artículos 12 a 18 de la LOPDGDD, tienes derecho a: acceso, rectificación, supresión, limitación del tratamiento, oposición, portabilidad, no ser objeto de decisiones automatizadas y retirar el consentimiento en cualquier momento.</p>
              <p className="mt-2">Envía un email a <strong>e.goidevs@gmail.com</strong> indicando qué derecho quieres ejercer. Responderemos en el plazo máximo de 1 mes.</p>
              <p className="mt-2">Si consideras que no se respetan tus derechos, puedes reclamar ante la <strong>Agencia Española de Protección de Datos (AEPD):</strong> www.aepd.es</p>

              <h3 className="font-bold text-gray-800 mt-4">10. Cookies y tecnologías similares</h3>
              <p>Esta Aplicación utiliza: cookies esenciales, cookies de análisis y cookies de publicidad (solo con tu consentimiento). Puedes gestionar tus preferencias desde los ajustes de tu dispositivo.</p>

              <h3 className="font-bold text-gray-800 mt-4">11. Seguridad de los datos</h3>
              <p>Aplicamos medidas técnicas y organizativas apropiadas: cifrado en tránsito (HTTPS/TLS), acceso restringido a personal autorizado, protección contra accesos no autorizados y seudonimización de los datos utilizados en perfiles comerciales.</p>

              <h3 className="font-bold text-gray-800 mt-4">12. Menores de edad</h3>
              <p>Esta Aplicación no está dirigida a menores de 14 años. No recogemos conscientemente datos de menores.</p>

              <h3 className="font-bold text-gray-800 mt-4">13. Actualizaciones de esta política</h3>
              <p>Podremos actualizar esta política ocasionalmente. Los cambios se notificarán mediante aviso dentro de la Aplicación.</p>

              <h3 className="font-bold text-gray-800 mt-4">14. Descargo de responsabilidad</h3>
              <p><strong>AVISO IMPORTANTE:</strong> Esta Aplicación tiene únicamente fines informativos y orientativos. Los resultados NO constituyen asesoramiento fiscal profesional ni recomendaciones legales personalizadas.</p>

              <h3 className="font-bold text-gray-800 mt-4">15. Contacto</h3>
              <p><strong>Email:</strong> e.goidevs@gmail.com</p>
              <p><strong>Delegado de Protección de Datos:</strong> e.goidevs@gmail.com</p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Volver a la página principal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
