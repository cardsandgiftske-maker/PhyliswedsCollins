import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, AlertCircle, Sparkles, User, Phone, Check, Heart } from 'lucide-react';
import { RsvpGuest } from '../types';
import { WEDDING_DETAILS } from '../data';
import { saveRsvp, isFirebaseConfigured } from '../firebase';

export default function RsvpForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [willAttend, setWillAttend] = useState<'yes' | 'no'>('yes');
  const [adultsCount, setAdultsCount] = useState(1);
  const [notes, setNotes] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submittedGuest, setSubmittedGuest] = useState<RsvpGuest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Floating button state
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const rsvpSection = document.getElementById('rsvp-section');
      if (rsvpSection) {
        const rect = rsvpSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowFloatingBtn(false);
        } else {
          setShowFloatingBtn(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }

    setLoading(true);

    try {
      const newGuest: RsvpGuest = {
        id: 'rsvp-' + Date.now(),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        willAttend,
        adultsCount: willAttend === 'yes' ? adultsCount : 0,
        submittedAt: new Date().toISOString(),
        notes: notes.trim() || undefined,
      };

      await saveRsvp(newGuest);

      setSubmittedGuest(newGuest);
      setLoading(false);

      setFullName('');
      setPhoneNumber('');
      setWillAttend('yes');
      setAdultsCount(1);
      setNotes('');

      window.dispatchEvent(new Event('rsvp_database_updated'));
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const scrollToRsvp = () => {
    const element = document.getElementById('rsvp-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative py-24 bg-[#FCFAF7] text-stone-850" id="rsvp-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-maroon-500/[0.015] via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mt-2 mb-4">Confirm Attendance</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-maroon-700/40 to-transparent mx-auto" />
            <p className="text-stone-700 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif leading-relaxed">
              Kindly RSVP by 10th August to help us prepare for your presence. Thank you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Form Column */}
            <div className="md:col-span-6 bg-white border border-stone-200/80 p-8 rounded-2xl shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-stone-900 flex items-center gap-2 font-medium">
                  <Mail className="w-5 h-5 text-maroon-800" />
                  <span>RSVP Form</span>
                </h3>
                {isFirebaseConfigured ? (
                  <span className="flex items-center gap-1.5 text-[9px] text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider shadow-sm">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                    <span>Cloud Synced</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[9px] text-stone-500 bg-stone-100 border border-stone-250 px-2.5 py-0.5 rounded-full font-sans font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    <span>Local Database</span>
                  </span>
                )}
              </div>

              <form onSubmit={handleRsvpSubmit} className="space-y-5" id="rsvp-wedding-form">
                {/* Full Name input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Phylis & Collins Guest"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-50/50 border border-stone-200 focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none transition-all"
                  />
                </div>

                {/* Phone Number input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0711910037"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-stone-50/50 border border-stone-200 focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none transition-all"
                  />
                </div>

                {/* Will Attend toggle radio */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                    Will you attend?
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setWillAttend('yes')}
                      className={`flex-1 py-3 px-3 text-xs uppercase tracking-wider font-sans font-bold border rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        willAttend === 'yes'
                          ? 'bg-maroon-800 border-maroon-800 text-white shadow-md'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Yes, with pleasure!</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWillAttend('no')}
                      className={`py-2 px-2.5 text-[10px] uppercase tracking-wide font-sans font-medium border rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0 ${
                        willAttend === 'no'
                          ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-sm font-semibold'
                          : 'bg-stone-50/80 border-stone-200/80 text-stone-400 hover:text-stone-600'
                      }`}
                      title="Decline attendance"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>Regretfully decline</span>
                    </button>
                  </div>
                </div>

                {/* Custom Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                    Warm Messages / Well Wishes
                  </label>
                  <textarea
                    placeholder="Send a heartfelt message to Phylis & Collins..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-stone-50/50 border border-stone-200 focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700/20 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none transition-all resize-none"
                  />
                </div>

                {/* Errors display */}
                {errorMessage && (
                  <div className="p-3.5 bg-rose-50 border border-rose-250 rounded-xl flex items-center gap-2.5 text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-maroon-800 hover:bg-maroon-900 active:scale-98 disabled:opacity-50 text-white font-sans font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Submit RSVP</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Confirmation & Direct Call Column */}
            <div className="md:col-span-6 flex flex-col items-center">
              <AnimatePresence mode="wait">
                {submittedGuest ? (
                  /* Success Card */
                  <motion.div
                    key="success-card-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-[360px] bg-gradient-to-b from-white to-[#FCFAF7] border border-maroon-700/30 rounded-3xl p-6 shadow-md relative flex flex-col overflow-hidden text-center"
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-maroon-800 to-transparent" />

                    <div className="flex flex-col items-center mb-5 pb-5 border-b border-stone-100">
                      <div className="w-12 h-12 bg-green-50 border border-green-200 text-green-700 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-sans font-bold uppercase text-xs tracking-widest text-green-800">RSVP Confirmed!</h4>
                      <p className="text-xs text-stone-600 font-serif mt-1">
                        Thank you, <span className="font-semibold text-stone-900">{submittedGuest.fullName}</span>!
                      </p>
                    </div>

                    <div className="space-y-4 my-2">
                      <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 text-center">
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest font-sans font-bold">Attendance Status</p>
                        <p className="font-serif text-base text-maroon-800 font-semibold mt-0.5">
                          {submittedGuest.willAttend === 'yes' ? 'Attending with pleasure' : 'Regretfully decline'}
                        </p>
                      </div>

                      {submittedGuest.notes && (
                        <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 text-center italic font-serif text-xs text-stone-700">
                          “{submittedGuest.notes}”
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 text-center text-[11px] text-stone-500 space-y-2">
                      <p>We look forward to celebrating together!</p>
                      <button
                        onClick={() => setSubmittedGuest(null)}
                        className="text-maroon-800 hover:underline font-semibold block mx-auto cursor-pointer"
                      >
                        Submit another RSVP
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Standard Info Card */
                  <motion.div
                    key="standard-info-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-[360px] bg-white border border-stone-200/80 shadow-sm rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-5 relative overflow-hidden"
                  >
                    <div className="w-16 h-16 rounded-full bg-maroon-50 border border-maroon-100 flex items-center justify-center text-maroon-800 shadow-sm">
                      <Heart className="w-7 h-7 text-maroon-800 fill-maroon-800/20" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-lg text-stone-850 font-semibold">Join Our Celebration</h4>
                      <p className="text-xs text-stone-600 font-serif leading-relaxed max-w-[250px] mx-auto">
                        Please fill out the form to confirm your attendance for Phylis &amp; Collins’ wedding celebration.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 w-full text-[10px] text-stone-400 uppercase tracking-widest font-sans font-bold">
                      Kindly RSVP by 10th August
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Direct Phone / Call RSVP Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-[360px] mt-6 bg-[#FCFAF7] border border-stone-200 p-6 rounded-3xl text-center shadow-sm relative"
              >
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-maroon-700/30 to-transparent" />
                <h5 className="font-serif text-sm font-semibold text-stone-900 mb-1 flex items-center justify-center gap-1.5">
                  <Phone className="w-4 h-4 text-maroon-800" />
                  <span>RSVP via Direct Phone Call</span>
                </h5>
                <p className="text-[11px] text-stone-600 leading-relaxed mb-4 font-serif">
                  Or reach out directly to confirm your presence:
                </p>
                <div className="flex flex-col gap-2 font-sans text-xs">
                  <a 
                    href="tel:0711910037" 
                    className="flex items-center justify-between px-4 py-2.5 bg-white border border-stone-200 hover:border-maroon-400 text-stone-800 font-bold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-maroon-800" />
                      <span>0711 910 037</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded font-extrabold">
                      Call / SMS
                    </span>
                  </a>

                  <a 
                    href="tel:0726580861" 
                    className="flex items-center justify-between px-4 py-2.5 bg-white border border-stone-200 hover:border-maroon-400 text-stone-800 font-bold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-maroon-800" />
                      <span>0726 580 861</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded font-extrabold">
                      Call / SMS
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 pointer-events-auto"
            id="floating-rsvp-button-wrapper"
          >
            <button
              onClick={scrollToRsvp}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-maroon-800 hover:bg-maroon-900 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Confirm Attendance</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

