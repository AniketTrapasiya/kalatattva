'use client'

import { useScopedTradition } from '../context/TraditionContext'
import { Carousel } from './Carousel'
import { Mandala } from './ui/Ornaments'
import { DESIGN_SHAPES, ShapedFrame } from './ui/ShapedFrame'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function Couple() {
  const { wedding, nativeLang, design } = useScopedTradition()
  const shape = DESIGN_SHAPES[design.kind].portrait
  // Calligraphic scripts set narrow; bold display faces need more room per letter
  const narrowScript = design.kind === 'heritage' || design.kind === 'royal' || design.kind === 'zari'
  const { couple, story } = wedding
  const people = [couple.groom, couple.bride]

  return (
    <section id="couple" aria-labelledby="couple-title" className="paper relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading id="couple-title" eyebrow="The bride & groom" title="Two Hearts, One Journey" />

      <div className="mx-auto mt-16 grid max-w-5xl gap-16 md:grid-cols-2 md:gap-12">
        {people.map((person, index) => (
          <Reveal key={person.role} delay={index * 0.15}>
            <article aria-labelledby={`person-${index}`} className="text-center">
              <ShapedFrame
                shape={shape}
                className="mx-auto aspect-[4/5] w-full max-w-[19rem]"
                fillClassName="relative overflow-hidden bg-inv-cream"
                lineClassName="text-inv-gold"
                weight={design.kind === 'paithani' ? 6 : 1.4}
              >
                <Mandala className="absolute top-[44%] left-1/2 aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2 text-inv-gold/25" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-6">
                  <span
                    aria-hidden="true"
                    className="font-script leading-none text-inv-primary"
                    style={{ fontSize: `${Math.min(5.25, (narrowScript ? 34 : 24) / person.firstName.length).toFixed(2)}rem` }}
                  >
                    {person.firstName}
                  </span>
                  <span lang={nativeLang} className="mt-4 font-native text-inv-gold-deep">
                    {person.nativeName}
                  </span>
                </div>
              </ShapedFrame>
              <p className="eyebrow mt-8 text-inv-gold-deep">{person.role}</p>
              <h3 id={`person-${index}`} className="mt-2 font-display text-3xl text-inv-primary">
                {person.fullName}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-sm text-inv-brown-soft">
                {person.relation} <span className="text-inv-brown">{person.parents}</span>
              </p>
              <p className="eyebrow mt-2 text-[0.6rem] text-inv-gold-deep">{person.native}</p>
              <p className="mx-auto mt-5 max-w-sm text-inv-brown-soft">{person.bio}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-5xl sm:mt-32">
        <Reveal className="text-center">
          <p className="eyebrow text-inv-gold-deep">In chapters</p>
          <h3 className="mt-3 font-display text-[clamp(2rem,6vw,3rem)] text-inv-primary">Our Story</h3>
        </Reveal>
        <Reveal delay={0.1}>
          <Carousel slides={story} label="Our story" shape={shape} className="mt-12" />
        </Reveal>
      </div>
    </section>
  )
}
