'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  threshold?: number
}

export default function StaggerContainer({
  children,
  className = '',
  threshold = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
