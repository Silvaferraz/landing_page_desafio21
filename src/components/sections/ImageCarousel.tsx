'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import Container from '@/components/ui/Container'

const IMAGES = [
  '/images/desafio1.webp',
  '/images/desafio2.webp',
  '/images/desafio3.webp',
]

interface ImageCarouselProps {
  images?: string[]
  id?: string
}

export default function ImageCarousel({
  images = IMAGES,
  id,
}: ImageCarouselProps) {
  const total = images.length
  const REPEAT = 3
  const extended = Array.from({ length: total * REPEAT }, (_, i) => images[i % total])

  const [current, setCurrent] = useState(0)
  const [slide, setSlide] = useState(total) // virtual index in extended array
  const [transition, setTransition] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [itemWidth, setItemWidth] = useState(0)
  const raf = useRef<number>(0)

  const realIndex = slide % total

  const measure = useCallback(() => {
    if (containerRef.current) {
      setItemWidth(containerRef.current.offsetWidth)
    }
  }, [])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [measure])

  const goTo = useCallback(
    (i: number) => {
      const diff = i - realIndex
      const newSlide = slide + diff
      setTransition(true)
      setSlide(newSlide)
      setCurrent(i)
    },
    [realIndex, slide],
  )

  const goNext = useCallback(() => {
    setTransition(true)
    setSlide((s) => s + 1)
    setCurrent((c) => (c + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setTransition(true)
    setSlide((s) => s - 1)
    setCurrent((c) => (c - 1 + total) % total)
  }, [total])

  const handleTransitionEnd = useCallback(() => {
    if (slide < total || slide >= total * (REPEAT - 1)) {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        setTransition(false)
        setSlide(total + (slide % total))
      })
    }
  }, [slide, total])

  const draggingRef = useRef(false)
  const dragStartX = useRef(0)
  const dragOffsetRef = useRef(0)
  const [dragOffset, setDragOffset] = useState(0)

  const onPointerDown = (clientX: number) => {
    draggingRef.current = true
    dragStartX.current = clientX
    dragOffsetRef.current = 0
    setDragOffset(0)
  }

  const onPointerMove = (clientX: number) => {
    if (!draggingRef.current) return
    dragOffsetRef.current = clientX - dragStartX.current
    setDragOffset(dragOffsetRef.current)
  }

  const onPointerUp = () => {
    if (!draggingRef.current) return
    draggingRef.current = false
    if (dragOffsetRef.current < -50) goNext()
    else if (dragOffsetRef.current > 50) goPrev()
    setDragOffset(0)
  }

  return (
    <section id={id} className="overflow-hidden py-16 md:py-24">
      <Container>
        <div className="relative mx-auto" ref={containerRef}>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 max-md:h-8 max-md:w-8"
            aria-label="Anterior"
          >
            <svg className="h-5 w-5 max-md:h-4 max-md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 max-md:h-8 max-md:w-8"
            aria-label="Próximo"
          >
            <svg className="h-5 w-5 max-md:h-4 max-md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="overflow-hidden select-none"
            onMouseDown={(e) => onPointerDown(e.clientX)}
            onMouseMove={(e) => onPointerMove(e.clientX)}
            onMouseUp={onPointerUp}
            onMouseLeave={() => { if (draggingRef.current) { draggingRef.current = false; setDragOffset(0) } }}
            onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
            onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
            onTouchEnd={onPointerUp}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(${-slide * itemWidth + dragOffset}px)`,
                transition: draggingRef.current || !transition ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                width: `${extended.length * itemWidth}px`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extended.map((src, i) => {
                const isVisible = Math.abs(i - slide) <= 1

                return (
                    <div
                      key={i}
                      className="shrink-0"
                      style={{ width: itemWidth, visibility: isVisible ? 'visible' : 'hidden' }}
                    >
                      <div
                        className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
                        style={{ height: `min(${itemWidth * 1.33}px, 80vh)`, maxHeight: '80vh' }}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes={`${itemWidth}px`}
                          priority={Math.abs(i - slide) < 3}
                        />
                      </div>
                    </div>
                )
              })}
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === realIndex
                    ? 'w-6 bg-neon-green'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
