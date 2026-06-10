import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { TbLanguage } from 'react-icons/tb';

const navLinks = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isDark, setIsDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Track active section
      const sections = navLinks.map(id => document.getElementById(id));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActiveSection(navLinks[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (link === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      return;
    }

    const element = document.getElementById(link);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      window.history.pushState(null, '', `/${link}`);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'py-3 bg-dark-950/80 backdrop-blur-xl border-b border-primary-500/10 shadow-lg shadow-dark-950/50'
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          onClick={(e) => handleNavClick(e, 'home')}
          className="group relative flex items-center gap-1"
        >
          <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent transition-all duration-300 group-hover:from-accent group-hover:to-primary-400">
            MH
          </span>
          <span className="text-2xl font-bold text-white/80 group-hover:text-white transition-colors">.</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent transition-all duration-300 group-hover:w-full rounded-full" />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={link === 'home' ? '/' : `/${link}`}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 capitalize ${
                  activeSection === link
                    ? 'text-primary-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t(`nav.${link}`)}
                {activeSection === link && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-400" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-xl glass-card text-primary-300 hover:text-white hover:border-primary-500/30 transition-all duration-300"
            aria-label="Toggle language"
          >
            <TbLanguage className="w-4 h-4" />
            <span className="text-xs font-medium">{i18n.language === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-primary-300 hover:text-yellow-400 hover:border-yellow-400/20 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? <BsSunFill className="w-4 h-4" /> : <BsMoonStarsFill className="w-4 h-4" />}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX className="w-5 h-5" /> : <HiOutlineMenuAlt3 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
        menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <ul className="mx-4 mt-2 p-4 rounded-2xl glass-card flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={link === 'home' ? '/' : `/${link}`}
                onClick={(e) => handleNavClick(e, link)}
                className={`block px-4 py-3 rounded-xl transition-all duration-300 capitalize text-sm font-medium ${
                  activeSection === link
                    ? 'bg-primary-500/10 text-primary-400'
                    : 'text-gray-400 hover:text-white hover:bg-dark-600/50'
                }`}
              >
                {t(`nav.${link}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
