import { useState } from "react";
import { MessageCircle, Phone, MapPin, Send, Facebook, Instagram } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { useSite } from "@/App";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls = "w-full bg-[#0A0D14] border border-white/10 focus:border-[#C5A059]/70 outline-none px-4 py-3.5 text-sm text-[#F5F3EF] placeholder:text-[#646E82] transition-colors duration-300";

export default function ContactCTA() {
  const site = useSite();
  const [form, setForm] = useState({ name: "", phone: "", area: "", message: "" });
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Preencha ao menos nome e telefone.");
      return;
    }
    setSending(true);
    try {
      const r = await fetch(`${API}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error();
      toast.success("Recebemos o seu contato. Retornaremos em breve.");
      setForm({ name: "", phone: "", area: "", message: "" });
    } catch {
      toast.error("Não foi possível enviar. Tente pelo WhatsApp ou telefone.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contato" className="py-28 sm:py-36 bg-[#0C1019] border-t border-white/5 relative overflow-hidden" data-testid="contato-section">
      <div className="absolute -bottom-48 -right-48 w-[34rem] h-[34rem] rounded-full bg-[#C5A059]/[0.06] blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <Reveal><Eyebrow>Contato</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl leading-[1.12] tracking-tight mt-5">
                O primeiro passo é uma <span className="italic text-[#C5A059]">conversa</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#A1A8B8] leading-relaxed mt-6 max-w-md">
                Conte o seu caso com sigilo e sem compromisso. A análise inicial é feita pessoalmente pela {site.name}.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 space-y-4">
                {site.whatsapp && (
                  <a data-testid="contact-whatsapp-link" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Olá, gostaria de agendar uma consulta.")}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 border border-white/10 bg-[#0A0D14] px-5 py-4 hover:border-[#C5A059]/60 transition-colors duration-300 group">
                    <MessageCircle size={18} className="text-[#C5A059]" />
                    <span className="text-sm text-[#F5F3EF] group-hover:text-[#C5A059] transition-colors">Chamar no WhatsApp</span>
                  </a>
                )}
                {site.phone && (
                  <a data-testid="contact-phone-link" href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-4 border border-white/10 bg-[#0A0D14] px-5 py-4 hover:border-[#C5A059]/60 transition-colors duration-300 group">
                    <Phone size={18} className="text-[#C5A059]" />
                    <span className="text-sm text-[#F5F3EF] group-hover:text-[#C5A059] transition-colors">{site.phone}</span>
                  </a>
                )}
                {site.address && (
                  <div className="flex items-center gap-4 border border-white/10 bg-[#0A0D14] px-5 py-4" data-testid="contact-address">
                    <MapPin size={18} className="text-[#C5A059] shrink-0" />
                    <span className="text-sm text-[#A1A8B8]">{site.address}</span>
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  {site.social?.facebook && (
                    <a data-testid="contact-facebook-link" href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-11 h-11 border border-white/10 flex items-center justify-center text-[#A1A8B8] hover:text-[#C5A059] hover:border-[#C5A059]/60 transition-colors duration-300">
                      <Facebook size={16} />
                    </a>
                  )}
                  {site.social?.instagram && (
                    <a data-testid="contact-instagram-link" href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-11 h-11 border border-white/10 flex items-center justify-center text-[#A1A8B8] hover:text-[#C5A059] hover:border-[#C5A059]/60 transition-colors duration-300">
                      <Instagram size={16} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <form onSubmit={submit} className="border border-white/10 bg-[#111622] p-7 sm:p-9 space-y-5" data-testid="contact-form">
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#C5A059]">Solicite uma análise do seu caso</p>
              <input data-testid="contact-input-name" value={form.name} onChange={set("name")} placeholder="Seu nome" className={inputCls} />
              <input data-testid="contact-input-phone" value={form.phone} onChange={set("phone")} placeholder="Seu telefone / WhatsApp" className={inputCls} />
              <select data-testid="contact-input-area" value={form.area} onChange={set("area")} className={`${inputCls} appearance-none`}>
                <option value="">Área do seu caso</option>
                {site.practiceAreas.map((a) => <option key={a.title} value={a.title}>{a.title}</option>)}
                <option value="Outro">Outro assunto</option>
              </select>
              <textarea data-testid="contact-input-message" value={form.message} onChange={set("message")} placeholder="Descreva brevemente o seu caso" rows={4} className={`${inputCls} resize-none`} />
              <button data-testid="contact-form-submit-button" type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-3 bg-[#C5A059] text-[#0A0D14] text-xs uppercase tracking-[0.2em] font-semibold px-7 py-4 transition-colors duration-300 hover:bg-[#D8B46E] disabled:opacity-60">
                {sending ? "Enviando..." : "Enviar solicitação"} <Send size={13} />
              </button>
              <p className="text-[11px] text-[#646E82] leading-relaxed">Suas informações são tratadas com sigilo profissional, conforme o Código de Ética e Disciplina da OAB.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
