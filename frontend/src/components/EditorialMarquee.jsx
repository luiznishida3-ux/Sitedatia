const ITEMS = ["Rigor Técnico", "Ética", "Discrição", "Resultados", "Atendimento Personalizado", "Transparência"];

export default function EditorialMarquee() {
  return (
    <section className="border-y border-[#C5A059]/15 py-6 overflow-hidden bg-[#0C1019]" data-testid="editorial-marquee">
      <div className="marquee-track flex whitespace-nowrap w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center" aria-hidden={k === 1}>
            {ITEMS.map((t, i) => (
              <span key={i} className="flex items-center">
                <span className="font-display italic text-2xl sm:text-3xl text-[#F5F3EF]/70 px-8">{t}</span>
                <span className="text-[#C5A059] text-[10px]">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
