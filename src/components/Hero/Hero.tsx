import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';
import avatarImg from '../../assets/avatar.png';

export default function Hero() {
  const { scrollY } = useScroll();

  // Parallax: scroll UP visually at 0.5x speed
  const y = useTransform(scrollY, [0, 800], [0, 400]);

  // Opacity and blur fade
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const filter = useTransform(scrollY, [0, 400], ['blur(0px)', 'blur(12px)']);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const user = 'sjain64';
    const domain = 'ucsc.edu';
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <header className="hero-anchor">
      <motion.div
        className="hero-card"
        style={{ y, opacity, filter }}
      >
        <img
          src={avatarImg}
          alt="Soham Avatar"
          className="hero-avatar"
        />
        <div className="hero-text">
          <h1 className="hero-handle">@j8soham</h1>
          <p className="hero-subtitle">hey, i build things</p>
        </div>
        <div className="hero-links">
          <a href="https://github.com/j8soham" target="_blank" rel="noopener noreferrer" className="hero-link">
            GitHub
          </a>
          <a href="#" onClick={handleEmailClick} className="hero-link">
            Email
          </a>
          <a href="https://www.linkedin.com/in/sohamjain-me/" target="_blank" rel="noopener noreferrer" className="hero-link">
            LinkedIn
          </a>
        </div>
      </motion.div>
    </header>
  );
}
