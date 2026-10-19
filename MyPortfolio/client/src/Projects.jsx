// useState lets each image remember whether it failed to load.
import { useState } from 'react'

// Stores project details separately from the page layout.
// The image paths refer to files inside public/images.
const projects = [
  {
    id: 'dealerops',
    title: 'DealerOps Cloud Platform',
    category: 'BACKEND DEVELOPMENT & CLOUD',
    status: 'In development · AWS deployment planned',
    description:
      'A dealership vehicle inventory backend that combines my automotive experience with software engineering and cloud development.',
    role:
      'Building a Python API for creating and retrieving vehicle records, validating submitted data, and storing inventory in a database.',
    outcome:
      'The repository includes a FastAPI application, health checks, SQLite storage, duplicate-VIN protection, automated tests, Docker configuration, and a GitHub Actions CI workflow. AWS deployment and Terraform infrastructure are planned.',
    technologies: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'SQLite',
      'Docker',
      'GitHub Actions',
    ],
    image: '/images/project-1.png',
    imageAlt:
      'DealerOps API documentation mockup showing the inventory endpoints',
    imageCaption: 'API documentation mockup based on the repository.',
    githubUrl: 'https://github.com/vithusanvara/DealerOps-Cloud',
  },
  {
    id: 'auto-approved',
    title: 'Auto Approved',
    category: 'WEB DEVELOPMENT & BUSINESS OPERATIONS',
    status: 'In development',
    description:
      'A Canadian vehicle financing platform designed to connect applicants with dealership partners and simplify financing enquiries.',
    role:
      'Developing and configuring the website, shaping the application experience, and working on lead management and dealership assignment workflows.',
    outcome:
      'Established a website hosted on Vercel and worked on the application and administrative dashboard. Development continues toward launch.',
    technologies: ['Web Development', 'GitHub', 'Vercel'],
    image: '/images/project-2.png',
    imageAlt: 'Screenshot of the Auto Approved website',
    imageCaption: 'Auto Approved website screenshot.',
  },
  {
    id: 'react-portfolio',
    title: 'Personal React Portfolio',
    category: 'REACT & RESPONSIVE WEB DESIGN',
    status: 'In progress',
    description:
      'A personal website built for COMP229 and intended to become a public portfolio showcasing my projects, education, and professional background.',
    role:
      'Building React components, implementing navigation for six pages, creating responsive CSS layouts, and presenting project information through reusable cards.',
    outcome:
      'Created the Home, About Me, and Projects content with project images and responsive styling. Education, Services, the contact form, and deployment are the next stages.',
    technologies: ['React', 'JavaScript', 'CSS', 'Vite'],
    image: '/images/project-3.png',
    imageAlt: 'Screenshot of my personal React portfolio Home page',
    imageCaption: 'Personal React portfolio screenshot.',
  },
]

// Displays a project image or a fallback if its file is missing.
function ProjectImage({ project }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className="project-media">
      {imageFailed ? (
        <div className="project-image-fallback">
          <strong>{project.title}</strong>
          <span>Project image unavailable</span>
        </div>
      ) : (
        <img
          className="project-image"
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  )
}

// Creates the Projects page from the project data above.
function Projects() {
  return (
    <section
      className="page-section"
      aria-labelledby="projects-heading"
    >
      <p className="eyebrow">IDEAS INTO IMPLEMENTATION</p>

      <h1 className="page-title" id="projects-heading">
        My projects.
      </h1>

      <p className="hero-description">
        Exploring software development and cloud technology through
        projects inspired by real business needs.
      </p>

      <div className="projects-grid">
        {/* Creates one card for each project in the array. */}
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <ProjectImage project={project} />

            <div className="project-content">
              <p className="eyebrow">{project.category}</p>
              <h2>{project.title}</h2>

              <p className="project-status">{project.status}</p>
              <p>{project.description}</p>

              {/* Groups each heading with its project explanation. */}
              <dl className="project-details">
                <dt>My contribution</dt>
                <dd>{project.role}</dd>

                <dt>Outcome & progress</dt>
                <dd>{project.outcome}</dd>

                <dt>Project image</dt>
                <dd>{project.imageCaption}</dd>
              </dl>

              {/* Displays each technology as a badge. */}
              <ul
                className="skills-list"
                aria-label={`${project.title} technologies`}
              >
                {project.technologies.map((technology) => (
                  <li className="skill-tag" key={technology}>
                    {technology}
                  </li>
                ))}
              </ul>

              {/* Shows a repository link only when one is provided. */}
              {project.githubUrl && (
                <div className="hero-actions">
                  <a
                    className="button button-secondary"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View GitHub repository ↗
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// Allows App.jsx to import and display this page.
export default Projects