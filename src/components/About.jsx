import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FiMapPin, FiMail, FiCode, FiClock, FiCpu, FiUsers } from 'react-icons/fi';

const stats = [
  { icon: FiCode, label: 'React Projects', value: '10+', color: 'text-primary-400' },
  { icon: FiClock, label: 'Years Experience', value: '2+', color: 'text-accent' },
  { icon: FiCpu, label: 'Tech Skills', value: '20+', color: 'text-purple-400' },
  { icon: FiUsers, label: 'Happy Clients', value: '5+', color: 'text-emerald-400' },
];

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <Badge variant="outline" className="mb-4 border-primary-500/20 text-primary-400 bg-primary-500/5">
            {t('about.title')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {t('about.title')}
          </h2>
          <div className="section-line" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="reveal">
            <p className="text-gray-400 leading-relaxed text-lg mb-8">
              {t('about.description')}
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-400 group">
                <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-primary-400 group-hover:shadow-glow transition-shadow duration-300">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <span>{t('about.location')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 group">
                <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-primary-400 group-hover:shadow-glow transition-shadow duration-300">
                  <FiMail className="w-4 h-4" />
                </div>
                <span>{t('about.email')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-emerald-400 font-medium">{t('about.available')}</span>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-4 reveal">
            {stats.map((stat, i) => (
              <Card key={stat.label} className="glass-card border-0 hover:border-primary-500/20 group transition-all duration-500 hover:shadow-card-hover cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <stat.icon className={`w-6 h-6 mx-auto mb-3 ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  <div className={`text-4xl font-display font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
