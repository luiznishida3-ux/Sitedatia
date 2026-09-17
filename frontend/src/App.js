import { createContext, useContext, useEffect, useState } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import NavigationHeader from "@/components/NavigationHeader";
import KineticHero from "@/components/KineticHero";
import EditorialMarquee from "@/components/EditorialMarquee";
import ManifestoSection from "@/components/ManifestoSection";
import PracticeAreas from "@/components/PracticeAreas";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import HoursMap from "@/components/HoursMap";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function App() {
  const [site, setSite] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    fetch(`${API}/site`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setSite)
      .catch(() => setError(true));
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null; };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0D14] flex items-center justify-center text-[#A1A8B8] text-sm tracking-wide" data-testid="site-error">
        Não foi possível carregar os dados do site. Tente novamente em instantes.
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-[#0A0D14] flex items-center justify-center" data-testid="site-loading">
        <div className="w-10 h-10 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <SiteContext.Provider value={site}>
      <div className="bg-[#0A0D14] text-[#F5F3EF] min-h-screen overflow-x-clip">
        <div className="noise-overlay" />
        <NavigationHeader />
        <main>
          <KineticHero />
          <EditorialMarquee />
          <ManifestoSection />
          <PracticeAreas />
          <Gallery />
          <Testimonials />
          <HoursMap />
          <ContactCTA />
        </main>
        <Footer />
        <Toaster position="bottom-right" theme="dark" />
      </div>
    </SiteContext.Provider>
  );
}

export default App;
