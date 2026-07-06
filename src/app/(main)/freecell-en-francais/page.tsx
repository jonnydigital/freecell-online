import Link from "@/components/NetworkLink";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor } from "@/lib/routeOwnership";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import FreecellLanguageSwitcher from "@/components/FreecellLanguageSwitcher";
import {
  CardSection,
  ContentBody,
  ContentLinkCard,
  CtaSection,
  JsonLd,
  SectionHeading,
} from "@/components/content";

const PAGE_PATH = "/freecell-en-francais";
const PLAY_PATH = "/freecell-en-francais/jouer";

export const metadata: Metadata = {
  title: "FreeCell en Francais | Jouer Gratuitement et Apprendre les Regles",
  description:
    "Jouez a FreeCell gratuitement en ligne et apprenez les regles en francais: objectif, mouvements autorises, cellules libres et conseils pour debuter.",
  keywords: [
    "freecell en francais",
    "freecell gratuit",
    "freecell en ligne francais",
    "solitaire freecell francais",
    "jouer freecell gratuit",
    "regles freecell",
    "freecell debutant",
    "solitaire gratuit en ligne",
  ],
  openGraph: {
    title: "FreeCell en Francais | Jouer Gratuitement et Apprendre les Regles",
    description:
      "Un guide clair en francais pour jouer a FreeCell gratuitement: regles, mouvements, strategie de depart et liens pour commencer.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
    languages: {
      fr: absoluteUrl(PAGE_PATH),
      en: canonicalUrlFor("/freecell/how-to-play"),
      es: absoluteUrl("/freecell-en-espanol"),
      de: absoluteUrl("/freecell-auf-deutsch"),
      it: absoluteUrl("/freecell-in-italiano"),
      pt: absoluteUrl("/freecell-em-portugues"),
      "x-default": canonicalUrlFor("/freecell/how-to-play"),
    },
  },
  twitter: {
    card: "summary_large_image",
  },
};

const tocItems = [
  { href: "#jouer", icon: "\u2660", label: "Jouer" },
  { href: "#regles", icon: "\u2665", label: "Regles" },
  { href: "#mouvements", icon: "\u2666", label: "Mouvements" },
  { href: "#strategie", icon: "\u2663", label: "Strategie" },
  { href: "#vocabulaire", icon: "\u2660", label: "Vocabulaire" },
];

const faqItems = [
  {
    question: "Peut-on jouer a FreeCell gratuitement ici?",
    answer:
      "Oui. Vous pouvez jouer a FreeCell gratuitement dans le navigateur, sans telechargement et sans creer de compte.",
  },
  {
    question: "FreeCell est-il un jeu de chance?",
    answer:
      "FreeCell contient tres peu de hasard, car les 52 cartes sont visibles des le debut. Presque toutes les parties peuvent etre gagnees avec une bonne strategie.",
  },
  {
    question: "A quoi servent les cellules libres?",
    answer:
      "Les cellules libres sont quatre espaces temporaires qui peuvent chacun contenir une seule carte. Elles aident a degager les colonnes, mais il faut eviter de les remplir sans plan.",
  },
  {
    question: "Comment gagner une partie de FreeCell?",
    answer:
      "Vous gagnez lorsque les 52 cartes sont placees sur les quatre fondations, une fondation par couleur, de l'As jusqu'au Roi.",
  },
];

export default function FreeCellEnFrancaisPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "FreeCell en Francais: Guide pour Jouer Gratuitement",
      description:
        "Guide en francais pour apprendre FreeCell, jouer gratuitement en ligne et comprendre les regles de base.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-07-03",
      dateModified: "2026-07-03",
      inLanguage: "fr",
      mainEntityOfPage: absoluteUrl(PAGE_PATH),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "fr",
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
        { "@type": "ListItem", position: 1, name: "Accueil", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "FreeCell en Francais", item: absoluteUrl(PAGE_PATH) },
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
            <li className="text-[#6B7280]/70">FreeCell en Francais</li>
          </ol>
        </nav>
        <h1
          className="mx-auto mb-4 max-w-[19rem] text-3xl font-semibold leading-tight text-[#D4AF37] sm:max-w-3xl sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell <span className="sm:whitespace-nowrap">en Francais</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-[#6B7280] sm:text-xl sm:leading-8">
          Jouez a FreeCell gratuitement en ligne et apprenez les regles avec un guide simple en francais.
          Toutes les cartes sont visibles, rien n'est a telecharger, et une partie peut commencer en quelques secondes.
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

      <FreecellLanguageSwitcher currentLocale="fr" label="Aussi disponible :" />

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-20 sm:px-6">
        <CardSection id="jouer" variant="dark">
          <SectionHeading variant="dark" sub="Commencer ici" id="jouer-heading">
            Jouer a FreeCell gratuitement
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              FreeCell est un solitaire de strategie avec une difference importante:
              les 52 cartes sont visibles des le depart. Il n'y a ni pioche cachee ni hasard
              de retournement. La partie depend surtout de vos decisions.
            </p>
            <p>
              La version principale reste jouable gratuitement tout de suite, avec des parties
              numerotees, annulation, indices, defi quotidien et sauvegarde locale dans le navigateur.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={PLAY_PATH}
                className="rounded-md bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0b2a0b] transition hover:bg-[#f0ce63]"
              >
                Jouer maintenant
              </Link>
              <Link
                href="/freecell-for-beginners"
                className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Guide debutant
              </Link>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        <CardSection id="regles" variant="dark">
          <SectionHeading variant="dark" sub="Objectif" id="regles-heading">
            Regles de base de FreeCell
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Le but est de deplacer toutes les cartes vers les quatre fondations. Chaque
              fondation correspond a une couleur: piques, coeurs, carreaux ou trefles. Les
              fondations commencent par l'As et montent dans l'ordre jusqu'au Roi.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { value: "8", label: "colonnes", text: "Toutes les cartes commencent face visible au centre." },
                { value: "4", label: "cellules libres", text: "Chaque cellule garde une seule carte temporairement." },
                { value: "4", label: "fondations", text: "Construisez chaque couleur de l'As au Roi." },
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

        <CardSection id="mouvements" variant="dark">
          <SectionHeading variant="dark" sub="Ce qui est autorise" id="mouvements-heading">
            Mouvements legaux
          </SectionHeading>
          <div className="space-y-4 px-8 py-6 sm:px-10 md:px-12">
            {[
              {
                title: "Colonne vers colonne",
                text: "Placez une carte sur une carte d'un rang superieur et de couleur opposee. Par exemple, un 7 rouge peut aller sur un 8 noir.",
              },
              {
                title: "Carte vers cellule libre",
                text: "Vous pouvez deplacer une carte disponible vers une cellule libre vide. Chaque cellule ne contient qu'une carte.",
              },
              {
                title: "Carte vers fondation",
                text: "Deplacez une carte vers sa fondation lorsqu'elle est le prochain rang de la meme couleur. Les As commencent les fondations.",
              },
              {
                title: "Colonne vide",
                text: "Une colonne vide accepte n'importe quelle carte ou suite valide. Les colonnes vides sont les outils les plus puissants du jeu.",
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
          <SectionHeading variant="dark" sub="Premieres victoires" id="strategie-heading">
            Conseils rapides
          </SectionHeading>
          <ContentBody variant="dark">
            <ul className="space-y-3">
              <li>Cherchez les As avant de deplacer trop de cartes. Les liberer ouvre les fondations.</li>
              <li>Ne remplissez pas les quatre cellules libres sans savoir comment les vider.</li>
              <li>Essayez de creer une colonne vide; elle augmente fortement votre capacite de manoeuvre.</li>
              <li>Construisez des suites en alternant les couleurs, mais n'enterrez pas les petites cartes importantes.</li>
              <li>Utilisez l'annulation pour apprendre. Dans FreeCell, revenir sur un mauvais coup fait partie de la progression.</li>
            </ul>
          </ContentBody>
        </CardSection>

        <CardSection id="vocabulaire" variant="dark">
          <SectionHeading variant="dark" sub="Termes utiles" id="vocabulaire-heading">
            Vocabulaire anglais-francais
          </SectionHeading>
          <div className="grid gap-3 px-8 py-6 sm:px-10 md:grid-cols-2 md:px-12">
            {[
              ["Free cells", "Cellules libres"],
              ["Foundations", "Fondations"],
              ["Cascades", "Colonnes"],
              ["Tableau", "Zone de jeu"],
              ["Undo", "Annuler"],
              ["Hint", "Indice"],
              ["New Deal", "Nouvelle partie"],
              ["Move", "Coup"],
            ].map(([english, french]) => (
              <div key={english} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="text-sm font-semibold text-white">{english}</span>
                <span className="text-sm text-white/65">{french}</span>
              </div>
            ))}
          </div>
        </CardSection>

        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Questions frequentes">
            FAQ en francais
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
          heading="Pret a jouer?"
          body="Commencez une partie classique, essayez une partie facile, ou consultez le guide complet si vous voulez plus de details."
          primaryHref={PLAY_PATH}
          primaryLabel="Jouer en francais"
          secondaryHref="/easy-freecell"
          secondaryLabel="Essayer Easy FreeCell"
        />

        <div className="grid gap-4 md:grid-cols-3">
          <ContentLinkCard href="/freecell-rules" title="FreeCell Rules" description="Reference complete des regles en anglais." />
          <ContentLinkCard href="/tips" title="Tips & Tricks" description="Conseils rapides pour gagner plus souvent." />
          <ContentLinkCard href="/deals" title="Deal Explorer" description="Trouvez une partie par numero et entrainez-vous." />
        </div>
      </main>
    </ContentLayout>
  );
}
