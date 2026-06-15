'use client'

import { useState, useCallback, useRef } from 'react'
import Image from 'next/image'

const images = [
  '/images/depoimentos/depo1.webp',
  '/images/depoimentos/depo2.webp',
  '/images/depoimentos/depo3.webp',
  '/images/depoimentos/depo4.webp',
]

export default function DepoimentoCarrossel() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)
  const touchX = useRef(0)

  const goTo = useCallback((i: number) => {
    setCurrent((i + images.length) % images.length)
  }, [])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
  }

  return (
    <div className="w-full">
      <div className="text-center">
        <button
          onClick={() => setOpen(!open)}
          className="text-sm text-white/50 underline underline-offset-2 transition-colors hover:text-white/80"
        >
          {open ? 'Ocultar depoimentos' : 'Ver depoimentos de ex participantes'}
        </button>
      </div>

      {open && (
        <div className="mt-6">
          <div className="relative mx-auto max-w-sm">
            <div
              className="overflow-hidden rounded-2xl"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {images.map((src, i) => (
                  <div key={i} className="relative w-full shrink-0">
                    <Image
                      src={src}
                      alt={`Depoimento ${i + 1}`}
                      width={400}
                      height={600}
                      className="h-auto w-full"
                      priority={i === current}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prev}
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              aria-label="Anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            <button
              onClick={next}
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              aria-label="Próximo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? 'w-6 bg-white' : 'w-2 bg-white/40'
                }`}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
