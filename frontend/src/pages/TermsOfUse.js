import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Términos de Uso de AQD</h1>
          <p className="text-gray-500 mb-6"><strong>Última actualización:</strong> 22 de febrero de 2026</p>

          <div className="text-sm text-gray-700 prose prose-sm">
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
              <p>Si otorgas tu consentimiento expreso, AQD podrá ceder, licenciar o vender los perfiles comerciales generados a terceros, incluyendo: empresas del sector financiero, empresas de publicidad y marketing digital, empresas de análisis de datos y estudios de mercado, y otras entidades comerciales.</p>
              <p className="mt-2">En todos los casos, los perfiles cedidos no contendrán datos que permitan tu identificación directa (nombre, apellidos, DNI/NIE, dirección postal, teléfono). Los perfiles se componen de datos seudonimizados o agregados.</p>

              <h4 className="font-semibold text-gray-700 mt-2">5.4. Consentimiento explícito, libre e informado</h4>
              <p>De conformidad con los artículos 6.1.a), 7 y 13 del RGPD y el artículo 6 de la LOPDGDD:</p>
              <ul className="list-disc ml-4 mt-2">
                <li><strong>Consentimiento granular:</strong> Se te solicitará un consentimiento separado e independiente para la creación de perfiles comerciales y para la cesión de dichos perfiles a terceros.</li>
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
              <p>En la máxima medida permitida por la ley, el titular no se hace responsable de errores en los cálculos, decisiones fiscales tomadas basándose en los resultados, sanciones de la Agencia Tributaria, cambios normativos no reflejados, ni pérdidas económicas derivadas del uso de la Aplicación.</p>

              <h4 className="font-semibold text-gray-700 mt-2">6.3. Recomendación profesional</h4>
              <p>SIEMPRE recomendamos consultar con un asesor fiscal profesional colegiado o acudir directamente a la Agencia Tributaria antes de tomar cualquier decisión relevante sobre tu declaración de IRPF.</p>

              <h3 className="font-bold text-gray-800 mt-4">7. Propiedad intelectual</h3>
              <p>Todos los contenidos de AQD (código fuente, diseño, textos, lógica de cálculo, marca y logotipo) son propiedad exclusiva del titular y están protegidos por el Real Decreto Legislativo 1/1996 (Ley de Propiedad Intelectual) y demás normativa aplicable.</p>

              <h3 className="font-bold text-gray-800 mt-4">8. Privacidad y protección de datos</h3>
              <p>El tratamiento de tus datos personales se rige por nuestra <a href="/privacy-policy" className="text-blue-600 underline">Política de Privacidad</a>, que constituye un documento separado y complementario a estos Términos de Uso.</p>

              <h3 className="font-bold text-gray-800 mt-4">9. Publicidad</h3>
              <p>AQD se financia mediante publicidad. Al usar la Aplicación aceptas que se muestren anuncios (personalizados o no, según tu elección), entiendes que no podemos controlar el contenido exacto de todos los anuncios y reconoces que la interacción con anuncios es bajo tu propia responsabilidad.</p>

              <h3 className="font-bold text-gray-800 mt-4">10. Enlaces a terceros</h3>
              <p>AQD puede contener enlaces a sitios web de terceros (por ejemplo, Agencia Tributaria). No nos responsabilizamos del contenido, políticas de privacidad ni servicios ofrecidos por terceros.</p>

              <h3 className="font-bold text-gray-800 mt-4">11. Modificaciones del servicio y de los términos</h3>
              <p>Nos reservamos el derecho de modificar la Aplicación y estos Términos de Uso. Los cambios relevantes se notificarán mediante aviso dentro de la Aplicación.</p>

              <h3 className="font-bold text-gray-800 mt-4">12. Suspensión y terminación</h3>
              <p>Puedes dejar de usar AQD en cualquier momento. Nos reservamos el derecho de suspender tu acceso si detectamos uso fraudulento, incumples estos términos o es necesario por razones legales.</p>

              <h3 className="font-bold text-gray-800 mt-4">13. Disponibilidad del servicio</h3>
              <p>No garantizamos que AQD esté disponible de forma ininterrumpida. No se otorgará compensación alguna por interrupciones, dado que la Aplicación es gratuita.</p>

              <h3 className="font-bold text-gray-800 mt-4">14. Indemnización</h3>
              <p>Aceptas mantener indemne al titular de AQD frente a cualquier reclamación, pérdida, daño o gasto derivado de tu uso de la Aplicación, incumplimiento de estos términos, violación de derechos de terceros o información falsa que proporciones.</p>

              <h3 className="font-bold text-gray-800 mt-4">15. Ley aplicable y jurisdicción</h3>
              <p>Estos Términos se rigen por la legislación española, incluyendo el RGPD, la LOPDGDD y la LSSI-CE. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales competentes según la legislación procesal vigente.</p>

              <h3 className="font-bold text-gray-800 mt-4">16. Divisibilidad</h3>
              <p>Si alguna disposición fuera declarada nula por un tribunal competente, las demás disposiciones permanecerán en pleno vigor y efecto.</p>

              <h3 className="font-bold text-gray-800 mt-4">17. Renuncia</h3>
              <p>La falta de ejercicio de cualquier derecho de estos términos no constituirá una renuncia a dicho derecho.</p>

              <h3 className="font-bold text-gray-800 mt-4">18. Contacto</h3>
              <p><strong>Email:</strong> e.goidevs@gmail.com</p>

              <h3 className="font-bold text-gray-800 mt-4">19. Idioma</h3>
              <p>Estos términos se redactan en español. En caso de traducción a otros idiomas, prevalecerá la versión en español.</p>
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

export default TermsOfUse;
