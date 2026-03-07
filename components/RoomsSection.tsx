import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ROOMS } from "../constants";

interface RoomsSectionProps {
  onOpenBooking: () => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  onOpenBooking,
}) => {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Usa as imagens reais se disponíveis, senão fallback para mock
  const getRoomImages = (room: typeof selectedRoom) => {
    if (room.images && room.images.length > 0) return room.images;
    return [
      room.image,
      `https://picsum.photos/seed/room${room.id}1/800/800`,
      `https://picsum.photos/seed/room${room.id}2/800/800`,
      `https://picsum.photos/seed/room${room.id}3/800/800`,
    ];
  };

  const roomImages = getRoomImages(selectedRoom);

  // Reseta a imagem selecionada quando muda o quarto
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedRoom]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-6"
    >
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary">
          Nossos Apartamentos
        </h2>
        <p className="text-gray-600 max-w-2xl">
          Conforto e praticidade em Tauá-CE. Todos os apartamentos contam com
          Wi-Fi, frigobar, TV Smart, ar-condicionado, móveis projetados e café
          da manhã incluso.
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 sm:gap-4 mb-8 md:mb-12 no-scrollbar overflow-x-auto pb-4 -mx-6 px-6">
        {ROOMS.map((room) => (
          <button
            key={room.id}
            onClick={() => setSelectedRoom(room)}
            className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              selectedRoom.id === room.id
                ? "bg-primary text-white shadow-xl"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {room.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 items-start">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedRoom.id}-${selectedImageIndex}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl"
            >
              <img
                src={roomImages[selectedImageIndex]}
                alt={selectedRoom.name}
                className="w-full h-full object-cover brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {roomImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer ${
                  selectedImageIndex === i
                    ? "ring-3 ring-primary ring-offset-2 shadow-lg brightness-110"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt="Detalhe do quarto"
                  className="w-full h-full object-cover"
                />
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
              <h3 className="text-3xl font-serif text-primary mb-2">
                {selectedRoom.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 bg-primary/5 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm">straighten</span>
                  {selectedRoom.area}
                </span>
                <span className="inline-flex items-center gap-1 bg-primary/5 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm">person</span>
                  {selectedRoom.capacity}
                </span>
                {selectedRoom.hasBalcony && (
                  <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-sm">balcony</span>
                    Com Varanda
                  </span>
                )}
                {selectedRoom.highlight && (
                  <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-sm">star</span>
                    {selectedRoom.highlight}
                  </span>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed">
                {selectedRoom.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-4">
                Comodidades Premium
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedRoom.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="material-symbols-outlined text-accent text-xl">
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-4">
                Serviços Inclusos
              </h4>
              <ul className="space-y-3">
                {selectedRoom.services.map((service, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="material-symbols-outlined text-accent text-sm mt-0.5">
                      check_circle
                    </span>
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
