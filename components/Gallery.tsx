
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '../types';
import { GALLERY_ITEMS } from '../constants';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);

  const filteredItems = activeCategory === Category.ALL 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-6"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Descubra Nossos Espaços</h2>
        <div className="w-24 h-1 bg-accent mx-auto" />
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-2 mb-12 no-scrollbar overflow-x-auto pb-4">
        {Object.values(Category).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
              activeCategory === cat 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group overflow-hidden rounded-2xl break-inside-avoid cursor-pointer shadow-md"
            >
              <img 
                src={item.url} 
                alt={item.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <span className="material-symbols-outlined text-white text-4xl mb-2">zoom_in</span>
                <p className="text-white font-medium text-sm">{item.alt}</p>
                <span className="text-accent text-xs mt-1 uppercase tracking-widest">{item.category}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 text-center">
        <button className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all">
          Carregar Mais
        </button>
      </div>
    </motion.div>
  );
};
