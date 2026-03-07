import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-primary text-white pt-12 md:pt-20 pb-8 md:pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="flex flex-col -space-y-1">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-0.5">
                  Hotel
                </span>
                <h2 className="text-2xl font-bold font-serif text-white group-hover:text-accent transition-colors">
                  MARIA BASTOS
                </h2>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Conforto e hospitalidade no coração de Tauá-CE. Vista panorâmica
              da cidade, restaurante com culinária regional, café da manhã
              incluso e espaços para eventos.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/hotelmbtaua"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all text-white/70 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">
                  photo_camera
                </span>
              </a>
              <a
                href="https://wa.me/5588963722226"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all text-white/70 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">
                  chat
                </span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-accent">
              Navegação
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#acomodacoes"
                  onClick={(e) => scrollToSection(e, "acomodacoes")}
                  className="hover:text-white transition-colors"
                >
                  Acomodações
                </a>
              </li>
              <li>
                <a
                  href="#eventos"
                  onClick={(e) => scrollToSection(e, "eventos")}
                  className="hover:text-white transition-colors"
                >
                  Eventos
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  onClick={(e) => scrollToSection(e, "galeria")}
                  className="hover:text-white transition-colors"
                >
                  Galeria de Fotos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-accent">
              Apoio ao Cliente
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  onClick={(e) => scrollToSection(e, "contato")}
                  className="hover:text-white transition-colors"
                >
                  Contacte-nos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenBooking();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Reservas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Localização
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-accent">
              Legal
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <Link
                  to="/politica-de-privacidade"
                  className="hover:text-white transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Acessibilidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-gray-500 uppercase tracking-widest">
            © 2025 Hotel Maria Bastos. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">
                language
              </span>
              Português (BR)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
