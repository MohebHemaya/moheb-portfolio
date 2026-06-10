import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5, SiRedux, SiFirebase, SiGit, SiWordpress, SiVercel } from 'react-icons/si';
import { TbApi, TbBrandFramerMotion } from 'react-icons/tb';
import TiltWrapper from './TiltWrapper';

const skillCategories = [
  {
    category: 'Frontend & UI',
    gradient: 'from-primary-500 to-purple-500',
    skills: [
      { name: 'React.js', level: 90, icon: SiReact },
      { name: 'Next.js', level: 80, icon: SiNextdotjs },
      { name: 'TypeScript', level: 75, icon: SiTypescript },
      { name: 'Tailwind CSS', level: 90, icon: SiTailwindcss },
      { name: 'JavaScript (ES6+)', level: 88, icon: SiJavascript },
      { name: 'HTML5 / CSS3', level: 95, icon: SiHtml5 },
    ],
  },
  {
    category: 'State & APIs',
    gradient: 'from-accent to-teal-500',
    skills: [
      { name: 'Redux Toolkit', level: 78, icon: SiRedux },
      { name: 'Zustand', level: 75, icon: TbBrandFramerMotion },
      { name: 'RESTful APIs / Axios', level: 85, icon: TbApi },
      { name: 'Context API', level: 82, icon: SiReact },
    ],
  },
  {
    category: 'Tools & Platforms',
    gradient: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'Git / GitHub', level: 88, icon: SiGit },
      { name: 'Firebase', level: 72, icon: SiFirebase },
      { name: 'WordPress / WooCommerce', level: 78, icon: SiWordpress },
      { name: 'Vercel / Netlify', level: 80, icon: SiVercel },
    ],
  },
];

export default function Skills() {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
              bar.style.width = bar.dataset.level + '%';
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-dark-800/50" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <Badge variant="outline" className="mb-4 border-primary-500/20 text-primary-400 bg-primary-500/5">
            {t('skills.title')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {t('skills.title')}
          </h2>
          <p className="text-gray-500 mt-4 text-lg">{t('skills.subtitle')}</p>
          <div className="section-line" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <TiltWrapper key={cat.category} className="reveal h-full" style={{ animationDelay: `${catIndex * 0.15}s` }}>
              <Card 
                className="glass-card border-0 hover:border-primary-500/15 transition-all duration-500 hover:shadow-card-hover group h-full">
                <CardContent className="p-7">
                  <div className="flex items-center gap-3 mb-7">
                    <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${cat.gradient}`} />
                    <h3 className="text-sm font-display font-semibold uppercase tracking-widest text-gray-300">
                      {cat.category}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="group/skill">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <skill.icon className="w-4 h-4 text-gray-500 group-hover/skill:text-primary-400 transition-colors" />
                            <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                          </div>
                          <span className="text-xs text-gray-600 font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-1 bg-dark-600/80 rounded-full overflow-hidden">
                          <div
                            className={`skill-bar-fill h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${cat.gradient}`}
                            style={{ width: '0%' }}
                            data-level={skill.level}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TiltWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
