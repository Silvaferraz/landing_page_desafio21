'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { AnimationVariant } from '@/lib/animations'
import { animationVariants } from '@/lib/animations'

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  variant?: AnimationVariant
}

export default function StaggerItem({
  children,
  className = '',
  variant = 'fade-up',
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : animationVariants[variant]

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
