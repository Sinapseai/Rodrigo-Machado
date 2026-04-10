import React from 'react';
import Hero from './components/Hero';
import Specialties from './components/Specialties';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-sage-50 flex justify-center">
      {/* Mobile First Container - Max Width constrained for desktop to look like a mobile app/linktree */}
      <div className="w-full max-w-md bg-white/50 min-h-screen shadow-2xl shadow-sage-100/50 relative">
        {/* Background decorative elements */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[30%] bg-sage-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[60%] h-[40%] bg-serenity-100/40 rounded-full blur-3xl"></div>
        </div>

        <main className="relative z-10 px-6 py-8 flex flex-col gap-8">
          <Hero />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full h-px bg-gradient-to-r from-transparent via-sage-200 to-transparent"
          />

          <Specialties />
        </main>
      </div>
    </div>
  );
}
