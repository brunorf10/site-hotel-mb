import React from "react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
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
    <section className="relative h-[70vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background com imagem de um lobby moderno e sofisticado com pé direito alto */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2070"
          alt="Lobby moderno e luxuoso com pé direito alto do Hotel Maria Bastos"
          className="w-full h-full object-cover brightness-[0.6] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-accent uppercase tracking-[0.3em] font-bold text-sm mb-6"
        >
          BEM-VINDO AO HOTEL MARIA BASTOS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif mb-8 leading-tight"
        >
          Onde o Luxo Encontra a{" "}
          <span className="italic">Tranquilidade do Sertão</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection("acomodacoes")}
            className="w-full sm:w-auto bg-accent text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all shadow-xl active:scale-95"
          >
            Explorar Quartos
          </button>
          <button
            onClick={() => scrollToSection("galeria")}
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all active:scale-95"
          >
            Ver Experiências
          </button>
        </motion.div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70 cursor-pointer"
        onClick={() => scrollToSection("galeria")}
      >
        <span className="text-white text-xs uppercase tracking-widest">
          Descubra mais
        </span>
        <span className="material-symbols-outlined text-white">
          keyboard_double_arrow_down
        </span>
      </div>
    </section>
  );
};
