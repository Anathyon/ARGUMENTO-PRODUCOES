import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { TeamMember } from "../data";

interface CollaboratorModalProps {
  collaborator: TeamMember;
  onClose: () => void;
}

export const CollaboratorModal: React.FC<CollaboratorModalProps> = ({
  collaborator,
  onClose,
}) => {
  const slides = collaborator.slides || [];
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<number | null>(null);

  // Scroll to a specific slide
  const goToSlide = (index: number) => {
    if (index < 0 || index >= slides.length) return;
    setActiveSlideIndex(index);

    if (containerRef.current) {
      isProgrammaticScroll.current = true;
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);

      containerRef.current.scrollTo({
        left: index * containerRef.current.clientWidth,
        behavior: "smooth",
      });

      scrollTimeout.current = window.setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500); // Wait for smooth scroll animation to finish
    }
  };

  // Autoplay progress effect: auto-advance slide every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (activeSlideIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 5000);

    return () => {
      clearInterval(interval);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
    };
  }, [activeSlideIndex, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        const nextIndex = (activeSlideIndex + 1) % slides.length;
        goToSlide(nextIndex);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (activeSlideIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlideIndex, slides.length]);

  // Adjust scroll position on resize so slide is still aligned
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.scrollLeft = activeSlideIndex * containerRef.current.clientWidth;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSlideIndex]);

  // Track touch/manual scrolling
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isProgrammaticScroll.current) return;

    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    if (index !== activeSlideIndex && index >= 0 && index < slides.length) {
      setActiveSlideIndex(index);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-between bg-brand-ink/95 backdrop-blur-md overflow-hidden">
        {/* Progress Bar (at the very top) */}
        {slides.length > 1 && (
          <div className="w-full bg-brand-cream/10 h-1 relative z-50">
            <motion.div
              key={activeSlideIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-brand-orange"
            />
          </div>
        )}

        {/* Modal Header */}
        <header className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-4 relative z-50 text-brand-cream border-b border-brand-cream/10">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-semibold">
              Portfólio do Colaborador
            </span>
            <h1 className="font-display font-black text-2xl md:text-3xl leading-tight">
              {collaborator.name}
            </h1>
          </div>
          <button
            onClick={onClose}
            className="group flex items-center justify-center h-12 w-12 rounded-full bg-brand-cream/5 border border-brand-cream/10 text-brand-cream hover:bg-brand-orange hover:border-brand-orange hover:text-brand-cream transition-all duration-300 active:scale-95"
            aria-label="Fechar modal"
          >
            <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </header>

        {/* Main Slider Area */}
        <main className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center px-4 md:px-12 my-4">
          {/* Previous Button (Desktop) */}
          {slides.length > 1 && (
            <button
              onClick={() => goToSlide((activeSlideIndex - 1 + slides.length) % slides.length)}
              className="absolute left-6 z-40 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-brand-cream/5 border border-brand-cream/10 text-brand-cream hover:bg-brand-orange hover:border-brand-orange hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          {/* Slides Container */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full h-[65vh] md:h-[70vh] items-center"
          >
            {slides.length > 0 ? (
              slides.map((slide, idx) => (
                <div
                  key={slide}
                  className="min-w-full h-full flex items-center justify-center snap-start snap-always px-2 md:px-8"
                >
                  <img
                    src={slide}
                    alt={`Slide ${idx + 1} de ${collaborator.name}`}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-brand-cream/5"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand-cream/55">
                Nenhuma informação disponível para este colaborador.
              </div>
            )}
          </div>

          {/* Next Button (Desktop) */}
          {slides.length > 1 && (
            <button
              onClick={() => goToSlide((activeSlideIndex + 1) % slides.length)}
              className="absolute right-6 z-40 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-brand-cream/5 border border-brand-cream/10 text-brand-cream hover:bg-brand-orange hover:border-brand-orange hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Próximo slide"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}
        </main>

        {/* Modal Footer / Navigation Controls */}
        <footer className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-brand-cream/10 text-brand-cream relative z-50">
          {/* Active slide counter */}
          <div className="text-sm font-mono text-brand-cream/60">
            Slide <span className="text-brand-orange font-bold">{activeSlideIndex + 1}</span> de {slides.length}
          </div>

          {/* Dots Indicator */}
          {slides.length > 1 && (
            <div className="flex gap-2.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeSlideIndex
                      ? "bg-brand-orange w-8"
                      : "bg-brand-cream/35 w-2.5 hover:bg-brand-cream/60"
                  }`}
                  aria-label={`Ir para o slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Visual Instructions */}
          <div className="text-xs text-brand-cream/50 text-center md:text-right">
            Dica: use as <kbd className="bg-brand-cream/10 px-1.5 py-0.5 rounded text-[10px]">←</kbd> <kbd className="bg-brand-cream/10 px-1.5 py-0.5 rounded text-[10px]">→</kbd> do teclado ou deslize para os lados.
          </div>
        </footer>
      </div>
    </AnimatePresence>
  );
};
