import React, { useState, useRef, useEffect } from 'react';

interface SampleItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  collection: string;
}

const SAMPLES: SampleItem[] = [
  // Collection 01: Claridad e intención
  {
    id: 'sample-01',
    title: 'Cómo utilizar la guía',
    subtitle: 'De tu situación a una reflexión más clara',
    image: '/assets/sample-01.webp',
    collection: '01 Claridad e intención',
  },
  {
    id: 'sample-02',
    title: 'Vehuiah',
    subtitle: 'Inicio y voluntad',
    image: '/assets/sample-02.webp',
    collection: '01 Claridad e intención',
  },
  {
    id: 'sample-03',
    title: 'Hahaiah',
    subtitle: 'Refugio y escucha interior',
    image: '/assets/sample-03.webp',
    collection: '01 Claridad e intención',
  },
  {
    id: 'sample-04',
    title: 'Lauviah',
    subtitle: 'Intuición y comprensión interior',
    image: '/assets/sample-04.webp',
    collection: '01 Claridad e intención',
  },
  // Collection 02: Protección y renovación
  {
    id: 'sample-05',
    title: 'Haheuiah',
    subtitle: 'Protección y prudencia',
    image: '/assets/sample-05.webp',
    collection: '02 Protección y renovación',
  },
  {
    id: 'sample-06',
    title: 'Yerathel',
    subtitle: 'Liberación y expansión',
    image: '/assets/sample-06.webp',
    collection: '02 Protección y renovación',
  },
  {
    id: 'sample-07',
    title: 'Aniel',
    subtitle: 'Valentía y superación',
    image: '/assets/sample-07.webp',
    collection: '02 Protección y renovación',
  },
  {
    id: 'sample-08',
    title: 'Sealiah',
    subtitle: 'Motivación y renacimiento',
    image: '/assets/sample-08.webp',
    collection: '02 Protección y renovación',
  },
  // Collection 03: Expansión y transformación
  {
    id: 'sample-09',
    title: 'Daniel',
    subtitle: 'Elocuencia y conciliación',
    image: '/assets/sample-09.webp',
    collection: '03 Expansión y transformación',
  },
  {
    id: 'sample-10',
    title: 'Poyel',
    subtitle: 'Gratitud y plenitud',
    image: '/assets/sample-10.webp',
    collection: '03 Expansión y transformación',
  },
  {
    id: 'sample-11',
    title: 'Damabiah',
    subtitle: 'Serenidad y fluidez',
    image: '/assets/sample-11.webp',
    collection: '03 Expansión y transformación',
  },
  {
    id: 'sample-12',
    title: 'Mumiah',
    subtitle: 'Cierre e integración',
    image: '/assets/sample-12.webp',
    collection: '03 Expansión y transformación',
  },
];

const BONUSES = [
  {
    num: 'BONO 01',
    title: 'Guía Rápida de Consulta',
    desc: 'Encuentra el punto de partida sin perder tiempo.',
    price: 'US$5',
    img: '/assets/bonus-premium-01.webp',
  },
  {
    num: 'BONO 02',
    title: 'Glosario Esencial de los 72 Ángeles',
    desc: 'Comprende los conceptos sin interrumpir tu lectura.',
    price: 'US$7',
    img: '/assets/bonus-premium-02.webp',
  },
  {
    num: 'BONO 03',
    title: 'Cómo Usar Mejor Esta Guía',
    desc: 'Crea tu propia forma de estudiar.',
    price: 'US$3',
    img: '/assets/bonus-premium-03.webp',
  },
  {
    num: 'BONO 04',
    title: 'Hojas de Consulta Personal',
    desc: 'Convierte tus lecturas en reflexiones escritas.',
    price: 'US$4',
    img: '/assets/bonus-premium-04.webp',
  },
  {
    num: 'BONO 05',
    title: 'Mapa de Temas y Virtudes',
    desc: 'Visualiza las conexiones entre diferentes conceptos.',
    price: 'US$6',
    img: '/assets/bonus-premium-05.webp',
  },
  {
    num: 'BONO 06',
    title: 'Plan de Estudio de 21 Días',
    desc: 'Sigue un recorrido diario para estudiar con orden, repasar y registrar tus avances.',
    price: 'US$8',
    img: '/assets/bonus-premium-06.webp',
  },
  {
    num: 'BONO 07',
    title: '72 Tarjetas de Consulta Rápida',
    desc: 'Repasa los 72 Ángeles con tarjetas breves y organizadas para tus consultas.',
    price: 'US$5',
    img: '/assets/bonus-premium-07.webp',
  },
  {
    num: 'BONO 08',
    title: 'Cuaderno de Intenciones y Reflexiones',
    desc: 'Escribe tus intenciones, responde preguntas y acompaña tus lecturas con reflexión personal.',
    price: 'US$7',
    img: '/assets/bonus-premium-08.webp',
  },
];

const POLICIES: Record<string, { title: string; text: string }> = {
  terms: {
    title: 'Términos de Uso',
    text: 'Material digital para consulta e impresión personal. No se autoriza su redistribución o reventa. El contenido tiene fines educativos, culturales y de reflexión, sin garantías de resultados específicos. Las condiciones de pago y reembolso se presentarán en el checkout.',
  },
  privacy: {
    title: 'Política de Privacidad',
    text: 'Esta página utiliza Meta Pixel y UTMify para medir visitas, interacciones y atribución de campañas. Estos servicios pueden procesar identificadores del dispositivo, dirección IP y datos de navegación conforme a sus políticas. El proveedor de pago aplica su propia política de privacidad.',
  },
  contact: {
    title: 'Contacto',
    text: 'La información de contacto del responsable estará disponible junto con el checkout cuando se habilite la compra.',
  },
};

export default function App() {
  const [activeSampleIndex, setActiveSampleIndex] = useState<number | null>(null);
  const [policyModal, setPolicyModal] = useState<{ title: string; text: string } | null>(null);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  const carouselRef1 = useRef<HTMLDivElement>(null);
  const carouselRef2 = useRef<HTMLDivElement>(null);
  const carouselRef3 = useRef<HTMLDivElement>(null);

  // Setup Hotmart tracked checkout URL
  const getCheckoutUrl = (offerCode = '6ng3km9t') => {
    const base = `https://pay.hotmart.com/H107870026Q?off=${offerCode}`;
    if (typeof window === 'undefined') return base;
    try {
      const url = new URL(base);
      const searchParams = new URLSearchParams(window.location.search);
      const allowed = /^(utm_[a-z_]+|fbclid|gclid|src|sck|xcod|ad_id|adset_id|campaign_id|placement)$/;
      for (const [k, v] of searchParams.entries()) {
        if (allowed.test(k) && v) {
          url.searchParams.set(k, v);
        }
      }
      return url.toString();
    } catch {
      return base;
    }
  };

  // Back-redirect logic: redirects to https://pay.hotmart.com/H107870026Q?off=lgvnypg2 on browser back navigation
  useEffect(() => {
    const key = 'angeles-back-offer-v2';
    const marker = '__angelesBackOfferV2';
    try {
      if (sessionStorage.getItem(key) === '1') return;
      sessionStorage.setItem(key, '0');
    } catch {
      return;
    }
    if (!window.history || !window.history.pushState) return;

    const entryUrl = window.location.href;
    const prior = window.history.state;
    const token = Date.now().toString(36) + Math.random().toString(36).slice(2);
    let fired = false;

    const handlePopState = () => {
      if (fired) return;
      try {
        if (sessionStorage.getItem(key) === '1') return;
        sessionStorage.setItem(key, '1');
      } catch {
        // ignore
      }
      fired = true;
      window.removeEventListener('popstate', handlePopState);
      const redirectUrl = getCheckoutUrl('lgvnypg2');
      try {
        window.location.replace(redirectUrl);
      } catch {
        window.location.href = redirectUrl;
      }
    };

    try {
      window.history.replaceState({ ...prior, [marker]: { token, role: 'base' } }, '', entryUrl);
      window.history.pushState({ ...prior, [marker]: { token, role: 'guard' } }, '', entryUrl);
      window.addEventListener('popstate', handlePopState);
    } catch {
      // fallback
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleScrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const offset = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'left' ? -offset : offset,
        behavior: 'smooth',
      });
    }
  };

  // Drag-to-scroll support for carousels
  const setupDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    const el = ref.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
    };
    const onMouseUp = () => {
      isDown = false;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  };

  useEffect(() => {
    const clean1 = setupDragScroll(carouselRef1);
    const clean2 = setupDragScroll(carouselRef2);
    const clean3 = setupDragScroll(carouselRef3);
    return () => {
      clean1?.();
      clean2?.();
      clean3?.();
    };
  }, []);

  // Exit intent trigger
  useEffect(() => {
    let triggered = false;
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered) {
        triggered = true;
        try {
          if (sessionStorage.getItem('angeles-exit-dismissed') !== 'true') {
            setShowExitModal(true);
          }
        } catch {
          setShowExitModal(true);
        }
      }
    };
    document.addEventListener('mouseleave', onMouseLeave);
    return () => document.removeEventListener('mouseleave', onMouseLeave);
  }, []);

  // Keyboard navigation for image viewer
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSampleIndex(null);
        setPolicyModal(null);
        setShowExitModal(false);
      } else if (e.key === 'ArrowRight' && activeSampleIndex !== null) {
        setActiveSampleIndex((activeSampleIndex + 1) % SAMPLES.length);
      } else if (e.key === 'ArrowLeft' && activeSampleIndex !== null) {
        setActiveSampleIndex((activeSampleIndex - 1 + SAMPLES.length) % SAMPLES.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSampleIndex]);

  return (
    <div>
      {/* Header */}
      <header>
        <a className="brand" href="#">
          Los 72 Ángeles <span>DE LA CÁBALA</span>
        </a>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero wrap">
          <div>
            <p className="eyebrow">GUÍA DIGITAL ILUSTRADA · SABIDURÍA Y REFLEXIÓN</p>
            <h1>
              Los 72 Ángeles de la Cábala, por fin organizados para comprenderlos y consultarlos <em>con claridad.</em>
            </h1>
            <img
              loading="eager"
              alt="Guía Los 72 Ángeles de la Cábala con sus ocho bonos"
              className="hero-mockup"
              decoding="async"
              fetchPriority="high"
              height={1200}
              src="/assets/mockup-eight.webp"
              width={1200}
            />
            <p className="meta mockup-caption">
              Tu acceso incluye la guía principal + los 8 bonos que encontrarás a continuación.
            </p>
            <p className="lead">
              Explora sus nombres, virtudes y oraciones con una guía visual de 75 páginas, organizada para estudiar y reflexionar a tu ritmo.
            </p>
            <ul className="checks">
              <li>72 Ángeles explicados individualmente</li>
              <li>Virtudes, atributos y oraciones guiadas</li>
              <li>Consultas por propósito o situación</li>
              <li>Material digital para cualquier dispositivo</li>
            </ul>
            <div className="actions">
              <a className="button" href="#planes">
                QUIERO CONOCER LOS 72 ÁNGELES
              </a>
              <a className="textlink" href="#muestras">
                Ver el interior de la guía
              </a>
            </div>
            <p className="meta">Acceso inmediato · Pago único · Garantía de 7 días</p>
          </div>
        </section>

        {/* Section 1: Pain Points / Problem */}
        <section className="soft">
          <div className="wrap">
            <p className="eyebrow">¿TE RESULTA FAMILIAR?</p>
            <h2>
              Sientes curiosidad por los 72 Ángeles,<br />
              pero no sabes por dónde empezar.
            </h2>
            <div className="grid four">
              <article>
                <span className="num">01</span>
                <h3>Encuentras explicaciones diferentes en cada sitio.</h3>
                <p>Nombres y significados dispersos entre fuentes con criterios diferentes.</p>
              </article>
              <article>
                <span className="num">02</span>
                <h3>No sabes qué Ángel estudiar según tu inquietud.</h3>
                <p>Te falta una forma sencilla de consultar por tema o virtud.</p>
              </article>
              <article>
                <span className="num">03</span>
                <h3>Quieres reflexionar, pero te faltan palabras.</h3>
                <p>Quieres expresar tu intención con una oración o reflexión.</p>
              </article>
              <article>
                <span className="num">04</span>
                <h3>Empiezas a estudiar y terminas abandonándolo.</h3>
                <p>La falta de orden complica tu estudio.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Section 2: Product presentation (Navy) */}
        <section className="navy">
          <div className="wrap product">
            <div>
              <p className="eyebrow">DESCUBRE TU NUEVA GUÍA DIGITAL</p>
              <h2>
                72 Ángeles. 72 fichas.<br />
                Una sola guía para explorar todo a tu ritmo.
              </h2>
              <p>
                Los 72 Ángeles de la Cábala es un material visual para acercarte a esta tradición de manera accesible, organizada y agradable de consultar.
              </p>
              <p>
                Encontrarás explicaciones breves, conceptos relevantes, virtudes asociadas, preguntas de reflexión y oraciones guiadas. No necesitas memorizar los nombres ni tener conocimientos previos para comenzar.
              </p>
              <a className="button light" href="#planes">
                QUIERO MI GUÍA DIGITAL
              </a>
            </div>
            <ul className="checks">
              <li>75 páginas cuidadosamente organizadas</li>
              <li>72 fichas individuales</li>
              <li>Contenido visual y de fácil lectura</li>
              <li>Móvil, tablet o computadora</li>
              <li>Guía imprimible para uso personal</li>
              <li>Un material al que puedes regresar cuando quieras</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Samples Carousel */}
        <section className="wrap" id="muestras">
          <p className="eyebrow">MIRA ANTES DE DECIDIR</p>
          <h2>No tienes que imaginar cómo es por dentro. Puedes verlo.</h2>

          {/* Collection 01 */}
          <div className="collection">
            <div className="collection-head">
              <h3><span>01</span> Claridad e intención</h3>
              <div>
                <button
                  aria-label="Muestras anteriores"
                  className="previous"
                  onClick={() => handleScrollCarousel(carouselRef1, 'left')}
                >
                  ‹
                </button>
                <button
                  aria-label="Muestras siguientes"
                  className="next"
                  onClick={() => handleScrollCarousel(carouselRef1, 'right')}
                >
                  ›
                </button>
              </div>
            </div>
            <div aria-label="Claridad e intención" className="carousel" tabIndex={0} ref={carouselRef1}>
              {SAMPLES.slice(0, 4).map((s, idx) => (
                <button
                  key={s.id}
                  aria-label={`Ampliar ${s.title}`}
                  className="sample"
                  data-image={s.image}
                  data-title={s.title}
                  onClick={() => setActiveSampleIndex(idx)}
                >
                  <img
                    loading="lazy"
                    alt={`Página real: ${s.title}`}
                    decoding="async"
                    height={1500}
                    src={s.image}
                    width={1125}
                  />
                  <b>{s.title}</b>
                  <span>{s.subtitle}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Collection 02 */}
          <div className="collection">
            <div className="collection-head">
              <h3><span>02</span> Protección y renovación</h3>
              <div>
                <button
                  aria-label="Muestras anteriores"
                  className="previous"
                  onClick={() => handleScrollCarousel(carouselRef2, 'left')}
                >
                  ‹
                </button>
                <button
                  aria-label="Muestras siguientes"
                  className="next"
                  onClick={() => handleScrollCarousel(carouselRef2, 'right')}
                >
                  ›
                </button>
              </div>
            </div>
            <div aria-label="Protección y renovación" className="carousel" tabIndex={0} ref={carouselRef2}>
              {SAMPLES.slice(4, 8).map((s, idx) => (
                <button
                  key={s.id}
                  aria-label={`Ampliar ${s.title}`}
                  className="sample"
                  data-image={s.image}
                  data-title={s.title}
                  onClick={() => setActiveSampleIndex(idx + 4)}
                >
                  <img
                    loading="lazy"
                    alt={`Página real: ${s.title}`}
                    decoding="async"
                    height={1500}
                    src={s.image}
                    width={1125}
                  />
                  <b>{s.title}</b>
                  <span>{s.subtitle}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Collection 03 */}
          <div className="collection">
            <div className="collection-head">
              <h3><span>03</span> Expansión y transformación</h3>
              <div>
                <button
                  aria-label="Muestras anteriores"
                  className="previous"
                  onClick={() => handleScrollCarousel(carouselRef3, 'left')}
                >
                  ‹
                </button>
                <button
                  aria-label="Muestras siguientes"
                  className="next"
                  onClick={() => handleScrollCarousel(carouselRef3, 'right')}
                >
                  ›
                </button>
              </div>
            </div>
            <div aria-label="Expansión y transformación" className="carousel" tabIndex={0} ref={carouselRef3}>
              {SAMPLES.slice(8, 12).map((s, idx) => (
                <button
                  key={s.id}
                  aria-label={`Ampliar ${s.title}`}
                  className="sample"
                  data-image={s.image}
                  data-title={s.title}
                  onClick={() => setActiveSampleIndex(idx + 8)}
                >
                  <img
                    loading="lazy"
                    alt={`Página real: ${s.title}`}
                    decoding="async"
                    height={1500}
                    src={s.image}
                    width={1125}
                  />
                  <b>{s.title}</b>
                  <span>{s.subtitle}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="meta center">
            12 páginas de muestra de un total de 75. Las imágenes muestran páginas reales del producto digital.
          </p>
        </section>

        {/* Section 4: Architecture of each Angel sheet */}
        <section className="soft">
          <div className="wrap">
            <p className="eyebrow">TODO ORGANIZADO PARA FACILITAR TU ESTUDIO</p>
            <h2>Cada Ángel tiene una historia simbólica que merece ser comprendida.</h2>
            <p className="intro">Cada ficha reúne los elementos esenciales en una estructura fácil de seguir.</p>
            <div className="grid three">
              <article>
                <span className="num">01</span>
                <h3>Su esencia</h3>
                <p>Comprende la idea principal asociada al Ángel y el significado que orienta su interpretación.</p>
              </article>
              <article>
                <span className="num">02</span>
                <h3>Sus virtudes</h3>
                <p>Explora cualidades como la prudencia, la valentía o la claridad.</p>
              </article>
              <article>
                <span className="num">03</span>
                <h3>Sus atributos</h3>
                <p>Identifica los símbolos, conceptos y características de su ficha.</p>
              </article>
              <article>
                <span className="num">04</span>
                <h3>Cuándo consultarlo</h3>
                <p>Situaciones personales como punto de partida para la reflexión.</p>
              </article>
              <article>
                <span className="num">05</span>
                <h3>Oración e intención</h3>
                <p>Palabras guiadas para expresar una intención consciente y personal.</p>
              </article>
              <article>
                <span className="num">06</span>
                <h3>Preguntas de reflexión</h3>
                <p>Relaciona lo que has leído con tus experiencias, decisiones y valores.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Section 5: 3 Steps */}
        <section className="soft">
          <div className="wrap">
            <p className="eyebrow">SENCILLO DESDE EL PRIMER DÍA</p>
            <h2>Tu espacio de reflexión en 3 pasos.</h2>
            <div className="grid three">
              <article>
                <span className="num">01</span>
                <h3>Elige una virtud o un tema.</h3>
                <p>Piensa en aquello que deseas comprender, explorar o trabajar en tu vida.</p>
              </article>
              <article>
                <span className="num">02</span>
                <h3>Abre la ficha correspondiente.</h3>
                <p>Lee su significado, atributos y oración. Detente en las ideas relevantes para ti.</p>
              </article>
              <article>
                <span className="num">03</span>
                <h3>Lleva la reflexión a tu día.</h3>
                <p>Responde una pregunta, escribe una intención o identifica una acción concreta.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Section 6: 8 Bonuses */}
        <section className="wrap" id="bonos">
          <p className="eyebrow">EXCLUSIVOS DEL ACCESO COMPLETO</p>
          <h2>
            Conoce los 72 Ángeles.<br />
            Aprovecha mejor tu estudio con estos 8 bonos.
          </h2>
          <p className="intro">
            Ocho materiales digitales adicionales para consultar, organizar y profundizar en lo que vas aprendiendo.
          </p>
          <div className="bonus-list">
            {BONUSES.map((bonus) => (
              <article key={bonus.num}>
                <img
                  loading="lazy"
                  alt={bonus.title}
                  decoding="async"
                  height={1000}
                  src={bonus.img}
                  width={750}
                />
                <span className="num">{bonus.num}</span>
                <div>
                  <h3>{bonus.title}</h3>
                  <p>{bonus.desc}</p>
                  <p className="bonus-price">
                    <span><s>{bonus.price}</s></span>
                    <strong>GRATIS HOY</strong>
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="meta">Incluidos en tu biblioteca completa. Todos los materiales son digitales.</p>
        </section>

        {/* Section 7: Pricing / Offer */}
        <section className="soft" id="planes">
          <div className="wrap">
            <p className="eyebrow center">TODO INCLUIDO EN UN SOLO ACCESO</p>
            <h2 className="center">
              Tu biblioteca de los 72 Ángeles.<br />
              Guía principal + 8 bonos.
            </h2>
            <div className="pricing single-offer">
              <article className="plan featured">
                <div className="ribbon">BIBLIOTECA COMPLETA · GUÍA + 8 BONOS</div>
                <p className="eyebrow">ACCESO COMPLETO</p>
                <p className="price-reference">
                  8 bonos incluidos: <s>US$45</s> <strong>GRATIS HOY</strong>
                </p>
                <div className="price">US$9,90</div>
                <p style={{ fontSize: '13px', color: '#506575', marginTop: '-12px', marginBottom: '16px', fontWeight: 500 }}>
                  Convertido automáticamente a tu moneda local en el checkout
                </p>
                <p className="included-offer">Guía principal + los 8 bonos GRATIS HOY</p>
                <p>Todo reunido para comprender, consultar y estudiar los 72 Ángeles a tu ritmo.</p>
                <ul className="checks">
                  <li>Guía de 75 páginas con las 72 fichas</li>
                  <li>Virtudes, atributos y oraciones</li>
                  <li>Los 8 bonos digitales incluidos</li>
                  <li>Acceso inmediato tras aprobarse el pago</li>
                  <li>Garantía de 7 días</li>
                </ul>
                <h3>También recibes:</h3>
                <ul className="checks">
                  <li>Guía Rápida de Consulta <span className="bonus-label">(bono!)</span></li>
                  <li>Glosario Esencial de los 72 Ángeles <span className="bonus-label">(bono!)</span></li>
                  <li>Cómo Usar Mejor Esta Guía <span className="bonus-label">(bono!)</span></li>
                  <li>Hojas de Consulta Personal <span className="bonus-label">(bono!)</span></li>
                  <li>Mapa de Temas y Virtudes <span className="bonus-label">(bono!)</span></li>
                  <li>Plan de Estudio de 21 Días <span className="bonus-label">(bono!)</span></li>
                  <li>72 Tarjetas de Consulta Rápida <span className="bonus-label">(bono!)</span></li>
                  <li>Cuaderno de Intenciones y Reflexiones <span className="bonus-label">(bono!)</span></li>
                </ul>
                <a
                  className="button buy"
                  data-plan="Completo · US$9,90"
                  data-value="9.90"
                  href={getCheckoutUrl('6ng3km9t')}
                >
                  QUIERO LA BIBLIOTECA COMPLETA POR US$9,90
                </a>
                <p className="meta center">
                  Pago único · Sin mensualidades · Compra segura
                  <br />
                  <span style={{ color: '#687b8c', fontSize: '12px' }}>
                    (El valor se convierte automáticamente a la moneda de tu país)
                  </span>
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Section 8: Guarantee */}
        <section className="wrap guarantee">
          <img
            loading="lazy"
            alt="Garantía de 7 días"
            className="guarantee-image"
            decoding="async"
            height={700}
            src="/assets/guarantee.webp"
            width={700}
          />
          <div>
            <p className="eyebrow">COMPRA CON TRANQUILIDAD</p>
            <h2>Tienes 7 días para conocer el material.</h2>
            <p>
              Revisa el material con tranquilidad. Tu compra dispone de una garantía de 7 días, conforme a las condiciones de Hotmart.
            </p>
            <p className="meta">Acceso digital · Pago seguro · Garantía de 7 días</p>
          </div>
        </section>

        {/* Section 9: Audience Target */}
        <section className="soft">
          <div className="wrap">
            <h2>Este material puede ser para ti si…</h2>
            <ul className="checks audience">
              <li>Te interesa conocer los 72 Ángeles de la Cábala.</li>
              <li>Disfrutas de la espiritualidad, el simbolismo y la reflexión.</li>
              <li>Buscas una guía organizada en lugar de información dispersa.</li>
              <li>Prefieres explicaciones visuales y accesibles.</li>
              <li>Deseas explorar oraciones y virtudes a tu propio ritmo.</li>
              <li>Valoras una biblioteca digital que puedas consultar cuando quieras.</li>
            </ul>
            <p className="meta">
              No es para ti si buscas predicciones, promesas de acontecimientos sobrenaturales o garantías de que una oración producirá un resultado específico.
            </p>
          </div>
        </section>

        {/* Section 10: FAQ */}
        <section className="wrap faq">
          <p className="eyebrow">RESOLVEMOS TUS DUDAS</p>
          <h2>Preguntas frecuentes</h2>
          <details>
            <summary>¿Qué recibiré exactamente?</summary>
            <p>Recibirás la guía de 75 páginas con las 72 fichas y los ocho bonos digitales.</p>
          </details>
          <details>
            <summary>¿Necesito conocimientos previos de Cábala?</summary>
            <p>No. Puedes comenzar sin conocimientos previos.</p>
          </details>
          <details>
            <summary>¿Cómo sabré qué Ángel consultar?</summary>
            <p>Explora las virtudes y asociaciones de cada ficha según tu interés.</p>
          </details>
          <details>
            <summary>¿Necesito leer las 75 páginas en orden?</summary>
            <p>No. Puedes consultar fichas individuales según tus intereses.</p>
          </details>
          <details>
            <summary>¿Puedo utilizarla desde mi teléfono?</summary>
            <p>Sí. La guía es compatible con móvil, tablet y computadora.</p>
          </details>
          <details>
            <summary>¿Puedo imprimir el material?</summary>
            <p>Sí, para uso personal.</p>
          </details>
          <details>
            <summary>¿Es una suscripción mensual?</summary>
            <p>No. Es un pago único.</p>
          </details>
          <details>
            <summary>¿El contenido garantiza resultados espirituales?</summary>
            <p>No. Es material educativo, cultural y de reflexión personal.</p>
          </details>
          <details>
            <summary>¿Qué ocurre después de comprar?</summary>
            <p>Tras aprobarse el pago, recibirás las instrucciones de acceso.</p>
          </details>
          <details>
            <summary>¿Tengo garantía?</summary>
            <p>Sí. Dispones de 7 días, según las condiciones de la oferta y de Hotmart.</p>
          </details>
        </section>

        {/* Section 11: Closing */}
        <section className="navy closing">
          <div className="wrap">
            <p className="eyebrow">TU CAMINO DE ESTUDIO PUEDE COMENZAR HOY</p>
            <h2>
              Los 72 nombres ya están reunidos.<br />
              Solo falta que empieces a descubrirlos.
            </h2>
            <a className="button light" href="#planes">
              QUIERO MI BIBLIOTECA POR US$9,90
            </a>
            <p className="meta">Guía digital · Compra segura · Acceso inmediato</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="wrap">
        <a className="brand" href="#">
          Los 72 Ángeles <span>DE LA CÁBALA</span>
        </a>
        <div className="footer-links">
          <button type="button" onClick={() => setPolicyModal(POLICIES.terms)}>
            Términos de Uso
          </button>
          <button type="button" onClick={() => setPolicyModal(POLICIES.privacy)}>
            Política de Privacidad
          </button>
          <button type="button" onClick={() => setPolicyModal(POLICIES.contact)}>
            Contacto
          </button>
        </div>
        <p>
          Material digital destinado al estudio cultural, espiritual y la reflexión personal. Las correspondencias, nombres y transliteraciones pueden variar según las fuentes y tradiciones. No garantiza resultados sobrenaturales ni sustituye orientación médica, psicológica, legal o financiera.
        </p>
        <p>© 2026 Los 72 Ángeles de la Cábala.</p>
      </footer>

      {/* Sample Image Viewer Dialog */}
      {activeSampleIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#071d30ce',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setActiveSampleIndex(null)}
        >
          <div
            id="viewer"
            style={{
              position: 'relative',
              display: 'inline-block',
              maxWidth: '95vw',
              maxHeight: '92vh',
              padding: '40px 16px 16px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Cerrar imagen"
              className="close"
              style={{ cursor: 'pointer', zIndex: 10 }}
              onClick={() => setActiveSampleIndex(null)}
            >
              ×
            </button>

            {/* Navigation buttons */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '16px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                fontSize: '13px',
                color: 'var(--ink)',
                fontWeight: 600,
              }}
            >
              <span>{SAMPLES[activeSampleIndex].title}</span>
              <span style={{ color: 'var(--muted)', fontWeight: 400 }}>
                ({activeSampleIndex + 1} de {SAMPLES.length})
              </span>
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button
                type="button"
                aria-label="Anterior muestra"
                style={{
                  position: 'absolute',
                  left: '-14px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid var(--line)',
                  background: '#ffffff',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                  fontSize: '22px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ink)',
                  zIndex: 5,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSampleIndex((activeSampleIndex - 1 + SAMPLES.length) % SAMPLES.length);
                }}
              >
                ‹
              </button>

              <img
                alt={SAMPLES[activeSampleIndex].title}
                src={SAMPLES[activeSampleIndex].image}
                style={{
                  maxWidth: '85vw',
                  maxHeight: '78vh',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: '4px',
                }}
              />

              <button
                type="button"
                aria-label="Siguiente muestra"
                style={{
                  position: 'absolute',
                  right: '-14px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid var(--line)',
                  background: '#ffffff',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                  fontSize: '22px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ink)',
                  zIndex: 5,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSampleIndex((activeSampleIndex + 1) % SAMPLES.length);
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Policy Modal Notice */}
      {policyModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#071d30ce',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setPolicyModal(null)}
        >
          <div
            id="notice"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '35px',
              color: 'var(--ink)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Cerrar"
              className="close"
              style={{ cursor: 'pointer' }}
              onClick={() => setPolicyModal(null)}
            >
              ×
            </button>
            <h3 style={{ marginTop: 0, fontSize: '22px', color: 'var(--ink)' }}>{policyModal.title}</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--muted)', margin: '18px 0 24px' }}>
              {policyModal.text}
            </p>
            <button
              type="button"
              className="button dismiss"
              style={{ width: '100%' }}
              onClick={() => setPolicyModal(null)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Special Exit Offer Modal */}
      {showExitModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#071d30ce',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => {
            setShowExitModal(false);
            try { sessionStorage.setItem('angeles-exit-dismissed', 'true'); } catch {}
          }}
        >
          <div
            id="upgrade"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '540px',
              backgroundColor: '#fffdf8',
              borderRadius: '12px',
              padding: '35px',
              border: '2px solid #b38a3a',
              boxShadow: '0 20px 45px rgba(0,0,0,0.4)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Cerrar oferta"
              className="close"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowExitModal(false);
                try { sessionStorage.setItem('angeles-exit-dismissed', 'true'); } catch {}
              }}
            >
              ×
            </button>
            <p className="eyebrow" style={{ color: '#896724', letterSpacing: '2px', fontWeight: 700 }}>
              ¡ESPERA UN MOMENTO! OFERTA EXCLUSIVA
            </p>
            <h2 style={{ fontSize: '28px', margin: '10px 0 15px', color: 'var(--ink)' }}>
              ¿Te gustaría comenzar hoy por solo US$9,90?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '20px' }}>
              No queremos que te quedes sin tu biblioteca de los 72 Ángeles. Aprovecha esta oportunidad única de salida para llevarte la guía completa y los 8 bonos por un precio especial.
            </p>

            <div className="upgrade-price" style={{ fontSize: '46px', fontWeight: 'bold', color: '#896724', margin: '15px 0' }}>
              US$9,90
              <span style={{ fontSize: '13px', color: 'var(--muted)', display: 'block', fontWeight: 'normal' }}>
                Precio especial único · Acceso inmediato
              </span>
            </div>

            <a
              className="button"
              style={{
                display: 'block',
                background: '#8b692b',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '16px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
                marginTop: '20px',
              }}
              href={getCheckoutUrl('lgvnypg2')}
            >
              SÍ, QUIERO MI BIBLIOTECA POR US$9,90
            </a>

            <button
              type="button"
              className="decline-upgrade"
              style={{
                marginTop: '15px',
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                textDecoration: 'underline',
                fontSize: '13px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setShowExitModal(false);
                try { sessionStorage.setItem('angeles-exit-dismissed', 'true'); } catch {}
              }}
            >
              No gracias, prefiero la oferta estándar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
