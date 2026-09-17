import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle, Star } from "lucide-react";
import { MaskedLine, Eyebrow } from "@/components/Reveal";
import { scrollToId } from "@/components/NavigationHeader";
import { useSite } from "@/App";

export default function KineticHero() {
  const site = useSite();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-160, 160], [6, -6]);
  const rotateY = useTransform(mx, [-160, 160], [-6, 6]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" onMouseMove={onMove} data-testid="hero-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-[#C5A059]/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 -left-40 w-[30rem] h-[30rem] rounded-full bg-[#0D2B26]/70 blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-5 pt-32 pb-24 grid lg:grid-cols-12 gap-14 items-center relative z-10 w-full">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <Eyebrow>{site.brand} · {site.oab}</Eyebrow>
          </motion.div>
          <h1 className="font-display font-medium leading-[1.02] mt-6 text-5xl sm:text-6xl lg:text-7xl tracking-tight">
            <MaskedLine delay={0.35}>Advocacia com</MaskedLine>
            <MaskedLine delay={0.5}><span className="italic text-[#C5A059]">rigor técnico</span></MaskedLine>
            <MaskedLine delay={0.65}>e resultado.</MaskedLine>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.8 }} className="mt-7 max-w-xl text-[#A1A8B8] text-base sm:text-lg leading-relaxed">
            {site.tagline} Conduzido pessoalmente pela {site.name}.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="mt-9 flex flex-wrap items-center gap-4">
            <button data-testid="hero-cta-agendar" onClick={() => scrollToId("contato")} className="group inline-flex items-center gap-3 bg-[#C5A059] text-[#0A0D14] text-xs uppercase tracking-[0.2em] font-semibold px-7 py-4 transition-colors duration-300 hover:bg-[#D8B46E]">
              Agendar consulta
              <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
            {site.whatsapp && (
              <a data-testid="hero-cta-whatsapp" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Olá, gostaria de agendar uma consulta.")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border border-white/15 text-[#F5F3EF] text-xs uppercase tracking-[0.2em] px-7 py-4 transition-colors duration-300 hover:border-[#C5A059]/70 hover:text-[#C5A059]">
                <MessageCircle size={14} /> WhatsApp
              </a>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }} className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <p className="font-display text-2xl text-[#F5F3EF]">{site.oab}</p>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#646E82] mt-1">Registro profissional</p>
            </div>
            <div>
              <p className="font-display text-2xl text-[#F5F3EF]">{site.practiceAreas?.length || 0} áreas</p>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#646E82] mt-1">De atuação</p>
            </div>
            {site.rating && (
              <div>
                <p className="font-display text-2xl text-[#F5F3EF] inline-flex items-center gap-2">{String(site.rating).replace(".", ",")} <Star size={16} className="fill-[#C5A059] text-[#C5A059]" /></p>
                <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#646E82] mt-1">{site.reviewsCount} avaliações no Google</p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="lg:col-span-5" style={{ perspective: 1200 }}>
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-sm mx-auto"
          >
            <div className="absolute -inset-0 border border-[#C5A059]/30 translate-x-4 translate-y-4 pointer-events-none" />
            <img src={site.portrait} alt={site.name} className="w-full aspect-[4/5] object-cover contrast-105" data-testid="hero-portrait" />
            <div className="absolute bottom-4 left-4 right-4 bg-[#0A0D14]/85 backdrop-blur-md border border-white/10 px-4 py-3" style={{ transform: "translateZ(40px)" }}>
              <p className="font-display text-lg leading-tight">{site.name}</p>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mt-1">{site.category} · {site.oab}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-[#646E82]">
        <span className="font-mono2 text-[10px] uppercase tracking-[0.3em]">Role</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ArrowDown size={14} /></motion.span>
      </motion.div>
    </section>
  );
}
