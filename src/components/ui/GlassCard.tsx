interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'glass-light'
}

export default function GlassCard({
  children,
  className = '',
  variant = 'glass',
}: GlassCardProps) {
  return (
    <div
      className={`${
        variant === 'glass' ? 'glass' : 'glass-light'
      } rounded-2xl p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  )
}
