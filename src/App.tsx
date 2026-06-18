import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './App.css'

type IllustrationName = 'torii' | 'sakura' | 'tea' | 'kpop'

function IconPlay({ title }: { title?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M8 6.6v6.8l6-3.4-6-3.4z"
        fill="currentColor"
        opacity="0.92"
      />
    </svg>
  )
}

function IconPause({ title }: { title?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M7.2 6.6v6.8M12.8 6.6v6.8"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.92"
      />
    </svg>
  )
}

function IconVolume({ muted, title }: { muted: boolean; title?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M9 6.6 6.8 8.4H5.4c-.8 0-1.4.6-1.4 1.4v.4c0 .8.6 1.4 1.4 1.4h1.4L9 13.4V6.6z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        opacity="0.92"
      />
      {muted ? (
        <path
          d="M12.2 8.2 15.2 11.2M15.2 8.2l-3 3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.92"
        />
      ) : (
        <>
          <path
            d="M12.3 8.1c.6.6.6 3.2 0 3.8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.92"
          />
          <path
            d="M13.8 6.8c1.5 1.5 1.5 4.9 0 6.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.7"
          />
        </>
      )}
    </svg>
  )
}

function ConfettiCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    let raf = 0
    let last = performance.now()

    const colors = [
      'rgba(167, 139, 250, 0.9)',
      'rgba(96, 165, 250, 0.9)',
      'rgba(241, 245, 249, 0.85)',
      'rgba(167, 139, 250, 0.65)',
      'rgba(96, 165, 250, 0.65)',
    ]

    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: -0.2 - Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.12,
      vy: 0.18 + Math.random() * 0.28,
      w: 6 + Math.random() * 10,
      h: 6 + Math.random() * 12,
      r: (Math.random() - 0.5) * 0.9,
      vr: (Math.random() - 0.5) * 0.06,
      c: colors[Math.floor(Math.random() * colors.length)]!,
    }))

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)

      for (const p of pieces) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.r += p.vr * dt

        const px = p.x * width
        const py = p.y * height

        ctx.save()
        ctx.translate(px, py)
        ctx.rotate(p.r)
        ctx.fillStyle = p.c
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()

        if (p.y > 1.25) {
          p.y = -0.2 - Math.random() * 0.8
          p.x = Math.random()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  )
}

function Illustration({ name, title }: { name: IllustrationName; title: string }) {
  if (name === 'kpop') {
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
          d="M118 236c48-74 98-104 154-104 72 0 132 40 176 120"
          stroke="rgba(226, 232, 240, 0.55)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M270 96c22 18 38 44 46 78"
          stroke="rgba(96, 165, 250, 0.6)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M238 102c-18 16-32 40-40 72"
          stroke="rgba(167, 139, 250, 0.62)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="M256 148v86"
          stroke="rgba(241, 245, 249, 0.78)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M230 150c0-16 12-28 28-28s28 12 28 28v22c0 16-12 28-28 28s-28-12-28-28v-22z"
          stroke="rgba(241, 245, 249, 0.58)"
          strokeWidth="1.6"
        />
        <path
          d="M240 154c0-10 8-18 18-18s18 8 18 18v14c0 10-8 18-18 18s-18-8-18-18v-14z"
          fill="rgba(96, 165, 250, 0.16)"
          stroke="rgba(96, 165, 250, 0.55)"
          strokeWidth="1.4"
        />

        <path
          d="M326 88l6 14 14 6-14 6-6 14-6-14-14-6 14-6 6-14z"
          fill="rgba(167, 139, 250, 0.24)"
          stroke="rgba(167, 139, 250, 0.78)"
          strokeWidth="1.2"
          opacity="0.95"
        />
        <path
          d="M170 114l5 12 12 5-12 5-5 12-5-12-12-5 12-5 5-12z"
          fill="rgba(96, 165, 250, 0.18)"
          stroke="rgba(96, 165, 250, 0.72)"
          strokeWidth="1.2"
          opacity="0.95"
        />
        <circle cx="356" cy="192" r="2.4" fill="rgba(241,245,249,0.72)" />
        <circle cx="192" cy="206" r="2.4" fill="rgba(241,245,249,0.62)" />
      </svg>
    )
  }

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
        <circle cx="394" cy="88" r="34" fill="rgba(96, 165, 250, 0.22)" />
        <circle cx="394" cy="88" r="34" stroke="rgba(96, 165, 250, 0.44)" />

        <path
          d="M108 246c54-72 98-96 152-96 70 0 124 32 170 98"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.55"
        />

        <path
          d="M240 194l20-26 20 26"
          stroke="rgba(226, 232, 240, 0.55)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M226 194h68"
          stroke="rgba(226, 232, 240, 0.34)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="M206 214h108"
          stroke="rgba(226, 232, 240, 0.4)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="M222 214v70M298 214v70"
          stroke="rgba(167, 139, 250, 0.78)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M208 214v70M312 214v70"
          stroke="rgba(96, 165, 250, 0.62)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M190 214h140"
          stroke="rgba(241, 245, 249, 0.84)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M178 204h164"
          stroke="rgba(241, 245, 249, 0.34)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M216 232h88"
          stroke="rgba(167, 139, 250, 0.5)"
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
          stroke="rgba(226, 232, 240, 0.55)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M146 206c22-8 42-16 62-24"
          stroke="rgba(167, 139, 250, 0.64)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M210 182c18-22 34-38 50-48"
          stroke="rgba(96, 165, 250, 0.56)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M262 134c32-20 70-26 114-18"
          stroke="rgba(226, 232, 240, 0.34)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="M196 176l6 10 11 2-11 2-6 10-6-10-11-2 11-2 6-10z"
          fill="rgba(167, 139, 250, 0.28)"
          stroke="rgba(167, 139, 250, 0.78)"
          strokeWidth="1.2"
          opacity="0.95"
        />
        <path
          d="M306 126l6 10 11 2-11 2-6 10-6-10-11-2 11-2 6-10z"
          fill="rgba(96, 165, 250, 0.24)"
          stroke="rgba(96, 165, 250, 0.72)"
          strokeWidth="1.2"
          opacity="0.95"
        />
        <path
          d="M388 146l5 9 10 2-10 2-5 9-5-9-10-2 10-2 5-9z"
          fill="rgba(226, 232, 240, 0.12)"
          stroke="rgba(226, 232, 240, 0.34)"
          strokeWidth="1.2"
          opacity="0.9"
        />

        <circle cx="172" cy="212" r="2.4" fill="rgba(241,245,249,0.78)" />
        <circle cx="410" cy="192" r="2.4" fill="rgba(241,245,249,0.68)" />
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
        stroke="rgba(226, 232, 240, 0.64)"
        strokeWidth="1.6"
      />
      <path
        d="M176 150h168v46c0 34-28 62-62 62h-44c-34 0-62-28-62-62v-46z"
        stroke="rgba(226, 232, 240, 0.7)"
        strokeWidth="1.6"
      />
      <path
        d="M344 164h18c16 0 28 12 28 28s-12 28-28 28h-18"
        stroke="rgba(96, 165, 250, 0.74)"
        strokeWidth="1.6"
      />
      <path
        d="M208 266h104"
        stroke="rgba(226, 232, 240, 0.34)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M244 150c0-18 10-30 20-40"
        stroke="rgba(241, 245, 249, 0.28)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M280 150c0-20 10-32 22-44"
        stroke="rgba(167, 139, 250, 0.4)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M314 150c0-18 10-30 20-40"
        stroke="rgba(241, 245, 249, 0.24)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M246 202c12 10 28 10 40 0"
        stroke="rgba(167, 139, 250, 0.76)"
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
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`
  const ytPlayerElementId = `${appId}-yt-player`
  const ytPlayerRef = useRef<unknown>(null)
  const [isYtReady, setIsYtReady] = useState(false)
  const [isYtPlaying, setIsYtPlaying] = useState(false)
  const [isYtMuted, setIsYtMuted] = useState(false)
  const initialVolumeRef = useRef(70)
  const [ytVolume, setYtVolume] = useState(initialVolumeRef.current)
  const [ytTitle, setYtTitle] = useState('')

  useEffect(() => {
    const w = window as unknown as {
      YT?: {
        Player: new (
          el: string,
          options: {
            height: string
            width: string
            videoId: string
            playerVars: Record<string, number>
            events: {
              onReady: () => void
              onStateChange: (e: { data: number }) => void
            }
          },
        ) => {
          playVideo: () => void
          pauseVideo: () => void
          isMuted: () => boolean
          mute: () => void
          unMute: () => void
          setVolume: (v: number) => void
          getVideoData: () => { title?: string }
          destroy: () => void
        }
        PlayerState: { PLAYING: number; PAUSED: number; ENDED: number }
      }
      onYouTubeIframeAPIReady?: () => void
    }

    let didCancel = false

    const ensureScript = () => {
      const existing = document.getElementById('yt-iframe-api')
      if (existing) return
      const s = document.createElement('script')
      s.id = 'yt-iframe-api'
      s.src = 'https://www.youtube.com/iframe_api'
      s.async = true
      document.head.appendChild(s)
    }

    const createPlayer = () => {
      if (didCancel) return
      if (!w.YT?.Player) return
      if (ytPlayerRef.current) return

      ytPlayerRef.current = new w.YT.Player(ytPlayerElementId, {
        height: '0',
        width: '0',
        videoId: youtubeVideoId,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            if (didCancel) return
            setIsYtReady(true)
            const p = ytPlayerRef.current as {
              setVolume: (v: number) => void
              isMuted: () => boolean
              getVideoData: () => { title?: string }
            }
            p.setVolume(initialVolumeRef.current)
            setYtVolume(initialVolumeRef.current)
            setIsYtMuted(p.isMuted())
            const title = p.getVideoData()?.title?.trim()
            if (title) setYtTitle(title)
          },
          onStateChange: (e) => {
            if (didCancel) return
            const state = e.data
            const playing = state === w.YT!.PlayerState.PLAYING
            setIsYtPlaying(playing)
            if (state === w.YT!.PlayerState.ENDED) setIsYtPlaying(false)
          },
        },
      })
    }

    const prevReady = w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady = () => {
      prevReady?.()
      createPlayer()
    }

    ensureScript()
    createPlayer()

    return () => {
      didCancel = true
      const p = ytPlayerRef.current as { destroy?: () => void } | null
      p?.destroy?.()
      ytPlayerRef.current = null
    }
  }, [ytPlayerElementId, youtubeVideoId])

  const togglePlay = () => {
    const p = ytPlayerRef.current as
      | { playVideo: () => void; pauseVideo: () => void }
      | null
    if (!p) return
    if (isYtPlaying) p.pauseVideo()
    else p.playVideo()
  }

  const toggleMute = () => {
    const p = ytPlayerRef.current as
      | { isMuted: () => boolean; mute: () => void; unMute: () => void }
      | null
    if (!p) return
    if (p.isMuted()) p.unMute()
    else p.mute()
    setIsYtMuted(p.isMuted())
  }

  const setVolume = (next: number) => {
    const clamped = Math.max(0, Math.min(100, next))
    setYtVolume(clamped)
    const p = ytPlayerRef.current as { setVolume: (v: number) => void } | null
    p?.setVolume(clamped)
  }

  const curiosities = useMemo(
    () => [
      {
        title: 'Soy de los que “ya casi”',
        body: 'Empiezo con “solo será un detalle” y cuando me doy cuenta ya tengo 12 pestañas abiertas y una versión 2.0 en la cabeza.',
      },
      {
        title: 'Me organizo… para desorganizarme mejor',
        body: 'Hago listas, pero también improviso. Me gusta tener un plan, aunque sea para romperlo con estilo.',
      },
      {
        title: 'Humor sutil, entrega inmediata',
        body: 'No siempre hago chistes. Pero cuando los hago, normalmente aparecen cuando menos lo esperas. Incluyéndome a mí.',
      },
      {
        title: 'Detalles > discursos',
        body: 'No soy de grandes declaraciones. Prefiero cosas pequeñas que se sientan bien hechas… como esta página (culpable).',
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
                  onClick={() => scrollToId('why')}
                >
                  ¿Por qué?
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

        <section className="section" aria-label="Algunas cosas que quiero que sepas">
          <div className="container">
            <motion.div
              className="sectionHeader"
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.35 }}
              transition={revealTransition}
            >
              <h2>Algunas cosas que quiero que sepas</h2>
              <p className="lead">
                Esto no es un “discurso”. Es más bien una nota en voz baja, pero
                clara.
              </p>
            </motion.div>

            <motion.div
              className="glass knowPanel"
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.25 }}
              transition={revealTransition}
            >
              <div className="knowGrid">
                <div className="knowText">
                  <p>
                    No espero que pensemos igual en todo. De hecho, sería bastante
                    aburrido.
                  </p>
                  <p>
                    Seguramente seguiremos teniendo gustos distintos, canciones que
                    al otro no le gustan, opiniones diferentes y alguna que otra
                    discusión sobre quién tiene razón.
                  </p>
                  <p>
                    Pero me gusta que tengas tus propias preferencias. No necesito
                    compartirlas todas para respetarlas.
                  </p>
                  <p>
                    Y aunque a veces puedas ser un poquito intensa defendiendo tus
                    puntos de vista, creo que eso también forma parte de lo que te
                    hace ser tú.
                  </p>
                </div>

                <div className="knowVisual" aria-hidden="true">
                  <div className="cultureBadges">
                    <div className="cultureBadge">K‑pop vibes</div>
                    <div className="cultureBadge">Japón</div>
                    <div className="cultureBadge">Corea</div>
                  </div>
                  <div className="glass illustrationPanel">
                    <Illustration
                      name="kpop"
                      title="Ilustración minimalista inspirada en música y cultura asiática"
                    />
                  </div>
                </div>
              </div>
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
                  Te dejé una canción{ytTitle ? `: “${ytTitle}”` : ''} 🎵 — vale la
                  pena escucharla mientras lees.
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
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <ConfettiCanvas active={isSurpriseOpen && !prefersReducedMotion} />
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
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
                  <div style={{ fontSize: 18, color: 'rgba(241, 245, 249, 0.92)' }}>
                    Fiorela, si llegaste hasta aquí, oficialmente mereces un premio.
                  </div>
                  <div style={{ marginTop: 10, color: 'rgba(226, 232, 240, 0.75)' }}>
                    Has desbloqueado un café imaginario premium ☕ (con refill infinito y
                    cero responsabilidades).
                  </div>
                </div>
                <div className="modalActions" style={{ gap: 10 }}>
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() =>
                      window.open(youtubeWatchUrl, '_blank', 'noopener,noreferrer')
                    }
                  >
                    Abrir canción
                  </button>
                  <button
                    type="button"
                    className="button primary"
                    onClick={() => setIsSurpriseOpen(false)}
                  >
                    Aceptar premio
                  </button>
                </div>
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
          <div id={ytPlayerElementId} className="ytHidden" />
          <div className="musicMeta">
            <div>
              <div className="musicStatus">
                {isYtReady
                  ? isYtPlaying
                    ? 'Reproduciendo'
                    : 'En pausa'
                  : 'Cargando…'}
              </div>
              {ytTitle ? (
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 12,
                    color: 'rgba(226, 232, 240, 0.78)',
                    maxWidth: 220,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={ytTitle}
                >
                  {ytTitle}
                </div>
              ) : null}
            </div>
            <a
              className="musicLink"
              href={youtubeWatchUrl}
              target="_blank"
              rel="noreferrer"
            >
              Abrir
            </a>
          </div>
          <div className="musicControls">
            <button
              type="button"
              className="musicControlButton"
              onClick={togglePlay}
              disabled={!isYtReady}
              aria-label={isYtPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isYtPlaying ? <IconPause title="Pausar" /> : <IconPlay title="Play" />}
            </button>
            <button
              type="button"
              className="musicControlButton"
              onClick={toggleMute}
              disabled={!isYtReady}
              aria-label={isYtMuted ? 'Activar sonido' : 'Silenciar'}
            >
              <IconVolume muted={isYtMuted} title={isYtMuted ? 'Sonido' : 'Mute'} />
            </button>
            <label className="musicVolume">
              <span className="musicVolumeLabel">Vol</span>
              <input
                className="musicVolumeRange"
                type="range"
                min={0}
                max={100}
                value={ytVolume}
                onChange={(e) => setVolume(e.currentTarget.valueAsNumber)}
                disabled={!isYtReady}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
