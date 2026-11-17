"use client";

import { useActionState, useState } from "react";
import { requestPreApproval } from "@/app/land-deals/actions";
import { EMPTY_LEAD_STATE } from "@/lib/land/lead";
import { site } from "@/lib/site";
import { cx, Icon } from "./ui";
import { LeadContext } from "./lead-context";

/**
 * The form on the `/mainehousing-financing` landing page.
 *
 * It posts to the same Server Action as every pre-approval form
 * (`app/land-deals/actions.ts`, source `mainehousing-page`), but is styled
 * on the landing page's own palette rather than the site's tokens.
 *
 * It deliberately does NOT ask which program the visitor fits. An earlier
 * version offered "which sounds most like you?" chips (first generation,
 * veteran, "I own a home now", replacing an old mobile home…). MaineHousing
 * asked about them in November 2026 — the replacement program's funding is
 * limited and may not exist for 2027, and current owners are mostly outside
 * these programs — so eligibility is left to MaineHousing's own pages and a
 * participating lender. Don't add a qualifying question back here.
 */

const field =
  "mt-2 w-full rounded-lg border-2 border-[#d9d2c1] bg-white px-4 py-3 text-[0.95rem] text-[#10241c] placeholder:text-[#8a8577] transition-colors focus:border-[#0e3b2c] focus:outline-none";
const label = "text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#4b5a52]";

export function MaineHousingForm() {
  const [state, action, pending] = useActionState(requestPreApproval, EMPTY_LEAD_STATE);
  const err = state.fieldErrors ?? {};
  const was = state.values ?? {};
  const [extra, setExtra] = useState("");

  if (state.status === "ok") {
    return (
      <div className="flex flex-col items-start gap-4 py-6">
        <span className="grid size-12 place-items-center rounded-full bg-[#0e3b2c] text-[#f6c445]">
          <Icon.Check className="size-6" />
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-[#10241c]">
          Got it — you&apos;re in the queue.
        </h3>
        <p className="leading-relaxed text-[#4b5a52]">{state.message}</p>
        <a href={site.phoneHref} className="font-bold text-[#0e3b2c] underline underline-offset-4">
          Can&apos;t wait? Call {site.phone}
        </a>
      </div>
    );
  }

  const notes = extra.trim();

  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="source" value="mainehousing-page" />
      <input type="hidden" name="notes" value={notes} />
      {/* Honeypot: real people leave this empty. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <LeadContext />

      <label className="block">
        <span className={label}>Your name</span>
        <input
          name="name"
          autoComplete="name"
          placeholder="Alex Whitfield"
          defaultValue={was.name}
          required
          aria-invalid={!!err.name}
          className={cx(field, err.name && "border-[#c2410c]")}
        />
        {err.name && <span className="mt-1.5 block text-xs font-semibold text-[#c2410c]">{err.name}</span>}
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Mobile number</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(207) 555-0123"
            defaultValue={was.phone}
            required
            aria-invalid={!!err.phone}
            className={cx(field, err.phone && "border-[#c2410c]")}
          />
          {err.phone && (
            <span className="mt-1.5 block text-xs font-semibold text-[#c2410c]">{err.phone}</span>
          )}
        </label>
        <label className="block">
          <span className={label}>Email (optional)</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@example.com"
            defaultValue={was.email}
            aria-invalid={!!err.email}
            className={cx(field, err.email && "border-[#c2410c]")}
          />
          {err.email && (
            <span className="mt-1.5 block text-xs font-semibold text-[#c2410c]">{err.email}</span>
          )}
        </label>
      </div>

      <label className="block">
        <span className={label}>Do you have land?</span>
        <select name="landStatus" defaultValue={was.landStatus ?? "looking"} className={field}>
          <option value="own">I already own it</option>
          <option value="under-contract">Under contract on a parcel</option>
          <option value="found">Found one I like</option>
          <option value="looking">Still looking</option>
          <option value="no-idea">No idea where to start</option>
        </select>
      </label>

      <label className="block">
        <span className={label}>Anything else? (optional)</span>
        <textarea
          rows={2}
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          placeholder="Credit questions, a parcel, bedrooms you need…"
          className={field}
        />
      </label>

      {state.status === "error" && (
        <p role="alert" className="rounded-lg bg-[#fde8dc] px-4 py-3 text-sm font-semibold text-[#9a3412]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#f6c445] px-6 py-4 text-base font-extrabold uppercase tracking-wide text-[#10241c] shadow-[0_4px_0_#c99a1e] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send"}
        {!pending && <Icon.Arrow className="size-4 transition-transform group-hover:translate-x-1" />}
      </button>
      <p className="text-center text-xs leading-relaxed text-[#6b7469]">
        Free, no obligation, no credit pull to ask. A person calls you back — usually the same day.
      </p>
    </form>
  );
}
