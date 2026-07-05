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

const PAGE_PATH = "/freecell-auf-deutsch";

export const metadata: Metadata = {
  title: "FreeCell auf Deutsch | Kostenlos Spielen und Regeln Lernen",
  description:
    "Spielen Sie FreeCell kostenlos online und lernen Sie die Regeln auf Deutsch: Ziel, erlaubte Zuege, freie Zellen, Ablagestapel und Tipps fuer den Start.",
  keywords: [
    "freecell auf deutsch",
    "freecell kostenlos",
    "freecell online deutsch",
    "freecell solitaire deutsch",
    "freecell spielen",
    "freecell regeln",
    "freecell fuer anfaenger",
    "solitaer kostenlos online",
  ],
  openGraph: {
    title: "FreeCell auf Deutsch | Kostenlos Spielen und Regeln Lernen",
    description:
      "Ein klarer deutscher FreeCell-Guide mit Regeln, erlaubten Zuegen, Strategie fuer Einsteiger und Links zum kostenlosen Spiel.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
    languages: {
      de: absoluteUrl(PAGE_PATH),
      en: canonicalUrlFor("/freecell/how-to-play"),
      es: absoluteUrl("/freecell-en-espanol"),
      fr: absoluteUrl("/freecell-en-francais"),
      it: absoluteUrl("/freecell-in-italiano"),
      "x-default": canonicalUrlFor("/freecell/how-to-play"),
    },
  },
  twitter: {
    card: "summary_large_image",
  },
};

const tocItems = [
  { href: "#spielen", icon: "\u2660", label: "Spielen" },
  { href: "#regeln", icon: "\u2665", label: "Regeln" },
  { href: "#zuege", icon: "\u2666", label: "Zuege" },
  { href: "#strategie", icon: "\u2663", label: "Strategie" },
  { href: "#begriffe", icon: "\u2660", label: "Begriffe" },
];

const faqItems = [
  {
    question: "Kann ich FreeCell hier kostenlos spielen?",
    answer:
      "Ja. FreeCell laeuft kostenlos direkt im Browser, ohne Download, ohne Konto und mit beliebig vielen neuen Spielen.",
  },
  {
    question: "Ist FreeCell Glueck oder Strategie?",
    answer:
      "FreeCell ist vor allem Strategie, weil alle 52 Karten von Anfang an sichtbar sind. Fast jede Partie ist mit guter Planung loesbar.",
  },
  {
    question: "Wofuer sind die freien Zellen da?",
    answer:
      "Die freien Zellen sind vier Zwischenplaetze. Jede freie Zelle kann genau eine Karte halten und hilft dabei, Spalten freizulegen oder Kartenfolgen umzubauen.",
  },
  {
    question: "Wie gewinnt man FreeCell?",
    answer:
      "Sie gewinnen, wenn alle 52 Karten auf den vier Ablagestapeln liegen, jeweils nach Farbe vom Ass bis zum Koenig.",
  },
];

export default function FreeCellAufDeutschPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "FreeCell auf Deutsch: Regeln und kostenlos spielen",
      description:
        "Deutscher FreeCell-Guide mit Regeln, Ziel des Spiels, erlaubten Zuegen und Tipps fuer Einsteiger.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-07-04",
      dateModified: "2026-07-04",
      inLanguage: "de",
      mainEntityOfPage: absoluteUrl(PAGE_PATH),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "de",
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
        { "@type": "ListItem", position: 2, name: "FreeCell auf Deutsch", item: absoluteUrl(PAGE_PATH) },
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
            <li className="text-[#6B7280]/70">FreeCell auf Deutsch</li>
          </ol>
        </nav>
        <h1
          className="mx-auto mb-4 max-w-[20rem] text-3xl font-semibold leading-tight text-[#D4AF37] sm:max-w-3xl sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell <span className="sm:whitespace-nowrap">auf Deutsch</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-[#6B7280] sm:text-xl sm:leading-8">
          Spielen Sie FreeCell kostenlos online und lernen Sie die Regeln mit einem einfachen deutschen Guide.
          Alle Karten sind sichtbar, es gibt keinen Download, und eine neue Partie startet sofort.
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
          <span className="mr-1 font-medium text-white/75">Auch verfuegbar:</span>
          <Link
            href="/freecell/how-to-play"
            className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10"
          >
            English
          </Link>
          <Link
            href="/freecell-en-espanol"
            className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10"
          >
            Espanol
          </Link>
          <Link
            href="/freecell-en-francais"
            className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10"
          >
            Francais
          </Link>
          <Link
            href="/freecell-in-italiano"
            className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10"
          >
            Italiano
          </Link>
        </div>
      </div>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-20 sm:px-6">
        <CardSection id="spielen" variant="dark">
          <SectionHeading variant="dark" sub="Direkt starten" id="spielen-heading">
            FreeCell kostenlos spielen
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              FreeCell ist ein Solitaer-Spiel mit offenem Spielfeld. Alle 52 Karten liegen sichtbar
              in acht Spalten, deshalb geht es weniger um Glueck und mehr um Planung, Reihenfolge
              und geschicktes Nutzen der freien Zellen.
            </p>
            <p>
              Die klassische Partie ist sofort spielbar: mit nummerierten Deals, Rueckgaengig-Funktion,
              Hinweisen, taeglicher Herausforderung und lokaler Speicherung im Browser.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/freecell-auf-deutsch/spielen"
                className="rounded-md bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0b2a0b] transition hover:bg-[#f0ce63]"
              >
                Auf Deutsch spielen
              </Link>
              <Link
                href="/freecell-for-beginners"
                className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Einsteiger-Guide
              </Link>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        <CardSection id="regeln" variant="dark">
          <SectionHeading variant="dark" sub="Ziel des Spiels" id="regeln-heading">
            FreeCell-Regeln auf einen Blick
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Ziel ist es, alle Karten auf die vier Ablagestapel zu bringen. Jeder Ablagestapel
              gehoert zu einer Farbe: Pik, Herz, Karo oder Kreuz. Die Stapel beginnen mit dem Ass
              und steigen der Reihe nach bis zum Koenig.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { value: "8", label: "Spalten", text: "Alle Karten starten offen in der Mitte des Spielfelds." },
                { value: "4", label: "freie Zellen", text: "Jede Zelle speichert genau eine Karte als Zwischenplatz." },
                { value: "4", label: "Ablagestapel", text: "Bauen Sie jede Farbe vom Ass bis zum Koenig auf." },
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

        <CardSection id="zuege" variant="dark">
          <SectionHeading variant="dark" sub="Erlaubte Aktionen" id="zuege-heading">
            Legale Zuege
          </SectionHeading>
          <div className="space-y-4 px-8 py-6 sm:px-10 md:px-12">
            {[
              {
                title: "Spalte zu Spalte",
                text: "Legen Sie eine Karte auf eine Karte mit dem naechsthoeheren Rang und der Gegenfarbe. Eine rote 7 passt zum Beispiel auf eine schwarze 8.",
              },
              {
                title: "Karte in eine freie Zelle",
                text: "Eine verfuegbare Karte darf in eine leere freie Zelle gelegt werden. Jede freie Zelle haelt nur eine Karte.",
              },
              {
                title: "Karte auf den Ablagestapel",
                text: "Eine Karte darf auf ihren Ablagestapel, wenn sie die naechste Karte derselben Farbe ist. Asse starten die Stapel.",
              },
              {
                title: "Leere Spalte",
                text: "Eine leere Spalte akzeptiert jede Karte oder gueltige Kartenfolge. Leere Spalten sind die staerkste Ressource im Spiel.",
              },
            ].map((move) => (
              <div key={move.title} className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <h3 className="mb-2 text-lg font-semibold text-white">{move.title}</h3>
                <p className="text-sm leading-7 text-white/70">{move.text}</p>
              </div>
            ))}
          </div>
        </CardSection>

        <CardSection id="strategie" variant="dark">
          <SectionHeading variant="dark" sub="Besser starten" id="strategie-heading">
            Schnelle Tipps
          </SectionHeading>
          <ContentBody variant="dark">
            <ul className="space-y-3">
              <li>Suchen Sie zuerst nach Assen und niedrigen Karten, damit die Ablagestapel wachsen koennen.</li>
              <li>Fuellen Sie nicht alle vier freien Zellen, ohne einen klaren Weg zum Leeren zu haben.</li>
              <li>Eine leere Spalte ist oft wertvoller als eine freie Zelle, weil sie laengere Kartenfolgen ermoeglicht.</li>
              <li>Bauen Sie absteigende Reihen mit wechselnden Farben, aber begraben Sie wichtige kleine Karten nicht.</li>
              <li>Nutzen Sie Rueckgaengig als Lernwerkzeug. Bei FreeCell ist Ausprobieren ein sinnvoller Teil der Strategie.</li>
            </ul>
          </ContentBody>
        </CardSection>

        <CardSection id="begriffe" variant="dark">
          <SectionHeading variant="dark" sub="Nuetzliche Worte" id="begriffe-heading">
            Englisch-deutsches Vokabular
          </SectionHeading>
          <div className="grid gap-3 px-8 py-6 sm:px-10 md:grid-cols-2 md:px-12">
            {[
              ["Free cells", "Freie Zellen"],
              ["Foundations", "Ablagestapel"],
              ["Cascades", "Spalten"],
              ["Tableau", "Spielfeld"],
              ["Undo", "Rueckgaengig"],
              ["Hint", "Hinweis"],
              ["New Deal", "Neue Partie"],
              ["Move", "Zug"],
            ].map(([english, german]) => (
              <div key={english} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="text-sm font-semibold text-white">{english}</span>
                <span className="text-sm text-white/65">{german}</span>
              </div>
            ))}
          </div>
        </CardSection>

        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Haeufige Fragen">
            FreeCell FAQ auf Deutsch
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
          heading="Bereit fuer eine Partie?"
          body="Starten Sie FreeCell sofort, probieren Sie eine leichtere Variante, oder lesen Sie die vollstaendigen Regeln fuer mehr Details."
          primaryHref="/"
          primaryLabel="FreeCell spielen"
          secondaryHref="/easy-freecell"
          secondaryLabel="Easy FreeCell testen"
        />

        <div className="grid gap-4 md:grid-cols-3">
          <ContentLinkCard href="/freecell-rules" title="FreeCell Rules" description="Vollstaendige Regelreferenz auf Englisch." />
          <ContentLinkCard href="/tips" title="Tips & Tricks" description="Kurze Tipps, um oefter zu gewinnen." />
          <ContentLinkCard href="/deals" title="Deal Explorer" description="Finden Sie eine Partie per Nummer und ueben Sie gezielt." />
        </div>
      </main>
    </ContentLayout>
  );
}
