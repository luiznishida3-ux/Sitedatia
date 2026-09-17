import { Reveal, Eyebrow } from "@/components/Reveal";
import { useSite } from "@/App";

export default function ManifestoSection() {
  const site = useSite();
  return (
    <section id="sobre" className="py-28 sm:py-36" data-testid="sobre-section">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal><Eyebrow>Sobre o escritório</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl leading-[1.12] tracking-tight mt-5 max-w-3xl">
            Uma advocacia <span className="italic text-[#C5A059]">artesanal</span>, feita de escuta, estudo e estratégia.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-14 mt-16">
          <div className="lg:col-span-5 space-y-6">
            {site.about.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p className="text-[#A1A8B8] leading-relaxed text-base">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <p className="font-display italic text-2xl text-[#C5A059] mt-8">{site.name}</p>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#646E82] mt-2">{site.oab}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-0 border-t border-white/5">
            {site.values.map((v, i) => (
              <Reveal key={v.num} delay={0.1 + i * 0.08}>
                <div className="group grid sm:grid-cols-12 gap-4 sm:gap-8 py-8 border-b border-white/5 transition-colors duration-500 hover:bg-white/[0.02] px-2 sm:px-4" data-testid={`manifesto-chapter-${i}`}>
                  <span className="sm:col-span-2 font-mono2 text-xs text-[#C5A059] tracking-[0.25em] pt-1">CAP. {v.num}</span>
                  <h3 className="sm:col-span-4 font-display text-2xl text-[#F5F3EF]">{v.title}</h3>
                  <p className="sm:col-span-6 text-sm text-[#A1A8B8] leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
