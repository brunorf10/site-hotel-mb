
import React from 'react';
import { motion } from 'framer-motion';

interface EventsSectionProps {
  onOpenBooking: () => void;
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
      <div className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center text-center p-8 mb-20 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069" 
          alt="Salão de eventos luxuoso" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif text-white mb-6"
          >
            Eventos de Excelência
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-gray-200 mb-10 leading-relaxed"
          >
            Instalações de última geração e serviços personalizados para reuniões corporativas, conferências e celebrações inesquecíveis.
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenBooking}
            className="bg-accent text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all shadow-xl"
          >
            Solicite uma Proposta
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Auditório Principal",
            cap: "200 pessoas",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvJ7MauZm3VIjU-NSUx03ArTnRoDAxF9LD3xg1lvNH92jF-agHCR6Ig5I3q4zRi6xeHF-frRRtxdYQAAWDz0k4RqDGbu0HFrcZzPWiYr4jTFs5tW2BrxPbkQuYqX24REEcbHEPXsamPfJm-fb_63IDFoXxGehEkE4jz5czakKUBjLmOUHdSKHGskAR5SaDUA1x9iM4YVNCpMCGohuWkrSRyXJaLj_7ZP5BxUx21HR899yQZSWpFDUvfNPnrY246GOCxObf-bKEm_TV"
          },
          {
            title: "Sala Executiva",
            cap: "20 pessoas",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrdAT4N-KgRNWq47FlX5iD7fFE5Q-eBYCu1RFA70eMHx6AlFcPXvKk-os3B5jgDSV1gQ_yviVfRr-8awdhJLnNizSWEphJm3KVkCzeIOSEKBwo7lPyiY0VOLut_sx_K448j5vH5VnZesrkXg5thRFwVohQGBwt9QcMJ894rkKo4NiofxmPi44eT4EvJTS8dyOeh6VhP7cVS5GEB_9IZgitQcG46B5k7lLGYvQgeDOvKW2LIbhfAqwLLK3cAd0sTeBYEd2LvF1condO"
          },
          {
            title: "Salão de Festas",
            cap: "150 pessoas",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3SI-Q1KE3ZpZB7DpXjYdMEL5ZIWvFrFInlsCRbWVeQhvGL3bfDWAIRleUY7FPiNi4yKxPkysKpDpCIGIx3qJiaTDeYbu1IB1YZMFbP5tm6QFSE7NeeTqyLoZvlaStGTGuPL_4qOukPtvT4Iij36NdvZl37IVX-MqocHMaczVjTg9U-3S20r1U7EzpGF4eGcVVLHfQSxrf7djzbIQq2ovokWsR9yb_VsCZ502CQAgmZ4Oe5Z6N2-BE_jVS1xRemDZc2jxyUNTh4YuE"
          }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onClick={onOpenBooking}
            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
          >
            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-serif font-bold mb-1">{item.title}</h3>
              <p className="text-gray-300 text-sm">Capacidade: {item.cap}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-10 border-t border-gray-200">
        {[
          { icon: 'wifi', label: 'Wi-Fi de Alta Velocidade', desc: 'Conectividade garantida em todo o hotel.' },
          { icon: 'videocam', label: 'Sistema Audiovisual', desc: 'Tecnologia de ponta para apresentações.' },
          { icon: 'restaurant_menu', label: 'Catering Premium', desc: 'Menus exclusivos para todos os gostos.' },
          { icon: 'local_parking', label: 'Valet Parking', desc: 'Segurança e conveniência para seus convidados.' }
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
