import { MapPin, Clock, Navigation } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { useSite } from "@/App";

const DAYS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

function isOpenNow(hours) {
  try {
    const today = DAYS[new Date().getDay()];
    const row = hours.find((h) => h.day?.toLowerCase() === today);
    if (!row || !row.hours || /fechado/i.test(row.hours)) return false;
    const m = row.hours.match(/(\d{1,2}):?(\d{2})?\s*[–-]\s*(\d{1,2}):?(\d{2})?/);
    if (!m) return null;
    const now = new Date();
    const cur = now.getHours() * 60 + now.getMinutes();
    const start = parseInt(m[1]) * 60 + parseInt(m[2] || "0");
    const end = parseInt(m[3]) * 60 + parseInt(m[4] || "0");
    return cur >= start && cur <= end;
  } catch {
    return null;
  }
}

export default function HoursMap() {
  const site = useSite();
  if (!site.address) return null;
  const open = site.hours?.length ? isOpenNow(site.hours) : null;

  return (
    <section id="horarios" className="py-28 sm:py-36" data-testid="horarios-section">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal><Eyebrow>Horários & Localização</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight mt-5">
            Visite o <span className="italic text-[#C5A059]">escritório</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 mt-14">
          <Reveal delay={0.15}>
            <div className="border border-white/5 bg-[#111622] p-8 h-full">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#A1A8B8]"><Clock size={13} className="text-[#C5A059]" /> Funcionamento</span>
                {open !== null && (
                  <span data-testid="hours-status-badge" className={`inline-flex items-center gap-2 font-mono2 text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border ${open ? "text-emerald-300 border-emerald-400/30 bg-emerald-400/10" : "text-[#A1A8B8] border-white/10 bg-white/5"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-emerald-300 animate-pulse" : "bg-[#646E82]"}`} />
                    {open ? "Aberto agora" : "Fechado no momento"}
                  </span>
                )}
              </div>
              <ul className="mt-7 divide-y divide-white/5">
                {(site.hours || []).map((h, i) => (
                  <li key={i} className="flex items-center justify-between py-3.5" data-testid={`hours-row-${i}`}>
                    <span className="text-sm text-[#F5F3EF] capitalize">{h.day}</span>
                    <span className="font-mono2 text-xs text-[#A1A8B8]">{h.hours}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-7 border-t border-white/5">
                <p className="inline-flex items-start gap-2.5 text-sm text-[#A1A8B8] leading-relaxed"><MapPin size={15} className="text-[#C5A059] mt-0.5 shrink-0" /> {site.address}</p>
                <a
                  data-testid="hours-directions-link"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery || site.address)}`}
                  target="_blank" rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2.5 border border-[#C5A059]/60 text-[#C5A059] text-xs uppercase tracking-[0.2em] px-5 py-3 hover:bg-[#C5A059] hover:text-[#0A0D14] transition-colors duration-300"
                >
                  <Navigation size={13} /> Traçar rota
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="relative h-full min-h-[380px] border border-white/5 overflow-hidden" data-testid="map-frame">
              <iframe
                title="Mapa de localização"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery || site.address)}&output=embed`}
                className="absolute inset-0 w-full h-full grayscale invert-[0.92] contrast-[0.85] opacity-90"
                loading="lazy"
              />
              <span className="absolute inset-0 border border-[#C5A059]/20 pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
