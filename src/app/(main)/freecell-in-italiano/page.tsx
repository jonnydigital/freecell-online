import Link from "@/components/NetworkLink";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor } from "@/lib/routeOwnership";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import {
  CardSection,
  ContentBody,
  ContentLinkCard,
  CtaSection,
  JsonLd,
  SectionHeading,
} from "@/components/content";

const PAGE_PATH = "/freecell-in-italiano";
const PLAY_PATH = "/freecell-in-italiano/gioca";

export const metadata: Metadata = {
  title: "FreeCell in Italiano | Gioca Gratis e Impara le Regole",
  description:
    "Gioca a FreeCell gratis online e impara le regole in italiano: obiettivo, mosse legali, celle libere, basi e consigli per iniziare.",
  keywords: [
    "freecell in italiano",
    "freecell gratis",
    "freecell online italiano",
    "solitario freecell italiano",
    "gioca freecell",
    "regole freecell",
    "solitario gratis online",
  ],
  openGraph: {
    title: "FreeCell in Italiano | Gioca Gratis e Impara le Regole",
    description:
      "Una guida chiara in italiano per giocare a FreeCell gratis: regole, mosse, strategia iniziale e link alla partita online.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
    languages: {
      it: absoluteUrl(PAGE_PATH),
      en: canonicalUrlFor("/freecell/how-to-play"),
      es: absoluteUrl("/freecell-en-espanol"),
      fr: absoluteUrl("/freecell-en-francais"),
      de: absoluteUrl("/freecell-auf-deutsch"),
      "x-default": canonicalUrlFor("/freecell/how-to-play"),
    },
  },
  twitter: {
    card: "summary_large_image",
  },
};

const tocItems = [
  { href: "#gioca", icon: "\u2660", label: "Gioca" },
  { href: "#regole", icon: "\u2665", label: "Regole" },
  { href: "#mosse", icon: "\u2666", label: "Mosse" },
  { href: "#strategia", icon: "\u2663", label: "Strategia" },
  { href: "#termini", icon: "\u2660", label: "Termini" },
];

const faqItems = [
  {
    question: "Posso giocare a FreeCell gratis qui?",
    answer:
      "Si. FreeCell funziona gratis direttamente nel browser, senza download, senza account e con nuove partite illimitate.",
  },
  {
    question: "FreeCell e un gioco di fortuna o strategia?",
    answer:
      "FreeCell e soprattutto strategia, perche tutte le 52 carte sono visibili fin dall inizio. Quasi ogni partita si puo risolvere con una buona pianificazione.",
  },
  {
    question: "A cosa servono le celle libere?",
    answer:
      "Le celle libere sono quattro spazi temporanei. Ogni cella puo contenere una sola carta e aiuta a liberare colonne o ricostruire sequenze.",
  },
  {
    question: "Come si vince a FreeCell?",
    answer:
      "Si vince quando tutte le 52 carte sono sulle quattro basi, ciascun seme dall Asso al Re.",
  },
];

export default function FreeCellItalianPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "FreeCell in Italiano: regole e gioco gratis",
      description:
        "Guida italiana a FreeCell con regole, obiettivo del gioco, mosse legali e consigli per principianti.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-07-05",
      dateModified: "2026-07-05",
      inLanguage: "it",
      mainEntityOfPage: absoluteUrl(PAGE_PATH),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "it",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "FreeCell in Italiano", item: absoluteUrl(PAGE_PATH) },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <header className="relative mx-auto max-w-4xl overflow-hidden px-5 pb-10 pt-8 text-center sm:px-8 sm:pb-12">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[#6B7280]">
          <ol className="flex flex-wrap items-center justify-center gap-1.5">
            <li>
              <Link href="/" className="text-[#D4AF37]/70 transition-colors hover:text-[#D4AF37] hover:underline">
                Home
              </Link>
            </li>
            <li className="text-[#6B7280]/40" aria-hidden="true">/</li>
            <li className="text-[#6B7280]/70">FreeCell in Italiano</li>
          </ol>
        </nav>
        <h1
          className="mx-auto mb-4 max-w-[20rem] text-3xl font-semibold leading-tight text-[#D4AF37] sm:max-w-3xl sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell <span className="sm:whitespace-nowrap">in Italiano</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-[#6B7280] sm:text-xl sm:leading-8">
          Gioca a FreeCell gratis online e impara le regole con una guida semplice in italiano.
          Tutte le carte sono visibili, non serve installare nulla, e puoi iniziare subito.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-sm text-[#D4AF37]">{"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      <nav className="mx-auto mb-10 max-w-4xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap justify-center gap-3">
          {tocItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-[#D4AF37]/25 px-4 py-2 text-sm font-medium text-[#D4AF37] transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10"
            >
              <span aria-hidden="true" className="mr-1.5">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="mx-auto mb-10 max-w-4xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#6B7280]">
          <span className="mr-1 font-medium text-white/75">Disponibile anche:</span>
          <Link href="/freecell/how-to-play" className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10">
            English
          </Link>
          <Link href="/freecell-en-espanol" className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10">
            Espanol
          </Link>
          <Link href="/freecell-en-francais" className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10">
            Francais
          </Link>
          <Link href="/freecell-auf-deutsch" className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10">
            Deutsch
          </Link>
        </div>
      </div>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-20 sm:px-6">
        <CardSection id="gioca" variant="dark">
          <SectionHeading variant="dark" sub="Inizia subito" id="gioca-heading">
            Gioca a FreeCell gratis
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              FreeCell e un solitario a informazioni complete. Le 52 carte sono scoperte in otto colonne,
              quindi la partita dipende piu da pianificazione, ordine delle mosse e uso delle celle libere
              che dalla fortuna.
            </p>
            <p>
              La versione classica include partite numerate, annulla, aiuti, sfida giornaliera e salvataggio
              locale nel browser.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={PLAY_PATH} className="rounded-md bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0b2a0b] transition hover:bg-[#f0ce63]">
                Gioca in italiano
              </Link>
              <Link href="/freecell-for-beginners" className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10">
                Guida per principianti
              </Link>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        <CardSection id="regole" variant="dark">
          <SectionHeading variant="dark" sub="Obiettivo" id="regole-heading">
            Regole di FreeCell in breve
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              L obiettivo e spostare tutte le carte sulle quattro basi. Ogni base appartiene a un seme:
              picche, cuori, quadri o fiori. Le basi partono dall Asso e salgono fino al Re.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { value: "8", label: "colonne", text: "Tutte le carte iniziano scoperte al centro del tavolo." },
                { value: "4", label: "celle libere", text: "Ogni cella contiene una sola carta temporanea." },
                { value: "4", label: "basi", text: "Costruisci ogni seme dall Asso al Re." },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.05] p-5 text-center">
                  <div className="text-3xl font-bold text-white">{item.value}</div>
                  <div className="mt-1 text-sm font-semibold text-[#D4AF37]">{item.label}</div>
                  <p className="mt-2 text-xs leading-5 text-white/55">{item.text}</p>
                </div>
              ))}
            </div>
          </ContentBody>
        </CardSection>

        <CardSection id="mosse" variant="dark">
          <SectionHeading variant="dark" sub="Azioni consentite" id="mosse-heading">
            Mosse legali
          </SectionHeading>
          <div className="space-y-4 px-8 py-6 sm:px-10 md:px-12">
            {[
              {
                title: "Da colonna a colonna",
                text: "Metti una carta su una carta di valore subito superiore e colore opposto. Per esempio, un 7 rosso va su un 8 nero.",
              },
              {
                title: "Carta in una cella libera",
                text: "Una carta disponibile puo andare in una cella libera vuota. Ogni cella contiene una sola carta.",
              },
              {
                title: "Carta su una base",
                text: "Una carta puo andare sulla base del suo seme quando e la carta successiva. Gli Assi iniziano le basi.",
              },
              {
                title: "Colonna vuota",
                text: "Una colonna vuota accetta qualsiasi carta o sequenza valida. Le colonne vuote sono la risorsa piu potente.",
              },
            ].map((move) => (
              <div key={move.title} className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <h3 className="mb-2 text-lg font-semibold text-white">{move.title}</h3>
                <p className="text-sm leading-7 text-white/70">{move.text}</p>
              </div>
            ))}
          </div>
        </CardSection>

        <CardSection id="strategia" variant="dark">
          <SectionHeading variant="dark" sub="Parti meglio" id="strategia-heading">
            Consigli rapidi
          </SectionHeading>
          <ContentBody variant="dark">
            <ul className="space-y-3">
              <li>Cerca subito Assi e carte basse, cosi le basi possono crescere presto.</li>
              <li>Non riempire tutte le celle libere senza un piano chiaro per svuotarle.</li>
              <li>Una colonna vuota vale spesso piu di una cella libera, perche permette sequenze piu lunghe.</li>
              <li>Costruisci sequenze discendenti a colori alterni, ma non seppellire carte basse importanti.</li>
              <li>Usa Annulla come strumento di studio: in FreeCell provare linee diverse fa parte della strategia.</li>
            </ul>
          </ContentBody>
        </CardSection>

        <CardSection id="termini" variant="dark">
          <SectionHeading variant="dark" sub="Parole utili" id="termini-heading">
            Vocabolario inglese-italiano
          </SectionHeading>
          <div className="grid gap-3 px-8 py-6 sm:px-10 md:grid-cols-2 md:px-12">
            {[
              ["Free cells", "Celle libere"],
              ["Foundations", "Basi"],
              ["Cascades", "Colonne"],
              ["Tableau", "Tavolo"],
              ["Undo", "Annulla"],
              ["Hint", "Aiuto"],
              ["New Deal", "Nuova partita"],
              ["Move", "Mossa"],
            ].map(([english, italian]) => (
              <div key={english} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="text-sm font-semibold text-white">{english}</span>
                <span className="text-sm text-white/65">{italian}</span>
              </div>
            ))}
          </div>
        </CardSection>

        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Domande frequenti">
            FAQ FreeCell in italiano
          </SectionHeading>
          <div className="space-y-4 px-8 py-6 sm:px-10 md:px-12">
            {faqItems.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <h3 className="mb-2 text-lg font-semibold text-white">{faq.question}</h3>
                <p className="text-sm leading-7 text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardSection>

        <CtaSection
          heading="Pronto per una partita?"
          body="Avvia FreeCell in italiano, prova una variante piu facile, oppure leggi le regole complete per approfondire."
          primaryHref={PLAY_PATH}
          primaryLabel="Gioca in italiano"
          secondaryHref="/easy-freecell"
          secondaryLabel="Prova Easy FreeCell"
        />

        <div className="grid gap-4 md:grid-cols-3">
          <ContentLinkCard href="/freecell-rules" title="FreeCell Rules" description="Riferimento completo alle regole in inglese." />
          <ContentLinkCard href="/tips" title="Tips & Tricks" description="Consigli rapidi per vincere piu spesso." />
          <ContentLinkCard href="/deals" title="Deal Explorer" description="Trova una partita per numero e allenati." />
        </div>
      </main>
    </ContentLayout>
  );
}
