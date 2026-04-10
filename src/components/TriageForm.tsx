import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Check, ArrowRight, Calendar, Clock } from 'lucide-react';

// Types for the form data
interface FormData {
  name: string;
  age: string;
  goal: string;
  otherGoal: string;
  activityLevel: string;
  date: string;
  time: string;
}

const TriageForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    goal: '',
    otherGoal: '',
    activityLevel: '',
    date: '',
    time: ''
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFinalSubmit = () => {
    const finalGoal = formData.goal === 'Outro' ? formData.otherGoal : formData.goal;
    
    let formattedDate = formData.date;
    if (formData.date) {
      const [year, month, day] = formData.date.split('-');
      if (year && month && day) {
        const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const dayNumber = dateObj.getDate();
        const weekday = dateObj.toLocaleDateString('pt-BR', { weekday: 'long' });
        formattedDate = `dia ${dayNumber} "${weekday}"`;
      }
    }

    // Construct WhatsApp message
    const message = `Olá! Gostaria de agendar uma consulta. Segue meu dados:%0A%0A*Nome:* ${formData.name}%0A*Idade:* ${formData.age}%0A*Objetivo:* ${finalGoal}%0A*Atividade:* ${formData.activityLevel}%0A%0A*Horário de preferência:* ${formattedDate} às ${formData.time}%0A%0AAguardo a confirmação!`;
    
    window.open(`https://wa.me/5515996810270?text=${message}`, '_blank');
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0) handleNext();
    else handlePrev();
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-brand-100 overflow-hidden mt-6 text-left">
      <div className="bg-brand-500 p-5 text-white text-center">
        <h3 className="font-serif text-lg font-medium">Agendamento Rápido</h3>
        <p className="text-brand-100 text-xs mt-1">Passo {step + 1} de {totalSteps}</p>
        <div className="w-full bg-brand-700/30 h-1.5 rounded-full mt-3 overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="p-5 min-h-[280px] flex flex-col justify-between relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-4"
            >
              <h4 className="text-base font-medium text-slate-800">Seus dados básicos</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Nome Completo</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Idade</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Ex: 30"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-4"
            >
              <h4 className="text-base font-medium text-slate-800">Qual seu objetivo principal?</h4>
              <div className="space-y-2">
                {['Emagrecimento', 'Ganho de Massa', 'Reeducação Alimentar', 'Melhorar Saúde', 'Performance Esportiva', 'Outro'].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleChange('goal', goal)}
                    className={`w-full p-3 text-left rounded-xl border transition-all flex items-center justify-between ${
                      formData.goal === goal 
                        ? 'bg-brand-50 border-brand-500 text-brand-700' 
                        : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{goal}</span>
                    {formData.goal === goal && <Check className="w-4 h-4 text-brand-600" />}
                  </button>
                ))}
                {formData.goal === 'Outro' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
                    <input 
                      type="text" 
                      value={formData.otherGoal}
                      onChange={(e) => handleChange('otherGoal', e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Digite seu objetivo..."
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-4"
            >
              <h4 className="text-base font-medium text-slate-800">Nível de Atividade Física</h4>
              <div className="space-y-2">
                {['Sedentário', '1-2x por semana', '3-4x por semana', '5x ou mais'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleChange('activityLevel', option)}
                    className={`w-full p-3 text-left rounded-xl border transition-all flex items-center justify-between ${
                      formData.activityLevel === option 
                        ? 'bg-brand-50 border-brand-500 text-brand-700' 
                        : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{option}</span>
                    {formData.activityLevel === option && <Check className="w-4 h-4 text-brand-600" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-4"
            >
              <h4 className="text-base font-medium text-slate-800">Escolha o melhor horário</h4>
              <p className="text-xs text-slate-500 mb-4">A confirmação será feita diretamente no WhatsApp com a profissional.</p>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" /> Data de preferência
                  </label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all text-sm text-slate-700"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> Horário de preferência
                  </label>
                  <input 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all text-sm text-slate-700"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-6 pt-4 border-t border-slate-100">
          <button 
            onClick={() => paginate(-1)}
            disabled={step === 0}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              step === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Voltar
          </button>
          
          {step < totalSteps - 1 ? (
            <button 
              onClick={() => paginate(1)}
              className="px-6 py-2 bg-brand-600 text-white text-sm font-medium rounded-full shadow-md shadow-brand-200 hover:bg-brand-700 transition-all flex items-center gap-2"
            >
              Próximo <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleFinalSubmit}
              className="px-6 py-2 bg-brand-600 text-white text-sm font-medium rounded-full shadow-md shadow-brand-200 hover:bg-brand-700 transition-all flex items-center gap-2"
            >
              Agendar <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TriageForm;
