interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'accent'
}

const variants = {
  default: 'bg-white/10 text-white border-white/20',
  primary: 'bg-deep-blue/50 text-sky-blue border-sky-blue/30',
  accent: 'bg-neon-green/90 text-white border-neon-green/30',
}

export default function Badge({
  children,
  className = '',
  variant = 'default',
}: BadgeProps) {
  return (
    <span
      className={`label-text inline-block rounded-full border px-4 py-1.5 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
