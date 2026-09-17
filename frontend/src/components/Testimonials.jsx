import { Star, BadgeCheck } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { useSite } from "@/App";

const Stars = ({ n }) => (
  <span className="inline-flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={13} className={i <= n ? "fill-[#C5A059] text-[#C5A059]" : "text-[#3A4358]"} />
    ))}
  </span>
);

export default function Testimonials() {
  const site = useSite();
  const reviews = site.reviews || [];
  if (!reviews.length) return null;

  return (
    <section id="depoimentos" className="py-28 sm:py-36 bg-[#0C1019] border-y border-white/5" data-testid="depoimentos-section">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal><Eyebrow>Depoimentos</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight mt-5">
                Quem confiou, <span className="italic text-[#C5A059]">recomenda</span>
              </h2>
            </Reveal>
            {site.rating && (
              <Reveal delay={0.2}>
                <div className="mt-10 flex items-end gap-4">
                  <span className="font-display text-7xl leading-none text-[#F5F3EF]">{String(site.rating).replace(".", ",")}</span>
                  <div className="pb-2">
                    <Stars n={Math.round(site.rating)} />
                    <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#646E82] mt-2">{site.reviewsCount} avaliações no Google</p>
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={0.06 * i} y={24} className={i % 3 === 1 ? "sm:mt-10" : ""}>
                <article data-testid={`testimonial-card-${i}`} className="h-full bg-[#111622] border border-white/5 p-7 transition-colors duration-500 hover:border-[#C5A059]/30">
                  <div className="flex items-center gap-3">
                    {r.photo ? (
                      <img src={r.photo} alt={r.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full object-cover border border-[#C5A059]/30" />
                    ) : (
                      <span className="w-10 h-10 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center font-display text-[#C5A059]">{r.name?.[0] || "A"}</span>
                    )}
                    <div>
                      <p className="text-sm font-medium text-[#F5F3EF] inline-flex items-center gap-1.5">
                        {r.name} <BadgeCheck size={13} className="text-[#C5A059]" />
                      </p>
                      <Stars n={r.stars || 5} />
                    </div>
                  </div>
                  <p className="text-sm text-[#A1A8B8] leading-relaxed mt-5">“{r.text}”</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
