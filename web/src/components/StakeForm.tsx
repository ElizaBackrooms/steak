import { LINKS } from "@/lib/constants";

export default function StakeForm() {
  const formUrl = LINKS.googleForm || null;

  return (
    <section id="register" className="px-4 py-20">
      <div className="blood-card mx-auto max-w-xl rounded-2xl border border-steak-red/20 bg-steak-900/85 p-8 text-center backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">Register</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-steak-cream">Google form</h2>
        <p className="mt-3 text-sm text-steak-cream/60">
          After you lock on Streamflow, fill out the form with your wallet address so we can send fee airdrops.
        </p>

        {formUrl ? (
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="blood-glow mt-8 inline-block w-full rounded-full bg-steak-red px-8 py-4 font-bold text-white transition hover:bg-steak-red/90 sm:w-auto"
          >
            Open registration form
          </a>
        ) : (
          <p className="mt-8 rounded-xl border border-dashed border-steak-cream/20 px-4 py-6 text-sm text-steak-cream/50">
            Set <code className="text-steak-red">NEXT_PUBLIC_GOOGLE_FORM_URL</code> after you create the form.
          </p>
        )}
      </div>
    </section>
  );
}
