import type { Variants } from 'framer-motion'

export const easeOut = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { ease: easeOut, duration: 0.6 } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { ease: easeOut, duration: 0.6 } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { ease: easeOut, duration: 0.6 } },
}

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { ease: easeOut, duration: 0.6 } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { ease: easeOut, duration: 0.5 } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const animationVariants = {
  'fade-up': fadeUp,
  'fade-left': fadeLeft,
  'fade-right': fadeRight,
  'fade-scale': fadeScale,
  'fade-in': fadeIn,
} as const

export type AnimationVariant = keyof typeof animationVariants
