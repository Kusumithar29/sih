import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { isLanguage } from '@/lib/languages'
import { ReadAloud } from '@/components/read-aloud'
import { Cinzel, Inter, Noto_Sans_Kannada, Noto_Sans_Tamil, Noto_Sans_Telugu, Noto_Sans_Devanagari, Noto_Sans_Malayalam } from 'next/font/google'
import { LanguageProvider } from '@/components/providers/language-provider'
import { PinwheelTransitionProvider } from '@/components/providers/pinwheel-transition'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cinzel' })
const kannada = Noto_Sans_Kannada({ subsets: ['kannada'], weight: ['400', '700'], variable: '--font-kannada' })
const tamil = Noto_Sans_Tamil({ subsets: ['tamil'], weight: ['400', '700'], variable: '--font-tamil', preload: false })
const telugu = Noto_Sans_Telugu({ subsets: ['telugu'], weight: ['400', '700'], variable: '--font-telugu', preload: false })
const hindi = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '700'], variable: '--font-hindi', preload: false })
const malayalam = Noto_Sans_Malayalam({ subsets: ['malayalam'], weight: ['400', '700'], variable: '--font-malayalam', preload: false })

export const metadata: Metadata = {
  title: 'Karunadu — Explore Karnataka',
  description:
    'Explore Karnataka’s art, music, dance, paintings, attire, toys, monuments, festivals and food in English, Kannada, Tamil, Telugu, Hindi and Malayalam, with selected-text read aloud.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFF4D6',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const savedLanguage = (await cookies()).get('karunadu-lang')?.value
  const initialLanguage = isLanguage(savedLanguage) ? savedLanguage : 'en'
  return (
    <html lang={initialLanguage} className={`light ${inter.variable} ${cinzel.variable} ${kannada.variable} ${tamil.variable} ${telugu.variable} ${hindi.variable} ${malayalam.variable}`}>
      <body className="pb-72 font-sans antialiased sm:pb-40">
        <LanguageProvider initialLanguage={initialLanguage}>
          <PinwheelTransitionProvider>{children}</PinwheelTransitionProvider>
          <ReadAloud />
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
