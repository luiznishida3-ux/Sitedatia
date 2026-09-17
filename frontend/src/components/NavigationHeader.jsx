import { useEffect, useState } from "react";
import { Scale, Menu, X } from "lucide-react";
import { useSite } from "@/App";

export const scrollToId = (id) => {
  if (window.__lenis) window.__lenis.scrollTo(`#${id}`, { offset: -72 });
  else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function NavigationHeader() {
  const site = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { id: "sobre", label: "Sobre" },
    { id: "atuacao", label: "Atuação" },
    ...(site.gallery?.length ? [{ id: "galeria", label: "Galeria" }] : []),
    ...(site.reviews?.length ? [{ id: "depoimentos", label: "Depoimentos" }] : []),
    { id: "contato", label: "Contato" },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-[#0A0D14]/85 backdrop-blur-xl border-b border-white/5 py-3" : "py-5"}`}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <button data-testid="nav-logo" onClick={() => window.__lenis?.scrollTo(0)} className="flex items-center gap-3 group">
          <span className="w-9 h-9 border border-[#C5A059]/60 flex items-center justify-center text-[#C5A059] transition-colors duration-300 group-hover:bg-[#C5A059] group-hover:text-[#0A0D14]">
            <Scale size={16} />
          </span>
          <span className="font-display text-lg tracking-wide">{site.brand}</span>
        </button>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l.id} data-testid={`nav-link-${l.id}`} onClick={() => scrollToId(l.id)} className="text-xs uppercase tracking-[0.2em] text-[#A1A8B8] hover:text-[#C5A059] transition-colors duration-300">
              {l.label}
            </button>
          ))}
          <button data-testid="nav-cta-agendar" onClick={() => scrollToId("contato")} className="text-xs uppercase tracking-[0.2em] border border-[#C5A059]/70 text-[#C5A059] px-5 py-2.5 hover:bg-[#C5A059] hover:text-[#0A0D14] transition-colors duration-300">
            Agendar consulta
          </button>
        </nav>
        <button data-testid="nav-menu-toggle" className="md:hidden text-[#F5F3EF]" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0A0D14]/95 backdrop-blur-xl border-t border-white/5 px-5 py-6 flex flex-col gap-5" data-testid="nav-mobile-menu">
          {links.map((l) => (
            <button key={l.id} data-testid={`nav-link-mobile-${l.id}`} onClick={() => { setOpen(false); scrollToId(l.id); }} className="text-left text-sm uppercase tracking-[0.2em] text-[#A1A8B8]">
              {l.label}
            </button>
          ))}
          <button data-testid="nav-cta-mobile" onClick={() => { setOpen(false); scrollToId("contato"); }} className="text-left text-sm uppercase tracking-[0.2em] text-[#C5A059]">
            Agendar consulta
          </button>
        </div>
      )}
    </header>
  );
}
