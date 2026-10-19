// Stores education and qualification details separately from the layout.
// In-progress qualifications are clearly distinguished from earned ones.
const qualifications = [
  {
    id: 'centennial',
    institution: 'Centennial College',
    title: 'Software Engineering Technician — Fast-Track',
    date: 'January 2026 – April 2027 (expected)',
    status: 'In progress',
    description:
      'Developing practical skills in programming, web application development, databases, and software design.',
    topics: [
      'Object-Oriented Programming',
      'Web Development',
      'Database Design & SQL',
      'Systems Analysis',
      'Linux',
    ],
  },
  {
    id: 'aws-practitioner',
    institution: 'Amazon Web Services',
    title: 'AWS Certified Cloud Practitioner',
    date: 'Earned September 2026',
    status: 'Earned',
    description:
      'A foundational cloud certification covering AWS services, cloud concepts, security, and billing.',
    topics: [
      'Cloud Concepts',
      'AWS Services',
      'Security Fundamentals',
      'Cloud Pricing',
    ],
  },
  {
    id: 'aws-solutions-architect',
    institution: 'Amazon Web Services',
    title: 'AWS Solutions Architect – Associate Preparation',
    date: 'Ongoing study',
    status: 'Studying — certification not yet earned',
    description:
      'Building knowledge of AWS architecture and the design of secure, reliable, and scalable cloud solutions.',
    topics: [
      'Cloud Architecture',
      'Networking',
      'Storage',
      'Reliability',
    ],
  },
]

// Displays the Education page.
function Education() {
  return (
    <section
      className="page-section"
      aria-labelledby="education-heading"
    >
      <p className="eyebrow">LEARNING WITH PURPOSE</p>

      <h1 className="page-title" id="education-heading">
        Education & qualifications.
      </h1>

      <p className="hero-description">
        Combining formal education, professional certification,
        and practical projects to strengthen my software and cloud skills.
      </p>

      <div className="education-list">
        {/* Creates a card for each qualification. */}
        {qualifications.map((qualification) => (
          <article
            className="education-card"
            key={qualification.id}
          >
            <p className="eyebrow">
              {qualification.institution}
            </p>

            <h2>{qualification.title}</h2>

            <p className="education-date">
              {qualification.date}
            </p>

            <span className="education-status">
              {qualification.status}
            </span>

            <p className="education-description">
              {qualification.description}
            </p>

            {/* Displays the main areas of study as badges. */}
            <ul
              className="skills-list"
              aria-label={`${qualification.title} areas of study`}
            >
              {qualification.topics.map((topic) => (
                <li className="skill-tag" key={topic}>
                  {topic}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Education