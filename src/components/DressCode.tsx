import React from 'react';
import { Sparkles, Users } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function DressCode() {
  return (
    <section className="relative py-24 bg-[#8B1E3F] text-white" id="dress-code-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-amber-500/[0.08] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase font-sans">Attire &amp; Celebration</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-white mt-2 mb-4">Dress Code</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto relative mb-6" />
          <p className="text-amber-100/90 text-base md:text-lg max-w-2xl mx-auto italic font-serif leading-relaxed">
            We kindly invite you to celebrate with us in elegant attire.
          </p>
        </div>

        {/* Featured Tagline Banner */}
        <div className="bg-stone-900/80 text-white rounded-2xl p-8 mb-12 shadow-xl relative overflow-hidden text-center border border-amber-400/30 backdrop-blur-md">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-amber-300 mb-3" />
            <p className="text-xs font-sans tracking-widest uppercase text-amber-200/90 font-bold mb-1">Attire Guideline</p>
            <h3 className="font-serif text-2xl md:text-4xl text-amber-100 font-medium my-2">
              "{WEDDING_DETAILS.dressCode.guideline}"
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm font-sans mt-2 max-w-xl">
              Put your dancing shoes on and dress to celebrate with us!
            </p>
          </div>
        </div>

        {/* Special Guest Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Dancing shoes note */}
          <div className="bg-stone-900/80 border border-amber-400/30 rounded-xl p-5 flex items-start gap-4 backdrop-blur-md">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-base font-medium text-amber-200 mb-1">Dancing Shoes Required</h5>
              <p className="text-stone-300 text-xs leading-relaxed">
                Bring your celebratory energy and comfortable dancing footwear for the party!
              </p>
            </div>
          </div>

          {/* Kids note */}
          <div className="bg-stone-900/80 border border-amber-400/30 rounded-xl p-5 flex items-start gap-4 backdrop-blur-md">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-base font-medium text-amber-200 mb-1">Family &amp; Children Policy</h5>
              <p className="text-stone-300 text-xs leading-relaxed">
                {WEDDING_DETAILS.dressCode.kidsNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
