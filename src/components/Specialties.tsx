import React from 'react';
import { motion } from 'motion/react';
import { Activity, Dumbbell, Trophy, HeartPulse } from 'lucide-react';

const specialties = [
  {
    icon: Activity,
    title: "Endurance",
    desc: "Corrida, Ciclismo e Triathlon"
  },
  {
    icon: Dumbbell,
    title: "Hipertrofia",
    desc: "Ganho de massa e força"
  },
  {
    icon: Trophy,
    title: "Alto Rendimento",
    desc: "Performance para atletas"
  },
  {
    icon: HeartPulse,
    title: "Reabilitação",
    desc: "Prevenção de lesões"
  }
];

const Specialties = () => {
  return (
    <div className="w-full pt-0 pb-4">
      <h3 className="text-center font-serif text-xl text-slate-800 mb-6 italic">Minhas Especialidades</h3>
      <div className="grid grid-cols-2 gap-3">
        {specialties.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex flex-col items-center text-center gap-3 hover:border-sage-200 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600">
              <item.icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-medium text-slate-800 text-sm">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-tight">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Specialties;
