import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FiSend, FiCheckCircle, FiAlertCircle, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }).catch(() => {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    });
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <Badge variant="outline" className="mb-4 border-primary-500/20 text-primary-400 bg-primary-500/5">
            {t('contact.title')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {t('contact.title')}
          </h2>
          <p className="text-gray-500 mt-4 text-lg">{t('contact.subtitle')}</p>
          <div className="section-line" />
        </div>

        <Card className="glass-card border-0 reveal">
          <CardContent className="p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('contact.name')}
                  required
                  className="pl-11"
                />
              </div>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('contact.email')}
                  required
                  className="pl-11"
                />
              </div>

              <div className="relative">
                <FiMessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-600" />
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t('contact.message')}
                  required
                  rows={6}
                  className="pl-11"
                />
              </div>

              <Button
                type="submit"
                disabled={status === 'sending'}
                className="btn-premium w-full h-12 text-white border-0 rounded-xl font-medium"
              >
                {status === 'sending' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('contact.sending')}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FiSend className="w-4 h-4" />
                    {t('contact.send')}
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Custom Toast Notification */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          status === 'success' || status === 'error' 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {status === 'success' && (
          <div className="glass-card bg-dark-900/90 border-emerald-500/20 p-4 rounded-2xl shadow-glow flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <FiCheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Message Sent!</h4>
              <p className="text-gray-400 text-xs mt-0.5">{t('contact.success')}</p>
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className="glass-card bg-dark-900/90 border-red-500/20 p-4 rounded-2xl shadow-glow flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <FiAlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Send Failed</h4>
              <p className="text-gray-400 text-xs mt-0.5">{t('contact.error')}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
