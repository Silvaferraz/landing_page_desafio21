interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'accent'
}

const variants = {
  default: 'bg-[#FEA7EC] text-white border-[#FEA7EC]',
  primary: 'bg-[#FEA7EC] text-white border-[#FEA7EC]',
  accent: 'bg-[#FEA7EC] text-white border-[#FEA7EC]',
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
