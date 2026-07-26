import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  onSealBreak?: () => void;
}

export default function Envelope({ onOpen, onSealBreak }: EnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isSealed, setIsSealed] = useState(true);

  const handleOpen = () => {
    if (!isSealed) return;
    setIsSealed(false);
    
    if (onSealBreak) {
      onSealBreak();
    }
    
    setIsOpened(true);

    setTimeout(() => {
      onOpen();
    }, 600);
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: 'blur(6px)',
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-950/95 backdrop-blur-sm p-2 sm:p-4 md:p-6 select-none"
    >
      {/* Background ambient lighting in theme colors */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#8B1E3F]/50 blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#002147]/40 blur-[100px]" />
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-[#D4AF37]/25 blur-[90px]" />
      </div>

      {/* Main Smartphone Envelope Container matching the uploaded photo frame style */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ 
          opacity: 0, 
          scale: 1.12, 
          y: -20, 
          transition: { duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] } 
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-[420px] aspect-[9/18.5] max-h-[92vh] bg-stone-900 rounded-[44px] p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.9)] border border-stone-800 flex items-center justify-center overflow-hidden"
      >
        {/* Phone Frame Outer Shadow & Inner Screen Envelope */}
        <div className="relative w-full h-full bg-[#8B1E3F] rounded-[36px] overflow-hidden shadow-2xl flex flex-col justify-between border border-[#A82B52]/40">
          
          {/* Crimson / Burgundy Envelope Flaps Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#A52048] via-[#8B1E3F] to-[#68112C] overflow-hidden">
            
            {/* Subtle Diagonal Texture / Fine Paper Grain Lines */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Back Pocket Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

            {/* ENVELOPE FLAPS OVERLAY LAYER */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              
              {/* Left Flap */}
              <motion.svg 
                animate={isOpened ? { x: '-100%', opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                className="absolute inset-0 w-full h-full drop-shadow-[6px_0_12px_rgba(0,0,0,0.35)]"
                viewBox="0 0 400 700"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M0 0 L200 350 L0 700 Z" fill="#911D42" />
                <path d="M0 0 L200 350 L0 700" stroke="#701230" strokeWidth="1.5" opacity="0.6" />
              </motion.svg>

              {/* Right Flap */}
              <motion.svg 
                animate={isOpened ? { x: '100%', opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                className="absolute inset-0 w-full h-full drop-shadow-[-6px_0_12px_rgba(0,0,0,0.35)]"
                viewBox="0 0 400 700"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M400 0 L200 350 L400 700 Z" fill="#84193B" />
                <path d="M400 0 L200 350 L400 700" stroke="#68112C" strokeWidth="1.5" opacity="0.6" />
              </motion.svg>

              {/* Bottom Triangular Flap */}
              <motion.svg 
                animate={isOpened ? { y: '100%', opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.15 }}
                className="absolute inset-0 w-full h-full drop-shadow-[0_-8px_15px_rgba(0,0,0,0.4)]"
                viewBox="0 0 400 700"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M0 700 L200 350 L400 700 Z" fill="#7D1637" />
                <path d="M0 700 L200 350 L400 700" stroke="#5E0F28" strokeWidth="1.5" opacity="0.6" />
              </motion.svg>

              {/* Top Flap (Folds down) */}
              <motion.svg 
                animate={isOpened ? { 
                  rotateX: 180, 
                  transformOrigin: 'top',
                  y: '-10%',
                  opacity: 0,
                  zIndex: 0
                } : { 
                  rotateX: 0,
                  transformOrigin: 'top',
                  y: 0,
                  opacity: 1,
                  zIndex: 20
                }}
                transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
                className="absolute inset-0 w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                viewBox="0 0 400 700"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M0 0 L200 380 L400 0 Z" fill="#9E1E46" />
                <path d="M0 0 L200 380 L400 0" stroke="#B82B55" strokeWidth="1.5" opacity="0.5" />
              </motion.svg>

            </div>

            {/* Envelope Flaps Base Container */}

          </div>

          {/* Top Header Text (Subtle Luxury Branding - always visible on top of flap) */}
          <div className="relative z-30 w-full text-center pt-8 px-6 pointer-events-none">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-extrabold text-amber-200/95 drop-shadow-sm block">
              WEDDING INVITATION
            </span>
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-[0.08em] text-white/95 mt-1 drop-shadow-md">
              Phylis weds Collins
            </h1>
          </div>

          {/* Center Gold Organic Wax Seal matching the uploaded photo (P | C style) */}
          <div className="relative z-30 flex-1 w-full flex items-center justify-center">
            <AnimatePresence>
              {isSealed && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ 
                    scale: 1.7, 
                    opacity: 0,
                    rotate: 12,
                    filter: 'blur(6px)'
                  }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 160,
                    damping: 16,
                    exit: { duration: 0.7, ease: 'easeIn' }
                  }}
                  onClick={handleOpen}
                  className="relative cursor-pointer select-none group flex flex-col items-center justify-center"
                >
                  {/* Outer Warm Gold Ambient Glow */}
                  <div className="absolute -inset-8 rounded-full bg-amber-400/25 blur-2xl group-hover:bg-amber-300/40 transition-all duration-500 animate-pulse" style={{ animationDuration: '3.5s' }} />

                  {/* Organic Melted Gold Wax Seal SVG Container */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] transition-transform duration-300 active:scale-95 group-hover:scale-105">
                    
                    {/* Organic Scalloped Melted Wax Shape matching realistic wax seal */}
                    <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
                      <defs>
                        {/* Metallic Gold Gradient matching the photo */}
                        <linearGradient id="photo-wax-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFF2D6" />
                          <stop offset="20%" stopColor="#F5D08B" />
                          <stop offset="50%" stopColor="#D8A050" />
                          <stop offset="80%" stopColor="#A8732A" />
                          <stop offset="100%" stopColor="#754C12" />
                        </linearGradient>

                        <linearGradient id="photo-wax-inner-gold" x1="100%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFE0A3" />
                          <stop offset="40%" stopColor="#E5B263" />
                          <stop offset="80%" stopColor="#B37C2C" />
                          <stop offset="100%" stopColor="#63400E" />
                        </linearGradient>

                        <filter id="seal-3d-shadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
                        </filter>
                      </defs>

                      {/* Organic Hand-Stamped Wax Contour Outer Lip */}
                      <path 
                        d="M60 4 C72 2, 82 8, 92 14 C102 20, 112 28, 115 40 C118 52, 114 65, 110 76 C106 87, 100 98, 89 105 C78 112, 65 116, 52 115 C39 114, 26 109, 16 99 C6 89, 2 76, 4 62 C6 48, 12 36, 21 26 C30 16, 48 6, 60 4 Z" 
                        fill="url(#photo-wax-gold)"
                        stroke="#FFF2D6"
                        strokeWidth="0.8"
                        opacity="0.98"
                      />

                      {/* Inner Pressed Circle Ring */}
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="44" 
                        fill="url(#photo-wax-inner-gold)" 
                        stroke="#63400E" 
                        strokeWidth="1.2"
                        opacity="0.95"
                      />

                      {/* Indented Inner Bezel Ring */}
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="41" 
                        fill="none" 
                        stroke="#FFF2D6" 
                        strokeWidth="1" 
                        strokeDasharray="100 2"
                        opacity="0.5"
                      />

                      {/* Monogram PhilCollins centered */}
                      <g filter="url(#seal-3d-shadow)">
                        <text 
                          x="60" 
                          y="65" 
                          fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                          fontSize="13" 
                          fontWeight="bold"
                          fill="#321A04"
                          textAnchor="middle"
                          letterSpacing="-0.02em"
                        >
                          PhilCollins
                        </text>
                      </g>
                    </svg>

                  </div>

                  {/* Tap Seal instruction button below */}
                  <div className="mt-6 flex flex-col items-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-amber-300/30 text-amber-100 font-sans text-xs tracking-wider uppercase font-bold shadow-lg animate-bounce" style={{ animationDuration: '2.5s' }}>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '5s' }} />
                      <span>Tap Seal to Open</span>
                    </span>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Footer Hashtag / Date / Sacrament */}
          <div className="relative z-10 w-full text-center pb-8 px-6 pointer-events-none flex flex-col items-center gap-1">
            <span className="text-amber-200/95 font-serif italic text-sm sm:text-base tracking-wider drop-shadow-sm font-medium">
              The Sacrament of Holy Matrimony
            </span>
            <span className="text-[10px] text-white/60 font-sans tracking-widest uppercase font-semibold">
              #PhilCollins2026
            </span>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
