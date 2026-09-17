import { Scale, Users, ScrollText, Shield, FileText, Handshake, ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { scrollToId } from "@/components/NavigationHeader";
import { useSite } from "@/App";

const ICONS = { Scale, Users, ScrollText, Shield, FileText, Handshake };

export default function PracticeAreas() {
  const site = useSite();
  return (
    <section id="atuacao" className="py-28 sm:py-36 bg-[#0C1019] border-y border-white/5" data-testid="atuacao-section">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><Eyebrow>Áreas de atuação</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight mt-5">
                Especialidades do <span className="italic text-[#C5A059]">escritório</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-sm text-[#646E82] max-w-xs leading-relaxed">Atuação contenciosa e consultiva, sempre com estratégia desenhada para o seu caso.</p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 mt-16 border border-white/5">
          {site.practiceAreas.map((a, i) => {
            const Icon = ICONS[a.icon] || Scale;
            return (
              <Reveal key={a.title} delay={0.06 * i} y={24}>
                <button
                  data-testid={`practice-area-card-${i}`}
                  onClick={() => scrollToId("contato")}
                  className="group relative w-full h-full text-left bg-[#0C1019] p-8 sm:p-10 transition-colors duration-500 hover:bg-[#111622]"
                >
                  <div className="flex items-start justify-between">
                    <span className="w-11 h-11 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] transition-colors duration-500 group-hover:bg-[#C5A059] group-hover:text-[#0A0D14]">
                      <Icon size={18} />
                    </span>
                    <span className="font-mono2 text-[10px] text-[#646E82] tracking-[0.2em]">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-2xl mt-8 text-[#F5F3EF]">{a.title}</h3>
                  <p className="text-sm text-[#A1A8B8] leading-relaxed mt-3">{a.desc}</p>
                  <span className="inline-flex items-center gap-2 font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mt-7 opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                    Consultar <ArrowUpRight size={12} />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-px bg-[#C5A059] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
