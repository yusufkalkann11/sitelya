'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const tagColors: Record<string, string> = {
  restaurant: 'bg-orange-500/20 text-orange-300',
  clinic: 'bg-green-500/20 text-green-300',
  ecommerce: 'bg-blue-500/20 text-blue-300',
  law: 'bg-amber-500/20 text-amber-300',
  education: 'bg-cyan-500/20 text-cyan-300',
  realestate: 'bg-rose-500/20 text-rose-300',
};

const gradients = [
  'from-orange-500/20 to-red-500/10',
  'from-green-500/20 to-teal-500/10',
  'from-blue-500/20 to-indigo-500/10',
  'from-amber-500/20 to-yellow-500/10',
  'from-cyan-500/20 to-sky-500/10',
  'from-rose-500/20 to-pink-500/10',
];

const icons = ['🍽️', '🏥', '🛒', '⚖️', '🎓', '🏠'];

export default function Portfolio() {
  const t = useTranslations('portfolio');
  const projects = t.raw('projects') as Array<{ name: string; sector: string; tag: string }>;

  return (
    <section id="portfolio" className="py-24 bg-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass rounded-2xl overflow-hidden hover:border-purple/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image placeholder */}
              <div className={`h-48 bg-gradient-to-br ${gradients[i]} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-6xl">{icons[i]}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-white/70 font-medium">Preview</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{project.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${tagColors[project.tag]}`}>
                    {project.sector}
                  </span>
                </div>
                <button className="w-full text-center text-sm font-semibold py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-purple/20 hover:text-white hover:border-purple/30 transition-all duration-200">
                  {t('viewSite')} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
