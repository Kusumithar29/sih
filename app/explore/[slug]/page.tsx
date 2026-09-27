import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TopicView } from '@/components/topic-view'
import { getTopic, topics } from '@/lib/topics'

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }))
}

export async function generateMetadata({ params }: PageProps<'/explore/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) return {}
  return {
    title: `${topic.title.en} of Karnataka | Karunadu`,
    description: topic.intro.en,
  }
}

export default async function TopicPage({ params }: PageProps<'/explore/[slug]'>) {
  const { slug } = await params
  if (!getTopic(slug)) notFound()

  return (
    <>
      <SiteHeader />
      <main>
        <TopicView slug={slug} />
      </main>
      <SiteFooter />
    </>
  )
}
