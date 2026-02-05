
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../constants';

const ITEMS_PER_PAGE = 4;

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredItems = activeCategory === Category.ALL 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMoreItems = visibleCount < filteredItems.length;

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setVisibleCount(ITEMS_PER_PAGE); // Reset ao trocar categoria
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length));
  };

  const currentIndex = selectedImage 
    ? filteredItems.findIndex(item => item.id === selectedImage.id) 
    : -1;

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (currentIndex === -1) return;
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[newIndex]);
  }, [currentIndex, filteredItems]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    if (e.key === 'Escape') setSelectedImage(null);
    if (e.key === 'ArrowRight') navigateImage('next');
    if (e.key === 'ArrowLeft') navigateImage('prev');
  }, [selectedImage, navigateImage]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Bloqueia scroll do body quando lightbox está aberto
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedImage]);

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
            onClick={() => handleCategoryChange(cat)}
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
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedImage(item)}
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

      {hasMoreItems && (
        <div className="mt-16 text-center">
          <button 
            onClick={handleLoadMore}
            className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Carregar Mais ({filteredItems.length - visibleCount} restantes)
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="relative max-w-6xl max-h-[90vh] w-full pointer-events-auto">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors z-10"
                  aria-label="Fechar visualização"
                >
                  <span className="material-symbols-outlined text-4xl">close</span>
                </button>

                {/* Image */}
                <motion.img
                  key={selectedImage.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="w-full h-full max-h-[80vh] object-contain rounded-lg"
                />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white font-medium text-lg">{selectedImage.alt}</p>
                  <span className="text-accent text-sm uppercase tracking-widest">{selectedImage.category}</span>
                  <span className="text-white/60 text-sm ml-4">
                    {currentIndex + 1} / {filteredItems.length}
                  </span>
                </div>

                {/* Navigation Arrows */}
                {filteredItems.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                      aria-label="Imagem anterior"
                    >
                      <span className="material-symbols-outlined text-3xl">chevron_left</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                      aria-label="Próxima imagem"
                    >
                      <span className="material-symbols-outlined text-3xl">chevron_right</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
