import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FiBriefcase, FiBookOpen, FiMapPin, FiChevronRight } from 'react-icons/fi';

const experienceData = [
  {
    role: 'Software Engineer (Front-End Developer)',
    company: 'Z-Impact',
    period: 'Apr 2026 – Present',
    points: [
      'Spearhead front-end development of complex, highly interactive web applications with a focus on performance and scalability.',
      'Architect and implement reusable UI components, dynamic data-driven dashboards, and complex state flows using React.js.',
      'Leverage AI agents to accelerate development and ensure code quality.',
    ],
    current: true,
  },
  {
    role: 'Web Development Internship',
    company: 'Web Masters',
    period: 'Apr 2025 – Jun 2025',
    points: [
      'Designed and developed user-friendly web interfaces using HTML, CSS, JavaScript, and React.',
      'Collaborated with designers and back-end developers to implement responsive features.',
    ],
  },
  {
    role: 'WordPress Developer',
    company: 'Web Monster',
    period: 'Oct 2024 – Jan 2025',
    points: [
      'Developed and customized WordPress websites using themes, plugins, and WooCommerce.',
      'Built responsive e-commerce pages tailored to client requirements.',
    ],
  },
  {
    role: 'Accountant & Operations Support',
    company: 'Cova Mart',
    period: 'Jul 2024 – Present',
    points: [
      'Managed operational workflows including data entry, invoice recording, and payroll processing.',
      'Provided technical support and assisted in preparing financial reports.',
    ],
    current: true,
  },
];

const educationData = [
  {
    degree: "Bachelor's Degree in Computer Science and Information Systems",
    institution: 'Higher Institute for Computer Science and Information Systems, Culture and Science City',
    period: '2021 – 2025',
    location: '6 October, Giza',
  },
  {
    degree: 'Frontend Development Diploma',
    institution: 'Amit Academy',
    period: 'Jun 2024 – Nov 2024',
    location: 'Maadi, Egypt',
  },
];

export default function Experience() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="experience" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-dark-800/50" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <Badge variant="outline" className="mb-4 border-primary-500/20 text-primary-400 bg-primary-500/5">
            {t('experience.title')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {t('experience.title')}
          </h2>
          <div className="section-line" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-16 reveal">
          {[
            { key: 'experience', icon: FiBriefcase },
            { key: 'education', icon: FiBookOpen },
          ].map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === key
                  ? 'bg-primary-500 text-white shadow-glow'
                  : 'glass-card text-gray-400 hover:text-white hover:border-primary-500/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t(`experience.${key}_tab`)}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/40 via-primary-500/20 to-transparent" />

          {activeTab === 'experience' ? (
            <div className="flex flex-col gap-8">
              {experienceData.map((item, i) => (
                <div key={i} className="relative pl-14 reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-2 w-[38px] h-[38px] rounded-xl flex items-center justify-center transition-all duration-300 ${
                    item.current ? 'glass-card border-primary-500/40 shadow-glow' : 'glass-card'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${item.current ? 'bg-primary-400 animate-pulse' : 'bg-gray-600'}`} />
                  </div>

                  <Card className="glass-card border-0 hover:border-primary-500/15 transition-all duration-500 hover:shadow-card-hover group">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                        <div>
                          <h3 className="text-white font-display font-semibold group-hover:text-primary-400 transition-colors">
                            {item.role}
                          </h3>
                          <span className="text-primary-400 text-sm font-medium">{item.company}</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] border-dark-500 text-gray-400 bg-dark-600/50 shrink-0">
                          {item.period}
                        </Badge>
                      </div>
                      <ul className="flex flex-col gap-2.5">
                        {item.points.map((p, j) => (
                          <li key={j} className="text-gray-500 text-sm flex gap-2.5 leading-relaxed">
                            <FiChevronRight className="w-3.5 h-3.5 text-primary-500/60 mt-1 shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {educationData.map((item, i) => (
                <div key={i} className="relative pl-14 reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-[38px] h-[38px] rounded-xl glass-card flex items-center justify-center">
                    <FiBookOpen className="w-4 h-4 text-accent" />
                  </div>

                  <Card className="glass-card border-0 hover:border-primary-500/15 transition-all duration-500 hover:shadow-card-hover group">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                        <h3 className="text-white font-display font-semibold group-hover:text-primary-400 transition-colors">
                          {item.degree}
                        </h3>
                        <Badge variant="outline" className="text-[10px] border-dark-500 text-gray-400 bg-dark-600/50 shrink-0">
                          {item.period}
                        </Badge>
                      </div>
                      <p className="text-primary-400 text-sm font-medium">{item.institution}</p>
                      <p className="flex items-center gap-1 text-gray-600 text-xs mt-2">
                        <FiMapPin className="w-3 h-3" /> {item.location}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
