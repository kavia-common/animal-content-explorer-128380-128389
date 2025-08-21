import React, { useMemo, useState, useEffect } from 'react';
import './App.css';

// Color tokens from work item for light theme
const THEME = {
  primary: '#1976d2',
  secondary: '#43a047',
  accent: '#ffb300',
};

// Sample animal data (no backend required as per work item)
const ANIMALS = [
  { id: 1, name: 'African Elephant', type: 'Mammal', habitat: 'Savannah', diet: 'Herbivore', continent: 'Africa', status: 'Vulnerable', image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, name: 'Bengal Tiger', type: 'Mammal', habitat: 'Forest', diet: 'Carnivore', continent: 'Asia', status: 'Endangered', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, name: 'Emperor Penguin', type: 'Bird', habitat: 'Polar', diet: 'Carnivore', continent: 'Antarctica', status: 'Near Threatened', image: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, name: 'Red Kangaroo', type: 'Mammal', habitat: 'Desert', diet: 'Herbivore', continent: 'Australia', status: 'Least Concern', image: 'https://images.unsplash.com/photo-1558980664-10eaaff5cb47?q=80&w=1200&auto=format&fit=crop' },
  { id: 5, name: 'Bald Eagle', type: 'Bird', habitat: 'Forest', diet: 'Carnivore', continent: 'North America', status: 'Least Concern', image: 'https://images.unsplash.com/photo-1573991208390-9f63f7e32654?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, name: 'Giant Panda', type: 'Mammal', habitat: 'Forest', diet: 'Herbivore', continent: 'Asia', status: 'Vulnerable', image: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa5?q=80&w=1200&auto=format&fit=crop' },
  { id: 7, name: 'Green Sea Turtle', type: 'Reptile', habitat: 'Ocean', diet: 'Omnivore', continent: 'Global', status: 'Endangered', image: 'https://images.unsplash.com/photo-1544551763-7ef85ef58b94?q=80&w=1200&auto=format&fit=crop' },
  { id: 8, name: 'Snow Leopard', type: 'Mammal', habitat: 'Mountain', diet: 'Carnivore', continent: 'Asia', status: 'Vulnerable', image: 'https://images.unsplash.com/photo-1558980664-10eaaff5cb47?q=80&w=1200&auto=format&fit=crop' },
  { id: 9, name: 'Macaw', type: 'Bird', habitat: 'Rainforest', diet: 'Herbivore', continent: 'South America', status: 'Least Concern', image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop' },
  { id: 10, name: 'Komodo Dragon', type: 'Reptile', habitat: 'Island', diet: 'Carnivore', continent: 'Asia', status: 'Endangered', image: 'https://images.unsplash.com/photo-1625923663333-1d89ceeb4099?q=80&w=1200&auto=format&fit=crop' },
];

// Utility to derive filter options from data
function deriveOptions(items, key) {
  return Array.from(new Set(items.map((it) => it[key]))).sort();
}

// PUBLIC_INTERFACE
export default function App() {
  /** Top-level UI state */
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState([]);
  const [habitatFilter, setHabitatFilter] = useState([]);
  const [continentFilter, setContinentFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [selected, setSelected] = useState(null);
  const [theme] = useState('light'); // locked to light per work item theme

  // Apply theme data attribute (still keeps possibility to expand)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const typeOptions = useMemo(() => deriveOptions(ANIMALS, 'type'), []);
  const habitatOptions = useMemo(() => deriveOptions(ANIMALS, 'habitat'), []);
  const continentOptions = useMemo(() => deriveOptions(ANIMALS, 'continent'), []);
  const statusOptions = useMemo(() => deriveOptions(ANIMALS, 'status'), []);

  // Filtering and searching
  const filtered = useMemo(() => {
    let list = ANIMALS;

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.habitat.toLowerCase().includes(q) ||
        a.continent.toLowerCase().includes(q) ||
        a.status.toLowerCase().includes(q)
      );
    }

    if (typeFilter.length) list = list.filter(a => typeFilter.includes(a.type));
    if (habitatFilter.length) list = list.filter(a => habitatFilter.includes(a.habitat));
    if (continentFilter.length) list = list.filter(a => continentFilter.includes(a.continent));
    if (statusFilter.length) list = list.filter(a => statusFilter.includes(a.status));

    const sorted = [...list].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

    return sorted;
  }, [query, typeFilter, habitatFilter, continentFilter, statusFilter, sortBy]);

  const clearAllFilters = () => {
    setTypeFilter([]);
    setHabitatFilter([]);
    setContinentFilter([]);
    setStatusFilter([]);
    setSortBy('name');
    setQuery('');
  };

  return (
    <div className="app-root">
      <Header
        onSearch={setQuery}
        query={query}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="layout">
        <aside className="sidebar" aria-label="Sidebar filters">
          <Filters
            title="Type"
            options={typeOptions}
            active={typeFilter}
            onToggle={(opt) =>
              setTypeFilter((prev) =>
                prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
              )
            }
          />
          <Filters
            title="Habitat"
            options={habitatOptions}
            active={habitatFilter}
            onToggle={(opt) =>
              setHabitatFilter((prev) =>
                prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
              )
            }
          />
          <Filters
            title="Continent"
            options={continentOptions}
            active={continentFilter}
            onToggle={(opt) =>
              setContinentFilter((prev) =>
                prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
              )
            }
          />
          <Filters
            title="Conservation"
            options={statusOptions}
            active={statusFilter}
            onToggle={(opt) =>
              setStatusFilter((prev) =>
                prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
              )
            }
          />

          <button className="btn-clear" onClick={clearAllFilters} aria-label="Clear all filters">
            Clear filters
          </button>
        </aside>

        <main className="content" aria-live="polite">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid">
              {filtered.map((a) => (
                <AnimalCard key={a.id} animal={a} onSelect={() => setSelected(a)} />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer count={filtered.length} total={ANIMALS.length} />

      {selected && (
        <DetailModal animal={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

/** Header with navigation and search */
function Header({ onSearch, query, sortBy, setSortBy }) {
  const appTitle = process.env.REACT_APP_APP_TITLE || 'Animals Explorer';

  return (
    <header className="header">
      <nav className="nav">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">🐾</span>
          <span className="brand-name">{appTitle}</span>
        </div>
        <ul className="nav-links">
          <li><a href="#browse" className="nav-link">Browse</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
      </nav>
      <div className="toolbar">
        <div className="search">
          <input
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search animals, habitats, status..."
            aria-label="Search"
          />
        </div>
        <div className="sort">
          <label htmlFor="sortBy">Sort</label>
          <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="type">Type</option>
            <option value="status">Conservation</option>
          </select>
        </div>
      </div>
    </header>
  );
}

/** Sidebar filter section */
function Filters({ title, options, active, onToggle }) {
  return (
    <section className="filter-section">
      <h3 className="filter-title">{title}</h3>
      <ul className="filter-list">
        {options.map((o) => {
          const checked = active.includes(o);
          return (
            <li key={o}>
              <label className={checked ? 'chip chip-active' : 'chip'}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(o)}
                />
                <span>{o}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Card for each animal */
function AnimalCard({ animal, onSelect }) {
  return (
    <article className="card" onClick={onSelect} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect(); }}>
      <div className="card-media" style={{ backgroundImage: `url(${animal.image})` }} aria-label={`${animal.name} image`} />
      <div className="card-body">
        <h4 className="card-title">{animal.name}</h4>
        <div className="tags">
          <span className="tag">{animal.type}</span>
          <span className="tag">{animal.habitat}</span>
          <span className="tag tag-accent">{animal.status}</span>
        </div>
      </div>
    </article>
  );
}

/** Empty state when no results */
function EmptyState() {
  return (
    <div className="empty">
      <p>No animals match your search or filters.</p>
      <span aria-hidden="true">🔎</span>
    </div>
  );
}

/** Modal with animal details */
function DetailModal({ animal, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${animal.name} details`}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-media" style={{ backgroundImage: `url(${animal.image})` }} />
        <div className="modal-body">
          <h2>{animal.name}</h2>
          <ul className="details">
            <li><strong>Type:</strong> {animal.type}</li>
            <li><strong>Habitat:</strong> {animal.habitat}</li>
            <li><strong>Diet:</strong> {animal.diet}</li>
            <li><strong>Continent:</strong> {animal.continent}</li>
            <li><strong>Conservation:</strong> {animal.status}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Footer */
function Footer({ count, total }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="muted">
          Showing {count} of {total} animals
        </span>
        <span className="credit">
          Built with React • Minimalistic light theme
        </span>
      </div>
    </footer>
  );
}
