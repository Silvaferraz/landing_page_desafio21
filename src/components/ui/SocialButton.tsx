interface SocialButtonProps {
  href: string
  label: string
  className?: string
}

export default function SocialButton({
  href,
  label,
  className = '',
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`touch-target inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-century font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 ${className}`}
      aria-label={label}
    >
      {label}
    </a>
  )
}
