import { ExploreWheel } from '@/components/explore-wheel'
import { Hero } from '@/components/hero'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ExploreWheel />
      </main>
      <SiteFooter />
    </>
  )
}
