'use client'

import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import type { StorySlide } from '../data/weddingData'
import { ShapedFrame, type ShapeKind } from './ui/ShapedFrame'

interface CarouselProps {
  slides: StorySlide[]
  label: string
  shape: ShapeKind
  className?: string
}

const EASE = [0.22, 1, 0.36, 1] as const

const imageVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction >= 0 ? '8%' : '-8%' }),
  center: { opacity: 1, x: '0%' },
  exit: (direction: number) => ({ opacity: 0, x: direction >= 0 ? '-8%' : '8%' }),
}

const navButton =
  'grid size-11 place-items-center border border-inv-gold text-inv-primary transition-colors hover:bg-inv-primary hover:text-inv-cream'

export function Carousel({ slides, label, shape, className = '' }: CarouselProps) {
  const [[index, direction], setPosition] = useState<[number, number]>([0, 0])
  const count = slides.length
  const slide = slides[index]

  const paginate = (step: number) => setPosition(([current]) => [(current + step + count) % count, step])
  const goTo = (target: number) => setPosition(([current]) => [target, target >= current ? 1 : -1])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      paginate(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      paginate(-1)
    }
  }

  const onDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) paginate(1)
    else if (info.offset.x > 60 || info.velocity.x > 400) paginate(-1)
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${className}`}
    >
      <ShapedFrame
        shape={shape}
        className="mx-auto aspect-[4/5] w-full max-w-md"
        fillClassName="relative overflow-hidden bg-inv-cream"
        lineClassName="text-inv-gold"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            draggable={false}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            className="absolute inset-0 size-full cursor-grab touch-pan-y object-cover select-none active:cursor-grabbing"
          />
        </AnimatePresence>
      </ShapedFrame>

      <div className="text-center md:text-left">
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Chapter {index + 1} of {count}: {slide.title}
        </p>
        <div className="min-h-[13rem] sm:min-h-[11rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.src}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <p className="eyebrow text-inv-gold-deep">{slide.date}</p>
              <h4 className="mt-3 font-display text-[clamp(1.8rem,5vw,2.6rem)] leading-tight text-inv-primary">
                {slide.title}
              </h4>
              <p className="mx-auto mt-4 max-w-md text-inv-brown-soft md:mx-0">{slide.caption}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 md:justify-start">
          <button type="button" onClick={() => paginate(-1)} aria-label="Previous chapter" className={navButton}>
            <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-1">
            {slides.map((item, itemIndex) => (
              <button
                key={item.src}
                type="button"
                onClick={() => goTo(itemIndex)}
                aria-label={`Chapter ${itemIndex + 1}: ${item.title}`}
                aria-current={itemIndex === index ? 'true' : undefined}
                className="grid size-7 place-items-center"
              >
                <span
                  aria-hidden="true"
                  className={`block size-2 rotate-45 border border-inv-primary transition-colors duration-300 ${
                    itemIndex === index ? 'bg-inv-primary' : 'bg-transparent'
                  }`}
                />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => paginate(1)} aria-label="Next chapter" className={navButton}>
            <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.5} />
          </button>
        </div>
        <p aria-hidden="true" className="tabular mt-4 text-xs tracking-[0.25em] text-inv-brown-soft">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}
