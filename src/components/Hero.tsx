import React from 'react';
import { motion } from 'motion/react';
import TriageForm from './TriageForm';

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center pt-8 pb-2">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-sage-200 rounded-[2rem] rotate-3 scale-105 z-0"></div>
        <div className="w-32 h-32 md:w-40 md:h-40 relative z-10 rounded-[2rem] overflow-hidden border-4 border-white shadow-lg">
          <img 
            src="/profile.jpg" 
            alt="Nutricionista profile" 
            className="w-full h-full object-cover object-top scale-[1.15]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-3 -right-3 z-20 bg-white px-3 py-1 rounded-full shadow-md border border-sage-100">
          <span className="text-[10px] font-bold text-sage-600 tracking-wider">CRN 12345</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-2 mb-4 px-4"
      >
        <h1 className="font-serif text-2xl md:text-3xl font-medium text-slate-800">
          Dra. Julia Mendes
        </h1>
        <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed max-w-xs mx-auto">
          "Transforme sua relação com a comida e conquiste o corpo que você deseja."
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-2"
      >
        <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-medium border border-orange-100 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          3 pessoas online agora
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full"
      >
        <TriageForm />
      </motion.div>
    </div>
  );
};

export default Hero;
