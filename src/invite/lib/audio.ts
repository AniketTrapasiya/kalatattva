export interface AmbientAudio {
  start: () => Promise<void>
  stop: () => void
}

/** Loops a music file from /public with gentle fades */
export function createFileAudio(src: string): AmbientAudio {
  const audio = new Audio(src)
  audio.loop = true
  audio.preload = 'none'
  let fade: number | undefined

  const rampTo = (target: number, onDone?: () => void) => {
    window.clearInterval(fade)
    fade = window.setInterval(() => {
      const next = audio.volume + (target > audio.volume ? 0.05 : -0.05)
      audio.volume = Math.min(1, Math.max(0, next))
      if (Math.abs(audio.volume - target) < 0.05) {
        audio.volume = target
        window.clearInterval(fade)
        onDone?.()
      }
    }, 60)
  }

  return {
    async start() {
      audio.volume = 0
      await audio.play()
      rampTo(0.7)
    },
    stop() {
      rampTo(0, () => audio.pause())
    },
  }
}

/**
 * A soft tanpura drone synthesised with the Web Audio API, so the site has
 * ambient music without shipping an audio file. Cycle: Pa · Sa · Sa · low Sa.
 */
export function createTanpura(): AmbientAudio {
  const SA = 138.59 // C#3
  const cycle = [SA * 0.75, SA, SA, SA * 0.5]
  const gap = 1.2

  let ctx: AudioContext | null = null
  let master: GainNode | null = null
  let timer: number | undefined
  let nextTime = 0
  let step = 0
  let playing = false

  const pluck = (audio: AudioContext, out: AudioNode, frequency: number, when: number) => {
    for (let n = 1; n <= 8; n += 1) {
      const osc = audio.createOscillator()
      const gain = audio.createGain()
      osc.frequency.value = frequency * n * (1 + (n - 1) * 0.0004)
      osc.detune.value = (Math.random() - 0.5) * 6
      const peak = 0.14 / Math.pow(n, 1.1)
      gain.gain.setValueAtTime(0.0001, when)
      // Upper partials bloom a moment after the pluck — the "jawari" shimmer
      if (n > 2) {
        gain.gain.linearRampToValueAtTime(peak * 0.3, when + 0.02)
        gain.gain.linearRampToValueAtTime(peak, when + 0.25 + n * 0.06)
      } else {
        gain.gain.linearRampToValueAtTime(peak, when + 0.02)
      }
      gain.gain.exponentialRampToValueAtTime(0.0001, when + 4.4)
      osc.connect(gain).connect(out)
      osc.start(when)
      osc.stop(when + 4.5)
    }
  }

  const schedule = () => {
    if (!ctx || !master) return
    // Generous look-ahead keeps the drone steady when timers are throttled in background tabs
    while (nextTime < ctx.currentTime + 1.5) {
      const position = step % cycle.length
      pluck(ctx, master, cycle[position], nextTime)
      nextTime += position === cycle.length - 1 ? gap * 1.6 : gap
      step += 1
    }
  }

  return {
    async start() {
      if (!ctx) {
        ctx = new AudioContext()
        master = ctx.createGain()
        master.gain.value = 0
        const tone = ctx.createBiquadFilter()
        tone.type = 'lowpass'
        tone.frequency.value = 2400
        const delay = ctx.createDelay(1)
        delay.delayTime.value = 0.31
        const feedback = ctx.createGain()
        feedback.gain.value = 0.3
        const wet = ctx.createGain()
        wet.gain.value = 0.35
        master.connect(tone)
        tone.connect(ctx.destination)
        tone.connect(delay)
        delay.connect(feedback).connect(delay)
        delay.connect(wet).connect(ctx.destination)
      }
      await ctx.resume()
      playing = true
      const now = ctx.currentTime
      master!.gain.cancelScheduledValues(now)
      master!.gain.setValueAtTime(master!.gain.value, now)
      master!.gain.linearRampToValueAtTime(0.6, now + 1.5)
      nextTime = Math.max(nextTime, now + 0.05)
      window.clearInterval(timer)
      timer = window.setInterval(schedule, 250)
      schedule()
    },
    stop() {
      if (!ctx || !master) return
      playing = false
      window.clearInterval(timer)
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0, now + 0.8)
      const context = ctx
      window.setTimeout(() => {
        if (!playing) {
          void context.suspend()
          nextTime = 0
        }
      }, 1000)
    },
  }
}
