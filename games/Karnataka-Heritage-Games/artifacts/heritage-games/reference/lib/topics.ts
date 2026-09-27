import type { Localized } from './languages'
import { topicTranslations, type TopicCopy, type TopicSlug } from './topic-translations'
export type { Lang, Localized } from './languages'

export type Highlight<Copy = Localized> = {
  name: Copy
  description: Copy
}

export type Topic<Copy = Localized> = {
  slug: TopicSlug
  image: string
  title: Copy
  tagline: Copy
  intro: Copy
  highlights: Highlight<Copy>[]
}

// Ordered clockwise starting from the top of the wheel.
const baseTopics: Topic<Pick<Localized, 'en' | 'kn'>>[] = [
  {
    slug: 'art',
    image: '/images/topics/art.png',
    title: { en: 'Art', kn: 'ಕಲೆ' },
    tagline: { en: 'Stone that breathes', kn: 'ಉಸಿರಾಡುವ ಶಿಲೆ' },
    intro: {
      en: 'From the lace-like soapstone of the Hoysalas to the silver-inlaid metal of Bidar, Karnataka has shaped stone, wood and metal into poetry for over a thousand years.',
      kn: 'ಹೊಯ್ಸಳರ ಸೂಕ್ಷ್ಮ ಶಿಲ್ಪಗಳಿಂದ ಬೀದರಿನ ಬೆಳ್ಳಿ ಕೆತ್ತನೆಯವರೆಗೆ, ಕರ್ನಾಟಕವು ಸಾವಿರ ವರ್ಷಗಳಿಂದ ಕಲ್ಲು, ಮರ ಮತ್ತು ಲೋಹವನ್ನು ಕಾವ್ಯವನ್ನಾಗಿಸಿದೆ.',
    },
    highlights: [
      {
        name: { en: 'Hoysala Sculpture', kn: 'ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆ' },
        description: {
          en: 'Intricately carved dancers and deities adorn the star-shaped temples of Belur and Halebidu.',
          kn: 'ಬೇಲೂರು ಮತ್ತು ಹಳೇಬೀಡಿನ ದೇವಾಲಯಗಳಲ್ಲಿ ಸೂಕ್ಷ್ಮವಾಗಿ ಕೆತ್ತಿದ ನರ್ತಕಿಯರು ಮತ್ತು ದೇವತೆಗಳು.',
        },
      },
      {
        name: { en: 'Bidriware', kn: 'ಬಿದರಿ ಕಲೆ' },
        description: {
          en: 'A 14th-century craft of inlaying pure silver into blackened zinc alloy, born in Bidar.',
          kn: 'ಕಪ್ಪು ಲೋಹದಲ್ಲಿ ಶುದ್ಧ ಬೆಳ್ಳಿಯನ್ನು ಕೂರಿಸುವ ಬೀದರಿನ ಹದಿನಾಲ್ಕನೇ ಶತಮಾನದ ಕಲೆ.',
        },
      },
      {
        name: { en: 'Rosewood Inlay', kn: 'ಮೈಸೂರು ಮರದ ಕೆತ್ತನೆ' },
        description: {
          en: 'Mysuru artisans set ivory-toned woods into dark rosewood to create royal panels and boxes.',
          kn: 'ಮೈಸೂರಿನ ಕುಶಲಕರ್ಮಿಗಳು ಬೀಟೆ ಮರದಲ್ಲಿ ಬಣ್ಣದ ಮರಗಳನ್ನು ಕೂರಿಸಿ ರಾಜಮನೆತನದ ಫಲಕಗಳನ್ನು ರಚಿಸುತ್ತಾರೆ.',
        },
      },
    ],
  },
  {
    slug: 'music',
    image: '/images/topics/music.png',
    title: { en: 'Music', kn: 'ಸಂಗೀತ' },
    tagline: { en: 'The cradle of Carnatic song', kn: 'ಕರ್ನಾಟಕ ಸಂಗೀತದ ತೊಟ್ಟಿಲು' },
    intro: {
      en: 'Karnataka is the rare land where both great classical traditions flourish — Carnatic in the south and Hindustani in the north — alongside the devotional songs of the Haridasas.',
      kn: 'ದಕ್ಷಿಣದಲ್ಲಿ ಕರ್ನಾಟಕ ಸಂಗೀತ, ಉತ್ತರದಲ್ಲಿ ಹಿಂದೂಸ್ತಾನಿ ಸಂಗೀತ ಮತ್ತು ಹರಿದಾಸರ ಭಕ್ತಿಗೀತೆಗಳು — ಎರಡೂ ಶಾಸ್ತ್ರೀಯ ಪರಂಪರೆಗಳು ಅರಳುವ ಅಪರೂಪದ ನಾಡು ಕರ್ನಾಟಕ.',
    },
    highlights: [
      {
        name: { en: 'Carnatic Music', kn: 'ಕರ್ನಾಟಕ ಸಂಗೀತ' },
        description: {
          en: 'Purandara Dasa, the father of Carnatic music, codified the lessons still taught today.',
          kn: 'ಕರ್ನಾಟಕ ಸಂಗೀತ ಪಿತಾಮಹ ಪುರಂದರ ದಾಸರು ರೂಪಿಸಿದ ಪಾಠಗಳನ್ನು ಇಂದಿಗೂ ಕಲಿಸಲಾಗುತ್ತದೆ.',
        },
      },
      {
        name: { en: 'Dharwad Gharana', kn: 'ಧಾರವಾಡ ಘರಾನಾ' },
        description: {
          en: 'Home to legends like Bhimsen Joshi and Gangubai Hangal of the Hindustani tradition.',
          kn: 'ಭೀಮಸೇನ ಜೋಶಿ ಮತ್ತು ಗಂಗೂಬಾಯಿ ಹಾನಗಲ್ ಅವರಂತಹ ಹಿಂದೂಸ್ತಾನಿ ದಿಗ್ಗಜರ ನೆಲೆ.',
        },
      },
      {
        name: { en: 'Janapada Geethe', kn: 'ಜಾನಪದ ಗೀತೆ' },
        description: {
          en: 'Folk songs sung in fields and festivals carry the stories of village life.',
          kn: 'ಹೊಲಗಳಲ್ಲಿ ಮತ್ತು ಹಬ್ಬಗಳಲ್ಲಿ ಹಾಡುವ ಜಾನಪದ ಗೀತೆಗಳು ಹಳ್ಳಿಯ ಬದುಕಿನ ಕಥೆ ಹೇಳುತ್ತವೆ.',
        },
      },
    ],
  },
  {
    slug: 'dance',
    image: '/images/topics/dance.png',
    title: { en: 'Dance', kn: 'ನೃತ್ಯ' },
    tagline: { en: 'Crowns, drums and midnight stages', kn: 'ಕಿರೀಟ, ಡೊಳ್ಳು ಮತ್ತು ರಾತ್ರಿಯ ರಂಗ' },
    intro: {
      en: 'Dance in Karnataka ranges from the all-night theatrical spectacle of Yakshagana to thundering drum dances performed by entire villages.',
      kn: 'ರಾತ್ರಿಯಿಡೀ ನಡೆಯುವ ಯಕ್ಷಗಾನದಿಂದ ಹಿಡಿದು ಊರಿಗೆ ಊರೇ ಸೇರಿ ಕುಣಿಯುವ ಡೊಳ್ಳು ಕುಣಿತದವರೆಗೆ ಕರ್ನಾಟಕದ ನೃತ್ಯ ವೈವಿಧ್ಯಮಯ.',
    },
    highlights: [
      {
        name: { en: 'Yakshagana', kn: 'ಯಕ್ಷಗಾನ' },
        description: {
          en: 'Epic tales performed with towering crowns, vivid make-up and live chande drums.',
          kn: 'ಎತ್ತರದ ಕಿರೀಟ, ಬಣ್ಣದ ವೇಷ ಮತ್ತು ಚಂಡೆಯ ನಾದದೊಂದಿಗೆ ಪುರಾಣ ಕಥೆಗಳ ಪ್ರದರ್ಶನ.',
        },
      },
      {
        name: { en: 'Dollu Kunitha', kn: 'ಡೊಳ್ಳು ಕುಣಿತ' },
        description: {
          en: 'A powerful drum dance of the Kuruba community, full of acrobatic leaps.',
          kn: 'ಕುರುಬ ಸಮುದಾಯದ ಶಕ್ತಿಶಾಲಿ ಡೊಳ್ಳು ನೃತ್ಯ, ಕಸರತ್ತಿನ ಜಿಗಿತಗಳಿಂದ ಕೂಡಿದೆ.',
        },
      },
      {
        name: { en: 'Kamsale', kn: 'ಕಂಸಾಳೆ' },
        description: {
          en: 'Devotees of Male Mahadeshwara dance while striking bronze cymbals in rhythm.',
          kn: 'ಮಲೆ ಮಹದೇಶ್ವರನ ಭಕ್ತರು ಕಂಚಿನ ತಾಳಗಳನ್ನು ಬಾರಿಸುತ್ತಾ ಮಾಡುವ ನೃತ್ಯ.',
        },
      },
    ],
  },
  {
    slug: 'paintings',
    image: '/images/topics/paintings.png',
    title: { en: 'Paintings', kn: 'ಚಿತ್ರಕಲೆ' },
    tagline: { en: 'Gold leaf and earth pigments', kn: 'ಚಿನ್ನದ ಹಾಳೆ ಮತ್ತು ನೈಸರ್ಗಿಕ ಬಣ್ಣ' },
    intro: {
      en: 'Patronised by the Wodeyars, Mysore painting glows with raised gesso and gold foil, while rural Chittara art is painted by women on the walls of their homes.',
      kn: 'ಒಡೆಯರ ಆಶ್ರಯದಲ್ಲಿ ಬೆಳೆದ ಮೈಸೂರು ಚಿತ್ರಕಲೆ ಚಿನ್ನದ ಹಾಳೆಯಿಂದ ಹೊಳೆಯುತ್ತದೆ; ಹಳ್ಳಿಗಳಲ್ಲಿ ಮಹಿಳೆಯರು ಮನೆಯ ಗೋಡೆಗಳ ಮೇಲೆ ಚಿತ್ತಾರ ಬಿಡಿಸುತ್ತಾರೆ.',
    },
    highlights: [
      {
        name: { en: 'Mysore Painting', kn: 'ಮೈಸೂರು ಚಿತ್ರಕಲೆ' },
        description: {
          en: 'Classical deity portraits with delicate lines, muted colours and real gold leaf.',
          kn: 'ಸೂಕ್ಷ್ಮ ರೇಖೆ, ಮೃದು ಬಣ್ಣ ಮತ್ತು ನಿಜವಾದ ಚಿನ್ನದ ಹಾಳೆಯೊಂದಿಗೆ ದೇವತೆಗಳ ಚಿತ್ರಗಳು.',
        },
      },
      {
        name: { en: 'Chittara Art', kn: 'ಚಿತ್ತಾರ ಕಲೆ' },
        description: {
          en: 'Geometric wall art of the Deewaru community in Shivamogga, made with natural pigments.',
          kn: 'ಶಿವಮೊಗ್ಗದ ದೀವರು ಸಮುದಾಯದ ನೈಸರ್ಗಿಕ ಬಣ್ಣಗಳ ಜ್ಯಾಮಿತೀಯ ಗೋಡೆ ಚಿತ್ರಕಲೆ.',
        },
      },
      {
        name: { en: 'Ganjifa Cards', kn: 'ಗಂಜೀಫಾ' },
        description: {
          en: 'Hand-painted circular playing cards once favoured in the Mysuru royal court.',
          kn: 'ಮೈಸೂರು ಅರಮನೆಯಲ್ಲಿ ಜನಪ್ರಿಯವಾಗಿದ್ದ ಕೈಯಿಂದ ಬಿಡಿಸಿದ ವೃತ್ತಾಕಾರದ ಆಟದ ಎಲೆಗಳು.',
        },
      },
    ],
  },
  {
    slug: 'attire',
    image: '/images/topics/attire.png',
    title: { en: 'Attire & Costumes', kn: 'ಉಡುಗೆ ತೊಡುಗೆ' },
    tagline: { en: 'Woven in silk and zari', kn: 'ರೇಷ್ಮೆ ಮತ್ತು ಜರಿಯಲ್ಲಿ ನೇಯ್ದದ್ದು' },
    intro: {
      en: 'Karnataka produces most of India’s mulberry silk. Its sarees, turbans and regional drapes tell the story of every district.',
      kn: 'ಭಾರತದ ಹೆಚ್ಚಿನ ಹಿಪ್ಪುನೇರಳೆ ರೇಷ್ಮೆ ಕರ್ನಾಟಕದಲ್ಲೇ ಉತ್ಪಾದನೆಯಾಗುತ್ತದೆ. ಇಲ್ಲಿನ ಸೀರೆ, ಪೇಟ ಮತ್ತು ಉಡುಗೆಗಳು ಪ್ರತಿ ಜಿಲ್ಲೆಯ ಕಥೆ ಹೇಳುತ್ತವೆ.',
    },
    highlights: [
      {
        name: { en: 'Mysore Silk', kn: 'ಮೈಸೂರು ರೇಷ್ಮೆ' },
        description: {
          en: 'Pure silk sarees with 100% gold zari, a GI-tagged treasure since the Wodeyar era.',
          kn: 'ಶುದ್ಧ ಚಿನ್ನದ ಜರಿಯ ರೇಷ್ಮೆ ಸೀರೆ, ಒಡೆಯರ ಕಾಲದಿಂದ ಬಂದ ಭೌಗೋಳಿಕ ಗುರುತಿನ ಸಂಪತ್ತು.',
        },
      },
      {
        name: { en: 'Ilkal Saree', kn: 'ಇಳಕಲ್ ಸೀರೆ' },
        description: {
          en: 'Handwoven in Bagalkot with a distinctive red pallu joined by the “tope teni” technique.',
          kn: 'ಬಾಗಲಕೋಟೆಯಲ್ಲಿ ಕೈಮಗ್ಗದಲ್ಲಿ ನೇಯ್ದ, ವಿಶಿಷ್ಟ ಕೆಂಪು ಸೆರಗಿನ ಸೀರೆ.',
        },
      },
      {
        name: { en: 'Mysore Peta', kn: 'ಮೈಸೂರು ಪೇಟ' },
        description: {
          en: 'The regal silk turban with gold borders, gifted to honour guests and scholars.',
          kn: 'ಅತಿಥಿಗಳು ಮತ್ತು ವಿದ್ವಾಂಸರನ್ನು ಗೌರವಿಸಲು ನೀಡುವ ಚಿನ್ನದ ಅಂಚಿನ ರಾಜಪೇಟ.',
        },
      },
    ],
  },
  {
    slug: 'toys',
    image: '/images/topics/toys.png',
    title: { en: 'Toys', kn: 'ಆಟಿಕೆಗಳು' },
    tagline: { en: 'The land of toys', kn: 'ಬೊಂಬೆಗಳ ನಾಡು' },
    intro: {
      en: 'Channapatna is called “Gombegala Ooru” — the town of toys. Lacquered wooden toys and painted dolls have delighted children here for centuries.',
      kn: 'ಚನ್ನಪಟ್ಟಣವನ್ನು “ಬೊಂಬೆಗಳ ಊರು” ಎನ್ನುತ್ತಾರೆ. ಮೆರುಗಿನ ಮರದ ಆಟಿಕೆಗಳು ಶತಮಾನಗಳಿಂದ ಮಕ್ಕಳನ್ನು ರಂಜಿಸಿವೆ.',
    },
    highlights: [
      {
        name: { en: 'Channapatna Toys', kn: 'ಚನ್ನಪಟ್ಟಣದ ಬೊಂಬೆಗಳು' },
        description: {
          en: 'Ivory-wood toys turned on a lathe and coloured with safe vegetable dyes.',
          kn: 'ಆಲೆ ಮರವನ್ನು ಕಡೆದು ಸಸ್ಯಜನ್ಯ ಬಣ್ಣಗಳಿಂದ ಮೆರುಗು ನೀಡಿದ ಆಟಿಕೆಗಳು.',
        },
      },
      {
        name: { en: 'Kinnal Craft', kn: 'ಕಿನ್ನಾಳ ಕಲೆ' },
        description: {
          en: 'Light wooden figures from Koppal, once made for the temples of Vijayanagara.',
          kn: 'ವಿಜಯನಗರದ ದೇವಾಲಯಗಳಿಗಾಗಿ ತಯಾರಿಸುತ್ತಿದ್ದ ಕೊಪ್ಪಳದ ಹಗುರ ಮರದ ಬೊಂಬೆಗಳು.',
        },
      },
      {
        name: { en: 'Bombe Habba', kn: 'ಬೊಂಬೆ ಹಬ್ಬ' },
        description: {
          en: 'During Dasara, families display tiers of dolls, including the royal Pattada Gombe pair.',
          kn: 'ದಸರಾದಲ್ಲಿ ಮನೆಗಳಲ್ಲಿ ಪಟ್ಟದ ಬೊಂಬೆಗಳೊಂದಿಗೆ ಬೊಂಬೆಗಳ ಸಾಲುಗಳನ್ನು ಜೋಡಿಸುತ್ತಾರೆ.',
        },
      },
    ],
  },
  {
    slug: 'monuments',
    image: '/images/topics/monuments.png',
    title: { en: 'Monuments & Temples', kn: 'ಸ್ಮಾರಕಗಳು ಮತ್ತು ದೇವಾಲಯಗಳು' },
    tagline: { en: 'Empires carved in granite', kn: 'ಶಿಲೆಯಲ್ಲಿ ಕೆತ್ತಿದ ಸಾಮ್ರಾಜ್ಯಗಳು' },
    intro: {
      en: 'Chalukyas, Hoysalas, Vijayanagara kings and the Wodeyars each left behind monuments — several now UNESCO World Heritage Sites.',
      kn: 'ಚಾಲುಕ್ಯರು, ಹೊಯ್ಸಳರು, ವಿಜಯನಗರದ ಅರಸರು ಮತ್ತು ಒಡೆಯರು ಬಿಟ್ಟುಹೋದ ಸ್ಮಾರಕಗಳಲ್ಲಿ ಹಲವು ಇಂದು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣಗಳು.',
    },
    highlights: [
      {
        name: { en: 'Hampi', kn: 'ಹಂಪಿ' },
        description: {
          en: 'Capital of the Vijayanagara Empire, famed for its stone chariot and musical pillars.',
          kn: 'ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಸಂಗೀತ ಕಂಬಗಳಿಗೆ ಹೆಸರಾದ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿ.',
        },
      },
      {
        name: { en: 'Belur & Halebidu', kn: 'ಬೇಲೂರು ಮತ್ತು ಹಳೇಬೀಡು' },
        description: {
          en: 'Hoysala masterpieces where every surface is covered in exquisite carving.',
          kn: 'ಪ್ರತಿಯೊಂದು ಮೇಲ್ಮೈಯೂ ಸುಂದರ ಕೆತ್ತನೆಯಿಂದ ತುಂಬಿರುವ ಹೊಯ್ಸಳ ಕಲಾಕೃತಿಗಳು.',
        },
      },
      {
        name: { en: 'Mysore Palace', kn: 'ಮೈಸೂರು ಅರಮನೆ' },
        description: {
          en: 'The Wodeyar seat, lit by nearly 100,000 bulbs on Sunday evenings and during Dasara.',
          kn: 'ಭಾನುವಾರ ಸಂಜೆ ಮತ್ತು ದಸರಾದಲ್ಲಿ ಸುಮಾರು ಒಂದು ಲಕ್ಷ ದೀಪಗಳಿಂದ ಬೆಳಗುವ ಒಡೆಯರ ಅರಮನೆ.',
        },
      },
    ],
  },
  {
    slug: 'festivals',
    image: '/images/topics/festivals.png',
    title: { en: 'Festivals', kn: 'ಹಬ್ಬಗಳು' },
    tagline: { en: 'A calendar full of celebration', kn: 'ಸಂಭ್ರಮದಿಂದ ತುಂಬಿದ ವರ್ಷ' },
    intro: {
      en: 'From the royal grandeur of Mysuru Dasara to buffalo races through coastal paddy fields, every season in Karnataka has its festival.',
      kn: 'ಮೈಸೂರು ದಸರಾದ ರಾಜವೈಭವದಿಂದ ಕರಾವಳಿಯ ಕಂಬಳದವರೆಗೆ, ಕರ್ನಾಟಕದ ಪ್ರತಿ ಋತುವಿಗೂ ಒಂದು ಹಬ್ಬ.',
    },
    highlights: [
      {
        name: { en: 'Mysuru Dasara', kn: 'ಮೈಸೂರು ದಸರಾ' },
        description: {
          en: 'The Nada Habba — ten days ending in the Jamboo Savari elephant procession.',
          kn: 'ನಾಡಹಬ್ಬ — ಜಂಬೂ ಸವಾರಿಯೊಂದಿಗೆ ಮುಕ್ತಾಯವಾಗುವ ಹತ್ತು ದಿನಗಳ ಉತ್ಸವ.',
        },
      },
      {
        name: { en: 'Ugadi', kn: 'ಯುಗಾದಿ' },
        description: {
          en: 'The Kannada new year, welcomed with bevu-bella — neem and jaggery for life’s bitter and sweet.',
          kn: 'ಬೇವು-ಬೆಲ್ಲದೊಂದಿಗೆ ಬದುಕಿನ ಕಹಿ-ಸಿಹಿಯನ್ನು ಸ್ವಾಗತಿಸುವ ಕನ್ನಡ ಹೊಸ ವರ್ಷ.',
        },
      },
      {
        name: { en: 'Kambala', kn: 'ಕಂಬಳ' },
        description: {
          en: 'Thrilling buffalo races in the slushy paddy fields of coastal Karnataka.',
          kn: 'ಕರಾವಳಿಯ ಕೆಸರು ಗದ್ದೆಗಳಲ್ಲಿ ನಡೆಯುವ ರೋಮಾಂಚಕ ಕೋಣಗಳ ಓಟ.',
        },
      },
    ],
  },
  {
    slug: 'food',
    image: '/images/topics/food.png',
    title: { en: 'Food', kn: 'ಆಹಾರ' },
    tagline: { en: 'Served on a banana leaf', kn: 'ಬಾಳೆ ಎಲೆಯ ಮೇಲಿನ ಊಟ' },
    intro: {
      en: 'Karnataka’s kitchens range from Udupi temple cuisine to fiery north Karnataka rotti oota — all best finished with a tumbler of filter coffee.',
      kn: 'ಉಡುಪಿಯ ದೇವಾಲಯದ ಅಡುಗೆಯಿಂದ ಉತ್ತರ ಕರ್ನಾಟಕದ ಖಾರದ ರೊಟ್ಟಿ ಊಟದವರೆಗೆ — ಕೊನೆಗೆ ಒಂದು ಲೋಟ ಫಿಲ್ಟರ್ ಕಾಫಿ.',
    },
    highlights: [
      {
        name: { en: 'Mysore Pak', kn: 'ಮೈಸೂರು ಪಾಕ್' },
        description: {
          en: 'A ghee-rich gram flour sweet first made in the kitchens of Mysore Palace.',
          kn: 'ಮೈಸೂರು ಅರಮನೆಯ ಅಡುಗೆಮನೆಯಲ್ಲಿ ಮೊದಲು ತಯಾರಾದ ತುಪ್ಪದ ಕಡಲೆಹಿಟ್ಟಿನ ಸಿಹಿ.',
        },
      },
      {
        name: { en: 'Bisi Bele Bath', kn: 'ಬಿಸಿಬೇಳೆ ಬಾತ್' },
        description: {
          en: 'Hot lentil rice spiced with a special masala, topped with ghee and boondi.',
          kn: 'ವಿಶೇಷ ಮಸಾಲೆಯ ಬಿಸಿ ಬೇಳೆ ಅನ್ನ, ತುಪ್ಪ ಮತ್ತು ಬೂಂದಿಯೊಂದಿಗೆ.',
        },
      },
      {
        name: { en: 'Filter Coffee', kn: 'ಫಿಲ್ಟರ್ ಕಾಫಿ' },
        description: {
          en: 'Chikkamagaluru coffee brewed strong and frothed between a tumbler and davara.',
          kn: 'ಚಿಕ್ಕಮಗಳೂರಿನ ಕಾಫಿ, ಲೋಟ ಮತ್ತು ದವರದ ನಡುವೆ ನೊರೆಗೊಳಿಸಿದ್ದು.',
        },
      },
    ],
  },
]

function translateCopy(base: Pick<Localized, 'en' | 'kn'>, slug: TopicSlug, select: (copy: TopicCopy) => string): Localized {
  const translations = topicTranslations[slug]
  return {
    ...base,
    ta: select(translations.ta),
    te: select(translations.te),
    hi: select(translations.hi),
    ml: select(translations.ml),
  }
}

export const topics: Topic[] = baseTopics.map((topic) => ({
  ...topic,
  title: translateCopy(topic.title, topic.slug, (copy) => copy[0]),
  tagline: translateCopy(topic.tagline, topic.slug, (copy) => copy[1]),
  intro: translateCopy(topic.intro, topic.slug, (copy) => copy[2]),
  highlights: topic.highlights.map((highlight, index) => ({
    name: translateCopy(highlight.name, topic.slug, (copy) => copy[3][index][0]),
    description: translateCopy(highlight.description, topic.slug, (copy) => copy[3][index][1]),
  })),
}))

export function getTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug)
}

export function getAdjacentTopics(slug: string) {
  const index = topics.findIndex((topic) => topic.slug === slug)
  const prev = topics[(index - 1 + topics.length) % topics.length]
  const next = topics[(index + 1) % topics.length]
  return { prev, next }
}
