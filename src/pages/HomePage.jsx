import { useState, useMemo } from 'react'
import CharacterCard from '../components/CharacterCard'
import characters from '../data/characters.json'
import './HomePage.css'

const elements = ['all', 'fusion', 'glacio', 'aero', 'electro', 'spectro', 'havoc']
const weaponTypes = ['all', 'broadblade', 'sword', 'pistols', 'gauntlets', 'rectifier']
const rarities = ['all', '5', '4']

export default function HomePage() {
    const [search, setSearch] = useState('')
    const [filterElement, setFilterElement] = useState('all')
    const [filterWeapon, setFilterWeapon] = useState('all')
    const [filterRarity, setFilterRarity] = useState('all')

    const filtered = useMemo(() => {
        return characters.filter(ch => {
            if (search && !ch.name.toLowerCase().includes(search.toLowerCase())) return false
            if (filterElement !== 'all' && ch.element !== filterElement) return false
            if (filterWeapon !== 'all' && ch.weaponType !== filterWeapon) return false
            if (filterRarity !== 'all' && ch.rarity !== Number(filterRarity)) return false
            return true
        })
    }, [search, filterElement, filterWeapon, filterRarity])

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <span className="gradient-text">Wuthering Waves</span>
                            <br />Database
                        </h1>
                        <p className="hero-subtitle">
                            Your complete guide to Resonators, weapons, echoes, builds & teams.
                            All data in one place — up to date with Version 3.0.
                        </p>
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <span className="hero-stat-number">{characters.length}</span>
                                <span className="hero-stat-label">Characters</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-number">6</span>
                                <span className="hero-stat-label">Elements</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-number">5</span>
                                <span className="hero-stat-label">Weapon Types</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-bg-effects">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                    <div className="hero-orb hero-orb-3"></div>
                </div>
            </section>

            <section className="characters-section">
                <div className="container">
                    <div className="filter-bar">
                        <div className="search-wrap">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search characters..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        <div className="filter-groups">
                            <div className="filter-group">
                                <label>Element</label>
                                <div className="filter-pills">
                                    {elements.map(e => (
                                        <button key={e} className={`pill ${filterElement === e ? 'active' : ''} ${e !== 'all' ? e : ''}`}
                                            onClick={() => setFilterElement(e)}>
                                            {e === 'all' ? 'All' : e.charAt(0).toUpperCase() + e.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="filter-group">
                                <label>Weapon</label>
                                <div className="filter-pills">
                                    {weaponTypes.map(w => (
                                        <button key={w} className={`pill ${filterWeapon === w ? 'active' : ''}`}
                                            onClick={() => setFilterWeapon(w)}>
                                            {w === 'all' ? 'All' : w.charAt(0).toUpperCase() + w.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="filter-group">
                                <label>Rarity</label>
                                <div className="filter-pills">
                                    {rarities.map(r => (
                                        <button key={r} className={`pill ${filterRarity === r ? 'active' : ''}`}
                                            onClick={() => setFilterRarity(r)}>
                                            {r === 'all' ? 'All' : `${r}★`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="characters-count">
                        Showing <strong>{filtered.length}</strong> of {characters.length} Resonators
                    </div>

                    <div className="characters-grid stagger">
                        {filtered.map(ch => (
                            <CharacterCard key={ch.id} character={ch} />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="no-results">
                            <span className="no-results-icon">🔍</span>
                            <p>No characters found matching your filters.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
