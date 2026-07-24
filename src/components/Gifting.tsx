import React, { useState } from 'react';
import { Gift, Copy, Check, Heart, Smartphone } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function Gifting() {
  const [copiedTill, setCopiedTill] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2000);
  };

  return (
    <section className="relative py-24 bg-[#EBF1F7] text-stone-900" id="gifting-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#002147] text-xs font-semibold tracking-widest uppercase font-sans">Love &amp; Support</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mt-2 mb-4">Gifting &amp; Contributions</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#002147]/40 to-transparent mx-auto" />
        </div>

        {/* Registry Message Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Narrative card */}
          <div className="md:col-span-7 flex flex-col justify-between bg-white border border-stone-200/80 p-8 rounded-2xl shadow-md">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-maroon-50 flex items-center justify-center text-maroon-800 mb-4">
                <Gift className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl text-stone-900 font-medium">Monetary Blessings</h3>

              <div className="text-stone-600 text-sm md:text-base leading-relaxed space-y-4 font-serif">
                <p>
                  Your prayers, presence, and love are the greatest gifts we could ever ask for as we begin our new chapter together as husband and wife.
                </p>
                <p>
                  For family and friends who wish to honor us with a financial blessing, you can conveniently send monetary gifts directly via the M-PESA Till Number.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-3">
              <Heart className="w-4 h-4 text-maroon-700 fill-maroon-700 animate-pulse" />
              <span className="text-xs text-stone-600 font-sans tracking-wider uppercase font-semibold">
                Thank you for your love and generosity!
              </span>
            </div>
          </div>

          {/* M-PESA Till Number Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-white to-stone-50 border border-stone-200/80 p-8 rounded-2xl shadow-md flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* M-Pesa Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-green-50 border border-green-200 text-green-800 rounded-full text-[10px] uppercase font-sans font-bold tracking-widest mb-6">
              <Smartphone className="w-3.5 h-3.5" />
              <span>M-PESA TILL NUMBER</span>
            </div>

            <h4 className="font-serif text-xl text-stone-900 mb-2 font-medium">MONETARY GIFT</h4>
            <p className="text-stone-500 text-xs max-w-[240px] mb-6">
              Buy Goods &amp; Services / Lipa Na M-PESA
            </p>

            {/* Key-Value Copy Blocks */}
            <div className="w-full space-y-4 mb-6">
              {/* Till Block */}
              <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 flex items-center justify-between shadow-inner">
                <div className="text-left">
                  <p className="text-[10px] text-stone-400 uppercase font-sans font-bold tracking-wider">M-Pesa Till Number</p>
                  <p className="text-2xl font-mono font-bold text-maroon-800 tracking-wide">{WEDDING_DETAILS.registry.tillNumber}</p>
                </div>
                <button
                  onClick={() => handleCopy(WEDDING_DETAILS.registry.tillNumber)}
                  className={`p-2.5 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
                    copiedTill
                      ? 'bg-green-50 border-green-200 text-green-700 font-bold'
                      : 'bg-white border border-stone-200 text-stone-600 hover:text-maroon-800 hover:border-maroon-300'
                  }`}
                  title="Copy Till Number"
                >
                  {copiedTill ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-xs">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Account / Name Block */}
              <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 text-left shadow-inner">
                <p className="text-[10px] text-stone-400 uppercase font-sans font-bold tracking-wider">Account / Name</p>
                <p className="text-sm font-serif font-semibold text-stone-800 mt-0.5">{WEDDING_DETAILS.registry.accountName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
