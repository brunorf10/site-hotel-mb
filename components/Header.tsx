import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom";

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/#" + id);
      return;
    }

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
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center cursor-pointer group"
          onClick={() => {
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          {/* Identidade Visual apenas com Texto - Estilo Minimalista Premium */}
          <div className="flex flex-col -space-y-1">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-80 mb-0.5">
              Hotel
            </span>
            <h1 className="text-xl md:text-2xl font-bold font-serif tracking-tight text-primary transition-colors group-hover:text-accent">
              MARIA BASTOS
            </h1>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <a
            href="#acomodacoes"
            onClick={(e) => scrollToSection(e, "acomodacoes")}
            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
          >
            Acomodações
          </a>
          <a
            href="#eventos"
            onClick={(e) => scrollToSection(e, "eventos")}
            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
          >
            Eventos
          </a>
          <a
            href="#galeria"
            onClick={(e) => scrollToSection(e, "galeria")}
            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
          >
            Galeria
          </a>
          <a
            href="#contato"
            onClick={(e) => scrollToSection(e, "contato")}
            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
          >
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="hidden sm:flex bg-primary text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            Reservar Agora
          </button>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <span className="material-symbols-outlined text-gray-900">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl"
        >
          <a
            href="#acomodacoes"
            onClick={(e) => scrollToSection(e, "acomodacoes")}
            className="text-lg font-medium"
          >
            Acomodações
          </a>
          <a
            href="#eventos"
            onClick={(e) => scrollToSection(e, "eventos")}
            className="text-lg font-medium"
          >
            Eventos
          </a>
          <a
            href="#galeria"
            onClick={(e) => scrollToSection(e, "galeria")}
            className="text-lg font-medium"
          >
            Galeria
          </a>
          <a
            href="#contato"
            onClick={(e) => scrollToSection(e, "contato")}
            className="text-lg font-medium"
          >
            Contato
          </a>
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenBooking();
            }}
            className="bg-primary text-white px-6 py-3 rounded-full text-base font-bold"
          >
            Reservar Agora
          </button>
        </motion.div>
      )}
    </header>
  );
};
