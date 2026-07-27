import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle, Award, Compass, Music, MessageCircle, Gift, Cake, LogOut, Camera, Users } from 'lucide-react';
import { PROGRAM_ITEMS } from '../data';

export default function Program() {
  const [activeTab, setActiveTab] = useState<'all' | 'church' | 'reception'>('all');

  const filteredItems = PROGRAM_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'church') return item.isChurch;
    return !item.isChurch;
  });

  const getIconForTitle = (title: string, isChurch: boolean) => {
    const t = title.toLowerCase();
    const colorClass = isChurch ? 'text-maroon-700' : 'text-emerald-700';
    if (t.includes('arrival') || t.includes('ushering')) return <Clock className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('matrimony') || t.includes('mass') || t.includes('church ceremony')) return <Award className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('photo') || t.includes('shoot') || t.includes('arboretum')) return <Camera className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('cocktail') || t.includes('welcome') || t.includes('lunch') || t.includes('feast')) return <CheckCircle className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('entrance') || t.includes('dancing')) return <Music className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('speech') || t.includes('tribute') || t.includes('presentation')) return <MessageCircle className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('cake')) return <Cake className={`w-5 h-5 ${colorClass}`} />;
    if (t.includes('gift') || t.includes('thanks') || t.includes('bouquet') || t.includes('vote')) return <Gift className={`w-5 h-5 ${colorClass}`} />;
    return <Users className={`w-5 h-5 ${colorClass}`} />;
  };

  return (
    <section className="relative py-24 bg-[#FAF3E0] text-stone-900" id="program-section">
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-maroon-800 text-xs font-semibold tracking-widest uppercase font-sans">The Wedding Schedule</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mt-2 mb-4">Wedding Program</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-maroon-700/40 to-transparent mx-auto" />
          <p className="text-stone-700 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif">
            “Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.” <br />
            <span className="text-maroon-800 uppercase font-sans text-xs tracking-wider font-semibold not-italic block mt-1">— 1 Corinthians 13:4,7</span>
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-stone-100 border border-stone-200 p-1.5 rounded-full shadow-inner">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-maroon-700 text-white font-semibold shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Full Timeline
            </button>
            <button
              onClick={() => setActiveTab('church')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'church' ? 'bg-maroon-700 text-white font-semibold shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Church
            </button>
            <button
              onClick={() => setActiveTab('reception')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'reception' ? 'bg-emerald-700 text-white font-semibold shadow-sm animate-fade-in' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Reception
            </button>
          </div>
        </div>

        {/* Program Timeline */}
        <div className="relative border-l-2 border-stone-200/80 ml-6 md:ml-40 pl-8 md:pl-12 pb-4 space-y-10">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`program-item-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative"
            >
              {/* Date/Time Left Sidebar Anchor (Desktop only) */}
              <div className="hidden md:flex absolute right-full mr-32 top-1 items-center justify-end text-right w-28 pointer-events-none">
                <div className="flex flex-col items-end">
                  <span className={`${item.isChurch ? 'text-maroon-800' : 'text-emerald-800'} font-serif font-bold text-sm tracking-tight`}>
                    {item.time.split(' - ')[0]}
                  </span>
                  <span className="text-stone-500 font-sans text-[10px] uppercase tracking-wider font-semibold">
                    {item.duration}
                  </span>
                </div>
              </div>

              {/* Timeline Icon Node - Centered precisely on the vertical line */}
              <div className={`absolute -left-[32px] md:-left-[48px] -translate-x-1/2 top-1 w-10 h-10 rounded-full bg-white border-2 border-stone-200 flex items-center justify-center shadow-sm z-10 ${
                item.isChurch ? 'text-maroon-700 hover:border-maroon-300' : 'text-emerald-700 hover:border-emerald-300'
              }`}>
                {getIconForTitle(item.title, item.isChurch)}
              </div>

              {/* Program Detail Card */}
              <div className="bg-white border border-stone-200/70 rounded-2xl p-6 hover:border-stone-300 transition-all shadow-sm hover:shadow-md group">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className={`text-lg md:text-xl font-serif font-medium text-stone-900 ${
                    item.isChurch ? 'group-hover:text-maroon-700' : 'group-hover:text-emerald-700'
                  } transition-colors`}>
                    {item.title}
                  </h4>
                  {/* Category Pill */}
                  <span className={`text-[9px] uppercase tracking-wider font-sans font-semibold px-2.5 py-1 rounded-full ${
                    item.isChurch 
                      ? 'bg-maroon-50 text-maroon-700 border border-maroon-100' 
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}>
                    {item.isChurch ? 'Church Ceremony' : 'Reception'}
                  </span>
                </div>

                {/* Time & Duration Badge inside card */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-50 border border-stone-200/80 rounded-lg text-stone-700 text-xs font-sans font-semibold mt-1">
                  <Clock className={`w-3.5 h-3.5 ${item.isChurch ? 'text-maroon-800' : 'text-emerald-800'}`} />
                  <span>{item.time}</span>
                  <span className="text-stone-400 font-normal">|</span>
                  <span className="text-stone-500 font-normal text-[11px]">{item.duration}</span>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-stone-600 font-serif text-sm md:text-base mt-3 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing card */}
        <div className="mt-16 text-center bg-white border border-stone-200/85 p-6 rounded-2xl max-w-xl mx-auto shadow-sm">
          <p className="font-serif text-maroon-800 italic text-base">“We look forward to celebrating this joyous occasion with you, as we say ‘I Do’”</p>
        </div>
      </div>
    </section>
  );
}
