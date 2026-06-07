import Image from 'next/image'

export default function InscricaoPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark-blue">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg-lines1.webp"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          priority
        />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <Image
          src="/images/logo6.webp"
          alt="Desafio 21 dias por você"
          width={400}
          height={534}
          className="h-auto w-[300px] object-contain md:w-[400px]"
          sizes="(max-width: 768px) 300px, 400px"
          priority
        />
        <p className="font-aileron text-2xl font-black text-white md:text-4xl">
          Aguarde, mais informações em breve!
        </p>
      </div>
    </div>
  )
}
