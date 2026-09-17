import { Scale, Facebook, Instagram, ArrowUp } from "lucide-react";
import { useSite } from "@/App";

export default function Footer() {
  const site = useSite();
  return (
    <footer className="border-t border-white/5 py-14" data-testid="footer-section">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 border border-[#C5A059]/60 flex items-center justify-center text-[#C5A059]"><Scale size={16} /></span>
            <div>
              <p className="font-display text-lg">{site.brand}</p>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#646E82]">{site.name} · {site.oab}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {site.social?.facebook && (
              <a data-testid="footer-facebook-link" href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#A1A8B8] hover:text-[#C5A059] hover:border-[#C5A059]/60 transition-colors duration-300"><Facebook size={15} /></a>
            )}
            {site.social?.instagram && (
              <a data-testid="footer-instagram-link" href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#A1A8B8] hover:text-[#C5A059] hover:border-[#C5A059]/60 transition-colors duration-300"><Instagram size={15} /></a>
            )}
            <button data-testid="footer-back-top" onClick={() => window.__lenis?.scrollTo(0)} aria-label="Voltar ao topo" className="w-10 h-10 border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A0D14] transition-colors duration-300"><ArrowUp size={15} /></button>
          </div>
        </div>
        <div className="mt-10 pt-7 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-[11px] text-[#646E82]">© 2026 {site.brand}. Todos os direitos reservados.</p>
          <p className="text-[11px] text-[#646E82]">Conteúdo em conformidade com o Código de Ética e Disciplina da OAB e o Provimento 205/2021.</p>
        </div>
      </div>
    </footer>
  );
}
