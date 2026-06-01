import { useState } from 'react';
import './App.css';

const API_BASE_URL =
  process.env.REACT_APP_HF_SPACE_URL || process.env.REACT_APP_API_URL || '';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    year: '2nd yr',
    collegeName: '',
    haveYouDecidedYouProject: 'no',
    projectTitle: '',
    projectDetails: '',
    phoneNumber: '',
    emailId: '',
    githubId: '',
    numberOfTeamMembers: '1',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const payload = {
      ...formData,
      numberOfTeamMembers: Number(formData.numberOfTeamMembers),
      githubId: formData.githubId.trim() || undefined,
      projectTitle:
        formData.haveYouDecidedYouProject === 'yes'
          ? formData.projectTitle.trim()
          : undefined,
    };

    if (payload.haveYouDecidedYouProject === 'no') {
      delete payload.projectTitle;
    }

    try {
      const endpoint = `${API_BASE_URL.replace(/\/$/, '')}/api/clients` || '/api/clients';
      const response = await fetch(API_BASE_URL ? endpoint : '/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Something went wrong');
      }

      setStatus({
        type: 'success',
        message: 'Your submission reached Algorithmist Nexus. We will get back to you shortly.',
      });
      setFormData({
        name: '',
        year: '2nd yr',
        collegeName: '',
        haveYouDecidedYouProject: 'no',
        projectTitle: '',
        projectDetails: '',
        phoneNumber: '',
        emailId: '',
        githubId: '',
        numberOfTeamMembers: '1',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Algorithmist Nexus</p>
          <h1>Designing interfaces that think as sharply as they look.</h1>
          <p className="hero-text">
            We build high-signal experiences for DSA classes, full stack projects,
            and startup products that need more than a template. Algorithmist Nexus
            is the craft layer behind the work.
          </p>

          <div className="hero-actions">
            <a href="#contact-form" className="primary-btn">
              Start a project
            </a>
            <a href="#capabilities" className="secondary-btn">
              Explore capabilities
            </a>
          </div>

          <div className="tag-cloud" aria-label="Core strengths">
            <span>DSA Systems</span>
            <span>Full Stack Launches</span>
            <span>Motion-First UI</span>
            <span>Startup Identity</span>
          </div>
        </div>

        <div className="hero-panel">
          <div className="glow-card floating-card card-one">
            <span>01</span>
            <strong>Algorithmic clarity</strong>
            <p>Every screen is shaped to feel precise, fast, and memorable.</p>
          </div>
          <div className="glow-card floating-card card-two">
            <span>02</span>
            <strong>Bold visual language</strong>
            <p>Gradients, motion, depth, and rhythm built into the first impression.</p>
          </div>
          <div className="glow-card metrics-card">
            <div>
              <h3>Clean UI</h3>
              <p>High contrast, responsive layout, and tactile controls.</p>
            </div>
            <div>
              <h3>Production ready</h3>
              <p>Form submissions flow to the backend and MongoDB.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities" id="capabilities">
        <div className="section-heading">
          <p>What Algorithmist Nexus brings</p>
          <h2>Built to show capability, not just content.</h2>
        </div>

        <div className="capability-grid">
          <article className="capability-card">
            <span>01</span>
            <h3>Meaningful motion</h3>
            <p>
              Subtle floating elements and reveal effects keep the page alive without
              becoming noisy.
            </p>
          </article>
          <article className="capability-card">
            <span>02</span>
            <h3>Strong identity</h3>
            <p>
              The visual system leans into sharp gradients, contrast, and refined
              spacing to feel premium.
            </p>
          </article>
          <article className="capability-card">
            <span>03</span>
            <h3>Form to pipeline</h3>
            <p>
              The final section collects every client schema field and sends it to the
              backend API.
            </p>
          </article>
        </div>
      </section>

      <section className="showcase">
        <div className="section-heading compact">
          <p>Taglines</p>
          <h2>Algorithmist Nexus turns logic into atmosphere.</h2>
        </div>

        <div className="showcase-banner">
          <span>DSA classes that feel premium</span>
          <span>Full stack builds with visual intent</span>
          <span>Startup pages that do not look generic</span>
        </div>
      </section>

      <section className="contact-section" id="contact-form">
        <div className="section-heading">
          <p>Client intake</p>
          <h2>Send your brief and we will shape the build.</h2>
        </div>

        <form className="client-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input name="name" value={formData.name} onChange={handleChange} required />
            </label>

            <label>
              <span>Year</span>
              <select name="year" value={formData.year} onChange={handleChange} required>
                <option value="2nd yr">2nd yr</option>
                <option value="3rd yr">3rd yr</option>
                <option value="4th yr">4th yr</option>
              </select>
            </label>

            <label className="full-width">
              <span>College name</span>
              <input
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span>Have you decided your project?</span>
              <select
                name="haveYouDecidedYouProject"
                value={formData.haveYouDecidedYouProject}
                onChange={handleChange}
                required
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </label>

            <label>
              <span>Project title {formData.haveYouDecidedYouProject === 'yes' ? '' : '(optional)'}</span>
              <input
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                disabled={formData.haveYouDecidedYouProject === 'no'}
                required={formData.haveYouDecidedYouProject === 'yes'}
              />
            </label>

            <label className="full-width">
              <span>Project details</span>
              <textarea
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                rows="6"
                required
              />
            </label>

            <label>
              <span>Phone number</span>
              <input
                name="phoneNumber"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10,15}"
                placeholder="10 to 15 digits"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span>Email id</span>
              <input
                name="emailId"
                type="email"
                value={formData.emailId}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </label>

            <label>
              <span>GitHub id</span>
              <input name="githubId" value={formData.githubId} onChange={handleChange} />
            </label>

            <label>
              <span>Number of team members</span>
              <input
                name="numberOfTeamMembers"
                type="number"
                min="1"
                value={formData.numberOfTeamMembers}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button className="primary-btn submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send to Algorithmist Nexus'}
          </button>

          {status.message ? (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          ) : null}
        </form>
      </section>
    </main>
  );
}

export default App;
