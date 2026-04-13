
import React from 'react';
import { motion } from 'framer-motion';
import { BookingType } from '../App';

interface EventsSectionProps {
  onOpenBooking: (type: BookingType, preSelected?: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenBooking }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-6"
    >
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex items-start justify-center text-center p-6 pt-10 md:p-8 md:pt-16 mb-10 md:mb-20 shadow-2xl">
        <img 
          src="/images/optimized/eventos/banner-eventos-lg.webp" 
          alt="Salão de eventos luxuoso" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl font-serif text-white mb-4 md:mb-6"
          >
            Eventos de Excelência
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 md:mb-10 leading-relaxed"
          >
            Instalações climatizadas e serviços personalizados para reuniões corporativas, conferências e celebrações inesquecíveis.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenBooking("evento")}
            className="bg-accent text-primary px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg hover:bg-white transition-all shadow-xl"
          >
            Solicite uma Proposta
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Auditório",
            value: "Auditório (170 pessoas)",
            cap: "170 pessoas",
            desc: "Climatizado, serviço de som e imagem, toaletes masculino e feminino",
            img: "/images/optimized/eventos/auditorio-01-lg.webp"
          },
          {
            title: "Sala de Reuniões",
            value: "Sala de Reuniões (20 pessoas)",
            cap: "20 pessoas",
            desc: "Climatizada, móveis projetados, serviço de som e imagem",
            img: "/images/optimized/eventos/sala-reunioes-01-lg.webp"
          },
          {
            title: "Salão de Eventos",
            value: "Salão de Eventos (Restaurante)",
            cap: "Sob consulta",
            desc: "Localizado no Restaurante Maria Bastos — ideal para aniversários, casamentos e confraternizações com buffet customizado incluso",
            img: "/images/optimized/eventos/ambiente-restaurante-01-lg.webp"
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onClick={() => onOpenBooking("evento", item.value)}
            className="group relative h-56 sm:h-72 md:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
          >
            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-serif font-bold mb-1">{item.title}</h3>
              <p className="text-gray-300 text-sm">Capacidade: {item.cap}</p>
              {item.desc && <p className="text-gray-400 text-xs mt-1 line-clamp-2">{item.desc}</p>}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-20 pt-8 md:pt-10 border-t border-gray-200">
        {[
          { icon: 'wifi', label: 'Wi-Fi', desc: 'Conectividade em todos os espaços.' },
          { icon: 'videocam', label: 'Som e Imagem', desc: 'Serviço de audiovisual completo.' },
          { icon: 'restaurant_menu', label: 'Buffet Customizado', desc: 'Restaurante Maria Bastos com menu personalizado.' },
          { icon: 'local_parking', label: 'Estacionamento', desc: 'Amplo estacionamento para convidados.' }
        ].map((feat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 + (i * 0.1) }}
            className="flex flex-col items-center text-center"
          >
            <div className="size-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">{feat.icon}</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">{feat.label}</h4>
            <p className="text-gray-500 text-xs">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
