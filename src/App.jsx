import { motion } from "framer-motion";

function App() {
  return (
    <>
      <header>
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo">
            {/* Logo SVG */}
          </div>
          <div className="nav-brand">
            {/* Brand SVG */}
          </div>
        </motion.nav>
      </header>

      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            THE MALDIVES' LOGISTICS EXPERTS
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Reliable Logistics, Beyond Boundaries
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Express Shipping and Logistics is a leading freight and logistics provider...
          </motion.p>
        </motion.div>
      </section>

      <section className="expertise">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          OUR EXPERTISE IN ACTION
        </motion.h2>
        <div className="expertise-grid">
          {expertiseCards.map((card, index) => (
            <motion.div
              key={index}
              className="expertise-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-logo">
          {/* Footer Logo SVG */}
        </div>
        <div className="social-icons">
          {socialIcons.map((icon, index) => (
            <motion.a
              key={index}
              href={icon.link}
              className="social-icon"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {icon.svg}
            </motion.a>
          ))}
        </div>
      </motion.footer>
    </>
  );
}

export default App; 