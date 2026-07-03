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

const PAGE_PATH = "/freecell-en-espanol";
const PLAY_PATH = "/freecell-en-espanol/jugar";

export const metadata: Metadata = {
  title: "FreeCell en Espanol | Juega Gratis y Aprende las Reglas",
  description:
    "Juega FreeCell gratis en linea y aprende las reglas en espanol: objetivo, movimientos legales, celdas libres, bases y consejos para principiantes.",
  keywords: [
    "freecell en espanol",
    "freecell gratis",
    "freecell online espanol",
    "solitario freecell en espanol",
    "jugar freecell gratis",
    "reglas de freecell",
    "freecell para principiantes",
    "solitario gratis online",
  ],
  openGraph: {
    title: "FreeCell en Espanol | Juega Gratis y Aprende las Reglas",
    description:
      "Una guia clara en espanol para jugar FreeCell gratis: reglas, movimientos, estrategia inicial y enlaces para empezar una partida.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
    languages: {
      es: absoluteUrl(PAGE_PATH),
      fr: absoluteUrl("/freecell-en-francais"),
      en: canonicalUrlFor("/freecell/how-to-play"),
      "x-default": canonicalUrlFor("/freecell/how-to-play"),
    },
  },
  twitter: {
    card: "summary_large_image",
  },
};

const tocItems = [
  { href: "#jugar", icon: "\u2660", label: "Jugar" },
  { href: "#reglas", icon: "\u2665", label: "Reglas" },
  { href: "#movimientos", icon: "\u2666", label: "Movimientos" },
  { href: "#estrategia", icon: "\u2663", label: "Estrategia" },
  { href: "#vocabulario", icon: "\u2660", label: "Vocabulario" },
];

const faqItems = [
  {
    question: "Es gratis jugar FreeCell aqui?",
    answer:
      "Si. Puedes jugar FreeCell gratis en el navegador, sin descargar nada y sin crear una cuenta.",
  },
  {
    question: "FreeCell es un juego de suerte?",
    answer:
      "FreeCell tiene muy poca suerte porque todas las cartas estan visibles desde el primer movimiento. Casi todas las partidas se pueden ganar con buena estrategia.",
  },
  {
    question: "Que son las celdas libres?",
    answer:
      "Las celdas libres son cuatro espacios temporales donde puedes guardar una carta. Son utiles, pero conviene mantener algunas vacias para mover secuencias largas.",
  },
  {
    question: "Como gano una partida de FreeCell?",
    answer:
      "Ganas cuando mueves las 52 cartas a las cuatro bases, una base por palo, desde As hasta Rey.",
  },
];

export default function FreeCellEnEspanolPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "FreeCell en Espanol: Guia para Jugar Gratis",
      description:
        "Guia en espanol para aprender FreeCell, jugar gratis en linea y entender las reglas basicas.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-07-01",
      dateModified: "2026-07-02",
      inLanguage: "es",
      mainEntityOfPage: absoluteUrl(PAGE_PATH),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "es",
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
        { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "FreeCell en Espanol", item: absoluteUrl(PAGE_PATH) },
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
            <li className="text-[#6B7280]/70">FreeCell en Espanol</li>
          </ol>
        </nav>
        <h1
          className="mx-auto mb-4 max-w-[18rem] text-3xl font-semibold leading-tight text-[#D4AF37] sm:max-w-3xl sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell <span className="sm:whitespace-nowrap">en Espanol</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-[#6B7280] sm:text-xl sm:leading-8">
          Juega FreeCell gratis en linea y aprende las reglas con una guia clara en espanol.
          Todas las cartas estan visibles, no hay descargas, y puedes empezar una partida en segundos.
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
          <span className="mr-1 font-medium text-white/75">Tambien disponible:</span>
          <Link
            href="/freecell/how-to-play"
            className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10"
          >
            English
          </Link>
          <Link
            href="/freecell-en-francais"
            className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10"
          >
            Français
          </Link>
        </div>
      </div>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-20 sm:px-6">
        <CardSection id="jugar" variant="dark">
          <SectionHeading variant="dark" sub="Empieza aqui" id="jugar-heading">
            Jugar FreeCell gratis
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              FreeCell es un solitario de estrategia con una regla que lo hace especial:
              puedes ver las 52 cartas desde el inicio. No hay cartas ocultas ni mazo de
              robo. La partida depende de tus decisiones.
            </p>
            <p>
              Tambien puedes jugar con la interfaz principal en espanol: nueva partida,
              pistas, deshacer, ajustes, partida guardada y reto diario usan etiquetas claras
              para empezar sin traducir mentalmente cada control.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={PLAY_PATH}
                className="rounded-md bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0b2a0b] transition hover:bg-[#f0ce63]"
              >
                Jugar ahora
              </Link>
              <Link
                href="/freecell-for-beginners"
                className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Guia para principiantes
              </Link>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        <CardSection id="reglas" variant="dark">
          <SectionHeading variant="dark" sub="Objetivo" id="reglas-heading">
            Reglas basicas de FreeCell
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              El objetivo es mover todas las cartas a las cuatro bases. Cada base
              corresponde a un palo: picas, corazones, diamantes o treboles. Las bases
              empiezan con el As y suben en orden: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { value: "8", label: "columnas", text: "Todas las cartas empiezan boca arriba en el centro." },
                { value: "4", label: "celdas libres", text: "Cada una guarda una sola carta temporalmente." },
                { value: "4", label: "bases", text: "Construye cada palo desde As hasta Rey." },
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

        <CardSection id="movimientos" variant="dark">
          <SectionHeading variant="dark" sub="Que puedes hacer" id="movimientos-heading">
            Movimientos legales
          </SectionHeading>
          <div className="space-y-4 px-8 py-6 sm:px-10 md:px-12">
            {[
              {
                title: "Columna a columna",
                text: "Coloca una carta sobre otra de un rango superior y color opuesto. Por ejemplo, un 7 rojo puede ir sobre un 8 negro.",
              },
              {
                title: "Carta a celda libre",
                text: "Puedes mover cualquier carta disponible a una celda libre vacia. Cada celda libre solo acepta una carta.",
              },
              {
                title: "Carta a base",
                text: "Mueve una carta a su base cuando sea el siguiente rango del mismo palo. Los Ases empiezan las bases.",
              },
              {
                title: "Columna vacia",
                text: "Una columna vacia acepta cualquier carta o secuencia valida. Las columnas vacias son las herramientas mas poderosas del juego.",
              },
            ].map((move) => (
              <div key={move.title} className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <h3 className="mb-2 text-lg font-semibold text-white">{move.title}</h3>
                <p className="text-sm leading-7 text-white/70">{move.text}</p>
              </div>
            ))}
          </div>
        </CardSection>

        <CardSection id="estrategia" variant="dark">
          <SectionHeading variant="dark" sub="Primeras victorias" id="estrategia-heading">
            Consejos rapidos
          </SectionHeading>
          <ContentBody variant="dark">
            <ul className="space-y-3">
              <li>Busca los Ases antes de mover cartas. Liberarlos temprano abre las bases.</li>
              <li>No llenes las cuatro celdas libres sin un plan para vaciarlas.</li>
              <li>Intenta crear una columna vacia; aumenta mucho tu capacidad de mover secuencias.</li>
              <li>Construye secuencias largas alternando colores, pero no entierres cartas bajas importantes.</li>
              <li>Usa deshacer para aprender. En FreeCell, revisar un mal movimiento es parte del progreso.</li>
            </ul>
          </ContentBody>
        </CardSection>

        <CardSection id="vocabulario" variant="dark">
          <SectionHeading variant="dark" sub="Terminos utiles" id="vocabulario-heading">
            Vocabulario ingles-espanol
          </SectionHeading>
          <div className="grid gap-3 px-8 py-6 sm:px-10 md:grid-cols-2 md:px-12">
            {[
              ["Free cells", "Celdas libres"],
              ["Foundations", "Bases"],
              ["Cascades", "Columnas"],
              ["Tableau", "Area de juego"],
              ["Undo", "Deshacer"],
              ["Hint", "Pista"],
              ["New Deal", "Nueva partida"],
              ["Move", "Movimiento"],
            ].map(([english, spanish]) => (
              <div key={english} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="text-sm font-semibold text-white">{english}</span>
                <span className="text-sm text-white/65">{spanish}</span>
              </div>
            ))}
          </div>
        </CardSection>

        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Preguntas frecuentes">
            FAQ en espanol
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
          heading="Listo para jugar?"
          body="Empieza con una partida clasica, prueba una partida facil, o consulta la guia completa de reglas si quieres mas detalle."
          primaryHref={PLAY_PATH}
          primaryLabel="Jugar en espanol"
          secondaryHref="/easy-freecell"
          secondaryLabel="Probar Easy FreeCell"
        />

        <div className="grid gap-4 md:grid-cols-3">
          <ContentLinkCard href="/freecell-rules" title="FreeCell Rules" description="Referencia completa de reglas en ingles." />
          <ContentLinkCard href="/tips" title="Tips & Tricks" description="Consejos rapidos para ganar mas partidas." />
          <ContentLinkCard href="/deals" title="Deal Explorer" description="Busca partidas por numero y practica deals concretos." />
        </div>
      </main>
    </ContentLayout>
  );
}
