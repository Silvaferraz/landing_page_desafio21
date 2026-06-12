'use client'

import { useState } from 'react'

interface YouTubeEmbedProps {
  videoId: string
  title?: string
  className?: string
}

export default function YouTubeEmbed({
  videoId,
  title = 'Vídeo',
  className = '',
}: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl shadow-blue ${className}`}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-blue/50">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-neon-green border-t-transparent" />
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`h-full w-full ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
