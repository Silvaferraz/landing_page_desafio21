interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'main'
}

export default function Container({
  children,
  className = '',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 ${className}`}
    >
      {children}
    </Tag>
  )
}
