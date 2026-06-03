'use client'

import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion'
import type { AnimationVariant } from '@/lib/animations'
import { animationVariants } from '@/lib/animations'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

function resolveVariants(
  variant: AnimationVariant,
  prefersReducedMotion: boolean | null,
  delay: number,
  duration?: number,
) {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    }
  }

  const base = animationVariants[variant]
  const visibleState = base.visible as TargetAndTransition

  return {
    hidden: base.hidden,
    visible: {
      ...visibleState,
      transition: {
        ...(visibleState.transition || {}),
        delay: delay > 0 ? delay : undefined,
        duration: duration ?? undefined,
      },
    },
  }
}

export default function AnimatedSection({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration,
  threshold = 0.1,
  once = true,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const variants = resolveVariants(variant, prefersReducedMotion, delay, duration)

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
