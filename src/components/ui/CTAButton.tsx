interface CTAButtonProps {
  children: React.ReactNode
  href?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'default' | 'large'
}

const sizes = {
  small: 'px-6 py-3 text-sm',
  default: 'px-8 py-4 text-base',
  large: 'px-10 py-5 text-lg',
}

const focusVisible =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

const variants = {
  primary:
    `bg-gradient-cta text-white font-century font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-neon ${focusVisible} focus-visible:ring-neon-green focus-visible:ring-offset-dark-blue`,
  secondary:
    `bg-white/10 text-white font-century font-bold rounded-full border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 ${focusVisible} focus-visible:ring-white focus-visible:ring-offset-dark-blue`,
  outline:
    `bg-transparent text-neon-green font-century font-bold rounded-full border-2 border-neon-green transition-all duration-300 hover:bg-neon-green/10 hover:scale-105 ${focusVisible} focus-visible:ring-neon-green focus-visible:ring-offset-dark-blue`,
}

export default function CTAButton({
  children,
  href = '#',
  className = '',
  variant = 'primary',
  size = 'default',
}: CTAButtonProps) {
  const isExternal = href.startsWith('http')

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`touch-target inline-flex items-center justify-center ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  )
}
