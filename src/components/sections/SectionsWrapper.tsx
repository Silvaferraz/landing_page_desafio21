export default function SectionsWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Fixed parallax background image — clipped to wrapper */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(/images/hero-bg-lines1)' }}
      />
      {/* Gradient overlay — white → sky-blue → deep-blue */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-sky-blue/85 to-deep-blue/95" />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
