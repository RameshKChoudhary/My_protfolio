import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`App${darkMode ? ' dark-mode' : ''}`}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>Ramesh Choudhary</h2>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              Home
            </a>
            <a 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </a>
            <a 
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => scrollToSection('skills')}
            >
              Skills
            </a>
            <a 
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </a>
            <a 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </a>
          </div>
          <button className="dark-mode-toggle" onClick={handleToggleDarkMode}>
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
          <div 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Ramesh Choudhary</span>
            </h1>
            <h2 className="hero-subtitle">Full Stack Developer</h2>
            <p className="hero-description">
              I create beautiful, functional, and user-centered digital experiences.
              Passionate about clean code and innovative solutions.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-image">
              <div className="image-placeholder">
                <img style={{objectFit:'cover',overflow:'hidden',borderRadius:'50%'}} src="/profile.jpg" alt="RC" />
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate Full Stack Developer with 1 year of experience creating
                web applications that make a difference. I specialize in React,
                and modern web technologies.
              </p>
              <p>
                My journey in tech started with curiosity and has evolved into a career
                of building solutions that solve real-world problems. I believe in writing
                clean, maintainable code and staying up-to-date with the latest industry trends.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3>1</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat">
                  <h3>3</h3>
                  <p>Projects Completed</p>
                </div>
                {/* <div className="stat">
                  <h3>30+</h3>
                  <p>Happy Clients</p>
                </div> */}
              </div>
            </div>
            <div className="about-image">
              <div className="about-image-placeholder">
                <span>About</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <div className="skill-items">
                <div className="skill-item">React.js</div>
                {/* <div className="skill-item">Vue.js</div> */}
                <div className="skill-item">JavaScript (ES6+)</div>
                <div className="skill-item">TypeScript</div>
                <div className="skill-item">HTML5 & CSS3</div>
                <div className="skill-item">React Native</div>
                {/* <div className="skill-item">Sass/SCSS</div> */}
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <div className="skill-items">
                <div className="skill-item">Node.js</div>
                <div className="skill-item">Python</div>
                <div className="skill-item">Django</div>
                <div className="skill-item">MongoDB</div>
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Others</h3>
              <div className="skill-items">
                <div className="skill-item">Git & GitHub</div>
                <div className="skill-item">Docker</div>
                <div className="skill-item">Figma</div>
                {/* <div className="skill-item">Jest</div>
                <div className="skill-item">Webpack</div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <div className="project-image-placeholder">
                  <span>AI Chatbot</span>
                </div>
              </div>
              <div className="project-content">
                <h3>AI Chatbot Application</h3>
                <p>
                Built responsive conversational AI chatbot using OpenAI GPT API for intelligent natural language 
                processing. Developed real-time chat interface with context-aware responses , with responsive design and conversation history management.
                </p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>Json</span>
                  <span>Tailwind CSS</span>
                  <span>OpenAI API</span>
                </div>
                <div className="project-links">
                  <a href="https://ai-chat-eight-woad.vercel.app/" className="project-link">Live Demo</a>
                  <a href="https://github.com/RameshKChoudhary/ai-chat" className="project-link">GitHub</a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <div className="project-image-placeholder">
                  <span>Healthcare App</span>
                </div>
              </div>
              <div className="project-content">
                <h3>Healthcare App (Web/Mobile Application)</h3>
                <p>
                Developed a responsive healthcare web application that provides Ayurvedic home remedies for common illnesses
                using a custom Ayurvedic dataset.Built a search-based recommendation system to deliver natural and personalized treatment suggestions
                </p>
                <div className="project-tech">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Json</span>
                  <span>Google Maps API</span>
                  <span>Tailwind CSS</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/RameshKChoudhary" className="project-link">Live Demo</a>
                  <a href="https://github.com/RameshKChoudhary" className="project-link">GitHub</a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <div className="project-image-placeholder">
                  <span>Writing Application</span>
                </div>
              </div>
              <div className="project-content">
                <h3>Writing Application</h3>
                <p>
                Designed and developed a responsive web-based writing platform that allows users to create, edit, and save personal notes efficiently.
                Implemented features like local storage integration, and persistent session management
                </p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Redux</span>
                  <span>JavaScript</span>
                  <span>Tailwind CSS</span>
                  <span>LocalStorage</span>
                </div>
                <div className="project-links">
                  <a href="https://writing-appliction.vercel.app/" className="project-link">Live Demo</a>
                  <a href="https://github.com/RameshKChoudhary/writing-appliction" className="project-link">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's work together</h3>
              <p>
                I'm always interested in new opportunities and exciting projects.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>rameshkchoudhary10@gmail.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+91 000000000</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Mumbai, India</span>
                </div>
              </div>
              <div className="social-links">
                <a href="https://github.com/RameshKChoudhary" className="social-link">GitHub</a>
                <a href="https://www.linkedin.com/in/ramesh-choudhary-397025291/" className="social-link">LinkedIn</a>
                {/* <a href="#" className="social-link">Twitter</a> */}
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subject" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Ramesh Choudhary. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
