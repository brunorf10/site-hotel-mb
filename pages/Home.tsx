import React from "react";
import { Hero } from "../components/Hero";
import { Gallery } from "../components/Gallery";
import { RoomsSection } from "../components/RoomsSection";
import { EventsSection } from "../components/EventsSection";
import { ContactSection } from "../components/ContactSection";

interface HomeProps {
  onOpenBooking: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenBooking }) => {
  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <main>
      <Hero />

      {/* Seção Galeria - Fundo Branco Puro */}
      <section id="galeria" className="py-24 bg-white">
        <Gallery />
      </section>

      {/* Seção Acomodações - Fundo Cinza Pedra Suave para contraste */}
      <section
        id="acomodacoes"
        className="py-24 bg-stone-50 border-y border-stone-100"
      >
        <RoomsSection onOpenBooking={onOpenBooking} />
      </section>

      {/* Seção Eventos - Fundo Branco Puro */}
      <section id="eventos" className="py-24 bg-white">
        <EventsSection onOpenBooking={onOpenBooking} />
      </section>

      {/* Seção Contato - Fundo Bege Palha Suave para delimitar o final */}
      <section
        id="contato"
        className="py-24 bg-[#FAF9F6] border-t border-stone-100"
      >
        <ContactSection />
      </section>
    </main>
  );
};
