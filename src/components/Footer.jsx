import { motion } from 'framer-motion';
import { navItems, profile, socials } from '../data/content';
import '../styles/footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="ticket-stub"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="stub-main">
            <span className="stub-kicker">
              <i className="fas fa-plane-arrival" /> End of journey · for now
            </span>
            <h2>
              Thanks for flying with <span>{profile.firstName}</span>.
            </h2>
            <p>The next destination is just one postcard away.</p>
            <nav aria-label="Footer">
              <ul className="stub-links">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>
                      <span>{item.code}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="stub-perf" aria-hidden="true" />

          <div className="stub-side">
            <div className="stub-row">
              <span>Passenger</span>
              <strong>{profile.name}</strong>
            </div>
            <div className="stub-row">
              <span>Route</span>
              <strong>TUM → ∞</strong>
            </div>
            <div className="stub-socials">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  data-cursor={s.name}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
            <div className="stub-barcode" aria-hidden="true" />
          </div>
        </motion.div>

        <div className="footer-bottom">
          <p>
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p>
            Designed &amp; built with <span className="heart">❤</span> and a little wanderlust.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
