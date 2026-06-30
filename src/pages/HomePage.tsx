import HomeHero from '../sections/home/HomeHero'
import WhyChooseUs from '../sections/home/WhyChooseUs'
import ProductsShowcase from '../sections/home/ProductsShowcase'
import ParallaxField from '../sections/home/ParallaxField'
import StatsBar from '../sections/home/StatsBar'
import Testimonials from '../sections/home/Testimonials'
import ArticlesPreview from '../sections/home/ArticlesPreview'
import ContactCTA from '../sections/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhyChooseUs />
      <ProductsShowcase />
      <ParallaxField />
      <StatsBar />
      <Testimonials />
      <ArticlesPreview />
      <ContactCTA />
    </>
  )
}
