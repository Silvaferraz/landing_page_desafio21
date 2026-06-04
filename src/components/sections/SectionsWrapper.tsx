export default function SectionsWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Static background image — GPU-friendly, no repaints on scroll */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg-lines1.webp)' }}
      />
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-sky-blue to-deep-blue" />
      {/* Content — GPU composited */}
      <div className="relative z-10 will-change-transform">{children}</div>
    </div>
  )
}
