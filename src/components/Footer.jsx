import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

export default function Footer() {
  const { t } = useTranslation();

  const socials = [
    { icon: FiGithub, href: 'https://github.com/MohebHemaya', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/moheb-hemaya-650389282/', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:mohebhemayaa@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative py-12 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#home" className="text-xl font-display font-bold">
            <span className="gradient-text">MH</span>
            <span className="text-white/60">.</span>
          </a>

          {/* Social Links */}
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-500 hover:text-primary-400 hover:border-primary-500/20 transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="flex items-center gap-1.5 text-gray-600 text-sm">
            © {new Date().getFullYear()} Moheb Hemaya
            <FiHeart className="w-3 h-3 text-primary-500/50" />
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
