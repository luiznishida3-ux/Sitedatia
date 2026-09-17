import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { useSite } from "@/App";

export default function Gallery() {
  const site = useSite();
  const [selected, setSelected] = useState(null);
  const images = site.gallery || [];
  if (!images.length) return null;

  return (
    <section id="galeria" className="py-28 sm:py-36" data-testid="galeria-section">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal><Eyebrow>Galeria</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight mt-5">
            O <span className="italic text-[#C5A059]">espaço</span> do escritório
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] gap-3 mt-14">
          {images.map((src, i) => (
            <Reveal key={src + i} delay={0.05 * i} y={20} className={i === 0 ? "col-span-2 row-span-2" : ""}>
              <button
                data-testid={`gallery-image-${i}`}
                onClick={() => setSelected(src)}
                className="group relative w-full h-full overflow-hidden block"
              >
                <img src={src} alt={`${site.brand} — foto ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-[#0A0D14]/0 group-hover:bg-[#0A0D14]/25 transition-colors duration-500" />
                <span className="absolute inset-3 border border-[#F5F3EF]/0 group-hover:border-[#C5A059]/50 transition-colors duration-500 pointer-events-none" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            data-testid="gallery-lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#0A0D14]/95 backdrop-blur-md flex items-center justify-center p-5"
            onClick={() => setSelected(null)}
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={selected} alt="Foto ampliada" className="max-w-full max-h-[85vh] object-contain border border-[#C5A059]/30"
            />
            <button data-testid="gallery-lightbox-close" className="absolute top-6 right-6 text-[#F5F3EF] hover:text-[#C5A059] transition-colors" aria-label="Fechar">
              <X size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
