import HeroSection from './components/sections/Hero'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { WorkSection } from './components/sections/WorkSection'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { NotFound } from './components/layout/NotFound'
import { site } from './data/site'

function Home() {


  return <>
    <Header />
    <main>
      <HeroSection site={site} />
      <WorkSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
    <Footer />
  </>
}

export default function App() {
  return window.location.pathname === '/' ? <Home /> : <NotFound />
}
