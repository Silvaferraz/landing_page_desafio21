'use client'

import { motion } from 'framer-motion'
import { easeOut } from '@/lib/animations'

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { ease: easeOut, duration: 0.6 } },
}

export default function StaggerItem({
  children,
  className = '',
}: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
