interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({
  title,
  subtitle,
  className = '',
  align = 'center',
}: SectionTitleProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === 'center' ? 'text-center' : 'text-left'
      } ${className}`}
    >
      <h2 className="heading-2">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl font-century text-lg text-sky-blue md:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
