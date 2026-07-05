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

const PAGE_PATH = "/freecell-em-portugues";
const PLAY_PATH = "/freecell-em-portugues/jogar";

export const metadata: Metadata = {
  title: "FreeCell em Portugues | Jogue Gratis e Aprenda as Regras",
  description:
    "Jogue FreeCell gratis online e aprenda as regras em portugues: objetivo, jogadas legais, celulas livres, fundacoes e estrategia inicial.",
  keywords: [
    "freecell em portugues",
    "freecell gratis",
    "freecell online portugues",
    "solitario freecell portugues",
    "jogar freecell",
    "regras freecell",
    "solitario gratis online",
  ],
  openGraph: {
    title: "FreeCell em Portugues | Jogue Gratis e Aprenda as Regras",
    description:
      "Uma guia clara em portugues para jogar FreeCell gratis: regras, jogadas, estrategia inicial e link para a partida online.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
    languages: {
      pt: absoluteUrl(PAGE_PATH),
      it: absoluteUrl("/freecell-in-italiano"),
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
  { href: "#jogar", icon: "\u2660", label: "Jogar" },
  { href: "#regras", icon: "\u2665", label: "Regras" },
  { href: "#jogadas", icon: "\u2666", label: "Jogadas" },
  { href: "#estrategia", icon: "\u2663", label: "Estrategia" },
  { href: "#termos", icon: "\u2660", label: "Termos" },
];

const faqItems = [
  {
    question: "Posso jogar FreeCell gratis aqui?",
    answer:
      "Sim. FreeCell funciona gratis direto no navegador, sem download, sem conta e com novas partidas ilimitadas.",
  },
  {
    question: "FreeCell depende de sorte ou estrategia?",
    answer:
      "FreeCell e principalmente estrategia, porque todas as 52 cartas ficam visiveis desde o inicio. Quase toda partida pode ser resolvida com planejamento.",
  },
  {
    question: "Para que servem as celulas livres?",
    answer:
      "As quatro celulas livres sao espacos temporarios. Cada celula guarda uma carta e ajuda a abrir colunas ou reorganizar sequencias.",
  },
  {
    question: "Como se vence em FreeCell?",
    answer:
      "Voce vence quando coloca todas as 52 cartas nas quatro fundacoes, cada naipe do As ao Rei.",
  },
];

export default function FreeCellPortuguesePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "FreeCell em Portugues: regras e jogo gratis",
      description:
        "Guia em portugues para FreeCell com regras, objetivo do jogo, jogadas legais e dicas para iniciantes.",
      author: { "@type": "Organization", name: siteConfig.siteName },
      publisher: { "@type": "Organization", name: siteConfig.siteName },
      datePublished: "2026-07-05",
      dateModified: "2026-07-05",
      inLanguage: "pt",
      mainEntityOfPage: absoluteUrl(PAGE_PATH),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "pt",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "FreeCell em Portugues", item: absoluteUrl(PAGE_PATH) },
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
            <li className="text-[#6B7280]/70">FreeCell em Portugues</li>
          </ol>
        </nav>
        <h1
          className="mx-auto mb-4 max-w-[22rem] text-3xl font-semibold leading-tight text-[#D4AF37] sm:max-w-3xl sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell <span className="sm:whitespace-nowrap">em Portugues</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-[#6B7280] sm:text-xl sm:leading-8">
          Jogue FreeCell gratis online e aprenda as regras com uma guia simples em portugues.
          Todas as cartas ficam visiveis, nada precisa ser instalado, e voce pode comecar agora.
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
          <span className="mr-1 font-medium text-white/75">Tambem disponivel:</span>
          {[
            { href: "/freecell/how-to-play", label: "English" },
            { href: "/freecell-en-espanol", label: "Espanol" },
            { href: "/freecell-en-francais", label: "Francais" },
            { href: "/freecell-auf-deutsch", label: "Deutsch" },
            { href: "/freecell-in-italiano", label: "Italiano" },
          ].map((language) => (
            <Link
              key={language.href}
              href={language.href}
              className="rounded-full border border-white/15 px-3 py-1.5 text-white transition hover:border-white/30 hover:bg-white/10"
            >
              {language.label}
            </Link>
          ))}
        </div>
      </div>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-20 sm:px-6">
        <CardSection id="jogar" variant="dark">
          <SectionHeading variant="dark" sub="Comece agora" id="jogar-heading">
            Jogue FreeCell gratis
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              FreeCell e um solitario de informacao completa. As 52 cartas aparecem abertas em oito colunas,
              entao a partida depende mais de planejamento, ordem das jogadas e uso inteligente das celulas
              livres do que de sorte.
            </p>
            <p>
              A versao classica inclui partidas numeradas, desfazer, dicas, desafio diario e salvamento local
              no navegador.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={PLAY_PATH} className="rounded-md bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0b2a0b] transition hover:bg-[#f0ce63]">
                Jogar em portugues
              </Link>
              <Link href="/freecell-for-beginners" className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10">
                Guia para iniciantes
              </Link>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        <CardSection id="regras" variant="dark">
          <SectionHeading variant="dark" sub="Objetivo" id="regras-heading">
            Regras de FreeCell em resumo
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              O objetivo e mover todas as cartas para as quatro fundacoes. Cada fundacao pertence a um naipe:
              espadas, copas, ouros ou paus. As fundacoes comecam no As e sobem ate o Rei.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { value: "8", label: "colunas", text: "Todas as cartas comecam abertas no centro da mesa." },
                { value: "4", label: "celulas livres", text: "Cada celula guarda uma unica carta temporaria." },
                { value: "4", label: "fundacoes", text: "Construa cada naipe do As ao Rei." },
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

        <CardSection id="jogadas" variant="dark">
          <SectionHeading variant="dark" sub="Acoes permitidas" id="jogadas-heading">
            Jogadas legais
          </SectionHeading>
          <div className="space-y-4 px-8 py-6 sm:px-10 md:px-12">
            {[
              ["Coluna para coluna", "Coloque uma carta sobre outra de valor imediatamente maior e cor oposta. Por exemplo, um 7 vermelho vai sobre um 8 preto."],
              ["Coluna para celula livre", "Use uma celula livre para guardar uma carta que esta bloqueando uma sequencia importante."],
              ["Carta para fundacao", "Mova Ases primeiro, depois 2, 3 e assim por diante no mesmo naipe."],
              ["Coluna vazia", "Uma coluna vazia e um espaco poderoso: use-a para reorganizar sequencias longas."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </CardSection>

        <CardSection id="estrategia" variant="dark">
          <SectionHeading variant="dark" sub="Primeiros passos" id="estrategia-heading">
            Estrategia simples para vencer mais
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Antes de mover uma carta para uma celula livre, procure criar uma coluna vazia. Colunas vazias
              permitem mover sequencias maiores e desfazer bloqueios que uma unica celula nao resolveria.
            </p>
            <p>
              Evite subir cartas para as fundacoes cedo demais quando elas ainda servem como suporte para
              sequencias alternadas. Planeje duas ou tres jogadas antes de liberar uma carta chave.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <ContentLinkCard href="/freecell-mistakes-to-avoid" title="Erros comuns em FreeCell" description="Veja quais habitos bloqueiam partidas que poderiam ser vencidas." />
              <ContentLinkCard href="/how-freecell-supermoves-work" title="Como funcionam os supermoves" description="Entenda por que celulas e colunas vazias aumentam o tamanho das sequencias." />
            </div>
          </ContentBody>
        </CardSection>

        <CardSection id="termos" variant="dark">
          <SectionHeading variant="dark" sub="Vocabulario" id="termos-heading">
            Termos essenciais
          </SectionHeading>
          <div className="grid gap-4 px-8 py-6 sm:px-10 md:grid-cols-2 md:px-12">
            {[
              ["Celula livre", "Espaco temporario para uma carta."],
              ["Fundacao", "Pilha final construida por naipe do As ao Rei."],
              ["Coluna", "Uma das oito pilhas abertas no tabuleiro."],
              ["Sequencia", "Cartas em ordem decrescente alternando cores."],
            ].map(([term, definition]) => (
              <div key={term} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <h3 className="font-semibold text-[#D4AF37]">{term}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{definition}</p>
              </div>
            ))}
          </div>
        </CardSection>

        <CtaSection
          heading="Pronto para jogar?"
          body="Abra uma partida gratis de FreeCell em portugues e teste sua estrategia agora."
          primaryHref={PLAY_PATH}
          primaryLabel="Jogar FreeCell"
          secondaryHref="/freecell/how-to-play"
          secondaryLabel="Ver guia em ingles"
        />
      </main>
    </ContentLayout>
  );
}
