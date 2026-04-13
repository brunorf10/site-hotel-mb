import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "5588963722226";
const WHATSAPP_MESSAGE = "Olá! Gostaria de mais informações sobre o Hotel Maria Bastos.";

export const WhatsAppButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white text-gray-700 text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-gray-100 whitespace-nowrap"
          >
            Fale pelo WhatsApp
          </motion.span>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/40"
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-white"
          aria-hidden="true"
        >
          <path d="M16.003 2.667C8.639 2.667 2.667 8.638 2.667 16c0 2.347.632 4.599 1.733 6.549L2.667 29.333l6.95-1.716A13.275 13.275 0 0 0 16.003 29.333C23.365 29.333 29.333 23.362 29.333 16S23.365 2.667 16.003 2.667zm0 2.4c5.8 0 10.53 4.728 10.53 10.533 0 5.806-4.73 10.533-10.53 10.533a10.5 10.5 0 0 1-5.35-1.461l-.384-.232-3.985.984.997-3.872-.253-.4A10.49 10.49 0 0 1 5.47 16c0-5.805 4.73-10.533 10.533-10.533zm-3.26 5.2c-.198 0-.52.074-.793.37-.272.297-1.04 1.016-1.04 2.477 0 1.462 1.065 2.876 1.213 3.075.149.198 2.076 3.17 5.034 4.322 2.96 1.153 2.96.769 3.494.72.534-.05 1.722-.703 1.966-1.382.243-.678.243-1.26.17-1.382-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.03-.966-.273-.099-.47-.149-.669.149-.198.297-.768.966-.941 1.164-.173.198-.347.223-.644.074-.297-.149-1.254-.462-2.388-1.474-.882-.787-1.478-1.758-1.651-2.056-.173-.297-.018-.457.13-.605.133-.133.297-.347.446-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.149-.655-1.617-.902-2.21-.243-.58-.49-.5-.668-.51a12.5 12.5 0 0 0-.569-.012z" />
        </svg>
      </motion.div>
    </a>
  );
};
