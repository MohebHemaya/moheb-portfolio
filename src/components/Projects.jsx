import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FiExternalLink, FiGithub, FiStar, FiCalendar } from 'react-icons/fi';
import TiltWrapper from './TiltWrapper';

const featuredProjects = [
  {
    title: 'Z-Impact Corporate Website',
    description: 'Responsive corporate website with multilingual RTL/LTR support, Firebase backend, and smooth animations.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Firebase', 'i18next'],
    demo: 'https://zimpact-eg.com/',
    code: null,
    gradient: 'from-primary-500/20 to-purple-500/20',
  },
  {
    title: 'MedTrack – Medication Management',
    description: 'Web app for medication tracking, appointment scheduling, and pharmacy searches with real-time reminders via WebSocket.',
    tech: ['Remix', 'React', 'TailwindCSS', 'Axios', 'Socket.IO'],
    demo: 'https://moheb-medtrack.vercel.app',
    code: 'https://github.com/MohebHemaya/medtrack-Frontend',
    gradient: 'from-accent/20 to-teal-500/20',
  },
  {
    title: 'Library Management System',
    description: 'React-based app for managing books, users, and lending with per-user limits, CRUD operations, and debt tracking.',
    tech: ['React', 'Tailwind CSS', 'React Router', 'JSON Server'],
    demo: 'https://moheb-library-system.vercel.app',
    code: 'https://github.com/MohebHemaya/Library-System',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
];

const allTechs = ['All', ...new Set(featuredProjects.flatMap((p) => p.tech))];

export default function Projects() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  const filtered = activeFilter === 'All'
    ? featuredProjects
    : featuredProjects.filter((p) => p.tech.includes(activeFilter));

  useEffect(() => {
    fetch(`https://api.github.com/users/${import.meta.env.VITE_GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then((r) => r.json())
      .then((data) => {
        setRepos(Array.isArray(data) ? data.filter((r) => !r.fork) : []);
        setLoadingRepos(false);
      })
      .catch(() => setLoadingRepos(false));
  }, []);

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <Badge variant="outline" className="mb-4 border-primary-500/20 text-primary-400 bg-primary-500/5">
            {t('projects.title')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {t('projects.title')}
          </h2>
          <p className="text-gray-500 mt-4 text-lg">{t('projects.subtitle')}</p>
          <div className="section-line" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-14 reveal">
          {allTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                activeFilter === tech
                  ? 'bg-primary-500 text-white shadow-glow'
                  : 'glass-card text-gray-400 hover:text-white hover:border-primary-500/20'
              }`}
            >
              {tech === 'All' ? t('projects.filter_all') : tech}
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filtered.map((project, i) => (
            <TiltWrapper key={project.title} className="reveal h-full" style={{ animationDelay: `${i * 0.1}s` }}>
              <Card 
                className="glass-card border-0 hover:border-primary-500/20 transition-all duration-500 hover:shadow-card-hover group overflow-hidden h-full">
                {/* Top gradient accent */}
                <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-lg font-display font-semibold text-white group-hover:text-primary-400 transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((techItem) => (
                      <Badge key={techItem} variant="secondary" className="text-[10px] bg-primary-500/8 text-primary-300 border-primary-500/10 hover:bg-primary-500/15">
                        {techItem}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-dark-600/50 mt-auto">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors">
                        <FiExternalLink className="w-3.5 h-3.5" />
                        {t('projects.view_demo')}
                      </a>
                    )}
                    {project.code && (
                      <a href={project.code} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-white font-medium transition-colors">
                        <FiGithub className="w-3.5 h-3.5" />
                        {t('projects.view_code')}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TiltWrapper>
          ))}
        </div>

        {/* GitHub Repos */}
        <div className="reveal">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-4">
              <FiGithub className="w-4 h-4" />
              <span className="uppercase tracking-wider text-xs font-medium">Open Source</span>
            </div>
            <h3 className="text-3xl font-display font-bold text-white">
              {t('projects.github_section')}
            </h3>
          </div>

          {loadingRepos ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card rounded-xl p-5 border-transparent animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-5 bg-dark-600 rounded w-2/3" />
                    <div className="h-4 bg-dark-600 rounded w-8" />
                  </div>
                  <div className="h-3 bg-dark-700 rounded w-full mb-2" />
                  <div className="h-3 bg-dark-700 rounded w-4/5 mb-6" />
                  <div className="flex items-center gap-3">
                    <div className="h-4 bg-dark-600 rounded w-16" />
                    <div className="h-3 bg-dark-600 rounded w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : repos.length === 0 ? (
            <p className="text-center text-gray-500">{t('projects.no_repos')}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card rounded-xl p-5 hover:border-primary-500/20 transition-all duration-300 group block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-white font-display font-medium group-hover:text-primary-400 transition-colors truncate">
                      {repo.name}
                    </span>
                    <div className="flex items-center gap-1 text-gray-600 text-xs shrink-0 ml-2">
                      <FiStar className="w-3 h-3" />
                      {repo.stargazers_count}
                    </div>
                  </div>
                  {repo.description && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{repo.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-auto pt-2">
                    {repo.language && (
                      <Badge variant="secondary" className="text-[10px] bg-primary-500/8 text-primary-300 border-primary-500/10">
                        {repo.language}
                      </Badge>
                    )}
                    <span className="flex items-center gap-1 text-[10px] text-gray-600">
                      <FiCalendar className="w-3 h-3" />
                      {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
