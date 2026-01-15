
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROOMS } from '../constants';

interface RoomsSectionProps {
  onOpenBooking: () => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onOpenBooking }) => {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[ROOMS.length - 1]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-6"
    >
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Nossos Quartos & Suítes</h2>
        <p className="text-gray-600 max-w-2xl">Descubra o refúgio perfeito, onde o luxo encontra o conforto em cada detalhe. Cada acomodação foi projetada para oferecer uma experiênca única.</p>
      </div>

      {/* Categories */}
      <div className="flex gap-4 mb-12 no-scrollbar overflow-x-auto pb-4">
        {ROOMS.map((room) => (
          <button
            key={room.id}
            onClick={() => setSelectedRoom(room)}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              selectedRoom.id === room.id
                ? 'bg-primary text-white shadow-xl'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {room.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedRoom.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl"
            >
              <img src={selectedRoom.image} alt={selectedRoom.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-square hover:scale-105 transition-transform duration-500 cursor-pointer">
                <img src={`https://picsum.photos/seed/room${selectedRoom.id}${i}/800/800`} alt="Detalhe do quarto" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.aside 
            key={`info-${selectedRoom.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl"
          >
            <div>
              <h3 className="text-3xl font-serif text-primary mb-4">{selectedRoom.name}</h3>
              <p className="text-gray-600 leading-relaxed">{selectedRoom.description}</p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-4">Comodidades Premium</h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedRoom.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700">
                    <span className="material-symbols-outlined text-accent text-xl">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-4">Serviços Inclusos</h4>
              <ul className="space-y-3">
                {selectedRoom.services.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="material-symbols-outlined text-accent text-sm mt-0.5">check_circle</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={onOpenBooking}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
              Verificar Disponibilidade
            </button>
          </motion.aside>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
