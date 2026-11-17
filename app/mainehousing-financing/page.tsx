import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MaineHousingForm } from "@/components/mainehousing-form";
import { Icon } from "@/components/ui";
import { company } from "@/lib/company";
import { site } from "@/lib/site";
import logo from "@/public/logo.png";
import mhLogo from "@/public/mainehousing-logo.png";

/**
 * `/mainehousing-financing` — a campaign landing page for MaineHousing's
 * homebuyer programs, for ads and direct links only.
 *
 * UNLISTED ON PURPOSE. It is not in `lib/navigation.ts`, not in
 * `app/sitemap.ts`, and it asks search engines not to index it. The only way
 * in is a link somebody was given. Keep it that way: `/financing` is the page
 * the site itself points at.
 *
 * BARE AND OFF-THEME ON PURPOSE. It is listed in `bareRoutes` in
 * `lib/page-config.ts`, so the site's header, footer, call bar, chat and
 * floating buttons are not drawn — one offer, one form, nowhere to wander.
 * And it wears its own palette (spruce, cream and a signal yellow) in fixed
 * colours rather than the skin's tokens, so it looks the same whichever skin
 * is active and whether or not the visitor has the dark theme on. Change the
 * colours here, not in `lib/skin.ts`.
 *
 * Every figure below is MaineHousing's, read from mainehousing.org in
 * November 2026, and each card links to the page it came from. MaineHousing
 * changes amounts and limits — the Advantage figure was $3,500 before it was
 * $5,000 — so re-read those pages before reusing this for a new campaign,
 * and update `CHECKED` when you do. NERTO is not MaineHousing and does not
 * decide eligibility; the fine print says so, and it must stay.
 *
 * REVIEWED BY MAINEHOUSING, November 2026. Their marketing team supplied
 * the logo in `public/mainehousing-logo.png` (white, for a dark ground) and
 * asked that it be used. They also asked that the "free 2-minute check" —
 * a "which sounds most like you?" qualifier — come out: the hero card now
 * carries their own description of three programs, in their words, each
 * linking to its page. The Mobile Home Replacement callout was removed at
 * the same time, as that program's funding is limited and may not exist in
 * 2027. Don't put either back without asking MaineHousing.
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

/* The page's own palette. Tailwind needs literal class names, so these are
   written out in the markup; this is the key to them.
     spruce  #0e3b2c   deep ground, headings
     pine    #165440   raised panels on the spruce
     cream   #f5f0e4   light ground
     sand    #d9d2c1   rules and borders on cream
     signal  #f6c445   the one accent — CTAs and the big figures
     ink     #10241c   body text on cream
     moss    #4b5a52   secondary text on cream                        */

/** MaineHousing's own description of each program, as they sent it. Theirs, verbatim — don't edit. */
const MH_PROGRAMS = [
  {
    name: "First Home Loan Program",
    body: "The First Home Loan Program provides low fixed rate mortgages to people who have not owned homes in the last three years. No point and low point options are available. Although income limits apply, most Maine households are income-eligible for the program. First Home Loan mortgages also offer payment protection for eligible borrowers who lose their jobs.",
    href: `${MH}/programs-services/homebuyer/homebuyerdetail/first-home-loan-program`,
    icon: Icon.House,
    tone: "bg-[#0e3b2c] text-white",
  },
  {
    name: "First Generation Program",
    body: "The First Generation Program is a mortgage program for borrowers who have never lived in a home owned by their biological parents or legal guardians. The program is also available to borrowers who have been in foster care at some point in their childhood. This program makes it easier and more affordable to buy a home of your own by providing a low fixed interest rate mortgage, down payment and closing costs assistance, and education classes that offer valuable information to help you become a successful long-term homeowner.",
    href: `${MH}/programs-services/homebuyer/homebuyerdetail/first-generation-program`,
    icon: Icon.House,
    tone: "bg-[#f6c445] text-[#10241c]",
  },
  {
    name: "Salute ME & Salute Home Again",
    body: "To show appreciation for the commitment and sacrifices made by Maine’s veterans, MaineHousing offers qualified active duty and retired military personnel a 0.50% discount to the already low First Home Loan program’s 30-year fixed interest rate. Available to veterans who are first-time homebuyers or who previously owned a home (first-time homebuyer requirement is waived).",
    href: `${MH}/programs-services/homebuyer/homebuyerdetail/saluteme-salute-home-again`,
    icon: Icon.Shield,
    tone: "bg-[#165440] text-white",
  },
];

const tel = (phone: string) => `tel:+1${phone.replace(/\D/g, "")}`;

type Program = {
  name: string;
  figure: string;
  figureNote: string;
  who: string;
  body: string;
  rules: string[];
  href: string;
  star?: boolean;
};

const PROGRAMS: Program[] = [
  {
    name: "First Generation",
    figure: "$10,000",
    figureNote: "toward down payment & closing, plus 1.00% off the rate",
    who: "Your parents never owned their home",
    body: "Twice the Advantage assistance, and a zero-point option at 1.00% below the First Home Loan rate.",
    rules: [
      "At least one borrower never lived in a home owned by their parents or legal guardians, or was in foster care",
      "Never owned a home yourself",
      "A financial literacy class and a homebuyer education class before closing",
      "At least 1% of the loan from you",
    ],
    href: `${MH}/programs-services/homebuyer/homebuyerdetail/first-generation-program`,
    star: true,
  },
  {
    name: "Advantage",
    figure: "$5,000",
    figureNote: "toward down payment & closing costs",
    who: "Most buyers on a MaineHousing loan",
    body: "Cash toward what you need at closing, added to a First Home Loan. This is the help most buyers will use.",
    rules: [
      "Take a hoMEworks-approved homebuyer education class before closing",
      "Put in at least 1% of the loan yourself — the class fee counts toward it",
    ],
    href: `${MH}/programs-services/homebuyer/homebuyerdetail/first-home-loan-program`,
  },
  {
    name: "SaluteME",
    figure: "0.50%",
    figureNote: "off the First Home Loan 30-year rate",
    who: "Veterans & service members",
    body: "A rate discount on top of the First Home Loan — and for a veteran who has owned before, the first-time buyer rule is waived.",
    rules: ["Eligible military service", "The First Home Loan's credit and income rules otherwise apply"],
    href: `${MH}/programs-services/homebuyer/homebuyerdetail/saluteme-salute-home-again`,
  },
  {
    name: "First Home Loan",
    figure: "30-yr",
    figureNote: "fixed, below-market or competitive rate",
    who: "The loan everything above sits on",
    body: "MaineHousing's own mortgage, made through participating Maine lenders. It finances manufactured homes on owned or leased land.",
    rules: [
      "Have not owned your home in the last 3 years — so a past owner can still qualify",
      "Minimum credit score of 640",
      "Household income and purchase-price limits apply; most Maine households and homes fall inside them",
    ],
    href: `${MH}/programs-services/homebuyer/homebuyerdetail/first-home-loan-program`,
  },
];

/** What MaineHousing says about financing a manufactured home specifically. */
const MANUFACTURED = [
  {
    icon: Icon.House,
    title: "Owned land or a leased lot",
    body: "Single- and double-section homes on land you own and on a leased lot — the leased-land case most loan programs won't touch.",
  },
  {
    icon: Icon.Dollar,
    title: "$250K owned land · $200K leased",
    body: "The statewide purchase-price limit for a manufactured home. Ask us which homes and land deals come in under it.",
  },
  {
    icon: Icon.Calendar,
    title: "Built within 20 years",
    body: "A new home from us is inside that rule by definition. Rates on these loans run a little higher than on a site-built house.",
  },
  {
    icon: Icon.Shield,
    title: "Maine HOPE, if work stops",
    body: "A borrower in good standing who loses their job may have up to four payments advanced as a no-interest lien.",
  },
];

const STEPS = [
  {
    title: "Read the program pages",
    body: "Start with MaineHousing's own pages, linked above — they set who qualifies. Then call us or send the form; no credit pull.",
  },
  {
    title: "Talk to a MaineHousing lender",
    body: "MaineHousing loans go through participating lenders. We connect you with one who knows how our homes are financed.",
  },
  {
    title: "Take the class, pick the home",
    body: "Book the homebuyer class early — Advantage and First Generation both need it. Then choose a home under the limit.",
  },
];

function CallButton({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <a
      href={site.phoneHref}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border-2 px-5 py-3 font-bold transition-colors ${
        dark
          ? "border-[#10241c] text-[#10241c] hover:bg-[#10241c] hover:text-[#f5f0e4]"
          : "border-white/40 text-white hover:border-white hover:bg-white/10"
      } ${className}`}
    >
      <Icon.Phone className="size-4" />
      {site.phone}
    </a>
  );
}

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#contact"
      className={`group inline-flex items-center justify-center gap-2 rounded-lg bg-[#f6c445] px-6 py-3.5 font-extrabold uppercase tracking-wide text-[#10241c] shadow-[0_4px_0_#c99a1e] transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {children}
      <Icon.Arrow className="size-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

export default function MaineHousingFinancingPage() {
  const lender = company.preferredLender;
  const writesMaineHousing = lender?.loanPrograms?.some((p) => /mainehousing/i.test(p.name));

  return (
    <div
      className="bg-[#f5f0e4] pb-20 text-[#10241c] antialiased md:pb-0"
      style={{ fontFamily: "var(--font-grotesk), ui-sans-serif, system-ui, sans-serif", colorScheme: "light" }}
    >
      {/* ---- Top bar: the mark and a phone number, nothing else ---------- */}
      <header className="bg-[#0e3b2c]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <span className="rounded-lg bg-white px-2.5 py-1">
            <Image src={logo} alt={`${site.name} — Mobiles · Modulars`} priority sizes="180px" className="h-10 w-auto sm:h-12" />
          </span>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
          >
            <Icon.Phone className="size-4 text-[#f6c445]" />
            <span className="hidden sm:inline">Call</span> {site.phone}
          </a>
        </div>
      </header>

      {/* ---- Hero, with the form above the fold on desktop -------------- */}
      <section className="relative overflow-hidden bg-[#0e3b2c] text-white">
        {/* A topographic ripple — Maine's ridgelines, not a photograph of somebody else's house. */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 600"
        >
          {Array.from({ length: 14 }, (_, i) => (
            <path
              key={i}
              d={`M0 ${120 + i * 36} C 200 ${60 + i * 36}, 380 ${200 + i * 36}, 600 ${110 + i * 36} S 1000 ${40 + i * 36}, 1200 ${150 + i * 36}`}
              fill="none"
              stroke="#fff"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-24 lg:pt-16">
          <div>
            <Image
              src={mhLogo}
              alt="MaineHousing — Maine State Housing Authority"
              priority
              sizes="(min-width: 640px) 320px, 240px"
              className="mb-7 h-9 w-auto sm:h-12"
            />
            <p className="inline-flex items-center gap-2 rounded-full bg-[#f6c445] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#10241c]">
              <Icon.Star className="size-3.5" />
              MaineHousing programs · {CHECKED}
            </p>
            <h1 className="mt-6 text-[2.6rem] font-black leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]">
              Up to <span className="text-[#f6c445]">$10,000</span> toward closing on a new home in Maine.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              MaineHousing — the state&apos;s housing finance agency — offers low fixed-rate mortgages and
              down payment help that work on a manufactured home, on land you own or a leased lot. Most
              Maine households fall inside its income limits.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "$5,000 Advantage assistance",
                "$10,000 for first-generation buyers",
                "0.50% off the rate for veterans",
                "Credit scores from 640",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 font-semibold">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#f6c445] text-[#10241c]">
                    <Icon.Check className="size-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3 lg:hidden">
              <CtaButton>Talk to us</CtaButton>
              <CallButton />
            </div>
          </div>

          {/* MaineHousing's three programs, in their words, each linking out */}
          <div className="rounded-2xl bg-[#f5f0e4] p-6 text-[#10241c] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] ring-4 ring-[#f6c445] sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#165440]">
              From MaineHousing
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight tracking-tight sm:text-[1.7rem]">
              Homebuyer programs
            </h2>
            <ul className="mt-6 space-y-6">
              {MH_PROGRAMS.map((p) => (
                <li key={p.name} className="flex gap-4">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-full ${p.tone}`}>
                    <p.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-extrabold leading-snug">
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#b9b09a] underline-offset-4 hover:text-[#165440] hover:decoration-[#165440]"
                      >
                        {p.name}
                      </a>
                    </h3>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[#4b5a52]">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href={MH_PROGRAMS[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#f6c445] px-6 py-4 text-base font-extrabold uppercase tracking-wide text-[#10241c] shadow-[0_4px_0_#c99a1e] transition-transform hover:-translate-y-0.5"
            >
              First Home Loan details
              <Icon.External className="size-4" />
            </a>
            <p className="mt-3 text-center text-xs leading-relaxed text-[#6b7469]">
              Opens mainehousing.org. MaineHousing and its participating lenders decide eligibility.
            </p>
          </div>
        </div>
      </section>

      {/* ---- The numbers, big ------------------------------------------- */}
      <section className="border-b-4 border-[#10241c] bg-[#f6c445]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-[#10241c]/15 md:grid-cols-4">
          {[
            ["$10,000", "First Generation assistance"],
            ["$5,000", "Advantage assistance"],
            ["0.50%", "off for veterans"],
            ["640", "minimum credit score"],
          ].map(([n, l]) => (
            <div key={l} className="bg-[#f6c445] px-4 py-7 text-center sm:py-9">
              <div className="text-3xl font-black tracking-tight sm:text-5xl">{n}</div>
              <div className="mt-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#10241c]/70 sm:text-sm">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- The programs ----------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#165440]">The programs</p>
          <h2 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.025em] sm:text-5xl">
            One loan. The help stacks on top.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#4b5a52]">
            Everything rides on MaineHousing&apos;s First Home Loan. You pick one form of assistance —
            Advantage or First Generation — and a veteran can add the SaluteME discount.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col rounded-2xl border-2 p-6 sm:p-8 ${
                p.star ? "border-[#0e3b2c] bg-[#0e3b2c] text-white" : "border-[#d9d2c1] bg-white"
              }`}
            >
              {p.star && (
                <span className="absolute -top-3 right-6 rounded-full bg-[#f6c445] px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#10241c]">
                  Biggest help
                </span>
              )}
              <p
                className={`text-xs font-bold uppercase tracking-[0.12em] ${p.star ? "text-[#f6c445]" : "text-[#165440]"}`}
              >
                {p.who}
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight">{p.name}</h3>
              <div className={`mt-4 flex flex-wrap items-baseline gap-x-3 border-y py-4 ${p.star ? "border-white/15" : "border-[#d9d2c1]"}`}>
                <span className={`text-5xl font-black tracking-tight ${p.star ? "text-[#f6c445]" : ""}`}>{p.figure}</span>
                <span className={`text-sm font-medium ${p.star ? "text-white/70" : "text-[#4b5a52]"}`}>{p.figureNote}</span>
              </div>
              <p className={`mt-4 leading-relaxed ${p.star ? "text-white/80" : "text-[#4b5a52]"}`}>{p.body}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {p.rules.map((r) => (
                  <li key={r} className="flex gap-2.5 text-[0.9rem] leading-relaxed">
                    <Icon.Check className={`mt-1 size-4 shrink-0 ${p.star ? "text-[#f6c445]" : "text-[#165440]"}`} />
                    <span className={p.star ? "text-white/90" : ""}>{r}</span>
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 inline-flex items-center gap-1.5 text-sm font-bold underline underline-offset-4 ${
                  p.star ? "text-white hover:text-[#f6c445]" : "text-[#0e3b2c] hover:text-[#165440]"
                }`}
              >
                Full rules at mainehousing.org
                <Icon.External className="size-3.5" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CtaButton>Talk to us about a home</CtaButton>
          <CallButton dark />
        </div>
      </section>

      {/* ---- Manufactured-home rules ------------------------------------ */}
      <section className="bg-[#0e3b2c] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#f6c445]">For a manufactured home</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-black leading-[1.05] tracking-[-0.025em] sm:text-5xl">
            What MaineHousing asks of the home.
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MANUFACTURED.map((m) => (
              <div key={m.title} className="rounded-2xl bg-[#165440] p-6">
                <span className="grid size-11 place-items-center rounded-lg bg-[#f6c445] text-[#10241c]">
                  <m.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight">{m.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-white/75">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Steps ------------------------------------------------------ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#165440]">How to start</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-black leading-[1.05] tracking-[-0.025em] sm:text-5xl">
          Three steps to a MaineHousing pre-approval.
        </h2>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border-2 border-[#10241c] bg-white p-7 shadow-[6px_6px_0_#10241c]">
              <span className="grid size-12 place-items-center rounded-full bg-[#f6c445] text-xl font-black">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-extrabold tracking-tight">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-[#4b5a52]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- The lender — only when NERTO's lender lists MaineHousing ---- */}
      {lender && writesMaineHousing && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="grid items-center gap-8 rounded-2xl border-2 border-[#d9d2c1] bg-white p-6 sm:p-10 md:grid-cols-[auto_1fr]">
            {lender.photo && (
              <Image
                src={lender.photo}
                alt={`${lender.name}, ${lender.title}`}
                width={160}
                height={160}
                className="size-28 rounded-full object-cover ring-4 ring-[#f6c445] sm:size-36"
              />
            )}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#165440]">
                The lender we work with
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">{lender.name}</h2>
              <p className="mt-1 text-[#4b5a52]">
                {lender.title}, {lender.company} · NMLS #{lender.nmls}
                {lender.companyNmls && <> · Company NMLS #{lender.companyNmls}</>}
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-[#4b5a52]">
                Writes MaineHousing loans and knows how our homes are financed — home, land and site work.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {lender.applyUrl && (
                  <a
                    href={lender.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0e3b2c] px-5 py-3 font-bold text-white transition-colors hover:bg-[#165440]"
                  >
                    Apply with {lender.name.split(" ")[0]}
                    <Icon.External className="size-4" />
                  </a>
                )}
                {lender.phone && (
                  <a
                    href={tel(lender.phone)}
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-[#10241c] px-5 py-3 font-bold transition-colors hover:bg-[#10241c] hover:text-white"
                  >
                    <Icon.Phone className="size-4" />
                    {lender.phone}
                  </a>
                )}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-[#6b7469]">
                {site.name} is not a lender and does not make credit decisions. You may use any lender you
                choose.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ---- Contact: the form, with no qualifying questions -------------- */}
      <section id="contact" className="scroll-mt-6 bg-[#f6c445]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              Questions about a new home and a MaineHousing loan?
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#10241c]/80">
              Send us your number and we&apos;ll call you back — about the homes, the land, and getting
              you to a participating lender. No credit pull to ask.
            </p>
            <div className="mt-8">
              <CallButton dark />
            </div>
          </div>
          <div className="rounded-2xl bg-[#f5f0e4] p-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] sm:p-8">
            <MaineHousingForm />
          </div>
        </div>
      </section>

      {/* ---- Fine print and the legal links ----------------------------- */}
      <footer className="bg-[#10241c] text-white/60">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="max-w-4xl text-xs leading-relaxed">
            {site.name} is not affiliated with, endorsed by or acting for MaineHousing (the Maine State
            Housing Authority), and does not decide eligibility. Program amounts, rates, income limits and
            purchase-price limits are MaineHousing&apos;s, as published on{" "}
            <a href={MH} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              mainehousing.org
            </a>{" "}
            in {CHECKED}, and may change or be withdrawn at any time. Income limits vary by county and
            household size — see MaineHousing&apos;s{" "}
            <a
              href={`${MH}/charts/homebuyer-limits`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              income and cost limits
            </a>
            . All loans are subject to credit approval by the lender. This page is not an offer of credit.
            The MaineHousing logo is used with MaineHousing&apos;s permission.
          </p>
          <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} {site.name} · {site.address.street}, {site.address.city},{" "}
              {site.address.region} {site.address.postalCode}
            </span>
            <span className="flex gap-4">
              <Link href="/privacy-policy" className="underline hover:text-white">
                Privacy policy
              </Link>
              <Link href="/terms" className="underline hover:text-white">
                Terms
              </Link>
            </span>
          </div>
        </div>
      </footer>

      {/* ---- Sticky phone bar, small screens only ----------------------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/10 bg-[#0e3b2c] p-3 md:hidden">
        <a
          href={site.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 py-3 text-sm font-bold text-white"
        >
          <Icon.Phone className="size-4" />
          Call now
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f6c445] py-3 text-sm font-extrabold uppercase tracking-wide text-[#10241c]"
        >
          Send a message
        </a>
      </div>
    </div>
  );
}
