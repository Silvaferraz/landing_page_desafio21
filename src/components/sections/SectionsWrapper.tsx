export default function SectionsWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative overflow-hidden will-change-transform">
      {/* Fixed parallax background image — pre-promoted to GPU compositor */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg-lines1.webp)' }}
      />
      {/* Gradient overlay — fades to reveal parallax image in the middle */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-sky-blue/40 to-deep-blue/80" />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
