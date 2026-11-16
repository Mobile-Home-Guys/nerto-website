import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PreApprovalForm } from "@/components/pre-approval-form";
import { PreferredLender } from "@/components/preferred-lender";
import { Reveal } from "@/components/reveal";
import {
  Badge,
  ButtonLink,
  Container,
  Icon,
  Section,
  SectionHeading,
} from "@/components/ui";
import { company } from "@/lib/company";
import { site } from "@/lib/site";

/**
 * `/mainehousing-financing` — a campaign landing page for MaineHousing's
 * homebuyer programs, for ads and direct links only.
 *
 * UNLISTED ON PURPOSE. It is not in `lib/navigation.ts`, not in
 * `lib/page-config.ts`, not in `app/sitemap.ts`, and it asks search engines
 * not to index it. The only way in is a link somebody was given. Keep it that
 * way: `/financing` is the page the site itself points at.
 *
 * Every figure below is MaineHousing's, read from mainehousing.org in
 * November 2026, and each card links to the page it came from. MaineHousing
 * changes amounts and limits — the Advantage figure was $3,500 before it was
 * $5,000 — so re-read those pages before reusing this for a new campaign,
 * and update `CHECKED` when you do. NERTO is not MaineHousing and does not
 * decide eligibility; the fine print says so, and it must stay.
 */

const CHECKED = "November 2026";
const MH = "https://www.mainehousing.org";

export const metadata: Metadata = {
  title: "MaineHousing financing for a new home",
  description:
    "MaineHousing's First Home Loan, $5,000 Advantage and $10,000 First Generation assistance can be used on a manufactured home. Here is who qualifies and how to start.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/mainehousing-financing" },
};

type Program = {
  name: string;
  figure: string;
  figureNote: string;
  tone: "ember" | "moss" | "neutral";
  badge: string;
  body: string;
  rules: string[];
  href: string;
};

const PROGRAMS: Program[] = [
  {
    name: "First Home Loan",
    figure: "30-yr fixed",
    figureNote: "below-market or competitive rate",
    tone: "moss",
    badge: "The base loan",
    body: "MaineHousing's own mortgage, made through participating Maine lenders. It is the loan every other program on this page sits on top of, and it finances manufactured homes on owned or leased land.",
    rules: [
      "Have not owned your home in the last 3 years — so a past owner can still qualify",
      "Minimum credit score of 640",
      "Household income and purchase-price limits apply; most Maine households and homes fall inside them",
    ],
    href: `${MH}/programs-services/homebuyer/homebuyerdetail/first-home-loan-program`,
  },
  {
    name: "Advantage",
    figure: "$5,000",
    figureNote: "toward down payment and closing costs",
    tone: "ember",
    badge: "With a First Home Loan",
    body: "Cash toward what you need at closing, added to a First Home Loan. This is the help most buyers on a MaineHousing loan will use.",
    rules: [
      "Take a hoMEworks-approved homebuyer education class before closing",
      "Put in at least 1% of the loan yourself — the class fee counts toward it",
    ],
    href: `${MH}/programs-services/homebuyer/homebuyerdetail/first-home-loan-program`,
  },
  {
    name: "First Generation",
    figure: "$10,000",
    figureNote: "toward down payment and closing costs",
    tone: "ember",
    badge: "Plus 1.00% off the rate",
    body: "For a buyer whose parents never owned their home. Twice the Advantage assistance, and a zero-point option at 1.00% below the First Home Loan rate.",
    rules: [
      "At least one borrower never lived in a home owned by their parents or legal guardians, or was in foster care",
      "Never owned a home yourself",
      "A financial literacy class and a homebuyer education class before closing",
      "At least 1% of the loan from you",
    ],
    href: `${MH}/programs-services/homebuyer/homebuyerdetail/first-generation-program`,
  },
  {
    name: "SaluteME",
    figure: "0.50% off",
    figureNote: "the First Home Loan 30-year rate",
    tone: "moss",
    badge: "Veterans",
    body: "A rate discount for veterans and service members on top of the First Home Loan, and for a veteran who has owned before, the first-time buyer rule is waived.",
    rules: ["Eligible military service", "The First Home Loan's credit and income rules otherwise apply"],
    href: `${MH}/programs-services/homebuyer/homebuyerdetail/saluteme-salute-home-again`,
  },
];

/** What MaineHousing says about financing a manufactured home specifically. */
const MANUFACTURED = [
  {
    icon: Icon.House,
    title: "Owned land or leased land",
    body: "MaineHousing finances single- and double-section homes on land you own and on a leased lot — the leased-land case is one most loan programs will not touch.",
  },
  {
    icon: Icon.Dollar,
    title: "$250,000 on owned land, $200,000 leased",
    body: "The statewide purchase-price limit for a manufactured home, set separately from site-built houses. Ask us which homes and which land deals come in under it.",
  },
  {
    icon: Icon.Calendar,
    title: "Built within the last 20 years",
    body: "A new home from us is inside that rule by definition. The loan term is set by the home's age, and MaineHousing notes rates on these loans run a little higher than on a house.",
  },
  {
    icon: Icon.Shield,
    title: "Maine HOPE, if work stops",
    body: "A MaineHousing borrower in good standing who loses their job may have up to four mortgage payments advanced, held as a no-interest lien with no monthly payments.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Tell us where you stand",
    body: "The form below, or a call. Land or no land, roughly what you can put down, whether you have owned before. Two minutes, and no credit pull to ask.",
  },
  {
    n: "02",
    title: "Talk to a MaineHousing lender",
    body: "MaineHousing loans are made through participating lenders. We put you in front of one who knows how our homes are financed, and they confirm which programs you qualify for.",
  },
  {
    n: "03",
    title: "Take the class, pick the home",
    body: "Book the homebuyer education class early — Advantage and First Generation both need it before closing. With a pre-approval in hand, choose the home that fits under the limit.",
  },
];

export default function MaineHousingFinancingPage() {
  const lender = company.preferredLender;
  const writesMaineHousing = lender?.loanPrograms?.some((p) => /mainehousing/i.test(p.name));

  return (
    <>
      <PageHero
        photoKey="page/financing"
        index="01"
        eyebrow="MaineHousing financing"
        size="tall"
        title={
          <>
            Up to $10,000 toward closing
            <br />
            on a new home in Maine.
          </>
        }
        lede="MaineHousing — the state's housing finance agency — offers low fixed-rate mortgages and down payment help that can be used on a manufactured home, on owned land or a leased lot. Most Maine households fall inside its income limits."
        kind="exterior"
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="#form" className="!px-7 !py-4 !text-base">
            See what I qualify for
            <Icon.Arrow className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </ButtonLink>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-base font-medium text-white transition-colors hover:border-white hover:bg-white/10"
          >
            <Icon.Phone className="size-4" />
            {site.phone}
          </a>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
          {["$5,000 Advantage assistance", "$10,000 for first-generation buyers", "0.50% off for veterans"].map(
            (t) => (
              <li key={t} className="flex items-center gap-2">
                <Icon.Check className="size-4 text-white" />
                {t}
              </li>
            ),
          )}
        </ul>
      </PageHero>

      {/* The programs */}
      <Section>
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="The programs"
            title="One loan, and the help that stacks on it."
            lede="Every program here rides on MaineHousing's First Home Loan. You pick one form of assistance — Advantage or First Generation — and a veteran can add the SaluteME discount."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl tracking-tight text-ink">{p.name}</h3>
                  <Badge tone={p.tone}>{p.badge}</Badge>
                </div>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-line py-4">
                  <span className="font-display text-4xl tracking-tight text-ink">{p.figure}</span>
                  <span className="text-sm text-muted">{p.figureNote}</span>
                </div>
                <p className="mt-5 leading-relaxed text-muted">{p.body}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.rules.map((r) => (
                    <li key={r} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-ink-soft">
                      <Icon.Check className="mt-0.5 size-4 shrink-0 text-ember" />
                      {r}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline underline-offset-4 hover:text-ember"
                >
                  Full rules at mainehousing.org
                  <Icon.External className="size-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="flex gap-4 rounded-card border border-dashed border-line-strong p-6 sm:p-7">
            <Icon.Info className="mt-0.5 size-5 shrink-0 text-ember" />
            <p className="leading-relaxed text-muted">
              <span className="font-semibold text-ink">Replacing a pre-1976 mobile home?</span>{" "}
              MaineHousing&apos;s Mobile Home Replacement Initiative has paired a $35,000 grant
              with a loan to remove an old home and set a new ENERGY STAR home on the same
              site. Applications are closed — all 2026 funding is committed — but if that is
              you, tell us in the form and we will keep an eye on it with you.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Manufactured-home rules */}
      <section className="border-y border-line bg-surface">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="For a manufactured home"
              title="What MaineHousing asks of the home."
              lede="Manufactured homes have their own limits inside the programs. These are the ones that decide which home and which land will work."
            />
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {MANUFACTURED.map((m, i) => (
              <Reveal key={m.title} delay={i * 80}>
                <div className="flex gap-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-2 text-ember">
                    <m.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl tracking-tight text-ink">{m.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-muted">{m.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The lender — only when NERTO's lender lists MaineHousing. */}
      {lender && writesMaineHousing && <PreferredLender index="04" lender={lender} />}

      {/* Steps */}
      <Section className={lender && writesMaineHousing ? "border-t border-line" : undefined}>
        <Reveal>
          <SectionHeading
            index={lender && writesMaineHousing ? "05" : "04"}
            eyebrow="How to start"
            title="Three steps to a MaineHousing pre-approval."
          />
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="bg-paper p-8">
              <span className="font-mono text-sm text-ember">{s.n}</span>
              <h3 className="mt-4 font-display text-xl tracking-tight text-ink">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Form */}
      <section id="form" className="scroll-mt-[calc(var(--chrome-h)+1.5rem)] border-t border-line bg-surface">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                index={lender && writesMaineHousing ? "06" : "05"}
                eyebrow="See what you qualify for"
                title="Find out which programs are open to you."
                lede="Tell us a little about where you are. A person reads it and calls you back — usually the same day — with which MaineHousing programs look likely to fit, and what the next step is."
              />
              <p className="mt-8 text-sm leading-relaxed text-muted">
                Rather talk now? Call{" "}
                <a href={site.phoneHref} className="font-semibold text-ink underline underline-offset-4">
                  {site.phone}
                </a>
                .
              </p>
            </Reveal>
            <Reveal delay={140}>
              <PreApprovalForm source="mainehousing-page" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Fine print */}
      <Container className="py-12">
        <p className="max-w-4xl text-xs leading-relaxed text-muted">
          {site.name} is not affiliated with, endorsed by or acting for MaineHousing (the
          Maine State Housing Authority), and does not decide eligibility. Program amounts,
          rates, income limits and purchase-price limits are MaineHousing&apos;s, as published
          on{" "}
          <a href={MH} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            mainehousing.org
          </a>{" "}
          in {CHECKED}, and may change or be withdrawn at any time. Income limits vary by
          county and household size — see MaineHousing&apos;s{" "}
          <a
            href={`${MH}/charts/homebuyer-limits`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            income and cost limits
          </a>
          . All loans are subject to credit approval by the lender. This page is not an offer
          of credit.
        </p>
      </Container>
    </>
  );
}
