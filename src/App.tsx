import HeroSection from './components/sections/Hero/Hero'
import { AboutSection } from './components/sections/About/About'
import { ContactSection } from './components/sections/Contact/Contact'
import { SkillsSection } from './components/sections/Skills/Skills'
import { WorkSection } from './components/sections/Projects/Projects'
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
