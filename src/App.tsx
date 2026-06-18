import { useEffect, useId, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './App.css'

type IllustrationName = 'torii' | 'sakura' | 'tea'

function Illustration({ name, title }: { name: IllustrationName; title: string }) {
  if (name === 'torii') {
    return (
      <svg
        className="illustration"
        width="520"
        height="320"
        viewBox="0 0 520 320"
        role="img"
        aria-label={title}
        fill="none"
      >
        <circle cx="394" cy="88" r="34" fill="rgba(96, 165, 250, 0.14)" />
        <circle cx="394" cy="88" r="34" stroke="rgba(96, 165, 250, 0.28)" />

        <path
          d="M108 246c54-72 98-96 152-96 70 0 124 32 170 98"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.35"
        />

        <path
          d="M240 194l20-26 20 26"
          stroke="rgba(226, 232, 240, 0.35)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M226 194h68"
          stroke="rgba(226, 232, 240, 0.22)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="M206 214h108"
          stroke="rgba(226, 232, 240, 0.26)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="M222 214v70M298 214v70"
          stroke="rgba(167, 139, 250, 0.55)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M208 214v70M312 214v70"
          stroke="rgba(96, 165, 250, 0.42)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M190 214h140"
          stroke="rgba(241, 245, 249, 0.6)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M178 204h164"
          stroke="rgba(241, 245, 249, 0.22)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M216 232h88"
          stroke="rgba(167, 139, 250, 0.32)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (name === 'sakura') {
    return (
      <svg
        className="illustration"
        width="520"
        height="320"
        viewBox="0 0 520 320"
        role="img"
        aria-label={title}
        fill="none"
      >
        <path
          d="M118 218c44-70 92-96 150-96 74 0 132 38 178 112"
          stroke="rgba(226, 232, 240, 0.35)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M146 206c22-8 42-16 62-24"
          stroke="rgba(167, 139, 250, 0.42)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M210 182c18-22 34-38 50-48"
          stroke="rgba(96, 165, 250, 0.36)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M262 134c32-20 70-26 114-18"
          stroke="rgba(226, 232, 240, 0.22)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="M196 176l6 10 11 2-11 2-6 10-6-10-11-2 11-2 6-10z"
          fill="rgba(167, 139, 250, 0.18)"
          stroke="rgba(167, 139, 250, 0.55)"
          strokeWidth="1.2"
          opacity="0.95"
        />
        <path
          d="M306 126l6 10 11 2-11 2-6 10-6-10-11-2 11-2 6-10z"
          fill="rgba(96, 165, 250, 0.16)"
          stroke="rgba(96, 165, 250, 0.5)"
          strokeWidth="1.2"
          opacity="0.95"
        />
        <path
          d="M388 146l5 9 10 2-10 2-5 9-5-9-10-2 10-2 5-9z"
          fill="rgba(226, 232, 240, 0.08)"
          stroke="rgba(226, 232, 240, 0.22)"
          strokeWidth="1.2"
          opacity="0.9"
        />

        <circle cx="172" cy="212" r="2.4" fill="rgba(241,245,249,0.55)" />
        <circle cx="410" cy="192" r="2.4" fill="rgba(241,245,249,0.45)" />
      </svg>
    )
  }

  return (
    <svg
      className="illustration"
      width="520"
      height="320"
      viewBox="0 0 520 320"
      role="img"
      aria-label={title}
      fill="none"
    >
      <path
        d="M186 142c0-24 20-44 44-44h60c24 0 44 20 44 44v8h-148v-8z"
        stroke="rgba(226, 232, 240, 0.42)"
        strokeWidth="1.6"
      />
      <path
        d="M176 150h168v46c0 34-28 62-62 62h-44c-34 0-62-28-62-62v-46z"
        stroke="rgba(226, 232, 240, 0.46)"
        strokeWidth="1.6"
      />
      <path
        d="M344 164h18c16 0 28 12 28 28s-12 28-28 28h-18"
        stroke="rgba(96, 165, 250, 0.5)"
        strokeWidth="1.6"
      />
      <path
        d="M208 266h104"
        stroke="rgba(226, 232, 240, 0.22)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M244 150c0-18 10-30 20-40"
        stroke="rgba(241, 245, 249, 0.18)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M280 150c0-20 10-32 22-44"
        stroke="rgba(167, 139, 250, 0.26)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M314 150c0-18 10-30 20-40"
        stroke="rgba(241, 245, 249, 0.16)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M246 202c12 10 28 10 40 0"
        stroke="rgba(167, 139, 250, 0.5)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  )
}

function App() {
  const prefersReducedMotion = useReducedMotion()
  const [isIntroOpen, setIsIntroOpen] = useState(true)
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false)
  const [isMusicDockOpen, setIsMusicDockOpen] = useState(true)
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)
  const appId = useId()
  const personName = 'Fiorela'
  const youtubeVideoId = 'nXHfCacLpWY'
  const youtubeEmbedSrc = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=0&controls=1&rel=0&modestbranding=1&playsinline=1`

  const curiosities = useMemo(
    () => [
      {
  title: 'Me tomo mi tiempo',
  body: 'No suelo apresurar las cosas. Prefiero conocer a las personas poco a poco y dejar que todo encuentre su ritmo.'
},
{
  title: 'Pienso más de lo que parece',
  body: 'A veces puedo parecer frío o distante, pero normalmente estoy procesando más cosas de las que digo.'
},
{
  title: 'Las decisiones y yo',
  body: 'Hay días en los que decido algo en segundos y otros en los que puedo analizar demasiadas opciones antes de elegir.'
},
{
  title: 'No vivo pendiente de la opinión ajena',
  body: 'Escucho consejos cuando tienen sentido, pero intento tomar mis propias decisiones y hacerme responsable de ellas.'
},
    ],
    [],
  )

  const thingsILikeAboutYou = useMemo(
    () => [
      'Que escuchas de verdad, no solo “esperas tu turno” para responder.',
      'Tu forma de decir las cosas: directa, pero con tacto.',
      'Que tienes criterio (y aun así te permites cambiar de opinión).',
      'Tu sentido del humor cuando aparece de la nada.',
      'Que se nota que valoras tu tiempo… y también el de los demás.',
    ],
    [],
  )

  const faqs = useMemo(
    () => [
      {
        id: `${appId}-faq-1`,
        q: '¿Esto es una declaración de amor?',
        a: 'No. Es una demostración de “me importas lo suficiente como para hacer algo extra”, sin dramatismo.',
      },
      {
        id: `${appId}-faq-2`,
        q: '¿Es una declaración de interés?',
        a: 'Digamos que sí, en el sentido sano: me gusta conocerte, me caes muy bien, y me da curiosidad lo que viene.',
      },
      {
        id: `${appId}-faq-3`,
        q: '¿Me tomó más tiempo del que debería?',
        a: 'Definitivamente. Pero también fue divertido. Y, honestamente, era la excusa perfecta para hacerlo “bien”.',
      },
      {
        id: `${appId}-faq-4`,
        q: '¿Hay examen al final?',
        a: 'No, gracias. Solo existe el “aprobado” de sonreír un poquito y seguir con tu día.',
      },
    ],
    [appId],
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (isIntroOpen) setIsIntroOpen(false)
      else if (isSurpriseOpen) setIsSurpriseOpen(false)
    }

    if (!isSurpriseOpen && !isIntroOpen) return
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isSurpriseOpen, isIntroOpen])

  useEffect(() => {
    if (!isSurpriseOpen && !isIntroOpen) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [isSurpriseOpen, isIntroOpen])

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  const revealInitial = prefersReducedMotion ? false : { opacity: 0, y: 18 }
  const revealWhileInView = prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
  const revealTransition = prefersReducedMotion
    ? undefined
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbarInner">
          <div className="brand">
            <span className="brandDot" aria-hidden="true" />
            <span className="brandText">Para {personName}</span>
            <span className="brandPanda" aria-hidden="true">
              🐼
            </span>
          </div>
          <nav className="nav" aria-label="Secciones">
            <button
              type="button"
              className="navLink"
              onClick={() => scrollToId('why')}
            >
              Por qué
            </button>
            <button
              type="button"
              className="navLink"
              onClick={() => scrollToId('about')}
            >
              Sobre mí
            </button>
            <button
              type="button"
              className="navLink"
              onClick={() => scrollToId('faq')}
            >
              FAQ
            </button>
            <button
              type="button"
              className="navLink"
              onClick={() => setIsMusicDockOpen((v) => !v)}
            >
              Música
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="section hero" aria-label="Hero">
          <div className="container heroGrid">
            <motion.div
              className="heroCopy"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={revealTransition}
            >
              <div className="pill glass">
                Para {personName}. Sin presión. Con un poquito de diseño.
              </div>
              <h1 className="title">
                Una pequeña presentación para alguien que me cae muy
                bien
              </h1>
              <p className="subtitle">
                Porque enviar un mensaje era demasiado fácil
              </p>
              <div className="heroActions">
                <button
                  type="button"
                  className="button primary"
                  onClick={() => scrollToId('why')}
                >
                  Seguir leyendo
                </button>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => scrollToId('final')}
                >
                  Ir al final
                </button>
              </div>
            </motion.div>

            <motion.div
              className="heroVisual glass"
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={revealTransition}
            >
              <div className="heroVisualInner">
                <div className="sparkle" aria-hidden="true" />
                <motion.div
                  className="heroIllustration"
                  aria-hidden="true"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { y: [-2, 2, -2], opacity: [0.9, 1, 0.9] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 5.2, ease: 'easeInOut', repeat: Infinity }
                  }
                >
                  <Illustration
                    name="torii"
                    title="Ilustración decorativa"
                  />
                </motion.div>
                <div className="heroStat">
                  <div className="heroStatLabel">Tiempo invertido</div>
                  <div className="heroStatValue">más del necesario</div>
                </div>
                <div className="heroStat">
                  <div className="heroStatLabel">Objetivo</div>
                  <div className="heroStatValue">hacerte sonreir</div>
                </div>
                <div className="heroStat">
                  <div className="heroStatLabel">Nivel de verguenza</div>
                  <div className="heroStatValue">aceptable</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="why" className="section" aria-label="Por qué existe">
          <div className="container">
            <motion.div
              className="sectionHeader"
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.35 }}
              transition={revealTransition}
            >
              <h2>¿Por qué existe esta página?</h2>
              <p className="lead">
                Porque tenía algo que decir y esta fue la idea que se me ocurrió.
              </p>
            </motion.div>

            <motion.div
              className="illustrationRow"
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.25 }}
              transition={revealTransition}
            >
              <div className="glass illustrationPanel">
                <Illustration
                  name="sakura"
                  title="Ilustración minimalista inspirada en Japón y Corea"
                />
              </div>
            </motion.div>

            <motion.div
              className="glass callout"
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.25 }}
              transition={revealTransition}
            >
              <p>
               Esto no tiene un objetivo oculto. Solo quería hacer algo diferente, con un poco de humor, para decir algo bastante simple: me agrada hablar contigo.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="about" className="section" aria-label="Sobre mí">
          <div className="container">
            <motion.div
              className="sectionHeader"
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.35 }}
              transition={revealTransition}
            >
              <h2>Información que nadie pidió.</h2>
              <p className="lead">
                Pero ya que llegaste hasta aquí, aprovechemos.
              </p>
            </motion.div>

            <div className="cardsGrid">
              {curiosities.map((c, idx) => (
                <motion.article
                  key={c.title}
                  className="glass card"
                  initial={revealInitial}
                  whileInView={revealWhileInView}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    ...revealTransition,
                    delay: prefersReducedMotion ? 0 : idx * 0.06,
                  }}
                >
                  <h3 className="cardTitle">{c.title}</h3>
                  <p className="cardBody">{c.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-label="Cosas que me gustan de ti">
          <div className="container">
            <motion.div
              className="sectionHeader"
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.35 }}
              transition={revealTransition}
            >
              <h2>Algunas cosas que me gustan de ti</h2>
              <p className="lead">
                Sin exagerar, sin cursilerías, y sin convertir esto en un poema.
              </p>
            </motion.div>

            <motion.div
              className="glass listPanel"
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.25 }}
              transition={revealTransition}
            >
              <ul className="elegantList">
                {thingsILikeAboutYou.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section id="faq" className="section" aria-label="Preguntas frecuentes">
          <div className="container">
            <motion.div
              className="sectionHeader"
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.35 }}
              transition={revealTransition}
            >
              <h2>Preguntas frecuentes</h2>
              <p className="lead">
                Transparencia ante todo: sí, me adelanté a las preguntas.
              </p>
            </motion.div>

            <div className="accordion">
              {faqs.map((item) => {
                const isOpen = openFaqId === item.id
                return (
                  <div key={item.id} className="glass accordionItem">
                    <button
                      type="button"
                      className="accordionTrigger"
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-panel`}
                      onClick={() =>
                        setOpenFaqId((curr) => (curr === item.id ? null : item.id))
                      }
                    >
                      <span className="accordionQ">{item.q}</span>
                      <span className="accordionIcon" aria-hidden="true">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M5.5 8l4.5 4.5L14.5 8"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`${item.id}-panel`}
                          className="accordionPanel"
                          initial={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                          animate={prefersReducedMotion ? undefined : { height: 'auto', opacity: 1 }}
                          exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={
                            prefersReducedMotion
                              ? undefined
                              : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }
                          }
                        >
                          <div className="accordionA">{item.a}</div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="final" className="section final" aria-label="Mensaje final">
          <div className="container">
            <motion.div
              className="glass finalPanel"
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.3 }}
              transition={revealTransition}
            >
              <h2>Mensaje final</h2>
              <p className="lead">
                Me gusta la idea de seguir conociéndote, sin prisa y sin ponerle
                etiquetas raras. Solo disfrutando el proceso, con calma y buena
                vibra.
              </p>
              <div className="finalIllustration" aria-hidden="true">
                <Illustration
                  name="tea"
                  title="Ilustración minimalista inspirada en una taza de té"
                />
              </div>
              <div className="finalActions">
                <button
                  type="button"
                  className="button primary"
                  onClick={() => setIsSurpriseOpen(true)}
                >
                  Botón sorpresa
                </button>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => scrollToId('why')}
                >
                  Volver arriba
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <div className="footerLine" aria-hidden="true" />
          <p className="footerText">
            Hecho para {personName}. Con cariño, pero sin exagerar.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {isIntroOpen ? (
          <motion.div
            className="modalOverlay"
            initial={prefersReducedMotion ? undefined : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.2 }}
            role="presentation"
            onClick={() => setIsIntroOpen(false)}
          >
            <motion.div
              className="glass modal introModal"
              role="dialog"
              aria-modal="true"
              aria-label="Antes de empezar"
              initial={
                prefersReducedMotion ? undefined : { y: 14, opacity: 0, scale: 0.98 }
              }
              animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1, scale: 1 }}
              exit={
                prefersReducedMotion ? undefined : { y: 14, opacity: 0, scale: 0.98 }
              }
              transition={revealTransition}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modalHeader">
                <div className="modalTitle">Antes de empezar...</div>
                <button
                  type="button"
                  className="iconButton"
                  aria-label="Cerrar"
                  onClick={() => setIsIntroOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M6 6l8 8M14 6l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="introBody">
                <p className="introLead">
                  Por si te apetece, abajo tienes un reproductor para acompañar el
                  scroll.
                </p>
              </div>

              <div className="modalActions introActions">
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setIsMusicDockOpen(true)}
                >
                  Ver reproductor
                </button>
                <button
                  type="button"
                  className="button primary"
                  onClick={() => setIsIntroOpen(false)}
                >
                  Empezar
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isSurpriseOpen ? (
          <motion.div
            className="modalOverlay"
            initial={prefersReducedMotion ? undefined : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.2 }}
            role="presentation"
            onClick={() => setIsSurpriseOpen(false)}
          >
            <motion.div
              className="glass modal"
              role="dialog"
              aria-modal="true"
              aria-label="Sorpresa"
              initial={prefersReducedMotion ? undefined : { y: 14, opacity: 0, scale: 0.98 }}
              animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { y: 14, opacity: 0, scale: 0.98 }}
              transition={revealTransition}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modalHeader">
                <div className="modalTitle">Sorpresa desbloqueada</div>
                <button
                  type="button"
                  className="iconButton"
                  aria-label="Cerrar"
                  onClick={() => setIsSurpriseOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M6 6l8 8M14 6l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="modalBody">
                Has desbloqueado un café imaginario ☕
              </div>
              <div className="modalActions">
                <button
                  type="button"
                  className="button primary"
                  onClick={() => setIsSurpriseOpen(false)}
                >
                  Lo acepto con honor
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className={`musicDock ${isMusicDockOpen ? 'isOpen' : 'isClosed'}`}
        aria-label="Reproductor"
      >
        <div className="musicDockHeader">
          <div className="musicDockTitle">Música</div>
          <div className="musicDockActions">
            <button
              type="button"
              className="iconButton"
              aria-label={isMusicDockOpen ? 'Minimizar' : 'Expandir'}
              onClick={() => setIsMusicDockOpen((v) => !v)}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M6 12l4-4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="musicDockBody">
          <iframe
            className="musicFrame"
            src={youtubeEmbedSrc}
            title="Reproductor de YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default App
