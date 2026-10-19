import profilePhoto from "./assets/profile.png";
import resumeFile from "./assets/resume.pdf";
// React state tracks the selected page and captured contact form.
import { useState } from 'react'
import './App.css'
import Projects from './Projects'
import Education from './Education'

const contactEmail = 'vvarath9@my.centennialcollege.ca'

const pages = [
  'Home',
  'About Me',
  'Projects',
  'Education',
  'Services',
  'Contact Me',
]

// HOME PAGE
function HomePage({ navigateTo }) {
  const skills = [
    'JavaScript', 'Python', 'Java', 'C#',
    'SQL', 'AWS', 'Git & GitHub', 'Linux',
  ]

  return (
    <>
      <section className="hero">
        <p className="eyebrow">
          SOFTWARE DEVELOPMENT · CLOUD TECHNOLOGY
        </p>

        <h1>
          Hi, I’m Vithusan.
          <span>I build with purpose.</span>
        </h1>

        <p className="hero-description">
          I’m a software engineering student bringing business
          experience into technology. I enjoy building practical
          applications, exploring cloud infrastructure, and turning
          real business needs into useful software.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={() => navigateTo('Projects')}
          >
            Explore my projects ↗
          </button>

          <button
            type="button"
            className="button button-secondary"
            onClick={() => navigateTo('About Me')}
          >
            About me
          </button>
        </div>

        <p className="location">
          Greater Toronto Area, Canada
        </p>
      </section>

      <section className="content-section">
        <p className="eyebrow">MY TOOLKIT</p>
        <h2>Technologies I work with</h2>

        <ul className="skills-list">
          {skills.map((skill) => (
            <li className="skill-tag" key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="mission-card">
        <p className="eyebrow">MY MISSION</p>
        <h2>Technology that makes everyday work better.</h2>
        <p>
          My goal is to create reliable, accessible software that
          helps people and businesses work more efficiently.
          I approach projects with curiosity, practical thinking,
          and a commitment to continuous learning.
        </p>
      </section>
    </>
  )
}

// ABOUT ME PAGE
function AboutPage() {
  return (
    <section className="page-section">
      <p className="eyebrow">THE PERSON BEHIND THE PROJECTS</p>
      <h1 className="page-title">About me.</h1>

      <div className="about-grid">
        <div className="profile-card">
          {/* Your photo is loaded from public/images/profile.png. */}
          <a href={profilePhoto} target="_blank" rel="noopener noreferrer">
  <img
    src={profilePhoto}
    alt="Vithusan Varatharajan"
    className="profile-photo"
  />
</a>

          <h2>Vithusan Varatharajan</h2>
          <p>Software Engineering Student</p>
          <p>Greater Toronto Area, Canada</p>

          {/* Opens your résumé PDF in a new tab. */}
          <a
  href={resumeFile}
  target="_blank"
  rel="noopener noreferrer"
  className="btn"
>
  View my résumé ↗
</a>
        </div>

        <div className="about-copy">
          <h2>Connecting business experience with technology.</h2>

          <p>
            I’m Vithusan Varatharajan, a software engineering student
            at Centennial College with experience in IT, business
            operations, and automotive finance.
          </p>

          <p>
            Working with customers and teams has shaped how I
            approach technology: understand the problem first,
            then build a solution that is useful and easy to use.
          </p>

          <p>
            My interests include web development, cloud computing,
            and automation. Through coursework and personal projects,
            I’m developing practical technical skills and exploring
            how software can improve everyday business operations.
          </p>

          <div className="about-highlight">
            <h3>What I bring to a project</h3>
            <ul>
              <li>Understanding customer and business needs.</li>
              <li>A practical approach to troubleshooting.</li>
              <li>Communication and teamwork.</li>
              <li>Curiosity and continuous learning.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// SERVICES PAGE
function ServicesPage() {
  const services = [
    {
      title: 'Website Development',
      description:
        'Building responsive portfolio and small business websites with clear navigation and accessible layouts.',
    },
    {
      title: 'Programming & Automation',
      description:
        'Developing small applications and scripts to organise information and simplify repetitive tasks.',
    },
    {
      title: 'IT Support',
      description:
        'Helping troubleshoot computer, software, and setup issues with clear explanations and practical solutions.',
    },
  ]

  return (
    <section className="page-section">
      <p className="eyebrow">HOW I CAN HELP</p>
      <h1 className="page-title">Services.</h1>

      <p className="hero-description">
        Practical technology support for individuals and small businesses.
      </p>

      <div className="services-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.title}>
            <span className="service-number" aria-hidden="true">
              0{index + 1}
            </span>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

// CONTACT PAGE
function ContactPage({ onSubmitMessage }) {
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  async function handleSubmit(event) {
    // Prevents the normal browser page refresh.
    event.preventDefault()

    // Captures every named field in the form.
    const formData = new FormData(event.currentTarget)
    const message = Object.fromEntries(formData.entries())

    // Sends the captured information to the parent component.
    setSending(true)
    setError('')
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...message, firstname: message.firstName, lastname: message.lastName }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to save contact.')
      onSubmitMessage(message)
    } catch (err) {
      setError(err.message || 'Unable to reach the server. Please try again.')
    } finally { setSending(false) }
  }

  return (
    <section className="page-section">
      <p className="eyebrow">LET’S CONNECT</p>
      <h1 className="page-title">Contact me.</h1>

      <div className="contact-grid">
        <aside className="contact-panel">
          <h2>Get in touch</h2>
          <p>Vithusan Varatharajan</p>
          <p>Greater Toronto Area, Canada</p>
          <p>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
          <p>
            <a
              href="https://github.com/vithusanvara"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub profile ↗
            </a>
          </p>
          <p>
            Interested in software development, cloud technology,
            and opportunities to build useful solutions.
          </p>
        </aside>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            maxLength={80}
            required
          />

          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            maxLength={80}
            required
          />

          <label htmlFor="phone">Contact number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            required
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={3000}
            required
          />

          <p className="form-note">
            This form saves your contact details and message to the portfolio database. It does not send an email.
          </p>

          <p role="alert">{error}</p>
          <button className="button button-primary" type="submit" disabled={sending}>
            {sending ? 'Saving…' : 'Send message ↗'}
          </button>
        </form>
      </div>
    </section>
  )
}

// MAIN APPLICATION
function App() {
  const [currentPage, setCurrentPage] = useState('Home')
  const [submittedMessage, setSubmittedMessage] = useState(null)

  function navigateTo(page) {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function handleMessageSubmit(message) {
    // Stores all captured fields in React state.
    setSubmittedMessage(message)

    // Returns to Home as required by the assignment.
    navigateTo('Home')
  }

  return (
    <div className="portfolio">
      <header className="site-header">
        <button
          className="brand brand-button"
          type="button"
          onClick={() => navigateTo('Home')}
          aria-label="Portfolio home"
        >
          <span className="logo">VV</span>
          <span className="brand-name">
            Vithusan Varatharajan
            <small>Software & Cloud Portfolio</small>
          </span>
        </button>

        <nav className="site-nav" aria-label="Main navigation">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className={
                currentPage === page
                  ? 'nav-button active'
                  : 'nav-button'
              }
              aria-current={currentPage === page ? 'page' : undefined}
              onClick={() => navigateTo(page)}
            >
              {page}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {currentPage === 'Home' && submittedMessage && (
          <div className="submission-notice" role="status">
            Thanks, {submittedMessage.firstName}. Your message
            was saved to the portfolio database. No email was sent.
            <button
              type="button"
              className="nav-button"
              onClick={() => setSubmittedMessage(null)}
              aria-label="Dismiss confirmation"
            >
              Dismiss
            </button>
          </div>
        )}

        {currentPage === 'Home' && (
          <HomePage navigateTo={navigateTo} />
        )}
        {currentPage === 'About Me' && <AboutPage />}
        {currentPage === 'Projects' && <Projects />}
        {currentPage === 'Education' && <Education />}
        {currentPage === 'Services' && <ServicesPage />}
        {currentPage === 'Contact Me' && (
          <ContactPage onSubmitMessage={handleMessageSubmit} />
        )}
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Vithusan Varatharajan</p>
        <p>Built with React.</p>
      </footer>
    </div>
  )
}

export default App