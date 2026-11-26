const Hero = ({
  title = 'Música del Tolima, canción a canción',
  subtitle = 'Descubre, publica y guarda las canciones que te mueven.',
}) => (
  <section className="bg-indigo-900 text-white rounded-2xl px-6 py-12 md:py-16 mb-8">
    <h1 className="text-3xl md:text-5xl font-bold max-w-2xl">{title}</h1>
    <p className="mt-4 text-lg text-indigo-100 max-w-xl">{subtitle}</p>
  </section>
)

export default Hero
