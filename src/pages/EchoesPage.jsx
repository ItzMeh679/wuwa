import { useState, useMemo } from 'react'
import echoes from '../data/echoes.json'
import sonataEffects from '../data/sonata-effects.json'
import './EchoesPage.css'

const costs = ['all', 4, 3, 1]
const classes = ['all', 'overlord', 'nightmare', 'elite', 'common']
const classLabels = { all: 'All', overlord: 'Overlord', nightmare: 'Nightmare', elite: 'Elite', common: 'Common' }

export default function EchoesPage() {
    const [filterCost, setFilterCost] = useState('all')
    const [filterClass, setFilterClass] = useState('all')
    const [selectedSonata, setSelectedSonata] = useState(null)
    const [expandedSonata, setExpandedSonata] = useState(null)

    const filtered = useMemo(() => {
        let list = echoes
        if (filterCost !== 'all') list = list.filter(e => e.cost === filterCost)
        if (filterClass !== 'all') list = list.filter(e => e.class === filterClass)
        if (selectedSonata) list = list.filter(e => e.sonata.includes(selectedSonata))
        return list
    }, [filterCost, filterClass, selectedSonata])

    const sonataName = selectedSonata
        ? sonataEffects.find(s => s.id === selectedSonata)?.name
        : null

    return (
        <div className="echoes-page">
            <div className="container">
                <h1 className="page-title gradient-text">Echoes</h1>
                <p className="page-subtitle">
                    {filtered.length} echoes{sonataName ? ` in ${sonataName}` : ''} — browse all echoes and sonata set effects.
                </p>

                <div className="echoes-layout">
                    <div className="echoes-main">
                        <div className="filter-row">
                            <div className="cost-tabs">
                                {costs.map(c => (
                                    <button key={c} className={`cost-tab ${filterCost === c ? 'active' : ''}`}
                                        onClick={() => setFilterCost(c)}>
                                        {c === 'all' ? 'All Costs' : `${c} Cost`}
                                    </button>
                                ))}
                            </div>
                            <div className="class-tabs">
                                {classes.map(c => (
                                    <button key={c} className={`class-tab ${filterClass === c ? 'active' : ''}`}
                                        onClick={() => setFilterClass(c)}>
                                        {classLabels[c]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedSonata && (
                            <div className="active-filter">
                                <span>Filtering by: <strong>{sonataName}</strong></span>
                                <button className="clear-filter" onClick={() => setSelectedSonata(null)}>✕ Clear</button>
                            </div>
                        )}

                        <div className="echoes-grid">
                            {filtered.map(e => (
                                <div key={e.id} className={`echo-card glass-card echo-${e.class}`}>
                                    <div className="echo-header">
                                        <span className={`echo-cost cost-${e.cost}`}>{e.cost}</span>
                                        <h3>{e.name}</h3>
                                    </div>
                                    <div className="echo-meta">
                                        <span className={`element-badge ${e.element}`}>{e.element}</span>
                                        <span className={`class-badge ${e.class}`}>{e.class}</span>
                                    </div>
                                    <p className="echo-skill">{e.skill}</p>
                                    <div className="echo-sonatas">
                                        {e.sonata.map(sId => {
                                            const sData = sonataEffects.find(s => s.id === sId)
                                            return sData ? (
                                                <span key={sId} className="sonata-tag"
                                                    onClick={(ev) => { ev.stopPropagation(); setSelectedSonata(sId) }}>
                                                    {sData.name}
                                                </span>
                                            ) : null
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="no-results">
                                <p>No echoes match current filters.</p>
                                <button className="clear-filter" onClick={() => {
                                    setFilterCost('all'); setFilterClass('all'); setSelectedSonata(null)
                                }}>Reset Filters</button>
                            </div>
                        )}
                    </div>

                    <aside className="sonata-sidebar">
                        <h2>Sonata Effects <span className="sonata-count">{sonataEffects.length}</span></h2>
                        <div className="sonata-list">
                            {sonataEffects.map(s => (
                                <div key={s.id}
                                    className={`sonata-card ${selectedSonata === s.id ? 'selected' : ''} ${expandedSonata === s.id ? 'expanded' : ''}`}>
                                    <div className="sonata-header" onClick={() => setExpandedSonata(expandedSonata === s.id ? null : s.id)}>
                                        <h4>{s.name}</h4>
                                        {s.element && <span className={`element-dot ${s.element}`}></span>}
                                        <span className="echo-count-badge">{s.echoCount}</span>
                                    </div>
                                    {expandedSonata === s.id && (
                                        <div className="sonata-details">
                                            <div className="sonata-bonuses">
                                                <div className="sonata-bonus"><strong>2pc:</strong> {s.pieces['2']}</div>
                                                <div className="sonata-bonus"><strong>5pc:</strong> {s.pieces['5']}</div>
                                            </div>
                                            {s.recommended.length > 0 && (
                                                <div className="sonata-chars">
                                                    <span className="best-label">Recommended:</span>
                                                    {s.recommended.map(id => (
                                                        <span key={id} className="best-char">{id.replace(/-/g, ' ')}</span>
                                                    ))}
                                                </div>
                                            )}
                                            <button className="filter-sonata-btn"
                                                onClick={() => setSelectedSonata(selectedSonata === s.id ? null : s.id)}>
                                                {selectedSonata === s.id ? 'Show All' : 'Filter Echoes'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
