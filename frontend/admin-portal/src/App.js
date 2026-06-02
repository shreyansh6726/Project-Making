import { useEffect, useMemo, useState } from 'react';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const formatDateTime = (value) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

function App() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/clients`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load client entries');
        }

        setClients(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  const filteredClients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return clients;
    }

    return clients.filter((client) => {
      return [
        client.name,
        client.year,
        client.collegeName,
        client.projectTitle,
        client.projectDetails,
        client.emailId,
        client.phoneNumber,
        client.githubId,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));
    });
  }, [clients, query]);

  const summary = useMemo(() => {
    const withProject = clients.filter((client) => client.haveYouDecidedYouProject === 'yes').length;
    const colleges = new Set(clients.map((client) => client.collegeName).filter(Boolean)).size;

    return {
      total: clients.length,
      withProject,
      colleges,
    };
  }, [clients]);

  return (
    <main className="admin-shell">
      <section className="admin-hero">
        <div>
          <p className="eyebrow">Algorithmist Nexus Admin</p>
          <h1>Client entries dashboard</h1>
          <p className="hero-copy">
            Review every submission captured by the client portal, search across the
            intake data, and inspect the latest brief at a glance.
          </p>
        </div>

        <div className="summary-grid">
          <article className="summary-card">
            <span>Total entries</span>
            <strong>{summary.total}</strong>
          </article>
          <article className="summary-card">
            <span>Project decided</span>
            <strong>{summary.withProject}</strong>
          </article>
          <article className="summary-card">
            <span>Unique colleges</span>
            <strong>{summary.colleges}</strong>
          </article>
        </div>
      </section>

      <section className="toolbar">
        <label className="search-box">
          <span>Search entries</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, college, project, email, phone..."
          />
        </label>
      </section>

      {loading ? <div className="state-card">Loading client entries...</div> : null}

      {error ? <div className="state-card error">{error}</div> : null}

      {!loading && !error ? (
        filteredClients.length > 0 ? (
          <section className="entries-grid">
            {filteredClients.map((client) => (
              <article className="entry-card" key={client._id}>
                <div className="entry-topline">
                  <div>
                    <p className="entry-name">{client.name}</p>
                    <p className="entry-meta">
                      {client.year} · {client.collegeName}
                    </p>
                  </div>

                  <span className={`status-pill ${client.haveYouDecidedYouProject}`}>
                    {client.haveYouDecidedYouProject === 'yes' ? 'Project ready' : 'Needs idea'}
                  </span>
                </div>

                <dl className="details-list">
                  <div>
                    <dt>Project title</dt>
                    <dd>{client.projectTitle || 'Not provided yet'}</dd>
                  </div>
                  <div>
                    <dt>Project details</dt>
                    <dd>{client.projectDetails}</dd>
                  </div>
                  <div>
                    <dt>Contact</dt>
                    <dd>
                      {client.emailId}
                      <br />
                      {client.phoneNumber}
                    </dd>
                  </div>
                  <div>
                    <dt>Team size</dt>
                    <dd>{client.numberOfTeamMembers} member(s)</dd>
                  </div>
                  <div>
                    <dt>GitHub</dt>
                    <dd>{client.githubId || 'Not shared'}</dd>
                  </div>
                </dl>

                <div className="entry-footer">
                  <span>Submitted {formatDateTime(client.createdAt)}</span>
                  <span>ID {String(client._id).slice(-6)}</span>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="state-card">No entries match your search.</div>
        )
      ) : null}
    </main>
  );
}

export default App;import { useEffect, useMemo, useState } from 'react';
export default App;
