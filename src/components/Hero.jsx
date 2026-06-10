import { useTranslation } from 'react-i18next';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import MagneticWrapper from './MagneticWrapper';

export default function Hero() {
  const { t } = useTranslation();
  const roles = t('hero.roles', { returnObjects: true });
  const typedText = useTypingEffect(roles);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dark-950" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-500/8 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-gray-300">{t('about.available')}</span>
        </div>

        {/* Greeting */}
        <p className="text-primary-400 text-sm font-medium tracking-[0.3em] uppercase mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {t('hero.greeting')}
        </p>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="gradient-text">{t('hero.name')}</span>
        </h1>

        {/* Typing effect */}
        <div className="h-14 flex items-center justify-center text-xl sm:text-2xl md:text-3xl text-gray-400 font-light animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <span className="font-display">{typedText}</span>
          <span className="animate-blink text-primary-400 ml-1 font-light">|</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <MagneticWrapper strength={15}>
            <Button asChild className="btn-premium text-white border-0 rounded-xl text-sm h-12 px-8 w-full sm:w-auto">
              <a 
                href="/projects" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('projects');
                  if (element) {
                    const top = element.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                    window.history.pushState(null, '', '/projects');
                  }
                }}
              >
                {t('hero.cta_work')}
                <FiArrowDown className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </MagneticWrapper>
          <MagneticWrapper strength={15}>
            <Button asChild variant="outline" className="h-12 px-8 rounded-xl border-primary-500/30 text-primary-300 hover:bg-primary-500/10 hover:text-white hover:border-primary-400/50 transition-all duration-300 bg-transparent w-full sm:w-auto">
              <a href="/Moheb-Hemaya-CV.pdf" download>
                <FiDownload className="mr-2 w-4 h-4" />
                {t('hero.cta_cv')}
              </a>
            </Button>
          </MagneticWrapper>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 justify-center mt-14 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {[
            { icon: FiGithub, href: 'https://github.com/MohebHemaya', label: 'GitHub' },
            { icon: FiLinkedin, href: 'https://www.linkedin.com/in/moheb-hemaya-650389282/', label: 'LinkedIn' },
            { icon: FiMail, href: 'mailto:mohebhemayaa@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <MagneticWrapper key={label} strength={25}>
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="group w-12 h-12 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/30 hover:shadow-glow transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </MagneticWrapper>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1s' }}>
        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-600">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-gray-700 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
