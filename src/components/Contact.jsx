import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionHeader from './ui/SectionHeader';
import { profile, socials } from '../data/content';
import '../styles/contact.css';

const EMAILJS = {
  serviceId: 'service_vju42lr',
  templateId: 'template_e2gh0t1',
  publicKey: 'hVslgb1CuXw-t13_w',
};

const EMPTY = { name: '', email: '', subject: '', message: '' };

const useLocalTime = (timeZone) => {
  const fmt = useMemo(
    () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }),
    [timeZone]
  );
  const [time, setTime] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(fmt.format(new Date())), 15000);
    return () => clearInterval(id);
  }, [fmt]);
  return time;
};

const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const localTime = useLocalTime(profile.timezone);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          subject: form.subject,
          subject_line: form.subject,
          message: `Subject: ${form.subject}\n\nMessage from ${form.name} (${form.email}):\n\n${form.message}`,
          to_name: profile.firstName,
          to_email: profile.email,
        },
        { publicKey: EMAILJS.publicKey }
      );
      setStatus('sent');
      setForm(EMPTY);
    } catch (err) {
      console.error('Email sending failed:', err);
      setError(err?.text || 'The postcard got lost in transit. Please try again, or email me directly.');
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHeader
          code="05"
          kicker="Contact"
          title="Send a"
          accent="Postcard"
          subtitle="Have an idea, an opportunity or a travel tip? Write it down, drop it in the mailbox — I read every one."
        />

        <div className="contact-layout">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="info-ticket">
              <span className="info-icon">
                <i className="fas fa-location-dot" />
              </span>
              <div>
                <span className="info-label">Home base</span>
                <span className="info-value">{profile.location}</span>
                <span className="info-sub">{profile.coords}</span>
              </div>
            </div>

            <div className="info-ticket">
              <span className="info-icon">
                <i className="fas fa-clock" />
              </span>
              <div>
                <span className="info-label">Local time</span>
                <span className="info-value">
                  {localTime} <small>IST · UTC+5:30</small>
                </span>
              </div>
            </div>

            <div className="info-ticket">
              <span className="info-icon">
                <i className="fas fa-envelope" />
              </span>
              <div className="info-grow">
                <span className="info-label">Email</span>
                <a className="info-value info-email" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </div>
              <button
                type="button"
                className={`copy-btn ${copied ? 'is-copied' : ''}`}
                onClick={copyEmail}
                aria-label="Copy email address"
                data-cursor={copied ? 'Copied' : 'Copy'}
              >
                <i className={copied ? 'fas fa-check' : 'far fa-copy'} />
              </button>
            </div>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>

            <div className="social-stamps">
              {socials.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-stamp"
                  aria-label={s.name}
                  data-cursor={s.name}
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  whileHover={{ rotate: -8, y: -4 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 220, damping: 14 }}
                >
                  <i className={s.icon} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="mailbox">
            <AnimatePresence mode="wait">
              {status !== 'sent' ? (
                <motion.form
                  key="postcard"
                  className={`postcard-form ${status === 'error' ? 'has-error' : ''}`}
                  onSubmit={onSubmit}
                  initial={{ opacity: 0, y: 50, rotate: 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  exit={{
                    x: 420,
                    y: -260,
                    rotate: 24,
                    scale: 0.4,
                    opacity: 0,
                    transition: { duration: 0.8, ease: [0.5, 0, 0.75, 0] },
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="pf-message">
                    <label htmlFor="pf-message" className="pf-dear">
                      Dear {profile.firstName},
                    </label>
                    <textarea
                      id="pf-message"
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      placeholder="Write your message here…"
                      required
                      maxLength={2000}
                      rows={7}
                    />
                  </div>

                  <div className="pf-divider" aria-hidden="true" />

                  <div className="pf-right">
                    <div className="pf-stamp-row" aria-hidden="true">
                      <span className="pf-postmark">
                        Air mail
                        <br />
                        Par avion
                      </span>
                      <span className="pc-stamp pf-stamp">
                        <span className="pc-stamp-inner">
                          <i className="fas fa-paper-plane" />
                          <span>EAV</span>
                        </span>
                      </span>
                    </div>

                    <div className="pf-field">
                      <label htmlFor="pf-name">From</label>
                      <input
                        id="pf-name"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="Your name"
                        autoComplete="name"
                        required
                        maxLength={100}
                      />
                    </div>
                    <div className="pf-field">
                      <label htmlFor="pf-email">Return address</label>
                      <input
                        id="pf-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="you@email.com"
                        autoComplete="email"
                        required
                        maxLength={150}
                      />
                    </div>
                    <div className="pf-field">
                      <label htmlFor="pf-subject">Subject</label>
                      <input
                        id="pf-subject"
                        name="subject"
                        value={form.subject}
                        onChange={onChange}
                        placeholder="What's it about?"
                        required
                        maxLength={150}
                      />
                    </div>

                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.p
                          className="pf-error"
                          role="alert"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <i className="fas fa-triangle-exclamation" /> Returned to sender: {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      className="btn btn-primary pf-submit"
                      disabled={status === 'sending'}
                      data-cursor="Send"
                    >
                      {status === 'sending' ? (
                        <>
                          Sending <i className="fas fa-plane fa-beat-fade" />
                        </>
                      ) : (
                        <>
                          Send postcard <i className="fas fa-paper-plane" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="delivered"
                  className="delivered"
                  role="status"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.span
                    className="delivered-stamp"
                    initial={{ scale: 3, rotate: -40, opacity: 0 }}
                    animate={{ scale: 1, rotate: -12, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.45, ease: [0.3, 1.4, 0.5, 1] }}
                  >
                    Delivered
                  </motion.span>
                  <h3>Your postcard is on its way!</h3>
                  <p>Thanks for writing — I&apos;ll get back to you soon. Safe travels until then.</p>
                  <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>
                    Write another <i className="fas fa-pen-nib" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
